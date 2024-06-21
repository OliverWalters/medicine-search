import { useState, useEffect } from 'react';

const API_URL = "https://api.fda.gov/drug/ndc.json";
const SEARCH_BY = "?search=product_id:";

export const useDrug = (id) => {
    const [drug, setDrug] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL + SEARCH_BY + `${id}`);
                const jsonData = await response.json();
                setDrug(jsonData.results[0])
            } catch (error) {
                setDrug(null);
            }
        };

        fetchData();

    }, [id]);

    return drug;
};
