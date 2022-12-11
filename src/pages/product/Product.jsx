import { Link, useHistory, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import { Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useState, useMemo, useEffect } from "react";
import { userRequest } from "../../requestMethods";
import { updateProducts } from "../../redux/apiCalls";
import moment from "moment";

export default function Product() {

  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [inputs, setInputs] = useState({});
  const [stock, setStock] = useState(0);
  const [stockAdded, setStockAdded] = useState(0)
  const dispatch = useDispatch();
  const history = useHistory()

  const product = useSelector(state => state.product.products.find(product => product._id === productId));

  const handleChange = (e) => {
    setInputs(prev => {
        return { ...prev, [e.target.name]: e.target.value }
      })
  };

  const handleStockChange = (e) => {
    const convertedStock = parseInt(e.target.value)
    setStock(convertedStock);
  }

  const handleClick = (e) => {
    e.preventDefault();
    updateProducts(productId, {...inputs, inStock: (product.inStock - stock) + stockAdded}, dispatch);
    alert("Product Updated Successfully")
    history.push('/products')
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Ingredient</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={product.img} alt="" className="productInfoImg" />
                  <span className="productName">{product.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                    <span className="productInfoKey" style={{fontSize: '17px'}} >Expiry Date:</span>
                    <span className="productInfoValue" >{moment(product.expiryDate).format("MMM DD YYYY")}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey" style={{fontSize: '20px', fontWeight: 'bold'}} >In Stock:</span>
                      <span className="productInfoValue stock" >{product.inStock}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label style={{color: '#0f0f0f', fontSize: '1.3rem'}} >Item Name</label>
                  <input name="title" type="text" placeholder={product.title} onChange={handleChange} />
                  <label style={{marginTop: '20px', color: '#0f0f0f', fontSize: '1.3rem'}} >Consumed Stock:</label>
                  <input type="text" name="inStock" placeholder={0} onChange={handleStockChange} />
                  <label style={{marginTop: '20px', color: '#0f0f0f', fontSize: '1.3rem'}} >Add to Stock:</label>
                  <input type="text" name="stockAdded" placeholder={0} onChange={(e) => setStockAdded(parseInt(e.target.value))} />
                  <button style={{marginTop: '12px', maxWidth: '250px', paddingBlock: '10px'}} onClick={handleClick} className="productButton">Update Inventory</button>
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img style={{ maxWidth: '400px' }} src={product.img} alt="" />
                      <label for="file">
                          <Publish/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} />
                  </div>
              </div>
          </form>
      </div>
    </div>
  );
}
