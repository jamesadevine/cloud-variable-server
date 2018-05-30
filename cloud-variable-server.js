var express = require('express'),
  app = express(),
  port = 8000,
  bodyParser = require('body-parser');

var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("../pxt-microbit/static"))

var namespace_obj = { }


app.route('/api/share/').get(function(req, res){
    console.log("get SHARE")

    if (!(req.params.namespace in namespace_obj))
    {
        namespace_obj[req.params.namespace] = {}
    }

    res.json(namespace_obj)
});

function track_changes(namespace, appId, variable_name, value)
{
    // create namespace if doesn't exist
    if (!(namespace in namespace_obj))
        namespace_obj[namespace] = {}

    // create object for appId if doesn't exist
    if (!(appId in namespace_obj[namespace]))
        namespace_obj[namespace][appId] = {}

    namespace_obj[namespace][appId][variable_name] = {
        "value":value,
        "timestamp": new Date().getTime()
    }
}

io.on('connection', function(socket){
    socket.on('variable_changed',function(msg){
        console.log(msg)
        track_changes(msg.namespace, msg.appId, msg.variable_name, msg.value)
        socket.broadcast.emit('variable_changed',msg);
    })
    console.log('a user connected');
});

var port = process.env.PORT || 8001

console.log("socket io listening on port: ", port)
http.listen(port)
console.log("pxt hosted on: ", 80)
app.listen(80);