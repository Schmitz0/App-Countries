import React, {useState} from 'react';
import {getCountryName} from './../../redux/actions/index';
import { useDispatch} from 'react-redux';
import style from './SearchBar.module.css'
import { setActualPage } from './../../redux/actions/index';

export default function SearchBar() {

    const [input, setInput] = useState('');

    const dispatch = useDispatch();

    const searchHandler = (event) => {
        setInput(event.target.value)
    };

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(getCountryName(input))
        dispatch(setActualPage(1));
    };

    const refreshPage = ()=>{
        window.location.reload();
     }

    return( 
        <div className={style.searchBar}>
                <input className={style.input}
                type='text' 
                placeholder='Search your country...'
                onChange={searchHandler}/>
                <button type="submit" onClick={submitHandler} className={style.input}>Search</button>
                <button type="submit" onClick={refreshPage} className={style.input}>Refresh</button>
        </div>
    )
};