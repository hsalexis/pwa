
// Ciclo de vida del SW

self.addEventListener('install', event => {
    console.log('SW: Instalando SW!!');
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    console.log('SW: Activo y listo para trabajar');
});

self.addEventListener('fetch', event => {
    //Aplicar estrategias del caché
    // console.log('SW: ', event.request.url);
    // if (event.request.url.includes('https://reqres.in/')) {
    //     const resp = new Response(`{
    //         ok:false, mensaje;'jajaja'
    //     }`);
    //     event.respondWith(resp);
    // }
});

//SYNC: Recuperar la conexion a internet

self.addEventListener('sync', event => {
    console.log('Tenemos conexión');
    console.log(event);
    console.log(event.tag);
})

//PUSH : Manejar las push notification

self.addEventListener('push', event => {
    console.log('Notificación recibida');
});