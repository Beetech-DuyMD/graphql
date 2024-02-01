import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useMutation } from "@apollo/client";
import { loginUser } from "../../graphql-client/mutation";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function LoginForm() {
  const form = useForm();
  const { register, control, handleSubmit, formState, reset } = form;
  const navigate = useNavigate();
  const [login, mutatitonData] = useMutation(loginUser);
  const handleFormSubmit = (data) => {
    // console.log(data);
    try {
      login({
        variables: {
          input: { email: data.email, password: data.password },
        },
        onError: (errors) => {
          toast.error("OnError");
          toast.error(errors.message);
        },
        onCompleted: (data) => {
          const { token } = data.loginUser;
          if (token) {
            localStorage.setItem("token", token);
          }
          toast.success("Đăng nhập thành công");
          navigate("/books");
        },
      });
    } catch (error) {
      toast.error("lỗi");
    }
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
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
                    Your email
                  </label>
                  <input
                    {...register("email")}
                    type="text"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nhập teent đăng nhập"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    {...register("password")}
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-cyan-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400 ">
                  Don’t have an account yet?{" "}
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
      </section>
      <DevTool control={control} />
    </div>
  );
}
