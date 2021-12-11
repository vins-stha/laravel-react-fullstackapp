import React, { useState } from 'react'
import { BsFilter, BsSearch } from 'react-icons/bs'
import '../assets/searchpage.css';
import { SearchFilters } from '../components/SearchFilters';
import Dropdown from './../components/Dropdown';
import axios from 'axios'
import { useNavigate } from 'react-router';
import { Property } from './../components/Property';


export const Search = () => {
    const navigate = useNavigate()
    const [loadFilters, setLoadFilters] = useState(false)
    const [openDropdown, setOpenDropdown] = useState(false)
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState([])
    const [minArea, setMinArea] = useState([])
    const [maxArea, setMaxArea] = useState([])
    const [roomCount, setRoomCount] = useState([])
    const [minBathroom, setMinBathroom] = useState([])
    const [region, setRegion] = useState([])
    const [searchResults, setSearchResults] = useState([])

    const options = ['Non-furnished', 'Furnished', 'Semi-furnished'];
    const [optionSelected, setOptionSelected] = useState([])

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const url = 'https://bayut.p.rapidapi.com/properties/list'

        const result = axios.get(url,
            {
                headers: {
                    'x-rapidapi-host': 'bayut.p.rapidapi.com',
                    'x-rapidapi-key': '9cf678772emsh0652fb3b5a2f7f9p1fc34cjsnbbffea176c0a'

                },
                params: {
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
                },
            }
        )
            .then((res) => {
                console.log('res', res.data)

                res.data.hits.length > 0 ? setSearchResults(res.data.hits) : setSearchResults()                              

            })
            .catch((err) => console.log('err', err.response))

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
            case 'Apartment': type = 4;
            case 'Office': type = 5;
            case 'Villas': type = 3;
            case 'Townhouses': type = 16;
            case 'Penthouses': type = 18;
            case 'Hotel Apartments': type = 21;
            case 'Villa-Compound': type = 19;
            case 'Residential Plot': type = 14;
            case 'Warehouse': type = 7;

            default:
                break
        }
        return type
    }
    function createSelect(name, options) {
        return (
            <div className="filter-item">
                <label className="label" for="min-price">{name} </label>
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
                    <label className="label" for="min-price">Min Price</label>
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

                    <label className="label" for="max-price">Max Price</label>
                    <input className="filter-textbox" type="number" name="max-price" placeholder="Maximum price" min="100"
                        value={maxPrice}
                        onChange={(e) => { setMaxPrice(e.target.value) }}
                    />
                </div>


                <div className="filter-item">

                    <label className="label" for="rooms" min="1" max="20">No. of Rooms</label>
                    <input className="filter-textbox" type="number" name="room-count" placeholder="Number of rooms"
                        value={roomCount}
                        onChange={(e) => { setRoomCount(e.target.value) }}
                    />
                </div>
                <div className="filter-item">

                    <label className="label" for="area-min" >Area Min.</label>
                    <input className="filter-textbox" type="number" name="area-min" placeholder="Area Min." min="10"
                        value={minArea}
                        onChange={(e) => { setMinArea(e.target.value) }}
                    />
                </div>
                <div className="filter-item">

                    <label className="label" for="area-max" >Area Max.</label>
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

                    <label className="label" for="min-baths">Min Bathroom</label>
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
