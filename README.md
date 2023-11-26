<h1 align="center"><strong> TalkAway Authentification API</strong></h1>

<div align="center"><h2>🚀 Cette app est construite avec la stack : React Native - Typescript - Expo </h2></div>

<h1 align="center">

![](./docs/readme_stack.png)

</h1>

### Utilisez les variables d'environnements :

```
# Connexion API
TALK_AWAY_API_AUTH_URL = PATH_URL

# La variable IPCONFIG_API_BASE_URL attend l'address IPV4 de votre machine
IPCONFIG_API_BASE_URL = "http://{0.0.0.0}:3007"
```

### Ou rendez-vous dans le dossier utils à la racine du projet pour update les variables const :

```
# Connexion API
export const TALK_AWAY_API_BASE_URL = PATH_URL

# La variable IPCONFIG_API_BASE_URL attend l'address IPV4 de votre machine
export const IPCONFIG_API_BASE_URL = 'http://{0.0.0.0}:3007';
```

### Pour run le projet :

```
npm install

npx expo start
```

## Librairies utilisées : 
- react-navigattion
- react-native-svg
- react-native-vector-icons
