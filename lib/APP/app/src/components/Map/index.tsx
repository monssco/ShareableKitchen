import React from 'react'
import GoogleMapReact from 'google-map-react';
import config from '../../config'

interface MapProps {
    center: {
        lat: number,
        lng: number
    },
    zoom: number
}

const Map: React.FC<MapProps> = ({center, zoom}: MapProps) => {
    return (
        <div>
            <div className="py-4">
                <p className="text-2xl">Location</p>
                <p>Calgary, Alberta, Canada</p>
            </div>
            <div style={{ height: '30vh', width: '100%' }}>
                <GoogleMapReact
                bootstrapURLKeys={{ key: config.gMapsKey }}
                defaultCenter={center}
                defaultZoom={zoom}
                >

                </GoogleMapReact>
            </div>
        </div>
    )
}

export default Map
