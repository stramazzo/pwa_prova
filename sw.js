// Service Worker per il Calcolatore Astrologico PWA

const CACHE_NAME = 'astro-calc-v1.0.1';
const STATIC_CACHE_URLS = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './astro-calculations.js',
    './manifest.json'
];

// Installazione del Service Worker
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Caching files');
                return cache.addAll(STATIC_CACHE_URLS);
            })
            .then(() => {
                console.log('Service Worker: Cache setup complete');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('Service Worker: Cache setup failed', error);
            })
    );
});

// Attivazione del Service Worker
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((cacheName) => {
                            // Rimuove cache vecchie
                            return cacheName.startsWith('astro-calc-') && cacheName !== CACHE_NAME;
                        })
                        .map((cacheName) => {
                            console.log('Service Worker: Deleting old cache', cacheName);
                            return caches.delete(cacheName);
                        })
                );
            })
            .then(() => {
                console.log('Service Worker: Claiming clients');
                return self.clients.claim();
            })
    );
});

// Intercettazione delle richieste di rete
self.addEventListener('fetch', (event) => {
    const requestURL = new URL(event.request.url);
    
    // Strategia Cache First per i file statici
    if (STATIC_CACHE_URLS.some(url => event.request.url.includes(url.replace('./', '')))) {
        event.respondWith(
            caches.match(event.request)
                .then((cachedResponse) => {
                    if (cachedResponse) {
                        console.log('Service Worker: Serving from cache', event.request.url);
                        return cachedResponse;
                    }
                    
                    console.log('Service Worker: Fetching from network', event.request.url);
                    return fetch(event.request)
                        .then((response) => {
                            // Salva una copia nella cache per le richieste future
                            if (response.status === 200) {
                                const responseClone = response.clone();
                                caches.open(CACHE_NAME)
                                    .then((cache) => {
                                        cache.put(event.request, responseClone);
                                    });
                            }
                            return response;
                        });
                })
                .catch(() => {
                    // Fallback offline per l'HTML principale
                    if (event.request.destination === 'document') {
                        return caches.match('./index.html');
                    }
                })
        );
        return;
    }
    
    // Strategia Network First per le API esterne (come geocoding)
    if (requestURL.hostname === 'nominatim.openstreetmap.org') {
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    if (response.status === 200) {
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME + '-api')
                            .then((cache) => {
                                cache.put(event.request, responseClone);
                            });
                    }
                    return response;
                })
                .catch(() => {
                    // Fallback alla cache se la rete non è disponibile
                    return caches.match(event.request);
                })
        );
        return;
    }
    
    // Per tutte le altre richieste, passa direttamente alla rete
    event.respondWith(fetch(event.request));
});

// Gestione dei messaggi dal client
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({
            version: CACHE_NAME
        });
    }
    
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName.startsWith('astro-calc-')) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            event.ports[0].postMessage({
                success: true
            });
        });
    }
});

// Gestione degli errori
self.addEventListener('error', (event) => {
    console.error('Service Worker: Error occurred', event.error);
});

// Gestione della sincronizzazione in background (opzionale)
self.addEventListener('sync', (event) => {
    if (event.tag === 'background-sync') {
        console.log('Service Worker: Background sync triggered');
        // Qui potresti implementare logica per sincronizzare dati quando la connessione torna disponibile
    }
});

// Notifica quando l'app può essere aggiornata
self.addEventListener('controllerchange', () => {
    console.log('Service Worker: Controller changed - app updated');
});

console.log('Service Worker: Script loaded successfully');