import { useState } from "react";
import "./newProduct.css";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import { addProducts } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { DatePicker } from 'antd';
import moment from "moment/moment";

export default function NewProduct() {

  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [success, setSuccess] = useState(false);
  const [stock, setStock] = useState(0);
  const [expiryDate, setExpiryDate] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleStockChange = (e) => {
    const convertedStock = parseInt(e.target.value)
    setStock(convertedStock);
  }

  const onDateChange = (date, dateString) => {
    setExpiryDate(moment(dateString).toDate());
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!inputs.title || !expiryDate || !inputs.price) {
      alert("Please fill in all fields!")
    } else {
      const fileName = new Date().getTime + file.name;
      const storage = getStorage(app)
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot).totalBytes* 100;
          console.log("Upload is " + progress + "% done");
  
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          //handle error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const product = {...inputs, img: downloadURL, inStock: stock, expiryDate };
            addProducts(product, dispatch).then(() => {
              setSuccess(true);
              alert("New Product Added!")
              history.push('/products')
            }).catch(err => alert(err))
          })
        }
      )
    }
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input style={{border: '1px solid gray', borderRadius: '5px'}} type="file" id="file" onChange={e => setFile(e.target.files[0])} required />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input style={{border: '1px solid gray', borderRadius: '5px'}} name="title" type="text" placeholder="Item Name" onChange={handleChange} required />
        </div>
        <div className="addProductItem">
          <label>Expiry Date</label>
          <DatePicker style={{padding: '10px'}} name="expiryDate" onChange={onDateChange} />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input style={{border: '1px solid gray', borderRadius: '5px'}} name="price" type="number" placeholder="Price" onChange={handleChange} required />
        </div>
        <div className="addProductItem">
          <label>Stock: </label>
          <input style={{border: '1px solid gray', borderRadius: '5px'}} type="text" name="inStock" placeholder={0} onChange={handleStockChange} required />
        </div>
        {success && <div>New Product Added</div>}
        <button onClick={handleClick} className="addProductButton">Create</button>
      </form>
    </div>
  );
}
