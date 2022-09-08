
const fs = require('fs');
const path = require('path');

module.exports.messageAdded = fs.readFileSync(path.join(__dirname, 'messageAdded.gql'), 'utf8');
module.exports.messageAddedByUser = fs.readFileSync(path.join(__dirname, 'messageAddedByUser.gql'), 'utf8');
module.exports.appointmentEvent = fs.readFileSync(path.join(__dirname, 'appointmentEvent.gql'), 'utf8');
module.exports.ticketEvent = fs.readFileSync(path.join(__dirname, 'ticketEvent.gql'), 'utf8');
module.exports.ticketEventAdmin = fs.readFileSync(path.join(__dirname, 'ticketEventAdmin.gql'), 'utf8');
