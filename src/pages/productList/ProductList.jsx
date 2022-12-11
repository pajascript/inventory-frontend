import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProducts, getProducts } from "../../redux/apiCalls";
import { Button, } from "@material-ui/core";
import RestockModal from "../../components/restockModal/RestockModal";
import moment from "moment/moment";

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.product.products);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    getProducts(dispatch)
  }, [dispatch]);

  const formatDate = (productArray) => {
    const newProductArray = [];
    productArray.forEach(product => {
      let newProductInfo = {...product}
      newProductInfo.expiryDate = moment(newProductInfo.expiryDate).format("MMM DD YYYY")
      newProductArray.push(newProductInfo)
    })
    return newProductArray;
  }

  const handleDelete = (id) => {
    deleteProducts(id, dispatch);
  };

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const columns = [
    {
      field: "product",
      headerName: "Item Name",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Quantity", width: 200 },
    { field: "expiryDate", headerName: "Expiry Date", width: 220 },
    {
      field: "price",
      headerName: "Price",
      width: 180,
    },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Update / Restock</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
    <div className="productList">
      <div className="btnWrapper" >
        <Link style={{textDecoration: 'none'}} to="/newproduct"><Button variant="contained" style={{marginBottom: '15px'}} className="addBtn" >Add new item</Button></Link>
        <Button variant="contained" onClick={handleOpen}>Restock</Button>
      </div>
      <DataGrid
        rows={formatDate(products)}
        disableSelectionOnClick
        columns={columns}
        getRowId={row => row._id}
        pageSize={8}
      />
    </div>
    <RestockModal open={open} handleClose={handleClose} />
  </>
  );
}
