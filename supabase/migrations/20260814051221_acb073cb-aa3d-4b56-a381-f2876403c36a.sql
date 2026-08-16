alter table public.volunteer_applications add column if not exists status text not null default 'new';
alter table public.contact_messages add column if not exists status text not null default 'new';
alter table public.partner_inquiries add column if not exists status text not null default 'new';

create policy "admins manage volunteer applications" on public.volunteer_applications for update to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create policy "admins delete volunteer applications" on public.volunteer_applications for delete to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "admins manage contact messages" on public.contact_messages for update to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create policy "admins delete contact messages" on public.contact_messages for delete to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "admins manage partner inquiries" on public.partner_inquiries for update to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create policy "admins delete partner inquiries" on public.partner_inquiries for delete to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "admins manage donations" on public.donations for update to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create policy "admins delete donations" on public.donations for delete to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "admins manage roles" on public.user_roles for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

revoke update, delete, truncate, references, trigger on all tables in schema public from anon;
revoke insert on public.campaigns, public.stories, public.events, public.impact_metrics, public.documents, public.user_roles from anon;
revoke select on public.user_roles from anon;
revoke truncate, references, trigger on all tables in schema public from authenticated;

create or replace function public.claim_admin()
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare uid uuid := auth.uid();
begin
  if uid is null then return false; end if;
  if exists (select 1 from public.user_roles where role = 'admin') then return false; end if;
  insert into public.user_roles (user_id, role) values (uid, 'admin') on conflict do nothing;
  return true;
end;
$$;

revoke all on function public.claim_admin() from public;
revoke all on function public.claim_admin() from anon;
grant execute on function public.claim_admin() to authenticated;