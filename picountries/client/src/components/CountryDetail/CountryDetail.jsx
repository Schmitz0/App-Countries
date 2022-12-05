import React from "react";
import * as actions from "../../redux/actions/index";
import { useSelector } from "react-redux"; // ≈ a mapStatetoProps
import { useDispatch } from "react-redux"; // ≈ a mapDispatchtoProps
import { useHistory } from "react-router-dom";
import style from './CountryDetail.module.css'
import Loading from "../Loading/Loading";

export default function CountryDetail(props) {

    const dispatch = useDispatch();
    const history = useHistory();
    const countryDetail = useSelector(state => state.countryDetail);
    const CountryId = props.match.params.id;
    const loading = useSelector(state => state.loading)

    React.useEffect(() => { dispatch(actions.getCountryDetail(CountryId)) },
        [dispatch, CountryId]
    );

    return (
        <div className={style.maincointainer}>
            {loading ? (<Loading />) : <div>

            <div className={style.GoBack}>
                <button onClick={() => history.goBack()} className={style.input}>Go Back</button>
            </div>
            <h1>{countryDetail.name}</h1>
            <img src={countryDetail.flags} alt="Aca va una imagen" className={style.bandera} />
            <h2>{countryDetail.continent}</h2>
            <h3>{countryDetail.id}</h3>
            <h4>Capital: {countryDetail.capital}</h4>
            <h4>Subregion: {countryDetail.subregion ? countryDetail.subregion : "None"}</h4>
            <h4>Area: {`${countryDetail.area} km²`}</h4>
            <h4>Population: {countryDetail.population}</h4>
            <h3>Activities:
                <hr />
                {countryDetail.activities?.map(activity =>
                    <div key={activity.name}>
                        <h4>Activity name: {activity.name}</h4>
                        <p>Difficulty: {`${activity.dificulty}/5`}</p>
                        <p>Duration: {`${activity.duration} hours`}</p>
                        <p>Season: {activity.season}</p>
                        <hr />
                    </div>
                )}
            </h3>
            </div>}
        </div>
    )
};

