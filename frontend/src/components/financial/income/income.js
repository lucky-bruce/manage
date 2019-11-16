import React, { useState, useContext, useEffect } from "react";
import { VictoryPie } from "victory";
import Context from "../../context/context";
import { Request } from "../../../proto/financial/financial_pb";
import Banks from "./banks";
import SendTo from "./send";
import { GetProfile } from "../../../utils/utils";
import { GetIncome } from "../../financial/utils";

export default function IncomePage(props) {
  const context = useContext(Context);
  const client = context.finances;

  const user = GetProfile();

  const [data, setData] = useState([]);
  const [banks, setBanks] = useState([]);

  function GetBanks() {
    let params = new Request();

    client.getBanks(params, {}, (err, res) => {
      if (err) {
        console.log(err);
      }

      if (res) {
        setBanks(res.toObject().banksList);
      }
    });
  }

  useEffect(() => {
    GetBanks();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
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
  }, [props.incomes]);

  if (user) {
    return (
      <div className="p-4">
        <h4>Income</h4>
        <div className="text-warning font-weight-bold">
          R$ {GetIncome(props.incomes).toFixed(2)}
        </div>
        <div className="row">
          <div className="col-md-6">
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
            <SendTo
              GetBanks={() => GetBanks()}
              banks={banks}
              incomes={props.incomes}
            />
          </div>
          <div className="col-md-6">
            <Banks GetBanks={() => GetBanks()} banks={banks} />
          </div>
        </div>
      </div>
    );
  }

  return <div></div>;
}
