import React from "react";
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from "react";
import { FilterActivity,filterCountriesByContinents,orderByName,orderByPopulation,getAllActivities } from "../../redux/actions";
import style from './Filter.module.css'
import { setActualPage } from "../../redux/actions";


export default function Filter({setOrden,handler}){

const dispatch = useDispatch();


const allActivities = useSelector((state)=>state.activities)
const mapAllActivities = allActivities.map(e=>e.name)
const uniqueActivities = mapAllActivities.filter((item,index)=>{
  return mapAllActivities.indexOf(item) === index;
})

  function handleSelect(e) {
    e.preventDefault();
    dispatch(FilterActivity(e.target.value));
    dispatch(setActualPage(1));
    handler({1:true})
    setOrden(e.target.value)
  }

  function handleFilterContinents(e) {
    e.preventDefault();
    dispatch(filterCountriesByContinents(e.target.value));
    dispatch(setActualPage(1));
    handler({1:true})
    setOrden(e.target.value)
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    dispatch(setActualPage(1));
    handler({1:true})
    setOrden(`Orden ${e.target.value}`);
  }

  function handleSortPopulation(e) {
    e.preventDefault();
    dispatch(orderByPopulation(e.target.value));
    dispatch(setActualPage(1));
    handler({1:true})
    setOrden(`Orden ${e.target.value}`);
  }

  useEffect (()=>{
    dispatch(getAllActivities())
  },[dispatch])

return(
<div className={style.filter}>
        <select onChange={(e) => handleSort(e)} className={style.input} defaultValue='UnAlph'>
          <option value="UnAlph" hidden>No alphabetical order</option>
          <option value="asc">Ascending order</option>
          <option value="des">Descending order</option>
        </select>

        <select onChange={(e) => handleSortPopulation(e)} className={style.input} defaultValue='Unpop'>
          <option value="Unpop" hidden>No population order</option>
          <option value="asc">Ascending order</option>
          <option value="des">Descending order</option>
        </select>

        <select onChange={handleFilterContinents} className={style.input}>
          <option value="AllContinents">All continents</option>
          <option value="Americas">Americas</option>
          <option value="Antarctic">Antarctica</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
          <option value="Africa">Africa</option>
        </select>

        <select onChange={handleSelect} className={style.input}>
          <option value="no filter">Pick Activity</option>
          {uniqueActivities.map((activity) => (
            <option value={activity} key={activity}>
              {activity}
            </option>
          ))}
        </select>
      </div>
)
}