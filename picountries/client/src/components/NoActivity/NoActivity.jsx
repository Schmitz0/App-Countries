import React from "react";
import style from './NoActivity.module.css'
import {useHistory} from 'react-router-dom'

export default function NoExiste(){

    const history = useHistory();

    function handleClick() {
        history.push("/home");
      }

    return (
        <div >
            <div className={style.maincointainer}>Theres are no Activities Created</div>
            <div className={style.GoBack}>
                <button type='button' onClick={handleClick} className={style.input}>Go Back</button>
            </div>
        </div>
    )
}