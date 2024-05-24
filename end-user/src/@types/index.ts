export type Login = {
  status: boolean;
  data: {
    id: number;
    name: string;
    email: string;
  };
  token: string;
};

export type Branch = {
  id: number;
  branch_name: string;
  address: string;
  contact_number: string;
  email: string;
  person_contact: string;
  person_name: string;
};

export type Operator = {
  id: number;
  company_name: string;
  uen_no: string;
  brand_name: string;
  address: string;
  contact_no: string;
  contact_person: string;
  contact_person_no: string;
  status: string;
  cover: { id: number; url: string };
  payment_slip: string;
  user: { id: number; name: string; email: string; role: string };
  slug: string;
  branch_office: Branch[];
};

export type Therapist = {
  address: string;
  address_nearest_mrt: string;
  contact_no: string;
  cover: { id: number; url: string };
  credential_id: string;
  date_of_birth: string;
  date_of_issue: string;
  expired_date: string;
  id: number;
  issuing_organization: string;
  name: string;
  name_cert: string;
  nationality: string;
  passport_finno: string;
  professional_certs: string;
  sex: string;
  slug: string;
  status: string;
  user: { id: number; email: string; role: string };
  employeHistorys: EmployeHistory[];
};

export type EmployeHistory = {
  id: number;
  job_title: string;
  company_name: string;
  start_date: string;
  end_date: string;
  location: string;
  description: string;
};

export type Post = {
  id: number;
  title: string;
  slug: string;
  content: string;
  status: string;
  published_at?: string | null;
  cover: any;
  model?: string;
  categories?: Category[];
  tags?: Tag[];
  metas?: Meta[];
};

export type Category = {
  id: number;
  name: string;
};

export type Page = {
  id: number;
  name: string;
  slug: string;
};

export type Meta = {
  id: number;
  key: string;
  value: string;
  content: string;
  metaableId: number;
  metaableType: string;
};

export type Event = {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: number;
};

export type Tag = {
  id: number;
  name: string;
};

export type Cover = {
  id: number;
  url: string;
};

export type DataWithPagination<T> = {
  name: any;
  data: T[];
  links: {
    first: string;
    last: string;
    prev: string;
    next: string;
  };
  meta: {
    first_item: number;
    current_page: number;
    from: number;
    last_page: number;
    links: Link[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
};

export type Link = {
  url: string | null;
  label: string;
  active: boolean;
};

export type ValidationErrors = {
  message: string;
  errors: {
    email: string[];
    password: string[];
  };
};

export type LoginError = {
  status: boolean;
  message: string;
};

export type ApiError = {
  status: boolean;
  message: string;
};

export type Customer = {
  id: number;
  email: string;
  phone: string;
  service: string;
};

export type Pagination = {
  url?: string | null;
  active: boolean;
  label: string;
};
