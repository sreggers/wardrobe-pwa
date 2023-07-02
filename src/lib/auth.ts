import Keycloak, { type KeycloakConfig } from 'keycloak-js'

//keycloak init options
const initOptions: KeycloakConfig = {
    url: 'http://127.0.0.1:8081/',
    realm: 'wardrobe',
    clientId: 'wardrobe-pwa'
}

let keycloak: Keycloak;

const onfulfilled = (auth: boolean) => {
    if (!auth) {
        window.location.reload();
    } else {
        console.info("Authenticated");
    }

    if (keycloak.authenticated) {
        localStorage.setItem("react-token", keycloak.token!);
        localStorage.setItem("react-refresh-token", keycloak.refreshToken!);
    
        setTimeout(() => {
            keycloak.updateToken(70).then((refreshed) => {
                if (refreshed) {
                    console.debug('Token refreshed' + refreshed);
                } else {
                    console.warn('Token not refreshed, valid for '
                        + Math.round(keycloak.tokenParsed!.exp! + keycloak.timeSkew! - new Date().getTime() / 1000) + ' seconds');
                }
            }).catch(() => {
                console.error('Failed to refresh token');
            });
        }, 60000);
    }
}

const onrejected = () => console.error("Authenticated Rejected");

const onfail = () => console.error("Authenticated Failed");

export const initAuth = async () => {
    keycloak = new Keycloak(initOptions);
    await keycloak.init({ onLoad: 'login-required' }).then(onfulfilled, onrejected).catch(onfail);
}

export const logout = () => keycloak.logout();

