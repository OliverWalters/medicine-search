import { Container, Typography } from "@mui/material";
import VaccinesIcon from '@mui/icons-material/Vaccines';
import { DrugFinder } from "./DrugFinder";

export function DrugList() {
    return (
        <Container
            maxWidth="lg"
            sx={{ m: 5 }}>

            <Typography
                variant="h3"
                component="h1"
                align="center"
                fontWeight="bold"
                gutterBottom
            ><VaccinesIcon fontSize="20" sx={{ mr: 2 }} />Drugs</Typography>
            <DrugFinder />
        </Container>

    );
}