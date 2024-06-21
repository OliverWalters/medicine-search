import { useEffect, useState } from "react";

const API_URL = "https://api.fda.gov/drug/ndc.json";
const SEARCH_BY = "?search=generic_name:";

export const useDrugSearch = (drug, end) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({
        error: false,
        message: ""
    });

    useEffect(() => {
        const fetchDrugs = async () => {
            setLoading(true);
            try {
                setError({
                    error: false,
                    message: ""
                });
                const res = await fetch(API_URL + SEARCH_BY + `*${drug}*&limit=${end}`);
                const data = await res.json();
                if (data.error) throw { message: data.error.message };
                setData(data);
            } catch (error) {
                setError({
                    error: true,
                    message: "No results found. Please try again."
                });
                setData(null);
            } finally {
                setLoading(false);
            }
        };
        fetchDrugs();
    }, [end, drug]);

    return {
        data,
        loading,
        error
    };
};
