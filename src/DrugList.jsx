import { Container, Typography } from "@mui/material";
import VaccinesIcon from '@mui/icons-material/Vaccines';
import { DrugFinder } from "./DrugFinder";
import "./DrugList.css";

export function DrugList() {
    return (
        <Container className="container"
            maxWidth="lg"
            sx={{ m: 5 }}>

            <Typography
                className="title"
                variant="h3"
                component="h1"
                align="center"
                fontWeight="bold"
                gutterBottom
            ><VaccinesIcon fontSize="20" sx={{ mr: 2 }} />Drugs Search</Typography>
            <DrugFinder />
        </Container>

    );
}