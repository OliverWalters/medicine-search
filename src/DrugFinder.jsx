import { Box, TextField, Typography } from "@mui/material";
import { LoadingButton } from '@mui/lab';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://api.fda.gov/drug/ndc.json";
const SEARCH_BY = "?search=generic_name:";

export function DrugFinder() {
    const [data, setData] = useState(null);
    const [drug, setDrug] = useState("");
    const [end, setEnd] = useState(10);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({
        error: false,
        message: ""
    });

    const navigate = useNavigate();

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

    return (
        <Box className="x"
            display="flex"
            textAlign={"left"}
            alignItems="center"
            flexDirection="column"
            sx={{ mt: 5 }}
            component="form"
            autoComplete="off"
            onSubmit={onSubmit}
        >
            <TextField
                id="drug"
                label="Drug"
                variant="outlined"
                size="small"
                sx={{ width: 400 }}
                value={drug}
                onChange={(e) => { setDrug(e.target.value); }}
                error={error.error}
                helperText={error.message}
            />

            <LoadingButton
                type="submit"
                variant="contained"
                loading={loading}
                loadingIndicator="Loading..."
                sx={{ mt: 2, width: 400 }}
            >
                Search
            </LoadingButton>

            <Box
                sx={{ m: 3 }}
            >

                {data && data.results && data.results.map((drug) => (
                    <Box
                        key={drug.product_id}
                        id={drug.product_id}
                        onClick={() => navigate(`/drug/${drug.product_id}`)}
                        sx={{ width: 1000, border: 1, borderColor: "grey.500", borderRadius: 1, p: 2, m: 1 }}
                    >
                        <Typography>{drug.generic_name}</Typography>
                        <Typography>Brand: {drug.brand_name}</Typography>
                        <Typography>Company: {drug.labeler_name}</Typography>

                    </Box>
                ))}
            </Box>


            {data && data.meta.results.total > 10 && data.meta.results.total > end && (
                <LoadingButton
                    onClick={loadMore}
                    variant="contained"
                    loading={loading}
                    loadingIndicator="Loading..."
                    sx={{ width: 400 }}
                >
                    See more
                </LoadingButton>
            )}
        </Box>
    );
}