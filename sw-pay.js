// kal pay : agent de service minimal (OF 1465, 2026-09-05).
//
// Il n'existe que pour une chose : rendre le portefeuille installable sur un
// telephone et sur un ordinateur. Sans agent de service, le navigateur refuse
// l'installation, et sans installation aucun annuaire de portefeuilles ne peut
// nous compter comme application mobile.
//
// CE QU'IL NE FAIT PAS, ET C'EST VOULU. Il ne met aucun fichier en cache, ni le
// code du portefeuille, ni les pages, ni les images. Un agent qui garderait le
// code en memoire pourrait servir une ancienne version apres une mise a jour :
// sur une surface qui signe des transactions et manipule une cle, c'est
// inacceptable. Chaque requete part donc sur le reseau, telle quelle.
//
// Il ne touche a rien de sensible. La mnemonique et le coffre chiffre vivent
// dans le stockage local de la page, auquel un agent de service n'a pas acces.

const MESSAGE_HORS_LIGNE = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>kal pay, hors ligne</title>
<style>
  body { margin:0; min-height:100vh; display:flex; align-items:center;
         justify-content:center; background:#08090f; color:#cbd5e1;
         font-family:system-ui,sans-serif; padding:24px; text-align:center; }
  p { max-width:32ch; line-height:1.6; font-size:15px; }
</style></head>
<body><p>kal pay a besoin du réseau pour lire vos soldes et envoyer vos
transactions. Reconnectez-vous, puis rouvrez l'application. Vos fonds ne
sont pas affectés : ils vivent sur la blockchain, derrière vos douze mots.</p>
</body></html>`

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (evenement) => {
  evenement.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (evenement) => {
  const requete = evenement.request

  // Seules les navigations recoivent une reponse de secours. Le reste passe au
  // reseau sans interception : si le reseau est absent, la requete echoue
  // normalement, comme sans agent de service.
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
