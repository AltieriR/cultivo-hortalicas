const mongoose = require('mongoose');

const server = 'localhost:27017';
const database = 'hidroponica';
const options = { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true };

mongoose.connect(`mongodb://${server}/${database}`, options);

(function connectionStatus() {
    const connection = mongoose.connection.readyState;
    switch (connection) {
        case 0:
            console.log('Disconnected');
            break;
        case 1:
            console.log('Connected');
            break;
        case 2:
            console.log('Connecting');
            break;
        case 3:
            console.log('Disconnecting');
            break;
        default:
            console.log('Sorry, we could not check the connection status');
    }
})();

module.exports = mongoose;