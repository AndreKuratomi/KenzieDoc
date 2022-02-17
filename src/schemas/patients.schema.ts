import * as yup from "yup";

export const PatientSchema = yup.object().shape({
  cpf: yup
    .string()
    .matches(
      /^([0-9]){3}\.([0-9]){3}\.([0-9]){3}-([0-9]){2}$/,
      "Invalid field 'cpf'. Correct example: 'xxx.xxx.xxx-xx'"
    )
    .required("'CPF' is a required field!"),
  name: yup.string().required("'name' is a required field!"),
  age: yup.number().required("'age' is a required field!").positive().integer(),
  sex: yup.string().required("'sex' is a required field!"),
  email: yup.string().email().required("'email' is a required field!"),
  password: yup
    .string()
    .required("'password' is a required field!")
    .min(4, "Minimun 4 digits!"),
  phone: yup
    .string()
    .matches(
      /^(\([0-9]{2}\)[9]{1}[0-9]{4}-)[0-9]{4}$/,
      "Invalid phone number format. Correct example (xx)xxxxx-xxxx"
    )
    .required("'phone' is a required field!"),
  healph_plan: yup.string().required("'healph_plan' is a required field!"),
});
