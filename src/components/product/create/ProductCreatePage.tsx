import { IProductCreate } from "./types";
import * as yup from "yup";
import { useFormik } from "formik";

const ProductCreatePage = () => {
  const initValues: IProductCreate = {
    name: "",
    price: 0,
    category_id: 0,
    images: [],
    description: "",
  };

  const createSchema = yup.object({
    name: yup.string().required("Вкажіть назву"),
    price: yup
      .number()
      .min(0.00001, "Ціна має бути більшим 0")
      .required("Вкажіть ціну"),
    category_id: yup.number().min(1, "Вкажіть категорію"),
    description: yup.string().required("Вкажіть опис"),
    images: yup
      .array()
      .of(yup.number())
      .min(1, "Мінімального одна фотка для товару")
      .required("Оберіть хочаб одне фото"),
  });

  const onSubmitFormikData = (values: IProductCreate) => {
    console.log("Formik valid data send server", values);
  };

  const formik = useFormik({
    initialValues: initValues,
    onSubmit: onSubmitFormikData,
    validationSchema: createSchema,
  });

  const { values, errors, touched, handleChange, handleSubmit } = formik;

  return (
    <>
      <h1>Додати товар</h1>
    </>
  );
};

export default ProductCreatePage;