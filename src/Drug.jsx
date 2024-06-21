import { useParams } from 'react-router-dom';
import { Box, Container, Typography } from "@mui/material";
import VaccinesIcon from '@mui/icons-material/Vaccines';
import { useEffect, useState } from 'react';
import { NavigateToHome } from './NavigateToHome';
import { DrugInfoItem } from './DrugInfoItem';
import "./assets/Drug.css";
import { renderActiveIngredients, renderPackaging, renderPharmClass, renderProductStatus, renderRoutes } from './services/dataRenders';

const API_URL = "https://api.fda.gov/drug/ndc.json";
const SEARCH_BY = "?search=product_id:";

export function Drug() {
    const { ndc } = useParams();
    const [data, setData] = useState(null);
    const [drug, setDrug] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL + SEARCH_BY + `${ndc}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setData(jsonData);
                setDrug(jsonData.results[0])
            } catch (error) {
                console.error('Error fetching drug data:', error);
                setData(null); // Optionally handle error state
            }
        };

        fetchData();

    }, [ndc]);

    return (
        <Container
            maxWidth="lg"
            sx={{ mt: 6, mb: 6 }}
        >


            {data && (
                <Box className="drug">
                    <NavigateToHome />

                    <Typography
                        className="drug__title"
                        variant="h4"
                        component="h1"
                    ><VaccinesIcon className="drug__icon" />{drug.generic_name}</Typography>

                    <Box className="drug__info">
                        <DrugInfoItem label="Name:" value={drug.generic_name} />
                        <DrugInfoItem label=">Medicine Code:" value={drug.product_ndc} />
                        <DrugInfoItem label="Brand:" value={drug.brand_name} />
                        <DrugInfoItem label="Company:" value={drug.labeler_name} />
                        <DrugInfoItem label="Active Ingredients:" value={renderActiveIngredients(data)} />
                        <DrugInfoItem label="Product Status:" value={renderProductStatus(data)} />
                        <DrugInfoItem label="Dosage forms:" value={drug.dosage_form} />
                        <DrugInfoItem label="Routes for use:" value={renderRoutes(data)} />
                        <DrugInfoItem label="Product type:" value={drug.product_type} />
                        <DrugInfoItem label="Packaging:" value={renderPackaging(data)} />
                        <DrugInfoItem label="Pharmacological class:" value={renderPharmClass(data)} />
                    </Box>
                </Box>
            )}
            {!data && <Typography className='loading'>Loading...</Typography>}

        </ Container >
    );
}
