/* init function for KeyCloak Service*/
import {KeycloakService} from "keycloak-angular";
import {environment} from "../../environments/environment";

export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        if (environment.production) {
          await keycloak.init({
            config: {
              url: environment.keyCloak,
              realm: environment.realm,
              clientId: environment.clientID
            },
            initOptions: {
              onLoad: 'login-required',
              checkLoginIframe: false
            },
            bearerExcludedUrls: []
          });
        }
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
}
