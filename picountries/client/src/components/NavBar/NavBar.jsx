import React from "react";
import { Link } from 'react-router-dom';
import style from './NavBar.module.css'


export default function NavBar(){
    return (
        <ul className={style.nav}>
            <li className={style.lielements}>
            <Link to='/home' className={style.elem}>Home</Link>
            </li>
            <li className={style.lielements}>
            <Link to='/home/newactivities'  className={style.elem}>Create Activity</Link>
            </li>
            <li className={style.lielements}>
            <Link to='/home/activities'  className={style.elem}>Activities</Link>
            </li>
        </ul>
    )
}