import { useNavigate } from "react-router-dom"; // використовується для переходу по маршрутам
import { ILogin, ILoginResult } from "./types"; // імпорт інтерфейсів
import * as yup from "yup"; // Бібліотека для перевірки валідації полів
import { useFormik } from "formik"; // для керування валідацією
import classNames from "classnames"; // використовується для застосування css класів до полів залежно від їх стану валідації
import http from "../../../http"; // для здійснення http запитів
import { useState } from "react"; // для керування станном змінної
import { useDispatch } from "react-redux"; // для відправки дій
import { AuthUserActionType, IUser } from "../types";
import jwtDecode from "jwt-decode"; // для декодизації jwt-tokena

const LoginPage = () => {

  const navigator = useNavigate();
  const dispatch = useDispatch();


  // присвоєння початкового значення
  const initValues: ILogin = {
    email: "",
    password: "",
  };

  // зміна стану
  const [message, setMessage] = useState<string>("");


  // присвоєння змінній данні про помилки
  const createSchema = yup.object({
    email: yup
      .string()
      .required("Вкажіть назву")
      .email("Пошта вказана не вірно"),
    password: yup.string().required("Вкажіть опис"),
  });


  // Відправляє данні на сервер та переходить на головну сторінку
  const onSubmitFormikData = async (values: ILogin) => {
    try {
        console.log("Formik send data", values);
        const result = await http.post<ILoginResult>("api/auth/login", values);
        const {access_token} = result.data;
        //console.log("Login user ", access_token);
        const user = jwtDecode(access_token) as IUser;
        //console.log("User = ", user);
        localStorage.token = access_token;  //зберіг токен в веб браузер
        setMessage("");
        http.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
        dispatch({type: AuthUserActionType.LOGIN_USER, payload: {
          email: user.email,
          name: user.name
        } as IUser });
        navigator("/");
    }
    catch(error) {
        setMessage("Дані вказано не вірно!");
        //alert("Вхід не успішний");
        console.log("Error auth", error);
    }
  }


 
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: createSchema,
    onSubmit: onSubmitFormikData,
  });

  const {values, errors, touched, handleSubmit, handleChange} = formik;

  return (
    <>
      <h1 className="text-center">Вхід</h1>
      
      <form className="col-md-6 offset-md-3" onSubmit={handleSubmit}>
      {message && (
        <div className="alert alert-danger" role="alert">
          {message}
        </div>
      )}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Електронна пошта
          </label>
          <input
            type="text"
            className={classNames("form-control", {
              "is-invalid": errors.email && touched.email,
            })}
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && touched.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Пароль
          </label>
          <input
            type="password"
            className={classNames("form-control", {
              "is-invalid": errors.password && touched.password,
            })}
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && touched.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Вхід
        </button>
      </form>
    </>
  );
};
export default LoginPage;
