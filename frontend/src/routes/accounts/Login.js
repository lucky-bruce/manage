import React, { useState, useContext } from "react";
import { A, navigate, useQueryParams } from "hookrouter";
import Context from "../../components/context/context";
import { LoginParams } from "../../proto/authorization/authorization_pb";

export default function Login() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("initialState");

  const context = useContext(Context);
  const client = context.auth;

  const params = useQueryParams();

  function Login() {
    let request = new LoginParams();
    request.setEmail(email);
    request.setPassword(password);

    client.login(request, {}, (err, res) => {
      if (err) {
        setError(err.message);
      }
      if (res) {
        var response = res.toObject();
        localStorage.setItem("token", response.token);
        navigate(params[0].to ? params[0].to : "/profile", true);
      }
    });
  }

  return (
    <div style={{ height: "100vh" }} className="d-flex align-items-center ">
      <div className="w-100">
        <div className="d-flex justify-content-center">
          <span className="text-center mb-4">
            <h1>Logo</h1>

            <span className="text-center">Login</span>
          </span>
        </div>
        <div className="form-signin ">
          <div className="text-center mb-4">
            <img
              className="mb-4"
              src="/docs/4.3/assets/brand/bootstrap-solid.svg"
              alt=""
              width={72}
              height={72}
            />
            <h1 className="h3 mb-3 font-weight-normal">General info</h1>
            {error ? <p className="error">{error}</p> : ""}
          </div>
          <div className="form-label-group">
            <input
              type="email"
              id="inputEmail"
              className="form-control"
              placeholder="Email address"
              required
              autoFocus
              onChange={e => setEmail(e.target.value)}
            />
            <label htmlFor="inputEmail">Email address</label>
          </div>
          <div className="form-label-group">
            <input
              type="password"
              id="inputPassword"
              className="form-control"
              placeholder="Password"
              required
              onChange={e => setPassword(e.target.value)}
            />
            <label htmlFor="inputPassword">Password</label>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="checkbox mb-3">
              <label>
                <input type="checkbox" defaultValue="remember-me" /> Remember me
              </label>
            </div>
            <button
              className="btn btn-lg btn-success pr-3 pl-3"
              type="submit"
              onClick={() => Login()}
            >
              Sign in
            </button>
          </div>

          <div className="text-center mt-4">
            <A href="/register">Create account</A>
            <p className="  text-muted text-center">© 2017-2019</p>
          </div>
        </div>
      </div>
    </div>
  );
}
