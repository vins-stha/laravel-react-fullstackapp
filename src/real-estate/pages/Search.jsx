import React, { useState } from 'react'
import { BsFilter, BsSearch } from 'react-icons/bs'
import '../assets/searchpage.css';
import { Property } from './../components/Property';
import APICall  from './../components/APICall';


export const Search = () => {
   
    const [loadFilters, setLoadFilters] = useState(false)
   
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState([])
    const [minArea, setMinArea] = useState([])
    const [maxArea, setMaxArea] = useState([])
    const [roomCount, setRoomCount] = useState([])
    const [minBathroom, setMinBathroom] = useState([])
    
    const [searchResults, setSearchResults] = useState([]);
    const [optionSelected, setOptionSelected] = useState([])

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const url = `${process.env.REACT_APP_REAL_ESTATE_BASE_URL}`+`properties/list`
        const data = 
         {params: {
            locationExternalIDs: '5002,6020',
            hitsPerPage: '15',
            page: '0',
            lang: 'en',
            purpose: optionSelected.Purpose === undefined ? 'for-rent' : optionSelected.Purpose,
            sort: optionSelected['Order-by'] === undefined ? 'city-level-score' : optionSelected['Order-by'],
            rentFrequency: optionSelected['Rent-frequency'] === undefined ? 'monthly' : optionSelected['Rent-frequency'],
            furnishingStatus: optionSelected['Furnishing-status'] === undefined ? 'monthly' : optionSelected['Furnishing-status'],
            propertyType: getPropertytype(optionSelected['Property-type']),
            categoryExternalID: '4',
            priceMin: minPrice === undefined ? 100 : minPrice,
            priceMax: maxPrice === undefined ? 101 : maxPrice,
            roomsMin: roomCount === undefined ? 1 : roomCount,
            bathsMin: minBathroom === undefined ? 1 : minBathroom,
        }}
        const queries = {
            url : url,
            data : data 
        }
       APICall(queries)        
        .then((res)=>{
            res.hits.length > 0 ? setSearchResults(res.hits) : setSearchResults()      
        })
        .catch((err)=>{console.log(err)})  
           
    }

    function handleSelectChange(e) {
        const { id, value } = e.target;
        setOptionSelected({
            ...optionSelected,
            [id]: value
        })
    }
    function getPropertytype(propertyType) {
        var type;
        switch (propertyType) {
            case 'Apartment': type = 4; break;
            case 'Office': type = 5;break;
            case 'Villas': type = 3;break;
            case 'Townhouses': type = 16;break;
            case 'Penthouses': type = 18;break;
            case 'Hotel Apartments': type = 21;break;
            case 'Villa-Compound': type = 19;break;
            case 'Residential Plot': type = 14;break;
            case 'Warehouse': type = 7; break;

            default:
                break
        }
        return type
    }
    function createSelect(name, options) {
        return (
            <div className="filter-item">
                <label className="label">{name} </label>
                <div className="dropdown-btn" id={name}>
                    <select className="btn btn-secondary" type="button" id={name} onChange={(e) => { handleSelectChange(e) }} >

                        {options.map((option, id) => {
                            return (
                                <option
                                    key={id}
                                    value={option}
                                    className="dropdown-item"
                                >{option}</option>
                            )
                        })}

                    </select>

                </div>
            </div>
        )

    }
    function loadFiltersnow() {
       
        return (
            <div className="filters-container flex">
                <div className="filter-item">
                    <label className="label">Min Price</label>
                    <input
                        className="filter-textbox"
                        type="number" name="min-price"
                        placeholder="Minimum price"
                        min="100"
                        value={minPrice}
                        onChange={(e) => { setMinPrice(e.target.value) }}
                    />
                </div>
                <div className="filter-item">

                    <label className="label">Max Price</label>
                    <input className="filter-textbox" type="number" name="max-price" placeholder="Maximum price" min="100"
                        value={maxPrice}
                        onChange={(e) => { setMaxPrice(e.target.value) }}
                    />
                </div>


                <div className="filter-item">

                    <label className="label" min="1" max="20">No. of Rooms</label>
                    <input className="filter-textbox" type="number" name="room-count" placeholder="Number of rooms"
                        value={roomCount}
                        onChange={(e) => { setRoomCount(e.target.value) }}
                    />
                </div>
                <div className="filter-item">

                    <label className="label">Area Min.</label>
                    <input className="filter-textbox" type="number" name="area-min" placeholder="Area Min." min="10"
                        value={minArea}
                        onChange={(e) => { setMinArea(e.target.value) }}
                    />
                </div>
                <div className="filter-item">

                    <label className="label">Area Max.</label>
                    <input className="filter-textbox" type="number" name="area-max" placeholder="Area Max." min="10"
                        value={maxArea}
                        onChange={(e) => { setMaxArea(e.target.value) }}
                    />
                </div>

                {
                    createSelect("Furnishing-status", ['', 'Unfurnished', 'Furnished'])
                }

                {
                    createSelect("Purpose", ['', 'for-rent', 'for-sale'])
                }
                {
                    optionSelected.Purpose === 'for-rent' ?
                        createSelect("Rent-frequency", ['','monthly', 'yearly', 'daily', 'weekly']) : null

                }
                {
                    createSelect("Property-type", ['','Apartment', 'Townhouses', 'Villas', 'Penhouses', 'Hotel-apartments', 'Villa-Compound', 'Residential-plot', 'Residential-building', 'Residential-floor', 'Office', 'Shop'])
                }
                {
                    createSelect("Order-by", ['','price-desc', 'price-asc', 'city-level-score', 'date-desc', 'date-asc', 'verifed-score'])
                }


                <div className="filter-item">

                    <label className="label" >Min Bathroom</label>
                    <input className="filter-textbox" type="number" name="min-baths" placeholder="Minimum Bathroom"
                        value={minBathroom}
                        onChange={(e) => { setMinBathroom(e.target.value) }}
                    />
                </div>
            </div>
        )
    } 

    const properties = 
    searchResults.map((property,id)=><Property attrs={property} key={property.id}/>)
    return (
        <div className="search-container"> 
            <div className="search-section" onClick={() => {
                setLoadFilters(!loadFilters);
            }} >

                <h5>Search Property here <BsSearch /></h5>
                <div as={BsFilter} />
            </div>
            {loadFilters &&
                (<form onSubmit={handleSearchSubmit}>
                    {loadFiltersnow()}
                    <button type="submit" className="btn btn-primary"> Search now </button>
                </form>
                )

            }           
            {searchResults.length > 0 && (<> <div className="search-results">
            {properties}
                </div></>)}
        </div>
    )
}
