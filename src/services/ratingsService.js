const Rating = require('../models/ratingsModel.js');


exports.productRating = async (ratingData) => {
    const parts = await Rating.getRatings(ratingData.code);
    return parts;
}

exports.userRating = async (ratingData) => {
    const rating = await Rating.usersRating(ratingData.code, ratingData.userId);
    return rating;
}

exports.createUsersRating = async (ratingData) => {
    const result = await Rating.createRating(ratingData.code, ratingData.userId, ratingData.value);
    return result ? true : false;
}

exports.removeUsersRating = async (ratingData) => {
    const result = await Rating.removeRating(ratingData.code, ratingData.userId);
    return result ? true : false;
}