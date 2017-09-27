var childProcess = require('child_process');
var path = require('path');
var child = childProcess.fork('./index.js')
//child.on('data',function(data){console.log("stdout:",data)})
process.stdin.setEncoding('utf8');
function exit(){
	process.exit()
}
process.stdin.on('readable', () => {
  const chunk = process.stdin.read();
  if (chunk !== null) {
    process.stdout.write(`data: ${chunk}`);

	if(chunk.slice(0,-2)==='close') exit();
    var childer = childProcess.fork('./index.js');
    childer.send(chunk.slice(0,-2));
    childer.on('exit',function(){
		console.log('childer will exit , bye');
	})
  }
});

process.stdin.on('end', () => {
  process.stdout.write('end');
  const chunk = process.stdin.read();
  if(chunk==='close') {
  	console.log("end with",chunk)
  	exit()
  }
});

child.send('close')
child.on('exit',function(){
	console.log("oh,exit");
	console.log("parent is running");
})

// var childe = childProcess.fork('./index.js')
// childe.send('2333')
// childe.on('exit',function(){
// 	console.log('child 2 will exit , bye')
// })
//childe.on('data',function(data){console.log("stdoutee:",data);childe.kill()})
