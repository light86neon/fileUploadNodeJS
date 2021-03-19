const { Schema, model } = require('mongoose');

// const carSubScheme = {
//   model: { type: String },
//   price: { type: Number }
// };

const { dataBaseTablesEnum: { USER } } = require('../../constants');

const userScheme = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    cars: [{ type: Schema.Types.ObjectId }],
    avatar: { type: String },
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

// eslint-disable-next-line func-names
userScheme.virtual('full_name').get(function() {
    const lastName = 'Fujitsu';
    return `${this.name} ${lastName}`;
});

userScheme.virtual('userProducts', {
    ref: 'Car',
    localField: 'cars',
    foreignField: '_id'
});

userScheme
    // eslint-disable-next-line func-names
    .pre('findOne', function() {
        // eslint-disable-next-line no-console
        console.log('PRE FIND HOOK');
        this.populate('userCars');
    });

module.exports = model(USER, userScheme);
