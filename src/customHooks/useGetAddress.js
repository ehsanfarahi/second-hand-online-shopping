// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react';
import { useGetGeoLocation } from './useGetGeoLocation';

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

export function useGetAddress() {
  const { geolocation, getGeolocation } = useGetGeoLocation();
  const [address, setAddress] = useState(null);
  const [isAddressLoading, setIsAddressLoading] = useState(false);
  const [errorAddress, setErrorAddress] = useState('');

  useEffect(() => {
    getGeolocation();
  }, [])

  async function getAddress() {
    try {
      setIsAddressLoading(true);
      setErrorAddress('');

      const res = await fetch(
        `${BASE_URL}?latitude=${geolocation.lat}&longitude=${geolocation.lng}`
      );

      if (!res.ok)
        throw new Error('Geolocation not supported by this browser.');

      const data = await res.json();

      setAddress(data);
    } catch (err) {
      setErrorAddress(err.message);
    } finally {
      setIsAddressLoading(false);
    }
  }

  return { address, isAddressLoading, errorAddress, getAddress };
}
