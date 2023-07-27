const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const logger = require('morgan');
const bodyParser = require('body-parser')
const http = require('http').createServer(app);
const io = require('socket.io')(http);
// const CosmosClient = require('@azure/cosmos').CosmosClient
//const miBoton = document.getElementById('Guardar_btn1'); 


//////variables io socket
let variableValue = 0;
let variableValue2 = 0;
let variableValue3 = 0;
let VariableGuardar=0



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
app.get('/index',function(req,res){
  //res.sendFile(path.join(__dirname+'/index.html'));
  res.render('index');
  //__dirname : It will resolve to your project folder.
});

app.get('/',function(req,res){
  //res.sendFile(path.join(__dirname+'/index.html'));
  res.render('index');
  //__dirname : It will resolve to your project folder.
});
 
app.get('/about',function(req,res){
  // res.send("hello")
  // res.sendFile(path.join(__dirname+'/about.html'));
});

app.post('/about',async(req,res)=>{
  // var a = req.body.
  // res.sendFile(path.join(__dirname+'/about.html'));
   
  
      try {
        let a = await req.body
        variableValue2=a.Buenos
        variableValue=a.Malos
        variableValue3=a.Buenos + a.Malos
        io.emit('updateVariable', variableValue);
        io.emit('updateVariable2', variableValue2);
        io.emit('updateVariable3', variableValue3);
        res.send(a)
        // config.items.QC.Buenos = variableValue2
        // config.items.QC.Malos = variableValue

               
    } catch (error) {
        // handleHttpError(res, "error create items")

        console.log(error)
    }
    
}
);
 
app.get('/datos',function(req,res){
  res.render('datos');
});

app.get('/guardar',function(req,res){
  res.render('guardar');
  // const fecha = Date.now()
  // let serial = "s" + fecha
  // config.items.QC.id = serial
  // config.items.QC.Buenos = variableValue2
  // config.items.QC.Malos = variableValue
  // config.items.QC.Lote = Date(Date.now())

//   createDatabase()
//   .then(() => readDatabase())
//   .then(() => createContainer())
//   .then(() => readContainer())
//   //.then(() => scaleContainer())
//   .then(() => createFamilyItem(config.items.QC))
//   //.then(() => createFamilyItem(config.items.SG_SST))
//   //.then(() => createFamilyItem(config.items.Andersen))
//   //.then(() => createFamilyItem(config.items.Wakefield))
//   .then(() => queryContainer())
//   //.then(() => replaceFamilyItem(config.items.Andersen))
//   //.then(() => queryContainer())
//  // .then(() => deleteFamilyItem(config.items.Andersen))
//   .then(() => {
//     // exit(`Completed successfully`)
//     console.log('Completed successfully')
//   })
//   .catch(error => {
//     // exit(`Completed with error ${JSON.stringify(error)}`)
//     console.log(error)
//   })
  
});


// app.post('/guardar',function(req,res){
    
// });
 


////// Lógica para actualizar la variable y enviarla a través de Socket.io cada 5 segundos

// setInterval(() => {
//   variableValue++;
//   io.emit('updateVariable', variableValue);
// }, 10000); // Actualizar cada 5 segundos


///////data base cosmos
// const config = require('./config')
// const url = require('url')
// const endpoint = config.endpoint
// const key = config.key

// const databaseId = config.database.id
// const containerId = config.container.id
// const partitionKey = { kind: 'Hash', paths: ['/partitionKey'] }
// const options = {
//   endpoint: endpoint,
//   key: key,
//   userAgentSuffix: 'CosmosDBJavascriptQuickstart'
// };
// const client = new CosmosClient(options)

// /**
//  * Create the database if it does not exist
//  */
// async function createDatabase() {
//   const { database } = await client.databases.createIfNotExists({
//     id: databaseId
//   })
//   console.log(`Created database:\n${database.id}\n`)
// }


// /**
//  * Read the database definition
//  */
// async function readDatabase() {
//   const { resource: databaseDefinition } = await client
//     .database(databaseId)
//     .read()
//   console.log(`Reading database:\n${databaseDefinition.id}\n`)
// }

// /** 
//  * Create the container if it does not exist
//  */
// async function createContainer() {
//   const { container } = await client
//     .database(databaseId)
//     .containers.createIfNotExists(
//       { id: containerId, partitionKey }
//     )
//   console.log(`Created container:\n${config.container.id}\n`)
// }

// /**
//  * Read the container definition
//  */
// async function readContainer() {
//   const { resource: containerDefinition } = await client
//     .database(databaseId)
//     .container(containerId)
//     .read()
//   console.log(`Reading container:\n${containerDefinition.id}\n`)
// }

// /**
//  * Scale a container
//  * You can scale the throughput (RU/s) of your container up and down to meet the needs of the workload. Learn more: https://aka.ms/cosmos-request-units
// //  */
// // async function scaleContainer() {
// //   const { resource: containerDefinition } = await client
// //     .database(databaseId)
// //     .container(containerId)
// //     .read();
  
// //   try
// //   {
// //       const {resources: offers} = await client.offers.readAll().fetchAll();
  
// //       const newRups = 400;
// //       for (var offer of offers) {
// //         if (containerDefinition._rid !== offer.offerResourceId)
// //         {
// //             continue;
// //         }
// //         offer.content.offerThroughput = newRups;
// //         const offerToReplace = client.offer(offer.id);
// //         await offerToReplace.replace(offer);
// //         console.log(`Updated offer to ${newRups} RU/s\n`);
// //         break;
// //       }
// //   }
// //   catch(err)
// //   {
// //       if (err.code == 400)
// //       {
// //           console.log(`Cannot read container throuthput.\n`);
// //           console.log(err.body.message);
// //       }
// //       else 
// //       {
// //           throw err;
// //       }
// //   }
// // }


// /**
//  * Create family item if it does not exist
//  */
// async function createFamilyItem(itemBody) {

//   const { item } = await client
//     .database(databaseId)
//     .container(containerId)
//     .items.upsert(itemBody)
//   console.log(`Created family item with id:\n${itemBody.id}, ${VariableGuardar}\n`)
// }




// /**
//  * Query the container using SQL
//  */
// async function queryContainer() {
//   console.log(`Querying container:\n${config.container.id}`)

//   // query to return all children in a family
//   // Including the partition key value of country in the WHERE filter results in a more efficient query
//   const querySpec = {
//     query: 'SELECT datos.Buenos, datos.Malos FROM datos WHERE datos.Buenos BETWEEN 0 AND 1000000',
    
// }
//   const { resources: results } = await client
//   .database(databaseId)
//   .container(containerId)
//   .items.query(querySpec)
//   .fetchAll()
//   for (var queryResult of results) {
//   let resultString = JSON.stringify(queryResult)
//   console.log(`\tQuery returned with ${resultString}\n`)
//   console.log(`\tQuery  key returned with ${JSON.stringify(results[queryResult])}\n`)
//   console.log(queryResult.Buenos)
//   console.log(queryResult.Malos)
//   }

// }

// //   const { resources: results } = await client
// //     .database(databaseId)
// //     .contain
// /**
//  * Replace the item by ID.
//  */
// // async function replaceFamilyItem(itemBody) {
// //   console.log(`Replacing item:\n${itemBody.id}\n`)
// //   // Change property 'grade'
// //   itemBody.children[0].grade = 6
// //   const { item } = await client
// //     .database(databaseId)
// //     .container(containerId)
// //     .item(itemBody.id, itemBody.partitionKey)
// //     .replace(itemBody)
// // }

// /**
//  * Delete the item by ID.
//  */
// // async function deleteFamilyItem(itemBody) {
// //   await client
// //     .database(databaseId)
// //     .container(containerId)
// //     .item(itemBody.id, itemBody.partitionKey)
// //     .delete(itemBody)
// //   console.log(`Deleted item:\n${itemBody.id}\n`)
// // }

// /**
//  * Cleanup the database and collection on completion
//  */
// // async function cleanup() {
// //   await client.database(databaseId).delete()
// // }


// // /**
// //  * Exit the app with a prompt
// //  * @param {string} message - The message to display
// //  */
// function exit(message) {
//   console.log(message)
//   console.log('Press any key to exit')
//   process.stdin.setRawMode(true)
//   process.stdin.resume()
//   process.stdin.on('data', process.exit.bind(process, 0))
// }


// //   createDatabase()
// //   .then(() => readDatabase())
// //   .then(() => createContainer())
// //   .then(() => readContainer())
// //   //.then(() => scaleContainer())
// //   .then(() => createFamilyItem(config.items.QC))
// //   //.then(() => createFamilyItem(config.items.SG_SST))
// //   //.then(() => createFamilyItem(config.items.Andersen))
// //   //.then(() => createFamilyItem(config.items.Wakefield))
// //   .then(() => queryContainer())
// //   //.then(() => replaceFamilyItem(config.items.Andersen))
// //   //.then(() => queryContainer())
// //  // .then(() => deleteFamilyItem(config.items.Andersen))
// //   .then(() => {
// //     // exit(`Completed successfully`)
// //     console.log('Completed successfully')
// //   })
// //   .catch(error => {
// //     // exit(`Completed with error ${JSON.stringify(error)}`)
// //     console.log(error)
// //   })
// //   VariableGuardar = 0



