// require your server and launch it here
const server = require('./api/server');

const PORT = 9000 | process.env

server.listen(PORT, () => {
    console.log(`###-server-running-on-port-${9000}-###`)
});