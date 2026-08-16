-- roles
CREATE TYPE public.app_role AS ENUM ('admin','editor');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.is_staff(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('admin','editor'))
$$;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- campaigns
CREATE TABLE public.campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  summary text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  image_url text,
  category text NOT NULL DEFAULT 'General',
  goal_amount numeric NOT NULL DEFAULT 0,
  raised_amount numeric NOT NULL DEFAULT 0,
  deadline date,
  is_featured boolean NOT NULL DEFAULT false,
  is_published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.campaigns TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.campaigns TO authenticated;
GRANT ALL ON public.campaigns TO service_role;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read published campaigns" ON public.campaigns FOR SELECT TO anon, authenticated USING (is_published);
CREATE POLICY "staff read all campaigns" ON public.campaigns FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "admins write campaigns" ON public.campaigns FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER campaigns_updated BEFORE UPDATE ON public.campaigns FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- stories
CREATE TABLE public.stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text NOT NULL DEFAULT '',
  body text NOT NULL DEFAULT '',
  image_url text,
  category text NOT NULL DEFAULT 'News',
  published_at date NOT NULL DEFAULT current_date,
  is_published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.stories TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.stories TO authenticated;
GRANT ALL ON public.stories TO service_role;
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read published stories" ON public.stories FOR SELECT TO anon, authenticated USING (is_published);
CREATE POLICY "staff read all stories" ON public.stories FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "admins write stories" ON public.stories FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER stories_updated BEFORE UPDATE ON public.stories FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- events
CREATE TABLE public.events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text NOT NULL DEFAULT '',
  image_url text,
  location text,
  starts_at timestamptz NOT NULL DEFAULT now(),
  ends_at timestamptz,
  is_published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.events TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.events TO authenticated;
GRANT ALL ON public.events TO service_role;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read published events" ON public.events FOR SELECT TO anon, authenticated USING (is_published);
CREATE POLICY "staff read all events" ON public.events FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "admins write events" ON public.events FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER events_updated BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- impact metrics
CREATE TABLE public.impact_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  value numeric NOT NULL DEFAULT 0,
  unit text,
  icon text,
  sort_order integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.impact_metrics TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.impact_metrics TO authenticated;
GRANT ALL ON public.impact_metrics TO service_role;
ALTER TABLE public.impact_metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read published metrics" ON public.impact_metrics FOR SELECT TO anon, authenticated USING (is_published);
CREATE POLICY "staff read all metrics" ON public.impact_metrics FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "admins write metrics" ON public.impact_metrics FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- documents
CREATE TABLE public.documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL DEFAULT 'Governance',
  description text NOT NULL DEFAULT '',
  file_url text,
  published_at date NOT NULL DEFAULT current_date,
  is_published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.documents TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.documents TO authenticated;
GRANT ALL ON public.documents TO service_role;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read published documents" ON public.documents FOR SELECT TO anon, authenticated USING (is_published);
CREATE POLICY "staff read all documents" ON public.documents FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "admins write documents" ON public.documents FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- volunteers
CREATE TABLE public.volunteer_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  city text NOT NULL,
  interests text[] NOT NULL DEFAULT '{}',
  skills text,
  availability text,
  motivation text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.volunteer_applications TO anon;
GRANT SELECT, INSERT ON public.volunteer_applications TO authenticated;
GRANT ALL ON public.volunteer_applications TO service_role;
ALTER TABLE public.volunteer_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can apply" ON public.volunteer_applications FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "staff read applications" ON public.volunteer_applications FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));

-- contact messages
CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_messages TO anon;
GRANT SELECT, INSERT ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can send message" ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "staff read messages" ON public.contact_messages FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));

-- partner inquiries
CREATE TABLE public.partner_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organisation text NOT NULL,
  contact_person text NOT NULL,
  email text NOT NULL,
  phone text,
  partnership_type text NOT NULL DEFAULT 'Corporate',
  message text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.partner_inquiries TO anon;
GRANT SELECT, INSERT ON public.partner_inquiries TO authenticated;
GRANT ALL ON public.partner_inquiries TO service_role;
ALTER TABLE public.partner_inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can enquire" ON public.partner_inquiries FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "staff read inquiries" ON public.partner_inquiries FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));

-- donations
CREATE TABLE public.donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_name text NOT NULL,
  email text NOT NULL,
  phone text,
  pan text,
  address text,
  amount numeric NOT NULL,
  frequency text NOT NULL DEFAULT 'one-time',
  campaign_id uuid REFERENCES public.campaigns(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'pending',
  payment_reference text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.donations TO anon;
GRANT SELECT, INSERT ON public.donations TO authenticated;
GRANT ALL ON public.donations TO service_role;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can record donation intent" ON public.donations FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "staff read donations" ON public.donations FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE TRIGGER donations_updated BEFORE UPDATE ON public.donations FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();