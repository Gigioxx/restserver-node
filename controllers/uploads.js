const { response } = require('express');

const loadFile = ( req, res = response ) => {

    res.json({
        msg: 'Hello world'
    });

}

module.exports = {
    loadFile
}