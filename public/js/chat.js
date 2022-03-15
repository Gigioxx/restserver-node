const url = ( window.location.hostname.includes('localhost') )
            ? 'http://localhost:8080/api/auth/'
            : 'https://nodejs-restsv.herokuapp.com/api/auth';

let user = null;
let socket = null;

// Validating localstorage token

const validateJWT = async() => {

    const token = localStorage.getItem('token') || '';

    if ( token.length <= 10 ) {
        window.location = 'index.html';
        throw new Error('There is no token on server');
    }

    const resp = await fetch( url, { 
        headers: { 'x-token': token }
    });

    const { user: userDB, token: tokenDB } = await resp.json();
    localStorage.setItem( 'token', tokenDB );

}

const main = async() => {

    // Validating JWT
    await validateJWT();

}

main();

// const socket = io();