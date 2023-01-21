var finalhandler = require('finalhandler')
var http = require('http')
var serveStatic = require('serve-static')
var fs = require('fs')

// Serve up public/ftp folder
var serve = serveStatic('src', { index: ['index.html', 'index.htm'] })

// Create server
var server = http.createServer(function onRequest(req, res) {
  var done = finalhandler(req, res, { onerror: logerror })
  serve(req, res, function (err, buf) {
    if (err) return done(err)
    res.setHeader('Content-Type', 'text/html')
    res.end(buf)
  })
})

// Listen
server.listen(3000, () => {
  console.info("Service started at http://localhost:3000")
})

// Error logger
function logerror (err) {
  console.error(err.stack || err.toString())
}
