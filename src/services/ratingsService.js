const Rating = require('../models/ratingsModel.js');


exports.productRating = async (ratingData) => {
    const parts = await Rating.getRatings(ratingData.code);

    return parts;
}
