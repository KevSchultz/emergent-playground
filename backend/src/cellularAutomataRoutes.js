const databaseInterface = require('./psqlconnect');
const databaseClient = databaseInterface.connectToDatabase();

// ------ Cellular Automata Routes ------

app.post('/api/upload', express.raw({ type: 'application/octet-stream', limit: '10mb' }), (req, res) => {
    let buffer = req.body; // receive
    console.log("buffer");
    console.log(buffer);
    console.log('Received', buffer.length, 'bytes of data');

    databaseInterface.makeNewPost(databaseClient, 123, 'name', post);
});

app.post('/api/download', express.raw({ type: 'application/octet-stream', limit: '10mb' }), (req, res) => {
    let buffer = req.body;

    let pixelArray = new Uint8Array(buffer);

    console.log('Received', buffer.length, 'bytes of data');

});