function sumarLento(numero) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(numero + 1);
      // reject('La promesa falló');
    }, 800);
  });
}

let sumarRapido = (numero) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve(numero + 1);
      reject("Error en sumar rápido");
    }, 300);
  });
};

Promise.race([sumarLento(5), sumarRapido(10)])
  .then((respuestas) => {
    console.log(respuestas);
  })
  .catch(console.error);
