const Parts = require('../models/partsModel.js');

exports.carParts = async (partData) => {
    let parts;
    if (partData.search === "car")
    {
        parts = await Parts.getParts(partData.subcat, partData.engine);
    }
    else if (partData.search === "code")
    {
        parts = await Parts.getPartsByCode(partData.code);

        if (!parts)
        {
            parts = await Parts.findPartByCompatibleCode(partData.code);
        }
    }
    else
    {
        throw new Error("Chybné parametre");
    }

    return parts;
}

exports.partBrands = async (partData) => {
    let brands;
    if (partData.search === "car")
    {
        brands = await Parts.findBrands(partData.subcat, partData.engine);
    }
    else if (partData.search === "code")
    {
        brands = await Parts.findBrandsByCode(partData.code);

        if (!brands)
        {
            brands = await Parts.findBrandsByCompatibleCode(partData.code);
        }
    }
    else
    {
        throw new Error("Chybné parametre");
    }

    return brands;
}

function buildFilters(partData)
{
    const filters = [];
    const params = [];
    let orderBy = '';

    if (partData.brand) 
    {
        filters.push('brand = ?');
        params.push(partData.brand);
    }
    if (partData.availability) 
    {
        filters.push('availability = ?');
        params.push(partData.availability);
    }
    if (partData.maxPrice) {
        filters.push('price <= ?');
        params.push(partData.maxPrice);
    }
    if (partData.price === "lowest") 
    {
        orderBy = ' ORDER BY price ASC';
    }
    else if (partData.price === "highest") 
    {
        orderBy = ' ORDER BY price DESC';
    }
    const conditions = filters.length > 0 ? 'AND ' + filters.join(' AND ') : '';
    
    const builtFilters = conditions + orderBy;
    const builtParams = params;

    return { builtFilters, builtParams };
}

exports.sortParts = async (partData) => {
    const filters = await buildFilters(partData);

    filters.builtParams.unshift(partData.partName, partData.engineName);

    const parts = await Parts.sortParts(filters.builtFilters, filters.builtParams);

    return parts;
}

exports.sortPartsByCode = async (partData) => {
    const filters = await buildFilters(partData);

    filters.builtParams.unshift(partData.code);

    let parts = await Parts.sortPartsByCode(filters.builtFilters, filters.builtParams);
    
    if (!parts)
    {
        parts = await Parts.sortPartsByCompatibleCode(filters.builtFilters, filters.builtParams);
    }

    return parts;
}

