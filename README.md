Ce este și ce face proiectul?

Proiectul OnlinePortofolio are ca scop crearea unui mediu în care artiștii să își poată încărca lucrările de artă în mediul online. Astfel, aplicația este de fapt un portofoliu pentru operele artiștilor, o pagină web care nu necesită logare, însă oferă posibilitatea de adăugare, ștergere sau editare a elementelor postate.

Tehnologiile utilizate sunt următoarele: Vue3JS, PrimeVue, Tailwind, NestJS cu TypeScript, TypeScript pentru Vue3JS.

Cum se rulează proiectul?

Am făcut o configurație în pachetul package.json ("start:backend": "cd ../backoffice && npm run start:dev", "start:frontend": "cd ../frontoffice && npm run dev", "start": "concurrently "npm run start:backend" "npm run start:frontend"") pentru a putea rula simultan partea de backend și cea de frontend utilizând o singură comandă: npm start. Pentru a utiliza npm start, am instalat concurrently cu comanda npm install concurrently --save-dev.

Modul de utilizare și funcționalitățile proiectului

Accesând pagina principală, poți naviga către secțiunea Explore, unde ai posibilitatea de a vizualiza toate operele de artă disponibile sau de a selecta un anumit artist pentru a vedea lucrările acestuia. De asemenea, ai opțiunea de a adăuga, șterge și modifica operele de artă existente. Dacă artistul dorit nu se află deja în listă, poți bifa caseta de selectare (checkbox) și adăuga un artist nou, completând informațiile relevante în câmpurile de text disponibile.
