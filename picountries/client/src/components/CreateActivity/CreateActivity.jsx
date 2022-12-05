import React from "react";
import {createActivity,getAllActivities,getAllCountries} from '../../redux/actions/index'
import {useDispatch,useSelector} from 'react-redux';
import { useEffect } from "react";
import style from './CreateActivity.module.css';

export default function CreateActivity(){

    function validate(input) {
        let errors = {};
        if ( /[^a-zA-Z, ]/g.test(input.name)
        ) {  
            errors.name = "Ingress an activity";
        } else if (!input.duration) {
            errors.duration = "Ingress a duration";
        } else if (!input.season) {
            errors.season = "Ingress a season";
        } else if (!input.dificulty) {
          errors.dificulty = "Ingress a difficulty";
        } 
        return errors;
      }


    const [errors, setErrors] = React.useState({});
    const [state,setState] = React.useState({
        name:'',
        dificulty:0,
        duration:'',
        season:'',
        countries:[],
        allCountries:[]
    })


    const allCountries = useSelector(state => state.countries);

    const dispatch = useDispatch();

    useEffect(() =>{dispatch(getAllCountries())},[dispatch])
    useEffect(() =>{dispatch(getAllActivities())},[dispatch])

    const handlerChange = (event) =>{
        setState({
            ...state,
            [event.target.name]:event.target.value
        });
        setErrors(
            validate({
              ...state,
              [event.target.name]: event.target.value,
            })
          );
    }

    const handlerSelectCountry = (event) => {
        setState({
            ...state,
            countries: [...new Set([...state.countries, event.target.value])]
        })
    }

    const handlerDelete = (event) =>{
        setState({
            ...state,
            countries:state.countries.filter(e=>e!==event.target.value)
        })
    }

    const handlerSubmit = (event) =>{
        event.preventDefault();
        dispatch(createActivity(state));
        setState({
            name:'',
            dificulty:0,
            duration:'',
            season:'',
            countries:[],
        });
        window.location.reload(false);
    }




    return (
        <div className={style.maincointainer}>
            <form onSubmit={handlerSubmit} className={style.form}>
                <div>
                    <label>Name: </label>
                <input type='text' name='name' placeholder='Activity name...' onChange={handlerChange} required value={state.name} className={style.input}></input>
                {errors.name && <p>{errors.name}</p>}
                </div>
                &nbsp;

                <div>
                <label>Duration: </label>
                <input type='number' name='duration' placeholder='Hrs...'  onChange={handlerChange} required min='1' max='24' value={state.duration} className={style.input}></input>
                {errors.duration && <p>{errors.duration}</p>}
                </div>
                &nbsp;

                <div>
                    <label>Season: </label>
                    <label> <input type="radio" required name="season" value="Summer" onChange={handlerChange}/>Summer</label>
                    <label> <input type="radio" required name="season" value="Winter" onChange={handlerChange}/>Winter</label>
                    <label> <input type="radio" required name="season" value="Spring" onChange={handlerChange}/>Spring</label>
                    <label> <input type="radio" required name="season" value="Autumn" onChange={handlerChange}/>Autumn</label>

                    {errors.season && <p>{errors.season}</p>}
                </div>
                &nbsp;

                <div>
                    <label>Difficulty: </label>
                    <label> <input type="radio" required name="dificulty" value="1" onChange={handlerChange}/>1</label>
                    <label> <input type="radio" required name="dificulty" value="2" onChange={handlerChange}/>2</label>
                    <label> <input type="radio" required name="dificulty" value="3" onChange={handlerChange}/>3</label>
                    <label> <input type="radio" required name="dificulty" value="4" onChange={handlerChange}/>4</label>
                    <label> <input type="radio" required name="dificulty" value="5" onChange={handlerChange}/>5</label>

                    {errors.dificulty && <p>{errors.dificulty}</p>}
                </div>
                &nbsp;

                <div>
                    <label>Countries: </label>
                    <select name="countries" onChange={handlerSelectCountry} multiple={false} className={style.input} defaultValue='default'>
                        <option hidden value='default'>Select countries...</option>
                        {allCountries.map((country,idx) => 
                            <option key={idx} value={country.name}>{country.name}</option>)}
                    </select>

                </div>
                &nbsp;

                <div>
                    {state.countries.map((country,idx)=>
                        <div key={idx} className={style.input}  >{country}
                        <button value={country} onClick={handlerDelete} className={style.input}>x</button>
                        </div>)}
                </div>
                &nbsp;
                <div>
                <button disabled={!state.countries.length}  type='submit' className={style.input}>Create Activity</button>
                </div>
                &nbsp;

            </form>
        </div>
    )
}