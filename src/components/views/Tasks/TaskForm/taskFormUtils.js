import * as Yup from "yup";

export const initialValues = {
  title: "",
  status: "",
  importance: "",
  description: "",
};

export const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(6, "La cantidad mínima de caracteres es 6")
    .required("Por favor, ingresa un título"),
  status: Yup.string().required("Selecciona un estado"),
  importance: Yup.string().required("Selecciona una prioridad"),
  description: Yup.string().required("Coloca una descripción"),
});
