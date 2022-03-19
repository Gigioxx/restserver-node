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
    socket.emit( 'receive-messages', chatInfo.last10 );

    // Connect to special room
    socket.join( user.id );

    // Clean when someone disconnects
    socket.on('disconnect', () => {
        chatInfo.disconnectUser( user.id );
        io.emit( 'active-users', chatInfo.usersArr );
    });

    socket.on('send-message', ({ uid, message }) => {

        if ( uid ) {
            // Private message
            socket.to( uid ).emit( 'private-message', { from: user.name, message })

        } else {
            chatInfo.sendMessage( user.id, user.name, message );
            io.emit( 'receive-messages', chatInfo.last10 );

        }

    });

}

module.exports = {
    socketController
};