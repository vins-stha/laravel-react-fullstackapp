import { React, useState } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export function MapContainer(props) {

    return (
        <div>
            <Map
                google={window.google}
                zoom={10}
                initialCenter={{
                    lat: 25.136547221572,
                    lng: 55.188833299363
                }}
                style={{ width: 500, height: 500, position: 'relative' }}

            >

            </Map>
        </div>
    )
}
export default GoogleApiWrapper({
    apiKey: "AIzaSyC-3xvUm-Gfn2JQcRrInRJWgQ4g6qA-96c"
})(MapContainer)

