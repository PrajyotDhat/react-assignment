import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const MapSearchLocation = ({ addressDetails }) => {
    const [address, setAddress] = useState(addressDetails);
    const [position, setPosition] = useState({ lat: null, lng: null });
    const [isMapLoaded, setIsMapLoaded] = useState(false);

    useEffect(() => {
            handleSubmit();
    }, [addressDetails])

    const handleLoad = () => {
        setTimeout(() => {
            setIsMapLoaded(true);
        }, 2000)
      };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyBLpdGBy1VDUl28Rn_AFgfnqzLj0ozj2MQ`);
            const data = await response.json();
            if (data.results.length > 0) {
                const { lat, lng } = data.results[0].geometry.location;
                setPosition({ lat, lng });
            } else {
                alert('Location not found. Please enter a valid address.');
            }
        } catch (error) {
            console.error('Error fetching geolocation:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
            </form>
            <div style={{ height: '400px', width: '100%' }}>
                    <GoogleMap
                        mapContainerStyle={{ height: '100%', width: '100%' }}
                        center={position}
                        zoom={10}
                    >
                        {position.lat && position.lng && <Marker position={position} />}
                    </GoogleMap>
            </div>
        </div>
    );
};

export default MapSearchLocation;