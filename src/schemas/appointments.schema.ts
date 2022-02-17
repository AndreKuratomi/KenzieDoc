import * as yup from "yup";

export const AppointmentSchema = yup.object().shape({
  cpf: yup
    .string()
    .matches(
      /^([0-9]){3}\.([0-9]){3}\.([0-9]){3}-([0-9]){2}$/,
      "Invalid field 'cpf'. Correct example: 'xxx.xxx.xxx-xx'"
    )
    .required("'CPF' is a required field!"),
  council_number: yup
    .string()
    .matches(
      /^([0-9]){5}\-([A-Z]){2}$/,
      "Invalid field 'cpf'. Correct example: 'xxx.xxx.xxx-xx'"
    )
    .required("'CPF' is a required field!"),
  date: yup.date().required("'date' is a required field!"),
  finished: yup.boolean().required("'finished' is a required field!"),
});
