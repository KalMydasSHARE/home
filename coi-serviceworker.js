/*
 * Neutralise (2026-07-04). L'approche coi-serviceworker (COOP same-origin pour
 * obtenir l'isolation cross-origin requise par XMTP v7) cassait la connexion
 * Privy : sous COOP same-origin, le popup de login perd window.opener, ce qui
 * empeche MetaMask et Google de se connecter. Le conflit isolation vs login est
 * un choix d'architecture a trancher a part (voir OP 97). En attendant, ce
 * worker ne fait rien d'autre que se desenregistrer lui-meme et rendre la main.
 */
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (event) => {
  event.waitUntil(
    self.registration
      .unregister()
      .then(() => self.clients.matchAll())
      .then((clients) => clients.forEach((c) => c.navigate(c.url))),
  )
})
