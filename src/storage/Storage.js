export default class Storage {
    static get accessToken() {
        return localStorage.accessToken;
    }

    static set accessToken(v) {
        localStorage.accessToken = v;
    }
}
