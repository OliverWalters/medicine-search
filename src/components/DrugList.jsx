import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


export function DrugList({ drug }) {

    const navigate = useNavigate();

    return (
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
    );
}
