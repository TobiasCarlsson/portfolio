const path = require('path');
const fs = require('fs');
const http = require('http');
const { parse } = require('querystring');
nodemailer = require('nodemailer')

//
// Configuration
//

const config = {
    // www root
    root: 'public',

    // default file to serve
    index: 'index.html',

    // http listen port
    port: process.env.PORT || 3000
};


//
// HTTP Server
//

http.createServer(function (request, response) {
    let file = path.normalize(config.root + request.url);
    file = (file == config.root + '/') ? file + config.index : file;

    // console.log('Trying to serve: ', file);
    // console.log('Refreshed!')
    function showError(error) {
        console.log(error);

        response.writeHead(500);
        response.end('Internal Server Error');
    }

    if(request.method === 'POST') {
      if(request.url === '/contact') {
        collectRequestData(request, function(data) {
          if(Object.keys(data).length > 0) {

            response.statusCode = 200;
            response.write('Success');
            return response.end();
          } else {
            response.statusCode = 400;
            response.write('No data provided in body');
            return response.end();
          }
        });
      }
    }

    fs.exists(file, function (exists) {
        if (exists) {
            fs.stat(file, function (error, stat) {
                let readStream;

                if (error) {
                    return showError(error);
                }

                if (stat.isDirectory()) {
                    response.writeHead(403);
                    response.end('Forbidden');
                }
                else {
                    readStream = fs.createReadStream(file);

                    readStream.on('error', showError);

                    response.writeHead(200);
                    readStream.pipe(response);
                }
            });
        }
        else {
            response.writeHead(404);
            response.end('Not found');
        }
    });

}).listen(config.port, function() {
    console.log('Server running at http://localhost:%d', config.port);
});

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}
