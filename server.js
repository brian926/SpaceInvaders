const static = require('node-static');

const port = process.env.PORT || 3000;
const file = new static.Server('./public');

require('http').createServer(function (req, res) {
	req.addListener('end', function() {
		file.serve(req, res, function(e, response){
			if(e && e.status === 404){
				file.serveFile('/error.html', 404, {}, req, res);
			}
		});
	}).resume();
}).listen(port, function(){
	console.log('Server is running on port ' +  port);
});