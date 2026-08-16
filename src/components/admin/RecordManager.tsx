import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { adminListQuery, type AdminTable } from "@/lib/adminQueries";

export type FieldType = "text" | "textarea" | "number" | "bool" | "date" | "datetime" | "array";

export type FieldDef = {
  name: string;
  label: string;
  type?: FieldType;
  required?: boolean;
  placeholder?: string;
};

type Row = Record<string, unknown>;

function emptyValue(f: FieldDef) {
  switch (f.type) {
    case "bool":
      return false;
    case "number":
      return 0;
    case "array":
      return "";
    default:
      return "";
  }
}

function toFormValue(f: FieldDef, v: unknown) {
  if (f.type === "array") return Array.isArray(v) ? v.join(", ") : "";
  if (f.type === "bool") return Boolean(v);
  if (f.type === "datetime" && typeof v === "string") return v.slice(0, 16);
  if (v === null || v === undefined) return emptyValue(f);
  return v as string | number | boolean;
}

function toDbValue(f: FieldDef, v: unknown) {
  if (f.type === "bool") return Boolean(v);
  if (f.type === "number") return Number(v ?? 0);
  if (f.type === "array")
    return String(v ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  const s = String(v ?? "").trim();
  if (!s) return f.required ? "" : null;
  if (f.type === "datetime") return new Date(s).toISOString();
  return s;
}

export function RecordManager({
  table,
  title,
  description,
  fields,
  listColumns,
  orderBy = "created_at",
  ascending = false,
  readOnly = false,
}: {
  table: AdminTable;
  title: string;
  description?: string;
  fields: FieldDef[];
  listColumns: { name: string; label: string }[];
  orderBy?: string;
  ascending?: boolean;
  readOnly?: boolean;
}) {
  const qc = useQueryClient();
  const { data, isLoading, error } = useQuery(adminListQuery(table, orderBy, ascending));
  const [editing, setEditing] = useState<Row | null>(null);
  const [open, setOpen] = useState(false);

  const form = useMemo(() => {
    const base: Row = {};
    for (const f of fields) base[f.name] = editing ? toFormValue(f, editing[f.name]) : emptyValue(f);
    return base;
  }, [editing, fields]);

  const [values, setValues] = useState<Row>(form);
  const [formKey, setFormKey] = useState(0);

  function startCreate() {
    setEditing(null);
    const base: Row = {};
    for (const f of fields) base[f.name] = emptyValue(f);
    setValues(base);
    setFormKey((k) => k + 1);
    setOpen(true);
  }

  function startEdit(row: Row) {
    setEditing(row);
    const base: Row = {};
    for (const f of fields) base[f.name] = toFormValue(f, row[f.name]);
    setValues(base);
    setFormKey((k) => k + 1);
    setOpen(true);
  }

  const save = useMutation({
    mutationFn: async () => {
      const payload: Row = {};
      for (const f of fields) payload[f.name] = toDbValue(f, values[f.name]);
      if (editing?.["id"]) {
        const { error: e } = await supabase
          .from(table)
          .update(payload as never)
          .eq("id", editing["id"] as string);
        if (e) throw e;
      } else {
        const { error: e } = await supabase.from(table).insert(payload as never);
        if (e) throw e;
      }
    },
    onSuccess: async () => {
      toast.success(editing ? "Saved changes" : "Created");
      setOpen(false);
      await qc.invalidateQueries({ queryKey: ["admin"] });
      await qc.invalidateQueries({ queryKey: [table] });
    },
    onError: (e: Error) => toast.error(e.message || "Could not save"),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error: e } = await supabase.from(table).delete().eq("id", id);
      if (e) throw e;
    },
    onSuccess: async () => {
      toast.success("Deleted");
      await qc.invalidateQueries({ queryKey: ["admin"] });
      await qc.invalidateQueries({ queryKey: [table] });
    },
    onError: (e: Error) => toast.error(e.message || "Could not delete"),
  });

  return (
    <section>
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-navy">{title}</h1>
          {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
        </div>
        {readOnly ? null : (
          <button
            type="button"
            onClick={startCreate}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold tracking-[0.16em] text-primary-foreground uppercase transition-transform hover:scale-[1.03] active:scale-95"
          >
            <Plus className="h-4 w-4" /> New
          </button>
        )}
      </header>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card">
        {isLoading ? (
          <p className="flex items-center gap-2 p-6 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading…
          </p>
        ) : error ? (
          <p className="p-6 text-sm text-destructive">{(error as Error).message}</p>
        ) : !data?.length ? (
          <p className="p-6 text-sm text-muted-foreground">Nothing here yet.</p>
        ) : (
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="bg-secondary/10 text-xs tracking-[0.14em] text-muted-foreground uppercase">
              <tr>
                {listColumns.map((c) => (
                  <th key={c.name} className="px-4 py-3 font-semibold">
                    {c.label}
                  </th>
                ))}
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={String(row["id"])} className="border-t border-border/70 hover:bg-accent/40">
                  {listColumns.map((c) => (
                    <td key={c.name} className="max-w-[18rem] truncate px-4 py-3 align-top">
                      {formatCell(row[c.name])}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    {readOnly ? null : (
                      <button
                        type="button"
                        aria-label="Edit"
                        onClick={() => startEdit(row)}
                        className="mr-1 rounded-full p-2 text-navy transition-colors hover:bg-primary/15"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      type="button"
                      aria-label="Delete"
                      onClick={() => {
                        if (confirm("Delete this record permanently?"))
                          remove.mutate(String(row["id"]));
                      }}
                      className="rounded-full p-2 text-destructive transition-colors hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {open ? (
        <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-navy/50 p-4 backdrop-blur-sm">
          <div
            key={formKey}
            className="animate-in fade-in zoom-in-95 my-8 w-full max-w-2xl rounded-3xl border border-border bg-card p-6 shadow-2xl duration-200"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl text-navy">
                {editing ? "Edit record" : "New record"}
              </h2>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="rounded-full p-2 hover:bg-accent"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form
              className="mt-5 grid gap-4 sm:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                save.mutate();
              }}
            >
              {fields.map((f) => (
                <label
                  key={f.name}
                  className={f.type === "textarea" ? "sm:col-span-2 block" : "block"}
                >
                  <span className="text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                    {f.label}
                  </span>
                  {f.type === "bool" ? (
                    <span className="mt-2 flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={Boolean(values[f.name])}
                        onChange={(e) =>
                          setValues((v) => ({ ...v, [f.name]: e.currentTarget.checked }))
                        }
                        className="h-4 w-4 accent-[oklch(0.7_0.17_55)]"
                      />
                      <span className="text-sm text-muted-foreground">Enabled</span>
                    </span>
                  ) : f.type === "textarea" ? (
                    <textarea
                      rows={5}
                      required={f.required}
                      value={String(values[f.name] ?? "")}
                      placeholder={f.placeholder}
                      onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.currentTarget.value }))}
                      className="mt-2 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/25"
                    />
                  ) : (
                    <input
                      type={
                        f.type === "number"
                          ? "number"
                          : f.type === "date"
                            ? "date"
                            : f.type === "datetime"
                              ? "datetime-local"
                              : "text"
                      }
                      required={f.required}
                      value={String(values[f.name] ?? "")}
                      placeholder={f.placeholder}
                      onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.currentTarget.value }))}
                      className="mt-2 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/25"
                    />
                  )}
                </label>
              ))}

              <div className="sm:col-span-2 mt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-input px-5 py-2.5 text-xs font-semibold tracking-[0.16em] uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={save.isPending}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-semibold tracking-[0.16em] text-primary-foreground uppercase disabled:opacity-60"
                >
                  {save.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Save
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function formatCell(v: unknown) {
  if (v === null || v === undefined || v === "") return "—";
  if (typeof v === "boolean") return v ? "Yes" : "No";
  if (Array.isArray(v)) return v.join(", ");
  const s = String(v);
  if (/^\d{4}-\d{2}-\d{2}T/.test(s)) return new Date(s).toLocaleString("en-IN");
  return s;
}