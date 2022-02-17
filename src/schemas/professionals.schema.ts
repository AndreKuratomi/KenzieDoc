import * as yup from "yup";

export const ProfessionalSchema = yup.object().shape({
  council_number: yup
    .string()
    .matches(
      /^([0-9]){5}\-([A-Z]){2}$/,
      "Invalid field 'cpf'. Correct example: 'xxx.xxx.xxx-xx'"
    )
    .required("'CPF' is a required field!"),
  name: yup.string().required("'name' is a required field!"),
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
  specialty: yup.string().required("'specialty' is a required field!"),
  address: yup.string().required("'address' is a required field!"),
});
