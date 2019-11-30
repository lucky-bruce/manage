import React, { useReducer, useEffect, useState } from "react";
import { Params } from "../../../proto/financial/financial_pb";
import { toDestination, getExpenses } from "../../../utils/backend";
import { VictoryPie } from "victory";
import { Switch } from "../../ui";
import { GetIncome, GetProfit, getTotalExpense } from "../utils";

export default function SendTo(props) {
  const [data, setData] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [sourceToggle, setSourceToggle] = useState("income");

  const [expenses, setExpenses] = useState([]);

  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: "",
      amount: "",
      description: "",
      to: "",
      max: 0
    }
  );

  const handleChange = (name, value) => {
    setUserInput({ [name]: value });
  };

  const GetExpenses = () => {
    var p;
    getExpenses(p, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        setExpenses(res.toObject().expenseList);
      }
    });
  };

  function submit() {
    let params = new Params();

    params.setName(userInput.name);
    params.setAmount(userInput.amount);
    params.setTo(userInput.to);
    params.setDescription(userInput.description);

    toDestination(params, (err, res) => {
      if (err) {
        console.log(err);
      }

      if (res) {
        props.GetBanks();
        GetExpenses();
        available();
        handleChange("amount", 0);
        handleChange("name", "");
        handleChange("to", "");
      }
    });
  }

  useEffect(() => {
    available();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInput.name]);

  const available = () => {
    let max = 0;
    switch (sourceToggle.toLowerCase()) {
      case "income":
        max = GetIncome(props.incomes);
        break;
      case "profit":
        max = GetProfit(props.incomes);

        break;
      default:
    }
    handleChange("max", max - getTotalExpense(expenses));
  };

  const Incomes = () => {
    let result = {};

    let data = {};
    for (var income of props.incomes) {
      for (let sector of income.sectorsList) {
        if (data[sector.name]) {
          data[sector.name] += sector.amount;
        } else {
          data[sector.name] = sector.amount;
        }
      }
    }

    for (let key of Object.keys(data)) {
      result[key] = data[key];
    }

    setIncomes(result);
  };

  const Data = () => {
    let result = [];

    let data = {};
    for (var income of props.incomes) {
      for (let sector of income.sectorsList) {
        if (data[sector.name]) {
          data[sector.name] += sector.amount;
        } else {
          data[sector.name] = sector.amount;
        }
      }
    }

    for (let key of Object.keys(data)) {
      result.push({ x: key, y: data[key] });
    }

    setData(result);
  };

  useEffect(() => {
    Incomes();
    Data();
    GetExpenses();
    available();
  }, [props.incomes]);

  useEffect(() => {
    GetExpenses();
    available();
  }, [sourceToggle]);

  useEffect(() => {
    GetExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center ">
      <div>
        <VictoryPie
          animate={{
            duration: 2000
          }}
          colorScale={"qualitative"}
          padding={80}
          labels={({ datum }) => datum.x + " " + datum.y}
          data={data}
        />
      </div>
      <h6 className="mx-auto mb-3">Send income to destination</h6>
      <select
        className="custom-select income-input bg-success"
        onChange={e => handleChange("name", e.target.value)}
      >
        <option value="">Select a source from</option>
        {Object.keys(incomes).map((income, i) => (
          <option key={i}>{income}</option>
        ))}
      </select>
      <select
        className="custom-select bg-success income-input"
        onChange={e => handleChange("to", e.target.value)}
      >
        <option value="">Select a destination</option>
        {props.banks.map((bank, i) => (
          <option key={i}>{bank.name}</option>
        ))}
      </select>
      <div className="mt-3">
        <input
          value={userInput.description}
          className="form-control w-75 mx-auto"
          type="text"
          onChange={e => handleChange("description", e.target.value)}
          placeholder="Description"
        />
      </div>
      <Switch
        left={"Income"}
        onChange={v => setSourceToggle(v)}
        right={"Profit"}
        className={"w-75 mx-auto mt-4"}
        id="source_toggle"
      />
      <p
        className={`mb-0 mt-4 mx-auto w-75 $`}
        style={{
          color: userInput.amount > userInput.max ? "#d8000c" : ""
        }}
      >
        Available: {userInput.max}
      </p>
      <input
        className="form-control w-75  mx-auto"
        type="number"
        value={userInput.amount}
        min="0"
        onChange={e => handleChange("amount", e.target.value)}
        placeholder="R$"
      />
      <div className="w-75 mt-4 mx-auto">
        <button
          disabled={userInput.amount > userInput.max}
          onClick={() => submit()}
          className="btn btn-success float-right"
        >
          Send
        </button>
      </div>
    </div>
  );
}
