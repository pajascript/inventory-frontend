import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";

const FeaturedInfo = () => {

  const [income, setIncome] = useState([]);
  const [percent, setPercent] = useState(0);

  useEffect(() => {

    const getIncome = async() => {
      try {

        const res = await userRequest.get("orders/income");
        setIncome(res.data);
        setPercent((res.data[1].total * 100) / res.data[0].total - 100);

      } catch {

      }
    };
    getIncome();

  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">₱ {income[1]?.total}</span>
          <span className="featuredMoneyRate">
            %{Math.floor(percent)}{" "}
            {percent < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon"/>
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}

export default FeaturedInfo;