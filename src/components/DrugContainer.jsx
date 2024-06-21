import { Container, Typography, TextField, Box } from "@mui/material";
import VaccinesIcon from '@mui/icons-material/Vaccines';
import { LoadingButton } from '@mui/lab';
import { useDrugSearch } from '../services/useDrugSearch';
import { DrugList } from "./DrugList";
import "../assets/DrugContainer.css";

export function DrugContainer() {
    const {
        data,
        drug,
        loading,
        error,
        end,
        setDrug,
        onSubmit,
        loadMore
    } = useDrugSearch();

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
                component="form"
                autoComplete="off"
                onSubmit={onSubmit}
            >
                <TextField className="drugList__input"
                    id="drug"
                    label="Drug"
                    variant="outlined"
                    size="small"
                    value={drug}
                    onChange={(e) => { setDrug(e.target.value); }}
                    error={error.error}
                    helperText={error.message}
                />

                <LoadingButton
                    className="drugList__btn"
                    type="submit"
                    variant="contained"
                    loading={loading}
                    loadingIndicator="Loading..."
                >
                    Search
                </LoadingButton>

                <Box className="drugList__results">
                    {data && data.results && data.results.map((drug) => (
                        <DrugList drug={drug} />
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




        </Container>

    );
}