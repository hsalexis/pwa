// const cache_name = 'cache-1';
const CACHE_STATIC_NAME = 'static-v2';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';
const CACHE_INMUTABLE_NAME = 'inmutable-v1';

const CACHE_DYNAMIC_LIMIT = 50;

function limpiarCache(cacheName, numeroItems) {
    caches.open(cacheName)
        .then(cache => {
            return cache.keys()
                .then(keys => {
                    if (keys.length > numeroItems) {
                        cache.delete(keys[0])
                            .then(limpiarCache(cacheName, numeroItems));
                    }
                });
        });
}



self.addEventListener('install', e => {

    const cacheProm = caches.open(CACHE_STATIC_NAME)
        .then(cache => {
            return cache.addAll([
                //Instalar la app en caché
                '/04-cache-offline/',
                'index.html',
                'css/style.css',
                'img/main.jpg',
                'js/app.js',
                'img/no-img.jpg'
            ]);
        });

    const cacheInmutable = caches.open(CACHE_INMUTABLE_NAME)
        .then(cache => cache.add('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'));

    e.waitUntil(Promise.all([cacheProm, cacheInmutable]));
});

self.addEventListener('fetch', e => {
    // 1- Cache Only ------ Usada para que toda la app salga del caché
    // e.respondWith(caches.match(e.request));

    // 2- Cache with Network Fallback -------- Busca rimero en cahé y luego en la red

    /*const respuesta = caches.match(e.request)
        .then(res => {
            if (res) return res;

            //No existe
            console.log('No existe ', e.request.url);

            return fetch(e.request).then(newResp => {
                caches.open(CACHE_DYNAMIC_NAME)
                    .then(cache => {
                        cache.put(e.request, newResp);
                        limpiarCache(CACHE_DYNAMIC_NAME, CACHE_DYNAMIC_LIMIT);
                    });
                return newResp.clone();
            });

        });

    e.respondWith(respuesta);*/

    //3- Network with cache fallback ---------- Busca primero en la red y luego en caché

    /*const respuesta = fetch(e.request).then(res => {

        //Error 400 regresar archivo del cache
        if (!res) return caches.match(e.request);

        caches.open(CACHE_DYNAMIC_NAME)
            .then(cache => {
                cache.put(e.request, res);
                limpiarCache(CACHE_DYNAMIC_NAME, CACHE_DYNAMIC_LIMIT);

            })
        return res.clone();
    }).catch(err => {
        return caches.match(e.request);
    });

    e.respondWith(respuesta);*/

    //4- Cache with network update ---------- Cuando el rendimiento es prioridad, actualizaciones estarán atras

    /*if (e.request.url.includes('bootstrap')) {
        return e.respondWith(caches.match(e.request));
    }
    const respuesta = caches.open(CACHE_STATIC_NAME).then(cache => {
        fetch(e.request).then(newRes =>
            cache.put(e.request, newRes));
        return cache.match(e.request);
    });

    e.respondWith(respuesta);*/

    //5- Cache and Network Race

    const respuesta = new Promise((resolve, reject) => {
        let rechazada = false;
        const falloUnaVez = () => {
            if (rechazada) {
                if (/\.(png|jpg)$/i.test(e.request.url)) {
                    resolve(caches.match('/04-cache-offline/img/no-img.jpg'));
                } else {
                    reject('No se encontró respuesta');
                }
            } else {
                rechazada = true;
            }
        }
        fetch(e.request).then(res => {
            res.ok ? resolve(res) : falloUnaVez();
        }).catch(falloUnaVez);

        caches.match(e.request).then(res => {
            res ? resolve(res) : falloUnaVez();
        })

    });


    e.respondWith(respuesta);


});