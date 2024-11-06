"use client"

import React from "react";

import styles from "./sizeGrid.module.scss"

const SizeGrid = ({ className, product }) => {
    return (
        <table className={`${styles.table} ${className}`} cellPadding="15">
            <tbody>
                <tr className={styles.tableTitle}>
                    <th></th>
                    { product.grid.sizes.map(item => ( <th>{ item }</th> )) }
                </tr>
                <tr>
                    <th>Довжина верх</th>
                    { product.grid.topLength.map(item => ( <td>{ item }</td> )) }
                </tr>
                <tr>
                    <th>Рукав</th>
                    { product.grid.arm.map(item => ( <td>{ item }</td> )) }
                </tr>
                <tr>
                    <th>Груди</th>
                    { product.grid.breast.map(item => ( <td>{ item }</td> )) }
                </tr>
                <tr>
                    <th>Плечі</th>
                    { product.grid.shoulder.map(item => ( <td>{ item }</td> )) }
                </tr>
                <tr>
                    <th>Довжина штанів</th>
                    { product.grid.shanksLength.map(item => ( <td>{ item }</td> )) }
                </tr>
                <tr>
                    <th>Стегна</th>
                    { product.grid.thigh.map(item => ( <td>{ item }</td> )) }
                </tr>
                <tr>
                    <th>Пояс не розтягнений</th>
                    { product.grid.stretchedBelt.map(item => ( <td>{ item }</td> )) }
                </tr>
                <tr>
                    <th>Пояс розтягнений</th>
                    { product.grid.notStretchedBelt.map(item => ( <td>{ item }</td> )) }
                </tr>
            </tbody>
        </table>
    );
};

export default SizeGrid;
