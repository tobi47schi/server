const {series} = require('gulp');
var exec = require('child_process').exec;


function hello(cb) {
  // body omitted
  console.log("Hello ")
  cb();
}

function world(cb) {
  // body omitted
  console.log("World!")
  cb();
}

function start_server(cb) {
  exec('pm2 start app.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
}


function stop_server(cb) {
  exec('pm2 stop app.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
}


function list(cb) {
  exec('pm2 list', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
}


function start_server_dev(cb) {
  env({
    vars : {
      GULP_ENV : "dev GULP"
    }
  })
  exec ('node app.js',(err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
}


exports.list = list;
exports.start_server = start_server;
exports.stop_server = stop_server;
exports.hello = hello;
exports.world = world; //world
exports.start_server_dev = start_server_dev; 


exports.default = series(hello, world); // gulp
exports.serie = series(world, hello); // gulp serie
