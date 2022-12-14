import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";

const Home = () => {

  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ], []
  );

  useEffect(() => {

    const getStats = async() => {
      try {
        const res = await userRequest.get("/users/stats");
        res.data.map(item => 
          setUserStats(prev => [
            ...prev,
            {name: MONTHS[item._id - 1], "Active User": item.total}
          ])
        )
      } catch {

      }
    };
    getStats();

  }, [MONTHS]);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="Active User"/>
      <div className="homeWidgets">
      </div>
    </div>
  );
}

export default Home;