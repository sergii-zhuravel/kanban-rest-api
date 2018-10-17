// var tungus = require('tungus');
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TicketSchema   = new Schema({
    name: String,
    content: String
});

module.exports = mongoose.model('Ticket', TicketSchema);