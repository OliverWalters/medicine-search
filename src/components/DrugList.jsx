import { Box, TextField, Typography } from "@mui/material";
import { LoadingButton } from '@mui/lab';
import { useNavigate } from "react-router-dom";
import { useDrugSearch } from '../services/useDrugSearch';

export function DrugList() {
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

    const navigate = useNavigate();

    return (
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
                    <Box
                        key={drug.product_id}
                        id={drug.product_id}
                        onClick={() => navigate(`/drug/${drug.product_id}`)}
                        sx={{ width: 1000, border: 1, borderColor: "grey.500", borderRadius: 1, p: 2, m: 1, cursor: "pointer" }}
                    >
                        <Typography fontWeight="bold">{drug.generic_name}</Typography>
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
