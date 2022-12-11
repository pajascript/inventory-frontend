import "./widgetLg.css";
import { useState, useEffect } from "react";
import { userRequest } from "../../requestMethods";
import { format } from "timeago.js";
import axios from "axios";

const WidgetLg = () => {

  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");
  const [trackingDetails, setTrackingDetails] = useState("");

  useEffect(() => {

      const getOrders = async() => {
        try {
          const res = await userRequest.get("orders");
          setOrders(res.data);
        } catch {

        }
      };

      getOrders();

  }, [status]);

  const handleClick = (id) => {
    if (trackingDetails !== "") {
      const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;
      axios.put(`https://burger-inventory.onrender.com/api/orders/${id}`, {status: "completed", trackingDetails}, {headers: { token: `BEARER ${TOKEN}` }})
        .then((res) => {
          console.log("Success");
          window.location.reload();
        }).catch(() => {
          console.log("Fail")
        })
    } else {
      alert("Please enter tracking details first")
    }
  };

  const handleChange = (e) => {
    setTrackingDetails(e.target.value);
    console.log(trackingDetails)
  };

  return (
    <div>
      <div className="widgetLg">
        <div className="header" >
          <h3 className="widgetLgTitle">Latest transactions</h3>
        </div>
        <table className="widgetLgTable">

          <tr className="widgetLgTr">
            <th className="widgetLgTh">Customer</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Tracking Details</th>
            <th className="widgetLgTh">Status</th>
          </tr>
          {orders.filter(item => {
            return item.status === "pending"
          }).map(order => {
            return (
            <tr className="widgetLgTr" key={order._id} >
                <td className="widgetLgUser">
                  <span className="widgetLgName">{order.userId}</span>
                </td>
                <td className="widgetLgDate">{format(order.createdAt)}</td>
                <td className="widgetLgAmount">₱{order.amount}</td>
                <td className="widgetLgAmount">
                  <input placeholder="Tracking Details" onChange={handleChange} />
                </td>
                <td className="widgetLgStatus">
                  {/* <select name="status" className="widgetLgButton" defaultValue={order.status} onChange={handleChange} >
                    <option value="pending" name="pending">Pending</option>
                    <option value="packed" name="packed">Packed</option>
                    <option value="outForDelivery" name="outForDelivery">Out For Delivery</option>
                    <option>Completed</option>
                  </select> */}
                  <div>  
                    <button className="widgetLgButton pending" disabled={true} >Pending</button>
                    <button className="widgetLgButton" onClick={() => handleClick(order._id)} >Completed</button>
                  </div>
                </td>
            </tr>
          )})}
          
        </table>
      </div>
      <div className="widgetLg">
        <div className="header" >
          <h3 className="widgetLgTitle">Completed Transactions</h3>
        </div>
        <table className="widgetLgTable">

          <tr className="widgetLgTr">
            <th className="widgetLgTh">Customer</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Tracking Details</th>
            <th className="widgetLgTh">Status</th>
          </tr>
          {orders.filter(item => {
            return item.status === "completed"
          }).map(order => {
            return (
            <tr className="widgetLgTr" key={order._id} >
                <td className="widgetLgUser">
                  <span className="widgetLgName">{order.userId}</span>
                </td>
                <td className="widgetLgDate">{format(order.createdAt)}</td>
                <td className="widgetLgAmount">₱{order.amount}</td>
                <td className="widgetLgAmount">
                  <span>{order.trackingDetails}</span>
                </td>
                <td className="widgetLgStatus">
                  {/* <select name="status" className="widgetLgButton" defaultValue={order.status} onChange={handleChange} >
                    <option value="pending" name="pending">Pending</option>
                    <option value="packed" name="packed">Packed</option>
                    <option value="outForDelivery" name="outForDelivery">Out For Delivery</option>
                    <option>Completed</option>
                  </select> */}
                  <div>  
                    <button className="widgetLgButton completed" disabled={true} >Completed</button>
                  </div>
                </td>
            </tr>
          )})}
          
        </table>
      </div>
    </div>
  );
}

export default WidgetLg;