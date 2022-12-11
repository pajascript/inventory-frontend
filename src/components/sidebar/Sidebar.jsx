import "./sidebar.css";
import {
  LineStyle,
  Storefront,
  WarningRounded,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import moment from "moment";
import axios from "axios";

const Sidebar = () => {

  const products = useSelector(state => state.product.products)
  const [redAlert, setRedAlert] = useState(false)

  useEffect(() => {
    products.forEach(product => {
      const daysBeforeExpiry = moment(product.expiryDate).diff(moment(Date.now()), 'days') + 1;

      if (product.inStock <= 100) {
        setRedAlert(true)
      } 
      else if (daysBeforeExpiry <= 5) {
        setRedAlert(true)
      }
      else {
        setRedAlert(false)
      }
    })
  }, [products])

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/home" className="link">
            <li className="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Inventory
              </li>
            </Link>
            <Link to="/alerts" className="link">
              <li className="sidebarListItem">
                <WarningRounded style={{color: redAlert ? 'red' : 'gray'}} className="sidebarIcon" />
                Alerts
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;