import { useState } from "react";
import { Link } from "react-router-dom";
import useSignin from "../../hooks/useSignin";

function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loading, signin } = useSignin();

  const handelSubmit = async (e) => {
    e.preventDefault();
    await signin(username, password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Signin
          <span className="text-blue-500">ChatApp</span>
        </h1>

        <form onSubmit={handelSubmit}>
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Link
            to="/signup"
            className="text-sm text-gray-300 hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            {"Don't"} have an account ?
          </Link>

          <div>
            <button className="btn btn-block btn-sm mt-2" disabled={loading}>
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Signin"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;
