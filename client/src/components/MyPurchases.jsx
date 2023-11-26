import React, { useEffect, useState } from 'react'
import styles from '../styles/my_purchases.module.scss'
import { Table } from './Table'
import { FindAllMyPurchases } from '../service/ProductService'
import { Close } from '../assets/icon/Close'

export const MyPurchases = ({ onPopapHide }) => {
    const [products, setProducts] = useState([])
    const findAllMyPurchases = async () => {
        const { data } = await FindAllMyPurchases()
        const allProducts = []
        data.data.forEach(element => {
            allProducts.push(...element.products)
        })
        setProducts([...allProducts])
    }
    useEffect(() => {
        findAllMyPurchases()

    }, []);



    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.close} onClick={onPopapHide}>
                    <Close />
                </div>
                <Table header={["ID", "Product Name", "Product Price"]} body={products} />
            </div>
        </div>
    )
}