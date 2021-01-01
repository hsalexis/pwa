

if (navigator.serviceWorker) {
    navigator.serviceWorker.register('sw.js');
}

if (window.caches) {
    //Abre o crea caché
    caches.open('prueba-1');

    //Verifica si existe el espacio
    caches.has('prueba-3').then(console.log);

    //Borrar caché
    caches.delete('prueba-2');

    // Trabajar con el caché
    caches.open('cache-v1.1').then(cache => {
        //Agregar elemento al caché
        cache.add('index.html');
        //Agregar elementos al caché
        cache.addAll([
            'index.html',
            'css/style.css',
            'img/main.jpg'
        ]).then(() => {
            //Eliminar elemento del caché
            // cache.delete('style.css');

            //Reemplazar elemento
            cache.put('index.html', new Response('Hola mundo'));
        });

        //Obtener elemento
        cache.match('index.html').then(res => {
            res.text().then(console.log)
        })
    });

    //Listar los nombres de cachés
    caches.keys().then(console.log)
}