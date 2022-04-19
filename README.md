# Heroku Mono Repo Tutorial

## Project klaarmaken

- Zorg dat je een Procfile hebt in beide projecten (leeg bij app, ingevuld bij api)
  - Indien je npm gebruikt (dus een package-lock file hebt) gebruik dan `npm  prod` in plaats van `yarn prod`   
- Zorg bij je API eventueel dat je via package.json de Node versie meegeeft (`engines`)
- Zorg bij de API dat je `process.env.PORT` als poort gebruikt zodat Heroku dit kan wijzigen
  - Opgelet: als voorbeeld staat de .env file op Git. Dit is uiteraard niet de bedoeling bij jouw project.

## Heroku

### App

Maak 2 verschillende applicaties aan op Heroku. Kies voor Europa ipv USA.

### Git

Voeg bij beide applicaties toegang tot je Github project toe.
Indien dit niet lukt, zie alternatief.

### Buildpacks

Voeg bij instellingen volgende buildpacks toe (in deze volgorde!):

- https://github.com/lstoll/heroku-buildpack-monorepo
- https://buildpack-registry.s3.amazonaws.com/buildpacks/heroku-community/multi-procfile.tgz
- API
  - heroku/nodejs
- APP
  - https://buildpack-registry.s3.amazonaws.com/buildpacks/mars/create-react-app.tgz

### ENV

Voeg bij instellingen volgende Config Vars toe

- API

  | Var      |    Value     |
  | -------- | :----------: |
  | APP_BASE |     api/     |
  | PROCFILE | api/Procfile |

  **Vergeet ook je eigen variabelen niet (degene die je in `.env` had)**
  Let op: het kan zijn dat je bij de Mongo connection string `&w=majority moet verwijderen

- APP

  | Var      |    Value     |
  | -------- | :----------: |
  | APP_BASE |     app/     |
  | PROCFILE | app/Procfile |

  **Vergeet ook je eigen variabelen niet (degene die je in `.env.development.local` had)**

### Deploy

Deploy de app en kijk of het werkt

### Alternatief 1

Indien het niet lukt om de Github repository te koppelen, kan je dit ook manueel doen. Je zal dan echter ook altijd manueel moeten deployen.

1. Download Heroku CLI
   * https://devcenter.heroku.com/articles/heroku-cli#download-and-install
2. Eénmalig inloggen 
   * `heroku login`
3. Binnen je projectfolder:
   1. App toevoegen (APP_NAME is de naam van je app op Heroku)
      * `heroku git:remote -a APP_NAME`
   2. Hernoemen naar heroku-app
      *  `git remote rename heroku heroku-app`
   3. Api toevoegen (API_NAME is de naam van je app op Heroku)
      * `heroku git:remote -a API_NAME`
   4. Hernoemen naar heroku-api
      *  `git remote rename heroku heroku-api`
4. Elke keer je wil deployen (eerst add en commit):
   * App deployen `git push heroku-app main`
   * API deployen `git push heroku-api main`
    * Vervang `main` met je branch indien je op een andere branch zit (bv. `master`)
5. Indien je wil deployen zonder een wijziging aan je code, kan je een "lege" commit doen alvorens te pushen
   * `git commit --allow-empty -m "Empty commit"`


### Alternatief 2

Je kan ook via Github Actions de Heroku CLI aanspreken. (Zelfstudie)


## Veel voorkomende problemen

* Ik kan niet pushen naar Heroku
  * Zorg dat je de juiste branch pushed. Zit jij op master, doe dan bv. `git push heroku-app master`
* Ik heb CORS errors in mijn app bij het aanspreken van de API
  * Vaak is er een onderliggend probleem. Kijk naar de logs van je API, bv. MongoDB die niet goed staat?
* Ik zie bij de API een error, maar geen duidelijke. 
  * Herstart je applicatie (more -> Restart Dynos) en kijk dan naar de logs (more -> View logs). Nu zal de error wel duidelijk zijn

