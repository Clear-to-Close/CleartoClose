import createView from "../createView.js    ";

export function LogoutEvent() {
    localStorage.clear();
    sessionStorage.clear();
    createView('/');
}
