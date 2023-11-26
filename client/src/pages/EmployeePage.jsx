import React, { useState, useEffect } from 'react';
import styles from '../styles/employe.module.scss';
import { BuyProducts, FindAllProducts } from '../service/ProductService';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { MyPurchases } from '../components/MyPurchases';

export const EmployeePage = () => {
  const [products, setProducts] = useState([]);
  const [shopingCard, setShopingcard] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [toggle, setToggle] = useState(false)
  const [sum, sumSet] = useState(0);

  const findAllProducts = async () => {
    const { data } = await FindAllProducts()
    if (data?.data) {
      setProducts(data?.data)
    }
  }
  const onBuy = async () => {
    await BuyProducts(shopingCard)
  }

  const onAddToShopingCard = (item) => {
    sumSet(Number(sum) + Number(item.price))
    setProducts(products.filter((product) => product._id !== item._id))
    setSearchedData(searchedData.filter((product) => product._id !== item._id))
    setShopingcard([...shopingCard, item]);
  }

  const onRemovdeFromShopingCard = (item) => {
    sumSet(Number(sum) - Number(item.price))
    setShopingcard(shopingCard.filter((product) => product._id !== item._id))
    setProducts([...products, item]);
    setSearchedData([...searchedData, item]);
  }

  const onPopapHide = () => {
    setToggle(false)
  }

  const onSearch = (value) => {
    setSearchValue(value)
    setSearchedData(products.filter(item => {
      return (
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.price.toString().includes(value)
      );
    }))
  }

  const onShowMyPurchases = () => {
    setToggle(true)
  }

  useEffect(() => {
    findAllProducts()
  }, []);

  return (
    <div className="container">
      <div className={styles.title}>Employee Page</div>
      <div>
        <Input type="text" onChange={onSearch} value={searchValue} placeholder="...Search" />
        <Button label='My purchases' onclick={onShowMyPurchases} />
      </div>

      <div className={styles.employee_container}>
        <div className={styles.card}>
          {
            searchValue ? searchedData?.map((item, index) => {
              return (
                <div key={index} onClick={() => onAddToShopingCard(item)} className={styles.item}>
                  <span>{item.name}</span>
                  <span>{item.price}$</span>
                </div>
              )
            }) :
              products?.map((item, index) => {
                return (
                  <div key={index} onClick={() => onAddToShopingCard(item)} className={styles.item}>
                    <span>{item.name}</span>
                    <span>{item.price}$</span>
                  </div>
                )
              })
          }
        </div>
        <div className={styles.shopingCard}>
          <div>
            {
              shopingCard ? shopingCard.map((item, index) => {
                return (
                  <div key={index} onClick={() => onRemovdeFromShopingCard(item)} className={styles.item}>
                    <span>{item.name}</span>
                    <span>{item.price}$</span>
                  </div>
                )
              }) : null
            }
          </div>
          <div className={styles.buy_button}>
            <div className={styles.total}>
              <span>Total</span>
              <span>{sum}$</span>
            </div>
            <Button label="Buy" onclick={onBuy} />
          </div>
        </div>
      </div>
      {toggle ? <MyPurchases onPopapHide={onPopapHide} /> : null}
    </div>
  )
}
