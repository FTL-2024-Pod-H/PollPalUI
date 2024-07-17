// useGoogleMaps.js
import { useState, useEffect } from 'react';
import { LoadScript } from '@react-google-maps/api';

const useGoogleMaps = (apiKey, libraries) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const loadScript = async () => {
            if (!window.google) {
                await new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=${libraries.join(',')}`;
                    script.async = true;
                    script.defer = true;
                    script.onload = () => resolve();
                    script.onerror = () => reject(new Error('Google Maps API failed to load'));
                    document.head.appendChild(script);
                });
            }
            setLoaded(true);
        };

        loadScript();
    }, [apiKey, libraries]);

    return loaded;
};

export default useGoogleMaps;
