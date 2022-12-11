import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './alert.css'
import {Alert as AlertElement} from 'antd'
import moment from 'moment';
import AlertCard from '../../components/alertCard/AlertCard';

const Alert = () => {

    const products = useSelector(state => state.product.products);
    const [lowStockMessage, setLowStockMessage] = useState("");
    const [expirationMessage, setExpirationMessage] = useState("");

    useEffect(() => {
        products.forEach(product => {
            const daysBeforeExpiry = moment(product.expiryDate).diff(moment(Date.now()), 'days') + 1;
            if (product.inStock <= 100) {
                setLowStockMessage("We are running low on some ingredients. Restock immediately!")
            }
            if (daysBeforeExpiry <= 5) {
                setExpirationMessage("Some ingredients are about to expire and must be consumed before the expiry date.")
            }
        })
    }, [products])

  return (
    <div className='alert' >
        {
            lowStockMessage && (
                <div>
                    <AlertElement
                        message="Warning"
                        description={lowStockMessage}
                        type="warning"
                        showIcon
                    />
                    <div style={{width: '100%', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px'}} >
                    {products.filter(product => product.inStock <= 100).map(product => (
                        <AlertCard product={product} />
                    ))}
                    </div>
                </div>)
        }
        {
            expirationMessage && (
                <div>
                    <AlertElement
                        message="Warning"
                        description={expirationMessage}
                        type="warning"
                        showIcon
                        style={{marginTop: '25px'}}
                    />
                    <div style={{width: '100%', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px'}} >
                    {products.filter(product => moment(product.expiryDate).diff(moment(Date.now()), 'days') + 1 <= 5)
                            .map(product => (
                                <AlertCard product={product} isExpiry={true} />
                            ))}
                    </div>
                </div>)
        }
        {
            !lowStockMessage && !expirationMessage && <h1 style={{color: '#333'}} >No alerts for now...</h1>
        }
    </div>
  )
}

export default Alert