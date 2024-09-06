const Model = require('../model');

class Hero extends Model {
    constructor(attributes = {}) {
        super(attributes);
    }
}

Hero.table = 'heroes';

module.exports = Hero;
