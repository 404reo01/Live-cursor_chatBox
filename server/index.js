const http = require('http'); 
const { WebSocketServer } = require('ws'); // Importing the WebSocketServer from the 'ws' package
const url = require('url'); // Importing the url module to parse request URLs
const server = http.createServer();
const uuidv4 = require('uuid').v4; // Importing the v4 function from the uuid package to generate unique identifiers
const connections = {}; // Object to store connections by their UUIDs
const users = {}; // Object to store users by their usernames
const wsServer = new WebSocketServer({ server });  // Creating a new WebSocket server
const broadcast = () => {
    Object.keys(connections).forEach(uuid => {
        const connection = connections[uuid];
        const message = JSON.stringify(users);
        connection.send(message);
    }); 
}; // <-- Add this closing curly brace

const handleMessage = (bytes, uuid) => {
    const message = JSON.parse(bytes.toString()); // Parsing the incoming message from bytes to a JSON object
    const user = users[uuid]
    user.state = message
    broadcast(); 
    console.log(message);


    
}

const handleClose = (uuid) => {
    console.log(`Connection closed for UUID: ${uuid}`); // Logging the closure of the connection with its UUID
    delete  connections[uuid];
    delete  users[uuid];
    broadcast(); 


}

wsServer.on('connection',( connection, request) => {
    // ws://localhost:3000?username=reo
    const { username } = url.parse(request.url, true).query; // Extracting the username from the query parameters
    const uuid = uuidv4(); // Generating a unique identifier for the connection
    //connection.uuid = uuid;  Assigning the unique identifier to the connection object
    console.log(`New connection from ${username}`); // Logging the new connection with the username
    console.log(`Connection UUID: ${uuid}`); // Logging the unique identifier of the connection
    // broadcast 
    connections[uuid] = connection; // Storing the connection in the connections object using the UUID as the key
    //json stringify the object
    users[uuid] = {
        username,
        state: { } 
    }
    connection.on("message", message => handleMessage(message, uuid));
    connection.on("close", (() => handleClose(uuid)));



})


server.listen(3000, () => {  // Listening on port 3000
  console.log('Server is listening on port 3000');
});
