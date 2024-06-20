import { useParams } from 'react-router-dom';
import { Box, Container, Typography } from "@mui/material";
import VaccinesIcon from '@mui/icons-material/Vaccines';
import { useEffect, useState } from 'react';
import { GoBack } from './GoBack';
import "./Drug.css";
import { renderActiveIngredients, renderPackaging, renderPharmClass, renderProductStatus, renderRoutes } from './dataRenders';

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

    const activeIngredients = renderActiveIngredients(data);
    const productStatus = renderProductStatus(data);
    const packaging = renderPackaging(data);
    const routes = renderRoutes(data);
    const pharmClass = renderPharmClass(data);



    return (
        <Container
            maxWidth="lg"
            sx={{ mt: 6, mb: 6 }}
        >


            {data && (
                <Box className="drug">
                    <GoBack />

                    <Typography
                        className="drug__title"
                        variant="h4"
                        component="h1"
                    ><VaccinesIcon className="drug__icon" />{drug.generic_name}</Typography>

                    <Box className="drug__info">
                        {drug.generic_name && <Typography className='drug__info__data'><span className='drug__info__label'>Name:</span> {drug.generic_name}</Typography>}
                        {drug.product_ndc && <Typography className='drug__info__data'><span className='drug__info__label'>Medicine Code:</span> {drug.product_ndc}</Typography>}
                        {drug.brand_name && <Typography className='drug__info__data'> <span className='drug__info__label'>Brand:</span> {drug.brand_name}</Typography>}
                        {drug.labeler_name && <Typography className='drug__info__data'><span className='drug__info__label'>Company:</span> {drug.labeler_name}</Typography>}
                        {activeIngredients && <Typography className='drug__info__data'><span className='drug__info__label'>Active Ingredients:</span> {activeIngredients}</Typography>}
                        {productStatus && <Typography className='drug__info__data'><span className='drug__info__label'>Product Status:</span> {productStatus}</Typography>}
                        {drug.dosage_form && <Typography className='drug__info__data'><span className='drug__info__label'>Dosage forms:</span> {drug.dosage_form}</Typography>}
                        {routes && <Typography className='drug__info__data'><span className='drug__info__label'>Routes for use:</span> {routes}</Typography>}
                        {drug.product_type && <Typography className='drug__info__data'><span className='drug__info__label'>Product type:</span> {drug.product_type}</Typography>}
                        {packaging && <Typography className='drug__info__data'><span className='drug__info__label'>Packaging:</span> {packaging}</Typography>}
                        {pharmClass && <Typography className='drug__info__data'><span className='drug__info__label'>Pharmacological class:</span> {pharmClass}</Typography>}
                    </Box>
                </Box>
            )}
            {!data && <Typography className='loading'>Loading...</Typography>}

        </ Container >
    );
}
