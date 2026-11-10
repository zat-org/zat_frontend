/**
 * Removes leftover service workers (e.g. old Vite PWA /dev-sw.js)
 * that can abort HMR sockets and force Nuxt restarts on Windows.
 */
export default defineNuxtPlugin(() => {
  if (!import.meta.dev || !('serviceWorker' in navigator)) return

  void navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      void registration.unregister()
    }
  })

  if ('caches' in window) {
    void caches.keys().then((keys) => {
      for (const key of keys) {
        void caches.delete(key)
      }
    })
  }
})
