const Reviews = require('../models/reviewModel.js');
const validator = require('../middlewares/validator.js');


exports.createReview = async (reviewData) => {
    const error = await validator.checkUsersReviewInput(reviewData.review);
    if (error !== null)
    {
        return { success: false, message: error };
    }
    reviewData.review = validator.validateUsersReviewInput(reviewData.review);

    const review = await Reviews.createReview(reviewData.review, reviewData.userId, reviewData.username, reviewData.productCode);
    if (!review)
    {
        return { success: false, message: "Recenziu sa nepodarilo odoslať" };
    }
    return { success: true };
};

exports.findReviews = async (reviewData) => {
    const reviews = await Reviews.findReviews(reviewData.productCode);
    return reviews;
}

exports.deleteReview = async (reviewData) => {
    const result = await Reviews.deleteReview(reviewData.reviewId);
    if (!result)
    {
        return { success: false, message: "Recenziu sa nepodarilo vymazať" };
    }

    return { success: true };
}

exports.editReview = async (reviewData) => {
    const error = await validator.checkUsersReviewInput(reviewData.review);
    if (error !== null)
    {
        return { success: false, message: error };
    }
    reviewData.review = validator.validateUsersReviewInput(reviewData.review);

    const review = await Reviews.editReview(reviewData.review, reviewData.id);
    if (!review)
    {
        return { success: false, message: "Recenziu sa nepodarilo odoslať" };
    }
    return { success: true };
}
