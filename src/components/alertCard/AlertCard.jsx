import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core'
import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateProducts } from '../../redux/apiCalls';


const AlertCard = ({ product, isExpiry }) => {

  const [stock, setStock] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [expiryDate, setExpiryDate] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProducts(product._id, {inStock: product.inStock + parseInt(stock)}, dispatch);
    alert("Product Updated Successfully")
    window.location.reload();
  }

  useEffect(() => {
    axios.get(`https://burger-inventory.onrender.com/api/products/find/${product._id}`)
        .then(res => {
            setRemaining(res.data.inStock)
            setExpiryDate(moment(res.data.expiryDate).format("MMM DD YYYY"))
        })
  }, [product])
  
  return (
    <Card style={{ maxWidth: 300, marginBlock: '15px', textAlign: 'center', background: '#f5f5f5' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="120"
          image={product.img}
          alt="Ingredient"
        />
        <CardContent>
          <Typography component="div" style={{fontSize: '1.5rem'}} >
            {product.title}
          </Typography>
          <Typography variant="body2" style={{fontSize: '1.2rem', color: 'rgb(238, 41, 41)'}} >
            {!isExpiry ? `${remaining} remaining` : `Expires in ${expiryDate}`}
          </Typography>
        </CardContent>
      </CardActionArea>
      {!isExpiry && (
        <CardActions style={{display: 'flex', justifyContent: 'center', gap: '5px'}} >
            <form 
                onSubmit={handleSubmit}
                style={{display: 'flex', justifyContent: 'center', gap: '5px'}} 
            >
                <input type="number" name="inStock" required placeholder={0} style={{padding: '0.3rem'}} onChange={(e) => setStock(e.target.value)} />
                <Button type="submit" size="small" color="primary" variant='contained' >Add</Button>
            </form>
        </CardActions>
      )}
    </Card>
  )
}

export default AlertCard