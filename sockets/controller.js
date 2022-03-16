const { Socket } = require('socket.io');
const { checkJWT } = require('../helpers');
const { ChatInfo } = require('../models');

const chatInfo = new ChatInfo();

const socketController = async( socket = new Socket(), io ) => {

    const user = await checkJWT( socket.handshake.headers['x-token'] );

    if ( !user ) {
        return socket.disconnect();
    }

    // Add connected user
    chatInfo.connectUser( user );
    io.emit( 'active-users', chatInfo.usersArr );

    // Clean when someone disconnects
    socket.on('disconnect', () => {
        chatInfo.disconnectUser( user.id );
        io.emit( 'active-users', chatInfo.usersArr );
    });

}

module.exports = {
    socketController
};