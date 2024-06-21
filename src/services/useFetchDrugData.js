import { useState, useEffect } from 'react';

const API_URL = "https://api.fda.gov/drug/ndc.json";
const SEARCH_BY = "?search=product_id:";

export const useFetchDrugData = (ndc) => {
    const [data, setData] = useState(null);
    const [drug, setDrug] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL + SEARCH_BY + `${ndc}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setData(jsonData);
                setDrug(jsonData.results[0])
            } catch (error) {
                console.error('Error fetching drug data:', error);
                setData(null); // Optionally handle error state
            }
        };

        fetchData();

    }, [ndc]);

    return { data, drug };
};
