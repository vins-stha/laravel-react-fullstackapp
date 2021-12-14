import React, { useState } from 'react';
import '../assets/asset_home.css';
import { useNavigate } from 'react-router'

export const Home = () => {
    const [buttonType, setButtonType] = useState('');
    const navigate = useNavigate()

    const Banner_item = (props) => {
        const { url, title, subTitle, buttonText, imgURL, altText, type } = props

        function handleClickExplore(type) {
            navigate("/real-estate/list", {
                state:
                {
                    type: type === 'Sale' ? 'for-sale' : 'for-rent',

                }
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
