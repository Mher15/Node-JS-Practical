import React, { Fragment } from 'react'
import styles from '../styles/tabel.module.scss'

export const BuyersHistoryTable = ({ header, body }) => {

    return (
        <Fragment>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.tr}>
                        {
                            header ? header?.map((item, index) => {
                                return (<th key={index} className={styles.th}>{item}</th>)
                            }) : null
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        body ? body?.map((item, index) => {
                            return (
                                <tr key={index} className={styles.tr}>
                                    <td className={styles.td}>{index}</td>
                                    <td className={styles.td}>{item.username}</td>
                                    <td className={styles.td}>{item.products.name}</td>
                                    <td className={styles.td}>{item.products.price}</td>
                                    <td className={styles.td}>{new Date(item.products.createdAt).toLocaleDateString('en-GB')}</td>
                                </tr>
                            )
                        }) : null
                    }
                </tbody>
            </table >
        </Fragment>
    )
}
