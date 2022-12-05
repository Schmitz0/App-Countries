import React from "react";
import style from './Paginado.module.css'
import { useDispatch, useSelector } from "react-redux";
import { setActualPage } from "../../redux/actions";



export default function Paginado({countriesPerPage,allCountries,setActive,active}){
    const pageNumbers =[];
    
    const currentPage = useSelector((state)=>state.actualPage)

    const dispatch = useDispatch();


    const handlerClick = (event,n) => {
      event.preventDefault();
      dispatch(setActualPage(n))
      setActive({
        [event.target.name]:true,
      })

    }

    function handlePrev(event) {
      event.preventDefault();

      dispatch(setActualPage((currentPage - 1)));
      setActive({[currentPage-1]:true})
      }
    
    function handleNext(event) {
      event.preventDefault();
      dispatch(setActualPage((currentPage + 1)));
      setActive({[currentPage+1]:true})
  }

    for(let i=0; i<Math.ceil(allCountries/countriesPerPage);i++) {
        pageNumbers.push(i+1)
    }

    return (
        <ul className={style.pagination} >
          <a> <button onClick={handlePrev} disabled={currentPage === 1}>Previous</button></a> 
          
          {
            pageNumbers?.map(n => {
              return (
                <a key={n}> <button name={n} value={currentPage} onClick={(event)=>handlerClick(event,n)} className={active[n]?style.buttonactual : style.button}> {n} </button> </a>
              )
            })
          }
            <a><button onClick={handleNext} disabled={!allCountries || currentPage === Math.ceil(allCountries/countriesPerPage)}>Next</button> </a>
        </ul>
      )
    }