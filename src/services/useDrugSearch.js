import { useState } from "react";

const API_URL = "https://api.fda.gov/drug/ndc.json";
const SEARCH_BY = "?search=generic_name:";

export const useDrugSearch = () => {
    const [data, setData] = useState(null);
    const [drug, setDrug] = useState("");
    const [end, setEnd] = useState(10);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({
        error: false,
        message: ""
    });

    const fetchData = async (drug, end) => {
        try {
            const res = await fetch(API_URL + SEARCH_BY + `*${drug}*&limit=${end}`);
            const data = await res.json();
            if (data.error) throw { message: data.error.message };
            setData(data);
        } catch (error) {
            setError({
                error: true,
                message: error.message
            });
            setData(null);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setEnd(10);  // Reset end to 10 when submit is clicked

        try {
            setError({
                error: false,
                message: ""
            });
            if (!drug.trim()) throw { message: "Please enter a drug name" };

            await fetchData(drug, 10);

        } catch (error) {
            setError({
                error: true,
                message: error.message
            });

        } finally {
            setLoading(false);
        }
    };

    const loadMore = async () => {
        setLoading(true);
        const newEnd = end + 10;
        setEnd(newEnd);

        try {
            await fetchData(drug, newEnd);
        } catch (error) {
            setError({
                error: true,
                message: error.message
            });
        } finally {
            setLoading(false);
        }
    };

    return {
        data,
        drug,
        end,
        loading,
        error,
        end,
        setDrug,
        onSubmit,
        loadMore
    };
};
