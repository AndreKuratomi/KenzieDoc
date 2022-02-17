import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  email: yup.string().email().required("'email' is a required field!"),
  password: yup
    .string()
    .required("'password' is a required field!")
    .min(4, "Minimun 4 digits!"),
});
