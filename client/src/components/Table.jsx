import React, { Fragment, useState } from 'react'
import styles from '../styles/tabel.module.scss'
import { Edit } from '../assets/icon/Edit'
import { Popap } from './Popap'
import { AuthData } from '../App'

export const Table = ({ header, body, onAddOrEdit }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState();
    const [id, setId] = useState();
    const [showPopap, setShowPopap] = useState(false);
    const { user } = AuthData();

    const onEditProductPopap = (showPopap) => {
        return showPopap ? <Popap type='Edit' productName={name} productPrice={price} id={id} onCloase={onCloase} /> : null;
    }

    const onCloase = () => {
        setShowPopap(false);
        onAddOrEdit()
    }

    const onShowPopap = (item) => {
        setName(item.name);
        setPrice(item.price);
        setId(item._id);
        setShowPopap(true);
    }

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
                                    <td className={styles.td}>{item.name}</td>
                                    <td className={styles.td}>{item.price}</td>
                                    {user.role !== "employee" ? (<td className={styles.edit} onClick={() => onShowPopap(item)}>
                                        <Edit />
                                    </td>) : null}
                                </tr>
                            )
                        }) : null
                    }
                </tbody>
            </table >
            {onEditProductPopap(showPopap)}
        </Fragment>
    )
}
