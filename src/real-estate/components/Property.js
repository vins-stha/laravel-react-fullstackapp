import React from 'react'
import '../assets/homeLists.css';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import millify from 'millify';
import { useNavigate } from 'react-router';



export const Property = (props) => {
    const { coverPhoto, price, rentFrequency, rooms, title, baths, area, agency, isVerified, externalID } = props.attrs
    const navigate = useNavigate() 

    const handleClick =()=>{
        console.log('id', externalID)
        navigate('/real-estate/detail', {state:externalID})
    }

    return (
        <>
            <a href={`/property/detail/${externalID}`} className="listItem-card" onClick={(e)=>{e.preventDefault();
            handleClick()}}>
                <img src={coverPhoto.url} className="listItem-image" />

                <p className="img-title">{title.length > 45 ? title.substring(0,48)+"...": title}</p>
                <div className="flex home-props-icons">
                    {rooms}<FaBed className="icons-margin" /> {baths}<FaBath className="icons-margin" /> {millify(area)} sqft <BsGridFill className="icons-margin"/>
                </div>


                <p className="home-price">{price} AED {rentFrequency}</p>

            </a>
        </>
    )
}
