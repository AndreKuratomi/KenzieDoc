import * as yup from "yup";

export const ProfessionalSchema = yup.object().shape({
  council_number: yup
    .string()
    .typeError("The field 'council_number' must be typeof string!")
    .strict(true)
    .matches(
      /^([0-9]){3,5}\-([aA-zZ]){2}$/,
      "Invalid field 'council_number'. Correct example: '00000-xx'"
    )
    .required("'CPF' is a required field!"),
  name: yup
    .string()
    .typeError("The field 'name' must be typeof string!")
    .strict(true)
    .required("'name' is a required field!"),
  email: yup
    .string()
    .email("Invalid email. Correct format example: 'email@email.com'")
    .required("'email' is a required field!"),
  password: yup
    .string()
    .typeError("The field 'password' must be typeof string!")
    .strict(true)
    .required("'password' is a required field!")
    .min(4, "Minimun 4 digits for password!"),
  phone: yup
    .string()
    .typeError("The field 'phone' must be typeof string!")
    .strict(true)
    .required("'phone' is a required field!")
    .length(11, "Phone must have 11 digits!"),
  specialty: yup
    .string()
    .typeError("The field 'specialty' must be typeof string!")
    .strict(true)
    .required("'specialty' is a required field!"),
  address: yup
    .string()
    .typeError("The field 'address' must be typeof string!")
    .strict(true)
    .required("'address' is a required field!"),
});
