import * as yup from "yup";

export const AppointmentSchema = yup.object().shape({
  patient: yup
    .string()
    .typeError("The field 'patient' must be typeof string!")
    .strict(true)
    .required("'patient' is a required field!")
    .length(11, "CPF must have 11 digits!"),
  professional: yup
    .string()
    .typeError("The field 'professional' must be typeof string!")
    .strict(true)
    .required("'professional' is a required field!")
    .matches(
      /^([0-9]){3,5}\-([aA-zZ]){2}$/,
      "Invalid field 'council_number'. Correct example: '00000-xx'"
    ),
  date: yup.date().required("'date' is a required field!"),
  finished: yup
    .boolean()
    .typeError("The field 'finished' must be typeof boolean!")
    .strict(true)
    .required("'finished' is a required field!"),
});
