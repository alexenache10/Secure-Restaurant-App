import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {useClassicLogin} from "../../api/MyUserApi";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { login, isLoading } = useClassicLogin();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const token = await login(values);

      if (token) {
        const userType = localStorage.getItem("type");

        if (userType === "Admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 bg-white bg-opacity-90 rounded-lg p-8">
        <div className="flex flex-col items-center">
          <img className="h-16 w-auto mb-4" src={logo} alt="Logo" />
          <h2 className="text-3xl font-extrabold text-gray-900">Log in</h2>
        </div>
        <Formik initialValues={{ email: "", password: "" }} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
                <ErrorMessage name="email" component="p" className="mt-2 text-sm text-red-600" />
              </div>
              <div>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
                <ErrorMessage name="password" component="p" className="mt-2 text-sm text-red-600" />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-700 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isLoading ? "Logging in..." : "Log in"}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
