function sumaruno(numero){
    var promesa = new Promise(function(resolve,reject){

        if(numero>=7){
            reject('El número es muy alto');
        }

        setTimeout(function(){
           resolve(numero+1);
        },800);


    });
    return promesa;
}
/*---------------Ejemplos de Promesas--------------*/

// sumaruno(5).then(nuevoNumero=>{
//     sumaruno(nuevoNumero).then(nuevoNumero2=>{
//         console.log(nuevoNumero2);        
//     })
// });


// sumaruno(5)
//   .then((nuevoNumero) => {
//     console.log(nuevoNumero);
//     return sumaruno(nuevoNumero);
//   })
//   .then((nuevoNumero) => {
//     console.log(nuevoNumero);
//     return sumaruno(nuevoNumero);
//   })
//   .then((nuevoNumero) => {
//     console.log(nuevoNumero);
//   });


//   sumaruno(5)
//     .then(sumaruno)
//     .then(sumaruno)
//     .then((nuevoNumero) => {
//       console.log(nuevoNumero);
//     });


// sumaruno(8)
//   .then(nuevoValor =>{
//       console.log(nuevoValor);
//   })
//   .catch(error =>{
//       console.log("Error en la promesa");
//       console.error(error);
//   })


sumaruno(1)
  .then(sumaruno)
  .then(sumaruno)
  .then((nuevoNumero) => {
    console.log(nuevoNumero);
  })
  .catch((error) => {
    console.log("Error en la promesa");
    console.error(error);
  });