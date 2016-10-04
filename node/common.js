var http = require('http');
module.exports = {
    exemple: function(){
        var data ={
            transaction: {
                field1: "value1",
                field2: "value2",
            }};
        ror_post(data,"slapps.fr","/APP/ror/OBJECTS.json");
    },
    ror_post: function(data,host,path){
        var dataStr = JSON.stringify(data);
        var options = {
            host: host,
            port: 80,
            path: path,
            method: 'POST',
            headers: {
                'Content-Length': dataStr.length,
                'Content-Type': 'application/json'
            }
        };
        var str = '';

        var req = http.request(options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function(data) {
                str += data;
            });

            res.on('end', function() {
                //console.log(str);
            })

            res.on('error', function(error) {
                //console.log(error);
            })
        })
        req.on('error',function(e){
            console.log(e);
            console.log("SLerror");
        });
        req.end(dataStr);

    }
}
