import { useState } from 'react';

export function useGetGeoLocation() {
  const [geolocation, setGeolocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function getGeolocation() {
    if (!navigator.geolocation)
      return setError('Your browser does not support geolocation.');

    setIsLoading(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeolocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setError(null);
          setIsLoading(false);
        },
        (error) => {
          setError(error.message);
          setIsLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }

  return { geolocation, error, getGeolocation, isLoading };
}
