const Parts = require('../models/partsModel.js');

exports.carParts = async (partData) => {
    let parts;
    if (partData.partName && partData.engineName)
    {
        parts = await Parts.getParts(partData.partName, partData.engineName);
    }
    else if (partData.code)
    {
        parts = await Parts.getPartsByCode(partData.code);
    }
    else
    {
        throw new Error("Chybné parametre");
    }

    return parts;
}

exports.partBrands = async (partData) => {
    let brands;
    if (partData.partName && partData.engineName)
    {
        brands = await Parts.findBrands(partData.partName, partData.engineName);
    }
    else if (partData.code)
    {
        brands = await Parts.findBrandsByCode(partData.code);
    }
    else
    {
        throw new Error("Chybné parametre");
    }

    return brands;
}

exports.sortParts = async (partData) => {
    const filters = [];
    const params = [];
    let orderBy= '';

    params.push(partData.partName);
    params.push(partData.engineName);

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
    if (partData.maxPrice)
    {
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

    let conditions = filters.length > 0 ? 'AND ' + filters.join(' AND ') : '';
    conditions += orderBy;

    const parts = await Parts.sortParts(conditions, params);

    return parts;
}

