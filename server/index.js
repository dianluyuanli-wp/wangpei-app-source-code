// 引入编写好的api
const api = require('./api'); 
// 引入文件模块
const fs = require('fs');
// 引入处理路径的模块
const path = require('path');
// 引入处理post数据的模块
const bodyParser = require('body-parser')
// 引入Express
const express = require('express');
const app = express();

//app.set('views', __dirname + '../dist');
//app.set('view engine', 'html');

app.set('port', (process.env.port || 5000))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(api);
// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
app.use(express.static(path.resolve(__dirname, '../dist')))
// 因为是单页应用 所有请求都走/dist/index.html

app.post('/api/setup', function (req, res) {
  new db.User(req.body)
    .save()
    .then(() => {
      res.status(200).end()
      db.initialized = true
    })
    .catch(() => res.status(500).end())
})

app.get('*', function(req, res) {
    const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
    //response.render('index');
    res.send(html)
})
// 监听8088端口
//app.listen(3000);
app.listen(app.get('port'), function () {
  console.log('Visit http://localhost:' + app.get('port'))
})
console.log('success listen'+app.get('port')+'…………');
//console.log('Visit http://localhost:' + '3000');
