var config = {}

config.endpoint = 'https://dbseminario.documents.azure.com:443/'
config.key = '3tDITNXb9ukoP3ATCSJ2ug12bbQ175NHuMKcEuhcCXPBN97CZtH4NYuGcjikmJ93R9hwk2EQ5iqpACDbNeKMRQ=='

config.database = {
  id: 'ECCI_DATA'
}

config.container = {
  id: 'datos'
}
const fecha = Date.now()
let serial = "s" + fecha
let fechaReal = Date(fecha)
config.items = { 
  QC:{
    id: serial,
    partitionKey: "ladrillos",
    Usuario: "Simon Bolivar",
    Buenos: 980.1459,
    Malos: 0.5,
    Total: 10,
    Sede: "Bogota",
    Lote: fechaReal
    
  },
  SG_SST:{
    Estado_Banda: "operando"

  }
}

// config.items = {
//   Andersen: {
//     id: 'Anderson.4',
//     Country: 'USA',
//     partitionKey: 'meta',
//     lastName: 'Andersen',
//     parents: [
//       {
//         firstName: 'Thomas'
//       },
//       {
//         firstName: 'Mary Kay'
//       }
//     ],
//     children: [
//       {
//         firstName: 'Gabriel',
//         gender: 'masculino',
//         grade: 5,
//         pets: [
//           {
//             givenName: 'Fluf',
//             type: 'cat'
//           }
//         ]
//       }
//     ],
//     address: {
//       state: 'WA',
//       county: 'King',
//       city: 'Seattle'
//     }
//   },
//   Wakefield: {
//     id: 'Wakefield.7',
//     partitionKey: 'Italy',
//     Country: 'Italy',
//     parents: [
//       {
//         familyName: 'Wakefield',
//         firstName: 'Robin'
//       },
//       {
//         familyName: 'Miller',
//         firstName: 'Ben'
//       }
//     ],
//     children: [
//       {
//         familyName: 'Merriam',
//         firstName: 'Jesse',
//         gender: 'female',
//         grade: 8,
//         pets: [
//           {
//             givenName: 'Goofy'
//           },
//           {
//             givenName: 'Shadow'
//           }
//         ]
//       },
//       {
//         familyName: 'Miller',
//         firstName: 'Lisa',
//         gender: 'female',
//         grade: 1
//       }
//     ],
//     address: {
//       state: 'NY',
//       county: 'Manhattan',
//       city: 'NY'
//     },
//     isRegistered: false
//   }
// }

module.exports = config