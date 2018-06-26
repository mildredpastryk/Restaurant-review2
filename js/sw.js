var CACHE_NAME = 'cache-v1';
let urlsToCache = [
  '/index.html',
  '/restaurant.html',
  '/css/styles.css',
  '/data/restaurants.json',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg', 
  '/',
];

// First service worker - Install Event
//  It's triggered as soon as the worker executes, 
// and it's only called once per service worker. 
self.addEventListener('install', e => {
	console.log('Yay! Cache-v1 installing…');

	e.waitUntil(
    	caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
 	);
});

// Activate Event - once sw is ready to control clients
// and handle functional events 
self.addEventListener('activate', e => {
	console.log('Yay! Cache-v1 now ready to handle fetches!');
    
    e.waitUntil(
    	// Get all the cache names
    	caches.keys().then(cacheNames => {
			return Promise.all(
				// Get all the items 
				cacheNames.filter(cacheName => {
   					return cacheName != CACHE_NAME;
        		}).map(cacheName => {
          		// Delete the items
          			return caches.delete(cacheName);
        			})
      		); // end Promise.all()
    	}) // end caches.keys()
  	); // end event.waitUntil()
});

// Fetch Event
// Method: e.respondWith() allows us to provide a response to this fetch
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
        // Cache hit - return response
        return response || fetch(e.request);
        })
    );
});