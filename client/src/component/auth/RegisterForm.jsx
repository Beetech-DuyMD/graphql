import { useMutation } from "@apollo/client";
import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import { registerUser } from "../../graphql-client/mutation";
import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom";
export default function RegisterForm() {
  const form = useForm();
  const { register, control, handleSubmit, formState, reset } = form;
  const { errors } = formState;
  const [addUser, dataMutation] = useMutation(registerUser)
  const navigate = useNavigate();

  const handleFormSubmit = (data) => {
    try {
      addUser({
        variables: { input: { user_name: data.username, email: data.email, password: data.password } },
        onError: (errors) => {
          toast.error(errors.message)
        },
        onCompleted: () => {
           toast.success(123213)
           navigate("/login")
        }
      })  
    } catch (error) {
      toast.error(error.message)
    }

  };
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Đăng kí tài khoản
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(handleFormSubmit)}
              >
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your username
                  </label>
                  <input
                    {...register("username", {
                      required: {
                        value: true,
                        message: "UserName không được để trống",
                      },
                    })}
                    type="text"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nhập username"
                  />
                  <span className="text-red-600">
                    {errors.username?.message}
                  </span>
                </div>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Email
                  </label>
                  <input
                    {...register("email", {
                      required: {
                        value: true,
                        message: "UserName không được để trống",
                      },
                    })}
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nhập email"
                  />
                  <span className="text-red-600">
                    {errors.username?.message}
                  </span>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    {...register("password", {
                      required: "Password không được để trống",
                    })}
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <span className="text-red-600">
                    {errors.password?.message}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-cyan-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Register
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400 ">
                  <a
                    href="/sign-up"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>

        <DevTool control={control} />
      </section>
    </div>
  );
}
