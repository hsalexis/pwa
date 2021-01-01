self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
            .then(resp => {
                if (resp.ok) {
                    return resp;
                } else {
                    return fetch('img/main.jpg')
                }
            })
    );
});