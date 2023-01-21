var finalhandler = require('finalhandler')
var http = require('http')
var serveStatic = require('serve-static')

// Serve up public/ftp folder
var serve = serveStatic(__dirname, { index: ['index.html', 'index.htm'] })

var server = http.createServer(function onRequest(req, res) {
  var done = finalhandler(req, res, { onerror: logerror })
  serve(req, res, function (err, buf) {
    if (err) return done(err)
    res.setHeader('Content-Type', 'text/html')
    res.end(buf)
  })
})

// Listen
server.listen(5000, () => {
  console.info("Service started at http://localhost:5000")
})

// Error logger
function logerror (err) {
  console.error(err.stack || err.toString())
}
