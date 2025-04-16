//schema for server side validation
// This schema is used to validate the listing data before saving it to the database
// It ensures that the title, description, image, price, location, and country fields are present and valid
const Joi = require('joi');
module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().allow("", null),
        price: Joi.number().required().min(0),
        location: Joi.string().required(),
        country: Joi.string().required(),
    }).required()
});

//schema for review validation
// This schema is used to validate the review data before saving it to the database
module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required()
    }).required()
});