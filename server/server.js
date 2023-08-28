// Import requirements
var express = require('express'); 

const { createProxyMiddleware } = require("http-proxy-middleware");

// Initializing Express server
var app = express();

// Exposing Server Port
const port = 3000;

// Proxies
app.use(
    '/api/street-shoppe-apis',
    createProxyMiddleware({
        target: 'http://localhost:5000',
        changeOrigin: true,
        pathRewrite: {
            '^/api/street-shoppe-apis/': '/'
        },
    })
);

app.use(
    '/api/data',
    createProxyMiddleware({
        target: 'https://street-shoppe.firebaseio.com',
        changeOrigin: true,
        pathRewrite: {
            '^/api/data': '/'
        },
    })
);

app.use('/static', express.static('static'));

// Default route to server index.html
app.get('/', (req, res) => {
    res.sendFile('index.html', { root : '/opt/streetshoppe/' });
})

// Init
app.listen(port, () => {
  console.log(`Street shoppe web app listening on port ${port}`)
})