import { Container, Typography, TextField, Box } from "@mui/material";
import VaccinesIcon from '@mui/icons-material/Vaccines';
import { LoadingButton } from '@mui/lab';
import { useDrugSearch } from '../services/useDrugSearch';
import { DrugList } from "./DrugList";
import { useState } from "react";
import "../assets/DrugContainer.css";

export function DrugContainer() {
    const [draftDrug, setDraftDrug] = useState("");
    const [drug, setDrug] = useState("");
    const [end, setEnd] = useState(10);

    const {
        data,
        loading,
        error
    } = useDrugSearch(drug, end);

    const handleLoadMore = () => {
        setEnd(end + 10);
    };

    const handleSubmit = () => {
        setEnd(10);
        setDrug(draftDrug);
    };

    const handleChangeDrugSearch = (e) => {
        setDraftDrug(e.target.value);
    };

    return (
        <Container className="container"
            maxWidth="lg"
        >

            <Typography
                className="title"
                variant="h3"
                component="h1"
                align="center"
                fontWeight="bold"
                gutterBottom
            ><VaccinesIcon fontSize="20" sx={{ mr: 2 }} />Drugs Search</Typography>


            <Box className="drugList"
                autoComplete="off"
            >
                <TextField className="drugList__input"
                    id="drug"
                    label="Drug"
                    variant="outlined"
                    size="small"
                    value={draftDrug}
                    onChange={handleChangeDrugSearch}
                    error={error.error}
                    helperText={error.message}
                />

                <LoadingButton
                    className="drugList__btn"
                    type="submit"
                    variant="contained"
                    loading={loading}
                    loadingIndicator="Loading..."
                    onClick={handleSubmit}
                >
                    Search
                </LoadingButton>

                <Box className="drugList__results">
                    {data && data.results && data.results.map((drug) => (
                        <DrugList key={drug.product_id} drug={drug} />
                    ))}
                </Box>

                {data && data.meta.results.total > 10 && data.meta.results.total > end && (
                    <LoadingButton
                        onClick={handleLoadMore}
                        variant="contained"
                        loading={loading}
                        loadingIndicator="Loading..."
                        sx={{ width: 400 }}
                    >
                        See more
                    </LoadingButton>
                )}
            </Box>




        </Container>

    );
}