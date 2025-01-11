var CACHE_NAME = 'version26'; // bump this version when you make changes.
// Put all your urls that you want to cache in this array
var urlsToCache = [
    'index.html',
    'chat.html',
    'update.html',
    'assets/img/christmas-logo-512.png'
    'assets/img/logo-192.png',
    'assets/img/logo-512.png',
    'assets/img/logo.png',
    'assets/img/oldLogo.png',
    'assets/img/favicon.ico',
    'assets/css/css.css',
    'assets/css/spin.css',
    'games/1v1lol',
    'games/10-minutes-till-dawn',
    'games/99balls',
    'games/100ng',
    'games/2048',
    'games/achievementunlocked',
    'games/adarkroom',
    'games/ages-of-conflict',
    'games/amazing-rope-police',
    'games/arcadewizard',
    'games/avalanche',
    'games/awesometanks2',
    'games/backrooms-2d',
    'games/baldisbasicsfieldtripcampingremake',
    'games/basket-random',
    'games/bitlife',
    'games/boxing-random',
    'games/burger-and-frights',
    'games/chrome-dino',
    'games/circlo',
    'games/connect3',
    'games/cookie-clicker',
    'games/core-ball',
    'games/crossyroad',
    'games/csgo-clicker',
    'games/ctr',
    'games/ctr-holiday',
    'games/ctr-tr',
    'games/cubefield',
    'games/dante',
    'games/death-run-3d',
    'games/DogeMiner',
    'games/dragon-vs-bricks',
    'games/drive-mad',
    'games/ducklife1',
    'games/edge-surf',
    'games/GBA',
    'games/game-inside',
    'games/fruitninja',
    'games/FNAF 3',
    'games/FNAF 2',
    'games/flashtetris',
    'games/flappy-bird',
    'games/fairsquares',
    'games/exo',
    'games/evolution',
    'games/evil-glitch',
    'games/go-ball',
    'games/madalin-stunt-cars-3',
    'games/just-fall',
    'games/kitchen-gun-game',
    'games/jetpack-joyride',
    'games/interactivebuddy',
    'games/hextris',
    'games/geodash',
    'games/google-feud',
    'games/halfLife',
    'games/hba',
    'games/hextris',
    'games/interactivebuddy',
    'games/spacegarden',
    'games/soccer-random',
    'games/space-company',
    'games/jetpack-joyride',
    'games/just-fall',
    'games/kitchen-gun-game',
    'games/madalin-stunt-cars-3',
    'games/mario',
    'games/miniputt',
    'games/minecraft-classic',
    'games/n-gon',
    'games/monster-tracks',
    'games/pandemic2',
    'games/particle-clicker',
    'games/snowbattle',
    'games/slope',
    'games/sm64',
    'games/santy-is-home',
    'games/scrapmetal',
    'games/sand-game',
    'games/rolly-vortex',
    'games/retro-bowl',
    'games/portalflash',
    'games/pixel-gun-survival',
    'games/paperio2',
    'games/sandboxels',
    'games/stack',
    'games/station-141',
    'games/wallsmash',
    'games/volley-random',
    'games/twitch-tetris',
    'games/unfairmario',
    'games/thisistheonlylevel',
    'games/thebowlingclub',
    'games/temple-run-2',
    'games/tanuki-sunset',
    'games/tank-trouble-2',
    'games/swerve',
    'games/subway-surfers',
    'games/superhot',
    'games/stick-duel-battle',
    'games/stickman-hook',
    'games/baldis-basics',
    'games/deathcario',
    'games/helios',
    'games/houseofhazards',
    'games/pacman3d',
    'assets\vid\shameful-human.mp4',
    'anime-gurl.html',
    'games/timeshooter3swat',
    'games/Epic Tower Defense',
    'games/Ninja Dash',
    'games/Polygon Fusion',
    'games/Super Tic-Tac-Toe',

];

// Install the service worker and open the cache and add files mentioned in array to cache
self.addEventListener('install', function(event) {
    event.waitUntil(
    caches.open(CACHE_NAME)
        .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
        })
    );
});


// keep fetching the requests from the user
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            // Cache hit - return response
            if (response) return response;
            return fetch(event.request);
        })
    );
});

self.addEventListener('activate', function(event) {
    var cacheWhitelist = []; // add cache names which you do not want to delete
    cacheWhitelist.push(CACHE_NAME);
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
        return Promise.all(
            cacheNames.map(function(cacheName) {
                if (!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        );
        })
    );
});

// NOTIFICATIONS
// Please go through https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications#push_api to understand this properly
// You can check https://github.com/saurabhdaware/pwainit-node-pushapi for server-side code

// Listens to push events from server.
self.addEventListener('push', function(e) {
    const dataFromServer = e.data.json(); // or your can add e.data.text() and pass text data from server

    var options = {
            body: dataFromServer.body,
            icon: 'assets/logo-512.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                // primaryKey: '2'
            },
            actions:[
                {action: 'github', title: 'Open Github Repo', icon: 'images/checkmark.png'},
                {action: 'close', title: 'Close notification', icon: 'images/xmark.png'},
            ]
    };
    e.waitUntil(
        self.registration.showNotification(dataFromServer.title, options)
    );
});

self.addEventListener('notificationclick', function(e) {
    var notification = e.notification;
    var primaryKey = notification.data.primaryKey;
    var action = e.action;

    if (action === 'close') {
        notification.close();
    }else if(action == 'github'){
        clients.openWindow('https://github.com/saurabhdaware/pwainit')
        notification.close();
    }else {
        console.log('..')
        notification.close();
    }
});
