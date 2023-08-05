// Imports
const { 
  offlineFallback, 
  warmStrategyCache 
} = require("workbox-recipes");
const { CacheFirst } = require("workbox-strategies");
const { registerRoute } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { ExpirationPlugin } = require("workbox-expiration");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");

// Pre-cache routes
precacheAndRoute(self.__WB_MANIFEST);

// Utility function to create a CacheFirst instance with customizable options
const createCacheFirstStrategy = (cacheName, maxAgeSeconds) => new CacheFirst({
  cacheName,
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    maxAgeSeconds ? new ExpirationPlugin({ maxAgeSeconds }) : null,
  ].filter(Boolean),
});

// Page caching
const pageCache = createCacheFirstStrategy("page-cache", 30 * 24 * 60 * 60);
warmStrategyCache({
  urls: ["/index.html", "/"],
  strategy: pageCache,
});
registerRoute(({ request }) => request.mode === "navigate", pageCache);

// Asset caching
const assetCache = createCacheFirstStrategy("asset-cache");
registerRoute(
  ({ request }) => ["style", "script", "worker"].includes(request.destination),
  assetCache
);