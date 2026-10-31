// home.kalmydas.com : agent de service minimal, 2026-10-05.
//
// Copie conforme de la doctrine de sw-pay.js (OF 1465). Il n'existe que pour
// rendre home installable sur Android, par le bouton « Installer
// l'application ». Il NE MET RIEN EN CACHE : une surface qui signe des
// transactions ne doit jamais servir une ancienne version de son code. Chaque
// requete part sur le reseau, telle quelle. Seule une navigation sans reseau
// recoit une page d'explication au lieu de l'erreur du navigateur.
//
// Il ne touche a rien de sensible : le coffre kal pay vit dans le stockage
// local de la page, auquel un agent de service n'a pas acces.

const MESSAGE_HORS_LIGNE = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Kal Mydas, hors ligne</title>
<style>
  body { margin:0; min-height:100vh; display:flex; align-items:center;
         justify-content:center; background:#060A18; color:#cbd5e1;
         font-family:system-ui,sans-serif; padding:24px; text-align:center; }
  p { max-width:32ch; line-height:1.6; font-size:15px; }
</style></head>
<body><p>Kal Mydas a besoin du réseau pour lire la blockchain. Reconnectez-vous,
puis rouvrez l'application. Vos fonds ne sont pas affectés : ils vivent sur la
blockchain, sous votre seul contrôle.</p>
</body></html>`

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (evenement) => {
  evenement.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (evenement) => {
  const requete = evenement.request
  if (requete.mode !== 'navigate') return
  evenement.respondWith(
    fetch(requete).catch(
      () =>
        new Response(MESSAGE_HORS_LIGNE, {
          status: 200,
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        }),
    ),
  )
})
