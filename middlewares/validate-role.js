const { response } = require('express');

const isAdminRole = ( req, res = response, next ) => {

    if ( !req.user ) {
        return res.status(500).json({
            msg: 'You can not verify the role without validating token first'
        });
    }

    const { role, name } = req.user;

    if ( role !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `${ name } is not an admin - can not perform this action`
        });
    }

    next();

}

module.exports = {
    isAdminRole
}