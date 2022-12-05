import React from "react";
import style from './Noexiste.module.css'

export default function NoExiste(){

    return (
        <div >
            <div className={style.maincointainer}>No existe el Pais selecionado</div>
            <div className={style.GoBack}>
                <button onClick={()=>window.location.reload(false)} className={style.input}>Go Back</button>
            </div>
        </div>
    )
}