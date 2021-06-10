const express = require('express')
const app     = express()
const port    = 8080

var ip = require('ip')
const geoip = require('geoip-lite');
const Sniffr = require("sniffr");

var header = `<pre>
██████  ███████ ███    ███  ██████   █████  ██████  ██████  
██   ██ ██      ████  ████ ██    ██ ██   ██ ██   ██ ██   ██ 
██   ██ █████   ██ ████ ██ ██    ██ ███████ ██████  ██████  
██   ██ ██      ██  ██  ██ ██    ██ ██   ██ ██      ██      
██████  ███████ ██      ██  ██████  ██   ██ ██      ██      
</pre>`



app.get('/', (req,res) => {
    var headers = JSON.stringify(req.headers, null, 4)
    var client_ip = req.headers['x-forwarded-for'] || req.ip
    var server_ip = ip.address()

    const userAgent = req.headers['user-agent'];
    const s = new Sniffr();
    s.sniff(userAgent);

    const geo = geoip.lookup(client_ip);

    var sniff = JSON.stringify({
        ...s,
        client_ip,
        geo
    }, null, 2)

    var html = "<html><body>"+header+" Connection from <strong>"+client_ip+ "</strong> to <strong>"+server_ip+"</strong><br> <pre>"+sniff+"</pre> <br> Request Headers: <pre><code>" + headers + "</code></pre><body></html>"
    res.send(html)
})

app.listen(port, () => {
    console.log(`Example app listening on ${port}`)
})