const { response } = require('express');


const search = ( req, res = response ) => {

    const { colection, term } = req.params;

    res.json({
        colection,
        term
    });

}

module.exports = {
    search
}