# Documentation

## Backend

### 1. Emails

Les emails sont gérés par la librairie `nodemailer`, on l'installe dans le backend avec la commande

```zsh
npm install nodemailer
```

Ensuite on configure une connexion avec la méthode `createTransport` et on ajout les données de la connexion

```js
const transporter = nodemailer.createTransport({
  service: 'gmail', // gmail est mieux
  auth: {
    user: process.env.EMAIL_USER, // le mail dans les varibales d'environement
    pass: process.env.EMAIL_PASSWORD // Le mot de pass utilisé par le composant est un mot de passe généré, et non celui utilisé lors d'une connexion classique pour le comtpe google
  }
});
```

la fonction principale est `sendEmail` qui prend en argument les options de l'adresse mail, à savoir

- `from` : expéditeur
- `to` : destinataire
- `subject` : objet
- `text` : message à envoyé
- `html` : forme du message (html et css)

Le `html` est tiré des template dans le dossier `/utilities/templates` selon le contexte

- Contact normal via la page d'accueil : `contactEmail.js`
- Accusé de réception de la demande de réservation : `reservationEmail.js` qui est envoyé à l'étudiant lors de la réservation avec un détail de l'équipement demandé et l'id de la réservation
- Mails de confirmation (approuvé/refusé) : `reservationEmail.js` Un envoyé à l'étudiant, et un autre au responsable qui a approuvé/refusé la demande

## Frontend

### 1. Chatbot

Le chatbot est implémenté dans le frontend via le composant `src/components/chatbot.jsx`

La logique est directe, selon le contexte (étudiant, technicien, responsable ou visiteur de la page) 4 questions se posent. Ensuite on cliquait sur le bouton de la gestion, la réponse s'affiche.

Le reste du composant est juste la forme html et css. Le composant est directement intégré dans `App.jsx` au lieu de chaque page pour s'assurer qu'il est toujours présent.

### 2. QR code

Le QR code est implémenté via la librairie React `qrcode.react`, on l'installe dans la partie frontend de la page via la commande

```zsh
npm install qrcode.react
```

Ensuite on peut directement implémenter le qrcode dans le jsx avec la balise :

```jsx
<QRCodeCanvas
    value={generateQRData(equipment)}
    size={50}
    level="M"
/>
```

- l'option `value` est celle pour les données (site web par exemple, dans notre cas il s'agit d'un format json avec : id, nom, description de l'équipement) 

- l'option `size` est pour la dimension
- l'option `level` est pour le niveau de correction d'erreur `L` pour low, `M` pour medium, `H` pour high
