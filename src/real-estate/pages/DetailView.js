import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../assets/detailed_view.css';
import { FaBed, FaBath, FaWhatsapp, FaTwitter, FaMobile, FaPhone, FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import millify from 'millify';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import GalleryImages from '../components/ScrollImages';
import { Testing } from '../components/Test';
import SimpleImageSlider from "react-simple-image-slider";
import Carousel from 'react-elastic-carousel'
import {Map,GoogleApiWrapper} from 'google-maps-react'
import {MapContainer} from '../components/MapContainer';



export default function DetailView() {
    const { state } = useLocation()
    const [property, setProperty] = useState('');
    const [pics, setPics] = useState([])
    const [amenities, setAmenities] = useState([])
    const [phones, setPhones] = useState([])
    const [lonLat, setLonLat] = useState([])


    var state2 = "5563494"

    console.log('retrieving for...', state2)

    const url = 'https://bayut.p.rapidapi.com/properties/detail'

    useEffect(() => {
        const results = axios.get(url, {
            headers: {
                'x-rapidapi-host': 'bayut.p.rapidapi.com',
                'x-rapidapi-key': '9cf678772emsh0652fb3b5a2f7f9p1fc34cjsnbbffea176c0a'

            },
            params: { externalID: state2 }
        })
            .then((res) => {
                console.log(res.data)
                insertResults(res.data)
            })
            .catch((error) => {
                console.log('Error=>', error, error.response)
            })
    }, [])

    const insertResults = (results) => {
        setProperty(results)
        setAmenities(results.amenities)
        setPhones(results.phoneNumber)
        results.geography !== null ? setLonLat(results.geography):setLonLat('')
        results.photos.length > 0 ? setPics(results.photos) : setPics([])

    }

    var imgList = []
    const imageList = pics.map((pic, id) => {
        imgList.push(pic.url)
        return imgList
    })
    return (
        <>
            {property !== null ? (
                <div className="detailView-container">
                    <div className="prop-title">{property.title}</div>
                    <div className="bannerContainer">

                        {pics.length > 0 &&
                            (
                                <>
                                    <div className="flex">

                                        <Carousel>
                                            {
                                                imageList.map((image, id) => <img className="scrollingImage" src={image[id]} />)
                                            }
                                        </Carousel>

                                    </div>

                                </>
                            )}
                    </div>
                    <div className="features-container">
                        <div className="prop-amenities flex">
                            {amenities.length > 0 && (
                                <>
                                    {amenities.map((amenity, id) => {

                                        return (
                                            <>
                                                <div key={id} className="features features-cat">{amenity.text}</div>
                                                {amenity.amenities.map((am, id) => {
                                                    return (<div className="features">{am.text}</div>)

                                                })}
                                            </>
                                        )

                                    })}
                                </>
                            )}

                            <div className="features">test</div>
                            <div className="features">test2</div>
                        </div>
                        <div className="prop-icons flex">
                            {property.rooms}<FaBed className="icons-margin" /> {property.baths}<FaBath className="icons-margin" />
                            {property.area !== null &&
                                (
                                    <>
                                        {/* millify(property.area) */}
                                        {property.area}
                                        <BsGridFill className="icons-margin" />
                                    </>

                                )
                            }

                        </div>

                    </div>

                    <div className="property-details ">

                        <div className="heading">Agency:  <span className="info">XXYYZZ sq</span> </div>
                        <div className="heading">Furnished : <span className="info"> {property.furnishingStatus}</span> </div>
                        <div className="heading">Price :  <span className="info"> {property.price}</span> </div>
                        <div className="heading">Reference Number  :  <span className="info"> {property.referenceNumber}</span> </div>
                        <div className="heading">Contact Person/s:  <span className="info"> </span> XXYYZZ</div>
                        <div className="heading">Contact Detail/s:  <span className="info"> </span>

                            <span className="info">
                                {
                                    property.agency !== null &&
                                    (
                                        <>

                                        </>
                                    )
                                }
                            </span>

                            <p className="info">
                                {phones !== null &&
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
                        {property.geography !== null &&(
                            <>
                            <h3>{lonLat.lat}</h3>
                          <MapContainer/>
   
                            </>
                        )}
                    
                    </div>

                </div>
            ) : (<h1>OOps! Something went wrong</h1>)}

        </>
    )
}


