import * as yup from "yup";

export const AdminSchema = yup.object().shape({
  name: yup.string().required("'name' is a required field!"),
  email: yup.string().email().required("'email' is a required field!"),
  password: yup.string().required("'password' is a required field!").min(4),
  isAdmn: yup.boolean().required("'isAdm' is a required field!"),
});
