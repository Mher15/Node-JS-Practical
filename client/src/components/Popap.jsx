import React, { useState } from 'react'
import styles from '../styles/popap.module.scss'
import { Close } from '../assets/icon/Close'
import { Input } from './Input'
import { Button } from './Button'
import { AddProduct, UpdateProduct } from '../service/ProductService'

export const Popap = ({ type, onCloase, productName, id, productPrice }) => {
    const [name, setName] = useState(productName)
    const [price, setPrice] = useState(productPrice)

    const onChangeName = (value) => {
        setName(value)
    }
    const onChangePrice = (value) => {
        setPrice(value)
    }

    const onClick = async () => {
        if (name && price) {
            if (type === 'Edit') {
                await UpdateProduct({
                    id,
                    name,
                    price
                })
            }
            else {
                await AddProduct({
                    name,
                    price
                })
            }
            onCloase()
        }
    }

    return (
        <div className={styles.popap}>
            <div className={styles.card}>
                <div onClick={onCloase} className={styles.card_header}>
                    <Close />
                </div>
                <div className={styles.card_body}>
                    <div className={styles.input_item}>
                        <Input type='text' onChange={onChangeName} value={name} placeholder='Product name' />
                    </div>
                    <div className={styles.input_item}>
                        <Input type='number' onChange={onChangePrice} value={price} placeholder='Price' />
                    </div>
                    <Button label={type === "Add" ? 'Add Product' : 'Edit Product'} onclick={onClick} />
                </div>
            </div>
        </div>
    )
}
