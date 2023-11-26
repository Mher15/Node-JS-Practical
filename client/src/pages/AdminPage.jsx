import React, { useState, useCallback, useEffect } from 'react'
import { BuyersHistory } from '../components/BuyersHistory'
import { AdminProduct } from '../components/AdminProduct'
import { FindAllProducts } from '../service/ProductService'

export const AdminPage = () => {
  const [productPage, setProductPage] = useState(false);
  const [products, setProducts] = useState([]);
  const [onAddOrEdit, setOnAddOrEdit] = useState(false)
  const changePage = (page) => {
    return page ? <AdminProduct products={products} setProducts={onsetProducts} onAddOrEdit={onAddOrEditData} /> : <BuyersHistory />
  }

  const onAddOrEditData = () => {
    setOnAddOrEdit(!onAddOrEdit)
  }

  const onsetProducts = (newSort) => {
    setProducts([...newSort])
  }

  const onChangePage = () => {
    setProductPage(!productPage)
  }

  const findAllProducts = async () => {
    const { data } = await FindAllProducts()
    if (data?.data) {
      setProducts(data?.data)
    }
  }

  const title = useCallback((page) => (page ? "Product" : "Buyers History"), []);

  useEffect(() => {
    findAllProducts()
  }, [onAddOrEdit]);

  return (
    <div className='container'>
      {changePage(productPage)}
      <div onClick={onChangePage}>go to {title(!productPage)} page</div>
    </div>
  )
}
