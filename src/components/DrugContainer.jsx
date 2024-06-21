import { Container, Typography } from "@mui/material";
import VaccinesIcon from '@mui/icons-material/Vaccines';
import { DrugList } from "./DrugList";
import "../assets/DrugContainer.css";

export function DrugContainer() {
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

            
            <DrugList />
        </Container>

    );
}