export const renderActiveIngredients = (data) => {
    if (!data || !data.results || data.results.length === 0) {
        return null;
    }

    const { active_ingredients } = data.results[0];

    if (!active_ingredients || active_ingredients.length === 0) {
        return null;
    }

    // Concatenate  with commas in between
    const ingredientNames = active_ingredients.map(ingredient => ingredient.name).join(', ');

    return ingredientNames;
};

export const renderProductStatus = (data) => {
    if (!data || !data.results || data.results.length === 0) {
        return null;
    }

    const { finished } = data.results[0];

    return finished ? 'Product finished' : 'Product in development';
};

export const renderPackaging = (data) => {
    if (!data || !data.results || data.results.length === 0) {
        return null;
    }

    const { packaging } = data.results[0];

    if (!packaging || packaging.length === 0) {
        return null;
    }

    const packagingDescriptions = packaging.map(pack => pack.description).join(', ');

    return packagingDescriptions;
};

export const renderRoutes = (data) => {
    if (!data || !data.results || data.results.length === 0) {
        return null;
    }

    const { route } = data.results[0];

    if (!route || route.length === 0) {
        return null;
    }

    const routesDescriptions = route.join(', ');

    return routesDescriptions;
};

export const renderPharmClass = (data) => {
    if (!data || !data.results || data.results.length === 0) {
        return null;
    }

    const { pharm_class } = data.results[0];

    if (!pharm_class || pharm_class.length === 0) {
        return null;
    }

    // Remove duplicates and concatenate pharm_class descriptions with commas in between
    const uniquePharmClass = Array.from(new Set(pharm_class)).join(', ');

    return uniquePharmClass;
};