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

const roleIn = ( ...roles ) => {
    return ( req, res = response, next ) => {

        if ( !req.user ) {
            return res.status(500).json({
                msg: 'You can not verify the role without validating token first'
            });
        }

        if ( !roles.includes( req.user.role ) ) {
            return res.status(401).json({
                msg: `To perform this action, the user must have one of the following roles: ${ roles }`
            });
        }

        next();
    }

}

module.exports = {
    isAdminRole,
    roleIn
}