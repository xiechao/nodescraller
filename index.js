var childProcess = require('child_process');
var path = require('path');
var exePath = path.resolve(__dirname, './node_modules/phantomjs/bin/phantomjs');

console.log("pid:",process.pid)
process.on('message',function(message){
	console.log("msg:",message)
	if(message=='close'){
		console.log('close')
		process.exit()
	}else{
		var todo='phantomjs ./scrapy.js '+message;
		var child = childProcess.exec(todo)
        child.stdout.on('data',function(data){console.log("stdout:",data);setTimeout(()=>process.exit(),100)})
	}
})