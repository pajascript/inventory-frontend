import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/Login";
import Alert from "./pages/alert/Alert";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useState } from "react";
import { useEffect } from "react";

const App = () => {

  const [userLoggedIn, setUserLoggedIn] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLoggedIn(true)
      } else {
        setUserLoggedIn(false)
      }
    })
  }, [])

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {userLoggedIn ? <Redirect to='/home' /> : <Login />}
        </Route>
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
                <Route exact path="/home">
                  {userLoggedIn ? <Home /> : <Redirect to='/' />}
                </Route>
                <Route path="/products">
                  {userLoggedIn ? <ProductList /> : <Redirect to='/' />}
                </Route>
                <Route path="/product/:productId">
                  {userLoggedIn ? <Product /> : <Redirect to='/' />}
                </Route>
                <Route path="/newproduct">
                  {userLoggedIn ? <NewProduct /> : <Redirect to='/' />}
                </Route>
                <Route path="/alerts">
                  {userLoggedIn ? <Alert /> : <Redirect to='/' />}
                </Route>
              </div>
            </>
      </Switch>
    </Router>
  );
}

export default App;
