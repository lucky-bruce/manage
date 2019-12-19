import React, { useReducer, useEffect, useContext } from "react";
import { Params } from "../../../../proto/authorization/authorization_pb";
import { Query } from "../../../../proto/products/products_pb";
import { GetProfile } from "../../../../utils/utils";
import Context from "../../../context/context";
import PermissionSelect from "./PermissionSelect";
import { changePermission } from "../../../../utils/backend";
import SalaryMenu from "./SalaryMenu";

export default function StaffTable() {
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { users: [] }
  );

  const handleChange = (name, value) => {
    setUserInput({ [name]: value });
  };

  const context = useContext(Context);
  const client = context.auth;

  const user = GetProfile();

  useEffect(() => {
    GetUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function GetUsers() {
    let params = new Params();

    let query = new Query();

    query.setQuerystring(`{"companyname":"${user ? user.companyname : ""}"}`);

    params.setQuery(query);

    client.getUsers(params, {}, (err, res) => {
      if (err) {
        console.log(err);
      }

      if (res) {
        handleChange("users", res.toObject().usersList);
      }
    });
  }

  function formatName(f, m, l) {
    if (m !== "") {
      return f + " " + m + " " + l;
    }

    return f + " " + l;
  }

  const onChange = (id, name, value) => {
    let us = userInput.users;
    for (let u of us) {
      if (u.id === id) {
        if (u.permission) {
          u.permission[name] = value;
        } else {
          let p = {};
          p[name] = value;
          u.permission = p;
        }
      }
    }

    handleChange("users", us);
  };

  const handlePerChange = (id, permissions) => {
    changePermission(id, permissions, (err, res) => {
      if (err) {
        console.error(err);
      } else {
        localStorage.setItem("token", res.toObject().token);
      }
    });
  };

  return (
    <div className="table-responsive">
      <table className="table ">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Permissions</th>
            <th scope="col">Salary</th>
          </tr>
        </thead>
        <tbody>
          {userInput.users.map((user, i) => (
            <tr key={i}>
              <th scope="row">{i}</th>
              <td>{formatName(user.firstname, user.midname, user.lastname)}</td>
              <td>
                <PermissionSelect
                  handlePerChange={() =>
                    handlePerChange(user.id, user.permission)
                  }
                  onChange={(name, value) => onChange(user.id, name, value)}
                  id={user.id}
                  permissions={user.permission || {}}
                />
              </td>
              <td>
                <SalaryMenu
                  id={user.id}
                  name={`${user.firstname} ${user.lastname}`}
                  salaryid={user.salaryid}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
