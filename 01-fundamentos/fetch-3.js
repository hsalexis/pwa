// Petición Get
// https://reqres.in/api/users

// fetch('https://reqres.in/api/users')
//     .then((resp) => {
//         resp.json().then(console.log);
//     });

let usuario = {
  nombre: 'Alexis',
  edad: 23,
};

fetch('https://reqres.in/api/', {
  method: 'POST',
  body: JSON.stringify(usuario),
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(resp => resp.json())
  .then(console.log)
  .catch(error => {
    console.log('Error en la petición');
    console.log(error);
  });


