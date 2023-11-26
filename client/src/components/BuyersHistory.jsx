import React, { useEffect, useState } from 'react'
import { BuyersHistoryTable } from './BuyersHistoryTable'
import { FindAllPurchases } from '../service/ProductService'

export const BuyersHistory = () => {
  const [allData, setAllData] = useState([]);

  const findAllPurchases = async () => {
    const { data } = await FindAllPurchases()
    setAllData(data?.data)
  }

  useEffect(() => {
    findAllPurchases()
  }, [])

  return (
    <div>
      BuyersHistory
      <BuyersHistoryTable header={['ID', 'UserName', "products", "Total Amounts", "Date"]} body={allData} />
    </div>
  )

}