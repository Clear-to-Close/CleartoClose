import Navbar from "./views/partials/Navbar.js";
import Footer from "./views/partials/Footer.js";

/**
 * Pushes the current URI to the URL bar and sets the HTML of the app div.
 * @param props - the data required for view rendering
 * @param route - the object containing information for the given endpoint
 */
export default function render(props, route) {
    const app = document.querySelector('#app');
    const title = `Clear To Close - ${route.title}`;
    document.title = title;
    app.innerHTML = `${Navbar(null)} ${route.returnView(props)} ${Footer(null)}`;
    if (route.viewEvent){
        route.viewEvent();
    }
}
