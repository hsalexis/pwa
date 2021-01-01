function sumarLento(numero){
  return new Promise(function (resolve, reject) {
      setTimeout(function(){

        resolve(numero+1);
        // reject('La promesa falló');
      },800)
  });
}

let sumarRapido = (numero)=>{
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(numero + 1), 300);
  });
}

// sumarLento(5).then(console.log);
// sumarRapido(8).then(console.log);

let cosas = [sumarLento(5), sumarRapido(10), true, 'hola mundo']

Promise.all(cosas).then(respuestas => {
  console.log(respuestas);
})
.catch(console.log);