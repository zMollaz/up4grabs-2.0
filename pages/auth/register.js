import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

const Register = (props) => {
  const router = useRouter();

  const defaultState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [state, setState] = useState(defaultState);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    const newState = { ...state, [name]: value };
    setState(newState);
  };
 

  const submitHandler = async (e) => {
    e.preventDefault();
    if (state.password !== state.confirmPassword) {
      alert("Password confirmation is not matching password");
    } else {
      // console.log(111, state);
      axios.post("/api/users", { state });
      router.push("/");

    }
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <form method="post" onSubmit={submitHandler}>
            <input
              vale={state.name}
              onChange={changeHandler}
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="name"
              placeholder="Name"
            />

            <input
              vale={state.email}
              onChange={changeHandler}
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
            />

            <input
              vale={state.password}
              onChange={changeHandler}
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
            />
            <input
              vale={state.confirmPassword}
              onChange={changeHandler}
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="confirmPassword"
              placeholder="Confirm Password"
            />
            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
            >
              Create Account
            </button>
          </form>

          <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Terms of Service
            </a>{" "}
            and
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
