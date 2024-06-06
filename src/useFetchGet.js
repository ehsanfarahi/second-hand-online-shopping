import { useEffect, useState } from "react";

export function useFetchGet(url) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {

    const controller = new AbortController();

    async function getData() {
        try {
            setIsLoading(true);

            const response = await fetch(`${url}`, {signal: controller.signal});

            if(!response.ok) throw new Error("Failed to fetch data");

            const result = await response.json();

            const sortedData = result.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            setData(sortedData);
            setIsLoading(false);

        } catch(error) {
            if(error.name !== "AbortError") {
                setError(error);
            }
        }
    } 
    getData();

    return function() {
        controller.abort();
    }
   }, [url])

   return {data, error, isLoading};
}