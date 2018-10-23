var express = require('express'),
  app = express(),
  port = 8000,
  bodyParser = require('body-parser');

var http = require('http').Server(app);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var namespace_obj = { }

app.route('/api/data-store/energy/').post(function(req,res){
    console.log(req.header('school-id'),req.header('pi-id'))
    res.json("OK!");
});
app.route('/api/share/').get(function(req, res){
    console.log("get SHARE")

    if (!(req.params.namespace in namespace_obj))
    {
        namespace_obj[req.params.namespace] = {}
    }

    res.json(namespace_obj)
});

http.listen(port)