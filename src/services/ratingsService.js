const Rating = require('../models/ratingsModel.js');


exports.productRating = async (ratingData) => {
    const parts = await Rating.getRatings(ratingData.code);
    return parts;
}

exports.userRating = async (ratingData) => {
    const rating = await Rating.usersRating(ratingData.code, ratingData.userID);
    return rating;
}
