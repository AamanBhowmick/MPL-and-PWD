// var cacheName = 'Med';
// var filesToCache = [
//   'index.html',
//   'shop-details.html',
//   'shop-grid.html',
//   'shoping-cart.html',
// ];

// self.addEventListener('install', function (event) {
//     event.waitUntil(
//         caches.open(cacheName).then(function (cache) {
//             console.log("Opened Cache");
//             return cache.addAll(filesToCache);
//             })
//             );
// });

// self.addEventListener('activate', (event) => {
//   console.log("Service Worker activate event!");
// });

// self.addEventListener("fetch", function (event) {
//     event.respondWith(caches.match(event.request).then(function (response) {
//         if (response) {
//             return response;
//         }
//         return fetch(event.request);
//     }));
// });

// self.addEventListener('sync', event => {
//     if (event.tag === 'Sync from cache') {
//         console.log("Sync successful!")
//     }
// });

// self.addEventListener('push', function (event) {
//     if (event && event.data) {
//         var data = event.data.json();
//         if (data.method == "PushMessageData") {
//             console.log("Push notification sent");
//             event.waitUntil(self.registration.showNotification("RED STORE", {body: data.message}))
//         }
//     }
// })

// var preLoad = function () {
//     return caches.open("offline").then(function (cache) { // caching index and important routes
//         return cache.addAll(filesToCache);
//     });
// };

// self.addEventListener("fetch", function (event) {
//     event.respondWith(checkResponse(event.request).catch(function () {
//         return returnFromCache(event.request);
//     }));
//     event.waitUntil(addToCache(event.request));
// });

// var checkResponse = function (request) {
//     return new Promise(function (fulfill, reject) {
//         fetch(request).then(function (response) {
//             if (response.status !== 404) {
//                 fulfill(response);

//             } else {
//                 reject();
//             }
//         }, reject);
//     });
// };

// var addToCache = function (request) {
//     return caches.open("offline").then(function (cache) {
//         return fetch(request).then(function (response) {
//             return cache.put(request, response);
//         });
//     });
// };

// var returnFromCache = function (request) {
//     return caches.open("offline").then(function (cache) {
//         return cache.match(request).then(function (matching) {
//             if (! matching || matching.status == 404) {
//                 return cache.match("index.html");
//             } else {
//                 return matching;
//             }
//         });
//     });
// };

// self.addEventListener("activate", function (event) {
//   console.log("Service Worker activated.");
// });
// self.addEventListener("install", function (event) {
//   event.waitUntil(preLoad());
// });
// self.addEventListener("fetch", function (event) {
//   event.respondWith(
//     checkResponse(event.request).catch(function () {
//       console.log("Fetch from cache successful!");
//       return returnFromCache(event.request);
//     })
//   );
//   console.log("Fetch successful!");
//   event.waitUntil(addToCache(event.request));
// });
// self.addEventListener("sync", (event) => {
//   if (event.tag === "syncMessage") {
//     console.log("Sync successful!");
//   }
// });
// self.addEventListener("push", function (event) {
//   if (event && event.data) {
//     var data = event.data.json();
//     if (data.method == "pushMessage") {
//       console.log("Push notification sent");
//       event.waitUntil(
//         self.registration.showNotification("PWA Tutorial", {
//           body: data.message,
//         })
//       );
//     }
//   }
// });
// var filesToCache = [
//   "index.html",
//   "shop-details.html",
//   "shop-grid.html",
//   "shoping-cart.html",
// ];
// var preLoad = function () {
//   return caches.open("index").then(function (cache) {
//     // caching index and important routes
//     return cache.addAll(filesToCache);
//   });
// };
// var checkResponse = function (request) {
//   return new Promise(function (fulfill, reject) {
//     fetch(request).then(function (response) {
//       if (response.status !== 404) {
//         fulfill(response);
//       } else {
//         reject();
//       }
//     }, reject);
//   });
// };
// var addToCache = function (request) {
//   return caches.open("index").then(function (cache) {
//     return fetch(request).then(function (response) {
//       return cache.put(request, response);
//     });
//   });
// };
// var returnFromCache = function (request) {
//   return caches.open("index").then(function (cache) {
//     return cache.match(request).then(function (matching) {
//       if (!matching || matching.status == 404) {
//         return cache.match("index.html");
//       } else {
//         return matching;
//       }
//     });
//   });
// };

//
self.addEventListener("install", function (event) {
  event.waitUntil(preLoad());
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    checkResponse(event.request).catch(function () {
      console.log("Fetch from cache successful!");
      return returnFromCache(event.request);
    })
  );
  console.log("Fetch successful!");
  event.waitUntil(addToCache(event.request));
});
// self.addEventListener("sync", (event) => {
//   if (event.tag === "Sync from cache") {
//     console.log("Sync successful!");
//   }
// });

self.addEventListener("sync", function (event) {
  if (event.tag === "syncData") {
    event.waitUntil(syncData());
  }
});

function syncData() {
  // Perform data synchronization here
  // This function will be called when a sync event with tag 'sync-data' is triggered
  console.log("Sync event triggered");
}
console.log("Sync event triggered");

// self.addEventListener("push", function (event) {
//   if (event && event.data) {
//     var data = event.data.json({"method":"PushMessage","message":"Hello"});
//     if (data.method == "PushMessageData") {
//       console.log("Push notification sent");
//       event.waitUntil(
//         self.registration.showNotification("RED STORE", { body: data.message })
//       );
//     }
//   }
// });

self.addEventListener("push", function (event) {
  console.log("Push received", event);

  const payload = event.data ? event.data.text() : "no payload";

  const options = {
    body: payload,
    icon: "/icons/gfg.png",
  };

  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});

var filesToCache = [
  "index.html",
  "shop-details.html",
  "shop-grid.html",
  "shoping-cart.html",
];

var preLoad = function () {
  return caches.open("offline").then(function (cache) {
    // caching index and important routes
    return cache.addAll(filesToCache);
  });
};

self.addEventListener("fetch", function (event) {
  event.respondWith(
    checkResponse(event.request).catch(function () {
      return returnFromCache(event.request);
    })
  );
  event.waitUntil(addToCache(event.request));
});

var checkResponse = function (request) {
  return new Promise(function (fulfill, reject) {
    fetch(request).then(function (response) {
      if (response.status !== 404) {
        fulfill(response);
      } else {
        reject();
      }
    }, reject);
  });
};

var addToCache = function (request) {
  return caches.open("offline").then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
};

var returnFromCache = function (request) {
  return caches.open("offline").then(function (cache) {
    return cache.match(request).then(function (matching) {
      if (!matching || matching.status == 404) {
        return cache.match("index.html");
      } else {
        return matching;
      }
    });
  });
};
