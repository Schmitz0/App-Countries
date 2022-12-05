import React from "react";
import {Link} from 'react-router-dom';
import style from './Landing.module.css'


export default function LandingPage() {
    return (
        <section className={style.maincointainer}>
            <div className={style.cointainerButton}>
                <Link to='/home' className={style.linkNone}>
                    <button className={style.button86}>INGRESAR</button>
                </Link>
          
            </div>
        </section>
    )
}
