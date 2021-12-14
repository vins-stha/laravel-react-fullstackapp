import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import '../assets/homeLists.css';
import { Property } from './../components/Property';
import APICall from './../components/APICall';

export default function Homelisting(props) {

    const { state } = useLocation()

    const [properties, setProperties] = useState([])

    const url = `${process.env.REACT_APP_REAL_ESTATE_BASE_URL}` + `properties/list`
    const data = {
        params:
        {
            purpose: state.type,
            locationExternalIDs: '5002,6020',
            hitsPerPage: '15',
            rentFrequency: state === 'for-rent' ? 'monthly' : ''

        }
    }

    const queries = {
        url: url,
        data: data
    }

    useEffect(() => {

        APICall(queries)
            .then((res) => {
                res.hits.length > 0 ? setProperties(res.hits) : setProperties()
            })
            .catch((err) => { console.log(err) })

    },[])

    const home = properties.map((property) => {
        return (
            <Property attrs={property} key={property.id} />
        )
    })

    return (
        <div>
            <h2>Properties {state.type}</h2>
            <div className="homeLists-container">
                
                {home}
            </div>

        </div>
    )
}
