export const renderActiveIngredients = ({ active_ingredients }) => {
    if (!active_ingredients || active_ingredients.length === 0) {
        return null;
    }

    return active_ingredients.map(ingredient => ingredient.name).join(', ');
};


export const renderProductStatus = ({ finished }) => {
    return finished ? 'Product finished' : 'Product in development';
};


export const renderPackaging = ({ packaging }) => {
    if (!packaging || packaging.length === 0) {
        return null;
    }

    return packaging.map(pack => pack.description).join(', ');
};


export const renderRoutes = ({ route }) => {
    if (!route || route.length === 0) {
        return null;
    }

    return route.join(', ');
};


export const renderPharmClass = ({ pharm_class }) => {
    if (!pharm_class || pharm_class.length === 0) {
        return null;
    }

    // Remove duplicates and concatenate pharm_class descriptions with commas in between
    return Array.from(new Set(pharm_class)).join(', ');
};