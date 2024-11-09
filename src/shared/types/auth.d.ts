type RegisterUser = {
  first_name: string;
  last_name: string;
  email: string;
  contact_no: string;
  password: string;
  role?: "admin";
  dob?: string | Date | null | any;
};

type LoginUser = {
  email: string;
  password: string;
};
