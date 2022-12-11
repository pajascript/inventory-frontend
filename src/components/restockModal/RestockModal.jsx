import { Box, Modal } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/apiCalls';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 600,
    minHeight: '50vh',
    background: 'white',
    boxShadow: '1px 1px 3px black',
    borderRadius: '5px',
    p: 4,
  };

const columns = [
    {
        field: 'product',
        headerName: 'Item Name',
        width: 150,
        editable: false,
    },
    { field: "inStock", headerName: "Stock", width: 200 },
]

const RestockModal = ({ open, handleClose }) => {

    const dispatch = useDispatch();
    const products = useSelector(state => state.product.products);

    useEffect(() => {
        getProducts(dispatch)
    }, [dispatch]);


  return (
    <div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box style={style} >
                {products.map(product => {
                    return (
                        // <DataGrid 
                        //     columns={columns}
                        //     // disableSelectionOnClick
                        //     // pageSize={8}
                        // />
                        <h1>Tanginamo</h1>
                    )
                })}
            </Box>
        </Modal>
    </div>
  )
}

export default RestockModal