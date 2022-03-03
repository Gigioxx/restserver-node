const Role = require('../models/role');
const { User, Categorie, Product } = require('../models');

const isValidRole = async(role = '') => {

    const roleExists = await Role.findOne({ role });
    if ( !roleExists ) {
        throw new Error(`Role ${ role } is not registered in the database`);
    }
}

const emailExists = async(email = '') => {

    const emailRegistered = await User.findOne({ email });
    if ( emailRegistered ) {
        throw new Error(`Email: ${ email } is already registered`);
    }
}

const userByIdExists = async( id ) => {

    const userExists = await User.findById( id );
    if ( !userExists ) {
        throw new Error(`Id: ${ id } does not exist`);
    }
}

const categorieByIdExists = async( id ) => {

    const categorieExists = await Categorie.findById( id );
    if ( !categorieExists ) {
        throw new Error(`Id: ${ id } does not exist`);
    }
}

const productByIdExists = async( id ) => {

    const productExists = await Product.findById( id );
    if ( !productExists ) {
        throw new Error(`Id: ${ id } does not exist`);
    }
}

module.exports = {
    isValidRole,
    emailExists,
    userByIdExists,
    categorieByIdExists,
    productByIdExists
}