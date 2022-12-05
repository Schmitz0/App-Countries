import React from "react";
import { Link } from "react-router-dom";
import style from './Card.module.css';

export default function Card({id,name,continent,flags}){
    return (
        <div>
            <Link to={`/home/countries/${id}`}>
            <img src={flags} alt='Aca va una imagen' className={style.bandera}/>
            <p>{name}</p>
            </Link>
            <p>Continent: {continent}</p>
        </div>
    )
}