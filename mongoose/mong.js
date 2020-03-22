
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

var kittySchema = new mongoose.Schema({
    name: String
  });

  var Kitten = mongoose.model('Kitten', kittySchema);
