import React from "react";
import {getAllActivities,getAllCountries, updateActivity} from '../../redux/actions/index'
import {useDispatch} from 'react-redux';
import { useEffect } from "react";
import style from './UpdateAct.module.css';
import { useParams } from "react-router-dom";

export default function CreateActivity(){

    const {id} = useParams();

    function validate(input) {
        let errors = {};
        if ( /[^a-zA-Z, ]/g.test(input.name)
        ) {  
            errors.name = "ingress a correct activity";
        } else if (!input.duration) {
            errors.duration = "ingress a correct duration";
        } else if (!input.season) {
            errors.season = "ingress a correct season";
        } else if (!input.dificulty) {
          errors.dificulty = "ingress a correct difficulty";
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

    const handlerSubmit = (event) =>{
        event.preventDefault();
        dispatch(updateActivity(state,id));
        setState({
            id:id,
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

                &nbsp;
                <div>
                <button type='submit' className={style.input}>Update Activity</button>
                </div>
                &nbsp;

            </form>
        </div>
    )
}