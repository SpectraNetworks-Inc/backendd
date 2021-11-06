//const es = require('./src/services/elasticsearch.service');



//var apm = require('elastic-apm-node').start();


// const checkIndex = {
//   index: 'backendd',
//   id: '0'
// }

// es.get(checkIndex).then(resp=>{
//   if(!resp){
//     console.log('No Index');
//     return 'Nope';
//   }
//   else {
//     console.log(resp._source);
//   }
// }).catch(err=>{
//   return console.log('Errorrrr', err);
// });

// es.indices.create({
//   index: 'backendd-test'
// },function(err,resp,status) {
//   if(err) {
//     console.log(err);
//   }
//   else {
//     console.log("create",resp);
//   }
// });

// es.index({
//   index: 'backendd',
//   id: '0',
//   type: 'Data',
//   body: {
//     test: 'false'
//   }
// },function(err,resp,status) {
//     console.log(resp);
//     console.log(status);
// });
