import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import '../assets/detailed_view.css';
import { FaBed, FaBath, FaWhatsapp, FaMobile, FaPhone } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import Carousel from 'react-elastic-carousel'
import { MapContainer } from '../components/MapContainer';
import APICall from './../components/APICall';


export default function DetailView() {
    const { state } = useLocation()
    const [property, setProperty] = useState('');
    const [pics, setPics] = useState([])
    const [phones, setPhones] = useState([])
    const [lonLat, setLonLat] = useState([])


    const url = `${process.env.REACT_APP_REAL_ESTATE_BASE_URL}properties/detail`

    const data = {
        params: {
            externalID: state === undefined ? '4937770' : state
        }
    }
    const queries = {
        url: url,
        data: data
    }
    useEffect(() => {
        console.log(state)
        APICall(queries)
            .then((res) => {
                setProperty(res);
            })

            .catch((err) => { console.log(err) })
    }, [])

    useEffect(() => {
      
        property.geography !== undefined ? setLonLat(property.geography) : setLonLat('')
        property.photos !== undefined ? setPics(property.photos) : setPics([])
        property.phoneNumber !== undefined ? setPhones(property.phoneNumber) : setPhones([])

    }, [property])

    var imgList = []
    const imageList = pics.map((pic, id) => {
        
        imgList.push(pic.url)
        return imgList
    })
    return (

        <>
            {property !== undefined ? (
                <div className="detailView-container">
                    <div className="prop-title">{property.title}</div>

                    <div className="bannerContainer">

                        {pics !== undefined && pics.length > 0 &&
                            (
                                <>
                                    <div className="flex">

                                        <Carousel>
                                            {
                                                imageList.map((image, id) => <img className="scrollingImage" src={image[id]} 
                                                alt={image[id]}
                                                key ={image[id]}
                                                />)
                                            }
                                        </Carousel>

                                    </div>

                                </>
                            )}
                    </div>

                    <div className="features-container">
                        <div className="prop-amenities flex">
                            {property.amenities !== undefined && (property.amenities).length > 0 && (
                                <>

                                    {(property.amenities).map((amenity, id) => {

                                        return (
                                            <>
                                                <div key={id} className="features features-cat">{amenity.text}</div>
                                                {amenity.amenities.map((am, id) => {
                                                    return (<div className="features" key={id}>{am.text}</div>)

                                                })}
                                            </>
                                        )

                                    })}
                                </>
                            )}

                        </div>
                        <div className="prop-icons flex">
                            {property.rooms}<FaBed className="icons-margin" /> {property.baths}<FaBath className="icons-margin" />
                            {property.area !== undefined &&
                                (
                                    <>
                                        {(property.area).toFixed(3)} sqft

                                        <BsGridFill className="icons-margin" />
                                    </>

                                )
                            }

                        </div>

                    </div>

                    <div className="property-details ">
                     
                        <div className="heading">Furnished : <span className="info"> {property.furnishingStatus}</span> </div>
                        <div className="heading">Price :  <span className="info"> {property.price} AED</span> </div>
                        <div className="heading">Reference Number  :  <span className="info"> {property.referenceNumber}</span> </div>
                        <div className="heading">Contact Person/s:  <span className="info">{property.contactName} </span> </div>
                        <div className="heading">Contact Detail/s:  <span className="info"> </span>

                            <span className="info">
                                {
                                    property.agency !== undefined &&
                                    (
                                        <>
                                            {property.agency.name}
                                        </>
                                    )
                                }

                            </span>

                            <p className="info">
                                {phones !== undefined &&
                                    (
                                        <>
                                            {phones.mobile}
                                            <FaMobile className="icons-margin" />
                                            {phones.whatsapp}
                                            <FaWhatsapp className="icons-margin" />
                                            {phones.phone}
                                            <FaPhone className="icons-margin" />
                                        </>
                                    )
                                }

                            </p>

                        </div>
                        <div className="heading">Description:
                            <p className="info">{property.description}</p>

                        </div>
                    </div>

                    <div className="geoLocation">
                        {property.geography !== undefined && (
                            <>
                                <h3>{lonLat.lat}</h3>
                                <MapContainer />

                            </>
                        )}

                    </div>

                </div>
            ) : (<h1>OOps! Something went wrong</h1>)}

        </>
    )
}


