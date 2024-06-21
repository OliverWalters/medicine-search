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
                const jsonData = await response.json();
                setData(jsonData);
                setDrug(jsonData.results[0])
            } catch (error) {
                setData(null);
            }
        };

        fetchData();

    }, [ndc]);

    return { data, drug };
};
