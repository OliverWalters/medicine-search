import { useParams } from 'react-router-dom';
import { Box, Container, Typography } from "@mui/material";
import VaccinesIcon from '@mui/icons-material/Vaccines';
import { useEffect, useState } from 'react';
import { GoBack } from './GoBack';
import "./Drug.css";

export function Drug() {
    const { ndc } = useParams();
    const [data, setData] = useState(null);
    const [drug, setDrug] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.fda.gov/drug/ndc.json?search=product_id:${ndc}`);
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

    const renderActiveIngredients = () => {
        if (!data || !data.results || data.results.length === 0) {
            return null;
        }

        const { active_ingredients } = data.results[0];

        if (!active_ingredients || active_ingredients.length === 0) {
            return null;
        }

        // Concatenate ingredient names with commas in between
        const ingredientNames = active_ingredients.map(ingredient => ingredient.name).join(', ');

        return (
            <Typography><span className='dataInfo'>Active Ingredients:</span> {ingredientNames} </Typography>
        );
    };

    const renderProductStatus = () => {
        if (!data || !data.results || data.results.length === 0) {
            return null;
        }

        const { finished } = data.results[0];

        return (
            <Typography><span className='dataInfo'>Product Status:</span> {finished ? 'Product finished' : 'Product in development'}</Typography>
        );
    };

    const renderPackaging = () => {
        if (!data || !data.results || data.results.length === 0) {
            return null;
        }

        const { packaging } = data.results[0];

        if (!packaging || packaging.length === 0) {
            return null;
        }

        // Concatenate packaging descriptions with commas in between
        const packagingDescriptions = packaging.map(pack => pack.description).join(', ');

        return (
            <Typography><span className='dataInfo'>Packaging:</span> {packagingDescriptions}</Typography>
        );
    };

    const renderRoutes = () => {
        if (!data || !data.results || data.results.length === 0) {
            return null;
        }

        const { routes } = data.results[0];

        if (!routes || routes.length === 0) {
            return null;
        }

        // Concatenate routes with commas in between
        const routesDescriptions = routes.join(', ');

        return (
            <Typography><span className='dataInfo'>Routes to ingest:</span> {routesDescriptions}</Typography>
        );
    };

    const renderPharmClass = () => {
        if (!data || !data.results || data.results.length === 0) {
            return null;
        }

        const { pharm_class } = data.results[0];

        if (!pharm_class || pharm_class.length === 0) {
            return null;
        }

        // Remove duplicates and concatenate pharm_class descriptions with commas in between
        const uniquePharmClass = Array.from(new Set(pharm_class)).join(', ');

        return (
            <Typography><span className='dataInfo'>Pharmacological class:</span> {uniquePharmClass}</Typography>
        );
    };

    return (
        <Container
            maxWidth="lg"
            sx={{ m: 5 }}>

            <Box>
                {data && (
                    <>
                        <GoBack />
                        <Typography
                            variant="h4"
                            component="h1"
                            align="center"
                            gutterBottom
                            color={""}
                            fontWeight="bold"
                        ><VaccinesIcon fontSize="20" sx={{ mr: 2 }} />{drug.generic_name}</Typography>


                        <Box>
                            <Typography><span className='dataInfo'>Drug Code:</span> {drug.product_ndc}</Typography>
                            <Typography> <span className='dataInfo'>Brand:</span> {drug.brand_name}</Typography>
                            <Typography><span className='dataInfo'>Company:</span> {drug.labeler_name}</Typography>
                            {/* Add more details based on the structure of your API response */}
                            {renderActiveIngredients()}
                            {renderProductStatus()}
                            <Typography>
                                <span className='dataInfo'>Estado:</span> {drug.dosage_form}
                            </Typography>
                            <Typography>
                                <span className='dataInfo'>tipo de producto</span> {drug.product_type}
                            </Typography>
                            {renderPackaging()}
                            {renderRoutes()}
                            {renderPharmClass()}
                        </Box>
                    </>
                )}
                {!data && <Typography>Loading...</Typography>}
            </Box>
        </Container >
    );
}
