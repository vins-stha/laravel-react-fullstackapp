import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import '../assets/homeLists.css';
import { Property } from './../components/Property';


export default function Homelisting(props) {

    const { state } = useLocation()
    const [properties, setProperties] = useState([])

    useEffect(() => {
        const response = axios.get('https://bayut.p.rapidapi.com/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=9&rentFrequency=monthly', {
            headers: {
                'x-rapidapi-host': 'bayut.p.rapidapi.com',
                'x-rapidapi-key': '99fbc44994mshd8cdd0cd094be9bp13e297jsnc3dc21593e8e'
            }

        })
            .then((res) => {
                console.log(res.data.hits.length);
                // ((res.data.hits).length) ? setProperties(res.data):setProperties([]);
                setProperties(res.data.hits);
                // console.log('properties', properties)

            })
            .catch((error) => {
                console.log('Error ', error.response)
            })


    }, [])

   const home = properties.map((property) => {
       console.log('here props =', property)
       return(
<Property attrs={property} key={property.id}/>
       )
       

   })

    return (
        <div>
                <div className="homeLists-container">
           
                {home}
            </div>
            
        </div>
    )
}
