import { useParams } from 'react-router-dom';
import { Box, Container, Typography } from "@mui/material";
import VaccinesIcon from '@mui/icons-material/Vaccines';
import { useDrug } from '../services/useDrug';
import { NavigateToHome } from './NavigateToHome';
import { DrugInfoItem } from './DrugInfoItem';
import "../assets/Drug.css";
import { joinActiveIngredients, joinPackaging, joinPharmClass, joinProductStatus, joinRoutes } from '../services/dataJoiners';
import { SqueletonDrugInfoItem } from './SqueletonDrugInfoItem';


export function Drug() {
    const { id } = useParams();
    const drug = useDrug(id);

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
                        <DrugInfoItem label="Active Ingredients:" value={joinActiveIngredients(drug)} />
                        <DrugInfoItem label="Product Status:" value={joinProductStatus(drug)} />
                        <DrugInfoItem label="Dosage forms:" value={drug.dosage_form} />
                        <DrugInfoItem label="Routes for use:" value={joinRoutes(drug)} />
                        <DrugInfoItem label="Product type:" value={drug.product_type} />
                        <DrugInfoItem label="Packaging:" value={joinPackaging(drug)} />
                        <DrugInfoItem label="Pharmacological class:" value={joinPharmClass(drug)} />
                    </Box>
                </Box>
            )}
            {!drug && <Box className="drug">

                    <Typography
                        className="drug__title"
                        variant="h4"
                        component="h1"
                    ><VaccinesIcon className="drug__icon" />Drug name</Typography>

                    <Box className="drug__info">
                        <SqueletonDrugInfoItem label="Name:" />
                        <SqueletonDrugInfoItem label="Medicine Code:" />
                        <SqueletonDrugInfoItem label="Brand:" />
                        <SqueletonDrugInfoItem label="Company:" />
                        <SqueletonDrugInfoItem label="Active Ingredients:" />
                        <SqueletonDrugInfoItem label="Product Status:" />
                        <SqueletonDrugInfoItem label="Dosage forms:" />
                        <SqueletonDrugInfoItem label="Routes for use:" />
                        <SqueletonDrugInfoItem label="Product type:"/>
                        <SqueletonDrugInfoItem label="Packaging:" />
                        <SqueletonDrugInfoItem label="Pharmacological class:" />
                    </Box>
                </Box>}

        </ Container >
    );
}
