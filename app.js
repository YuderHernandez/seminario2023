const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const logger = require('morgan');
const bodyParser = require('body-parser')
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const CosmosClient = require('@azure/cosmos').CosmosClient
///////data base cosmos
const config = require('./config')
const url = require('url')
const endpoint = config.endpoint
const key = config.key

let variableValue = 0;
let variableValue2 = 0;

const databaseId = config.database.id
const containerId = config.container.id
const partitionKey = { kind: 'Hash', paths: ['/partitionKey'] }

const options = {
      endpoint: endpoint,
      key: key,
      userAgentSuffix: 'CosmosDBJavascriptQuickstart'
    };

const client = new CosmosClient(options)


async function createDatabase() {
  const { database } = await client.databases.createIfNotExists({
    id: databaseId
  })
  console.log(`Created database:\n${database.id}\n`)
}
/////////servidor
const port = 3005
// Configura la carpeta "public" para servir archivos estáticos (como CSS, JS, imágenes, etc.)
app.use(express.static('public'));
// Configura EJS como motor de plantillas
app.set('view engine', 'ejs');
//app.use('/', router);

app.use(logger('dev')); //configura morgan
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

http.listen(process.env.port || port);
console.log('Running at Port ' + port);

///////rutas
app.get('/',function(req,res){
  //res.sendFile(path.join(__dirname+'/index.html'));
  res.render('index');
  //__dirname : It will resolve to your project folder.
});
 
app.get('/about',function(req,res){
  // res.send("hello")
  // res.sendFile(path.join(__dirname+'/about.html'));
});

app.post('/about',(req,res)=>{
  // var a = req.body.
  // res.sendFile(path.join(__dirname+'/about.html'));
   
    try {
        // const body = matchedData(req)
        // console.log(req.body)
        // const data = await trackModel.create(body)
        let a = req.body
        variableValue2=a.paradaE
        io.emit('updateVariable2', variableValue2);
        res.send(a)
        //console.log(a)
    } catch (error) {
        // handleHttpError(res, "error create items")
        console.log(error)
    }
   
}
);
 
app.get('/datos',function(req,res){
  res.render('datos');
});
 


////// Lógica para actualizar la variable y enviarla a través de Socket.io cada 5 segundos

setInterval(() => {
  variableValue++;
  io.emit('updateVariable', variableValue);
}, 5000); // Actualizar cada 5 segundos
