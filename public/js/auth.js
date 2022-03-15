const myForm = document.querySelector('form');

const url = ( window.location.hostname.includes('localhost') )
            ? 'http://localhost:8080/api/auth/'
            : 'https://nodejs-restsv.herokuapp.com/api/auth';

myForm.addEventListener('submit', ev => {
    ev.preventDefault();
    const formData = {};

    for ( let element of myForm.elements ) {
        if ( element.name.length > 0 )
            formData[element.name] = element.value
    }

    fetch( url + 'login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( formData ),

    })
    .then( resp => resp.json() )
    .then( ({ msg, token }) => {
        if( msg ) {
            return console.error( msg );
        }

        localStorage.setItem('token', token);
        window.location = 'chat.html';
    })
    .catch( err => {
        console.log( err )
    })

});


function handleCredentialResponse(response) {

    // Google token : ID_Token
    // console.log( 'id_token', response.credential );

    const body = { id_token: response.credential };

    fetch( url + 'google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( body )
    })
        .then( resp => resp.json() )
        .then( ({ user, token }) => {
            localStorage.setItem('token', token);
            localStorage.setItem( 'email', user.email );
            window.location = 'chat.html';
        })
        .catch( console.warn );
}

const button = document.getElementById('google_signout');
button.onclick = () => {
    
    google.accounts.id.disableAutoSelect();
    google.accounts.id.revoke( localStorage.getItem( 'email' ), done => {
        localStorage.clear();
        location.reload();
    });

}