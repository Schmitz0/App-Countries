import React from "react"
import Cards from "../Cards/Cards"
import SearchBar from "../SearchBar/SearchBar"
import Paginado from "../Paginado/Paginado"
import { useDispatch, useSelector } from "react-redux"
import { useState} from "react"
import Filter from "../Filter/Filter"
import style from './Home.module.css'
import NoExiste from "../Noexiste/Noexiste"


export default function Home () {

    const currentPage = useSelector((state)=>state.actualPage)

    const allCountries = useSelector((state)=>state.countries)
    const[countriesPerPage,setCountriesPerPage] =useState(9.99);
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = currentPage===1?allCountries.slice(0,9): currentPage===26?allCountries.slice(249,allCountries.length):
    allCountries.slice(indexOfFirstCountry,indexOfLastCountry); 
    const numPage = Math.ceil(allCountries.length/countriesPerPage)
    const [orden, setOrden] = useState("");

    const [active,setActive] = useState({
        [currentPage]:true
    })

    const handler = (data) => {
        setActive(data)
    }

    // useEffect(() => {
    //     if (allCountries.length === 0) {
    //         dispatch(getAllCountries());
    //     }
    // }, [dispatch]);

    return (
       <>
          <div className={style.maincointainer}>   
            <div>{<SearchBar/>?<SearchBar 
            />:<NoExiste/>}</div>
            <Filter
            active={active}
            numPage={numPage}
            handler={handler}
            setOrden={setOrden}
             />
            <Paginado
            countriesPerPage ={countriesPerPage}
            allCountries={allCountries.length}
            setActive={setActive}
            active={active}
            numPage={numPage}
            currentPage={currentPage}
            />
            <hr></hr>
            <div className={style.cards} > <Cards
            currentCountries={currentCountries}/> </div>
        </div>   
        </>
    )
}

