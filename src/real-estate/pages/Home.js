import React, { useState } from 'react';
import '../assets/asset_home.css';
import axios from 'axios'


export const Home = () => {
    const [buttonType, setButtonType] = useState('');
    const Banner_item = (props) => {
        const { url, title, subTitle, buttonText, imgURL, altText, type } = props

        function handleClickExplore(type) {

            const response = axios.get('https://bayut.p.rapidapi.com/auto-complete', {
                headers: {
                    'x-rapidapi-host': 'bayut.p.rapidapi.com',
                    'x-rapidapi-key': '68363cbedamsh298a37b557ef006p1bd021jsnfd989c7c286c'
                }

            })
                .then((res) => {
                    console.log(res.data)
                })
                .catch((error) => {
                    console.log('Error ', error.response)
                })
        }

        return (
            <div className="flex-banners">
                <h2>{title}</h2>
                <img className="flex-banner-image" src={imgURL} alt={altText} />
                <h4>{subTitle}</h4>
                <button className="btn btn-primary" onClick={() => { setButtonType(type); handleClickExplore(type) }} >{buttonText}</button>
            </div>
        )

    }
    return (
        <div>
            <h1>Real estate home page</h1>
            <div className="asset-home-container">
                <Banner_item
                    url=""
                    imgURL="http://ap.rdcpix.com/7747252695ec3df1727606a5ddda3cdel-m470522619x.jpg"
                    title="Properties for Sale"
                    subTitle="Get you Dream House Now"
                    buttonText="Checkout more"
                    altText="Properties For Sale"
                    type="Sale"
                />

                <Banner_item
                    url=""
                    imgURL="http://ap.rdcpix.com/7747252695ec3df1727606a5ddda3cdel-m470522619x.jpg"
                    title="Properties To Rent"
                    subTitle="Rent a spacious home within your budget"
                    buttonText="Checkout more"
                    altText="Properties To Rent"
                    type="Rent"
                />

            </div>
        </div>
    )
}
