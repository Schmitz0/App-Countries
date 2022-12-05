import React from "react";
import { getAllActivities } from "../../redux/actions";
import { useDispatch,useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import style from './Activities.module.css'
import { useEffect } from "react";
import NoActivity from '../NoActivity/NoActivity'
import { deleteActivity } from "../../redux/actions";
import { Link } from "react-router-dom";



export default function ShowActivities(){

    const dispatch = useDispatch()
    const loading = useSelector(state=>state.loading)
    const allActivities = useSelector(state=>state.activities)

    const handlerDelete = (event,data) =>{
        event.preventDefault(event);
        dispatch(deleteActivity(data))
        window.location.reload(false);
    }

  
    useEffect(() =>{
        dispatch(getAllActivities())
    },[dispatch])

    return(
        <div className={style.body}>

            <div  className={style.maincointainer}>
            {loading?<Loading/>:allActivities.length?
            allActivities.map((act,idx)=>
                <div key={idx} className={style.card}>
                    <p>Name: {act.name}</p>
                    <p>Dificulty: {act.dificulty}</p>
                    <p>Duration: {act.duration}</p>
                    <p>Season: {act.season}</p>
                    <p>Countries: {act.countries.map(countries=>countries.name + " ")}</p>
                    <button onClick={(event)=>handlerDelete(event,act.id)} className={style.input}>x</button>
                    <Link to={`/home/updateActivity/${act.id}`}>
                    <button className={style.input}>Update</button>
                    </Link>
                </div>
            )
            : <NoActivity/> }
            </div>
        </div>
    )

}

