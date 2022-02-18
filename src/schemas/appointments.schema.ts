import * as yup from "yup";

export const AppointmentSchema = yup.object().shape({
  patientId: yup
    .string()
    .typeError("The field 'patientId' must be typeof string!")
    .strict(true)
    .matches(
      /^([0-9]){3}\.([0-9]){3}\.([0-9]){3}-([0-9]){2}$/,
      "Invalid field 'patientId'. Correct example: 'xxx.xxx.xxx-xx'"
    )
    .required("'CPF' is a required field!"),
  professionalId: yup
    .string()
    .typeError("The field 'professionalId' must be typeof string!")
    .strict(true)
    .matches(
      /^([0-9]){5}\-([A-Z]){2}$/,
      "Invalid field 'professionalId'. Correct example: '00000-xx'"
    )
    .required("'professionalId' is a required field!"),
  date: yup.date().required("'date' is a required field!"),
  finished: yup
    .boolean()
    .typeError("The field 'finished' must be typeof boolean!")
    .strict(true)
    .oneOf([false], "'false' value required for this field!")
    .required("'finished' is a required field!"),
});
