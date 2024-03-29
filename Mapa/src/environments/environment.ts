// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  //Utilización de Token para la generación de los mapas (Token proporcionado por Mapbox)
  mapbox: {
    accessToken: 'pk.eyJ1IjoiYng0MWZvcmNlIiwiYSI6ImNrN20yNTc5eTAxYnYzZXFlNmR1NmNkaDkifQ.6b1IpGggpqHc9HKh-O6Xpw'
  },
  production: true,
  //URL Direccionada al Servidor node, que proporcionará una respuesta como JSON
  url: 'http://localhost:3000/api'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
