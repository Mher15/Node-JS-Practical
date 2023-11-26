import React, { useState } from 'react';
import { Table } from './Table';
import { Button } from './Button';
import { Popap } from './Popap';
import styles from '../styles/admin_product.module.scss';

export const AdminProduct = ({ products, setProducts, onAddOrEdit }) => {
  const [addNewProduct, setAddNewProduct] = useState(false)

  const onAddNewProduct = () => {
    setAddNewProduct(true)
    onAddNewProductPopap(true)
  }

  const onCloasePopapAddNewProduct = () => {
    setAddNewProduct(false)
    onAddNewProductPopap(false)
    onAddOrEdit()
  }

  const onSortByName = () => {
    setProducts(products.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())))
  }

  const onSortByPrice = () => {
    setProducts(products.sort((a, b) => a.price - b.price))
  }

  const onAddNewProductPopap = (showPopap) => {
    return showPopap ? <Popap type='Add' productName='' productPrice='' onCloase={onCloasePopapAddNewProduct} /> : null
  }

  return (
    <div className={styles.admin_product}>
      AdminProduct
      <Table header={["ID", "Product Name", "Product Price"]} body={products} onAddOrEdit={onAddOrEdit} />
      <div className={styles.button_item}>
        <Button label="add new product" onclick={onAddNewProduct} />
        <Button label="Product Name" onclick={onSortByName} />
        <Button label="Product Price" onclick={onSortByPrice} />
      </div>
      {onAddNewProductPopap(addNewProduct)}
    </div>
  )
}
