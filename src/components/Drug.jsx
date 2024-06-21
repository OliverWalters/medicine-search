import { useParams } from 'react-router-dom';
import { Box, Container, Typography } from "@mui/material";
import VaccinesIcon from '@mui/icons-material/Vaccines';
import { useDrug } from '../services/useDrug';
import { NavigateToHome } from './NavigateToHome';
import { DrugInfoItem } from './DrugInfoItem';
import "../assets/Drug.css";
import { renderActiveIngredients, renderPackaging, renderPharmClass, renderProductStatus, renderRoutes } from '../services/dataRenders';


export function Drug() {
    const { ndc } = useParams();
    const drug = useDrug(ndc);

    return (
        <Container
            maxWidth="lg"
            sx={{ mt: 6, mb: 6 }}
        >

            {drug && (
                <Box className="drug">
                    <NavigateToHome />

                    <Typography
                        className="drug__title"
                        variant="h4"
                        component="h1"
                    ><VaccinesIcon className="drug__icon" />{drug.generic_name}</Typography>

                    <Box className="drug__info">
                        <DrugInfoItem label="Name:" value={drug.generic_name} />
                        <DrugInfoItem label="Medicine Code:" value={drug.product_ndc} />
                        <DrugInfoItem label="Brand:" value={drug.brand_name} />
                        <DrugInfoItem label="Company:" value={drug.labeler_name} />
                        <DrugInfoItem label="Active Ingredients:" value={renderActiveIngredients(drug)} />
                        <DrugInfoItem label="Product Status:" value={renderProductStatus(drug)} />
                        <DrugInfoItem label="Dosage forms:" value={drug.dosage_form} />
                        <DrugInfoItem label="Routes for use:" value={renderRoutes(drug)} />
                        <DrugInfoItem label="Product type:" value={drug.product_type} />
                        <DrugInfoItem label="Packaging:" value={renderPackaging(drug)} />
                        <DrugInfoItem label="Pharmacological class:" value={renderPharmClass(drug)} />
                    </Box>
                </Box>
            )}
            {!drug && <Typography className='loading'>Loading...</Typography>}

        </ Container >
    );
}
