const { Schema, model } = require('mongoose');

const { dataBaseTablesEnum: { CAR } } = require('../../constants');

const carsScheme = new Schema({
    model: { type: String },
    price: { type: Number }
});

module.exports = model(CAR, carsScheme);
