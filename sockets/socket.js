
const {io} = require('../index');
const {validateJWT} = require('../helpers/jwt');
const {userConnected,userDisconnected, saveMessage} = require('../controllers/socket');

// Mensajes de Sockets
io.on('connection', client => {   
   
    console.log('Cliente conectado');
    
    const [valid, uid ] = validateJWT(client.handshake.headers['x-token']);
   
    // Verificar si tiene el JWT
    if ( !valid ) { return client.disconnect();}

    userConnected(uid);

    /* Para que los clientes se conecten a una sala personal, 
       en la que solo puedan participar dos personas (Como el ID es unico
       Si el cliente tuviera mas de un dispositivo, esto haria que funcione
       para todos los dispositivos) */

    client.join(uid);

    client.on('personal-message',async (payload) => {
        await saveMessage(payload);
        console.log(payload);
        io.to(payload.to).emit('personal-message',payload);
    });


    client.on('disconnect', () => { 
        userDisconnected(uid);

        

     });

     
});