/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

function Signup() {
  const [inputs, setInputs] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { loading, signup } = useSignup();

  const handelCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Signup
          <span className="text-blue-500">ChatApp</span>
        </h1>

        <form autoComplete="off" onSubmit={handelSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-300">
                fullname
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter fullname"
              className="w-full input input-bordered h-10"
              value={inputs.fullname}
              onChange={(e) =>
                setInputs({ ...inputs, fullname: e.target.value })
              }
              autoComplete="nope"
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-300">
                Username
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full input input-bordered h-10"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
              autoComplete="nope"
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-300">
                Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full input input-bordered h-10"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
              autoComplete="new-password"
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-300">
                confirm Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Enter confirm Password"
              className="w-full input input-bordered h-10"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
              autoComplete="new-password"
            />
          </div>

          <GenderCheckbox
            onCheckboxChange={handelCheckboxChange}
            selectedGender={inputs.gender}
          />

          <Link
            to="/signin"
            className="text-sm text-gray-300 hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            Already have an account ?
          </Link>

          <div>
            <button className="btn btn-block btn-sm mt-2" disabled={loading}>
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Signup"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
