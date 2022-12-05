import React from "react";
import Card from "../Card/Card";
import { useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import { getAllCountries } from "../../redux/actions";
import Loading from "../Loading/Loading";
import style from './Cards.module.css'
import NoExiste from "../Noexiste/Noexiste";



export default function Cards ({currentCountries}) {
const dispatch = useDispatch()
const loading = useSelector(state=>state.loading)

useEffect(() =>{
    dispatch(getAllCountries())
},[dispatch])

    return (
        <>
            <div  className={style.Paises}>
            {loading?<Loading/>:currentCountries.length?
                  currentCountries?.map(country => {
                  return <Card 
                  key = {country.id}
                  id = {country.id}
                  flags = {country.flags}
                  name = {country.name} 
                  continent = {country.continent}
                  />
                }) 
            : <NoExiste/> } 
            </div>
        </>
    )

}