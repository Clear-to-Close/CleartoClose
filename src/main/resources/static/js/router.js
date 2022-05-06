/**
 * Returns the route object for a specific route based on the given URI
 * @param URI
 * @returns {*}
 */
import ListingIndex, {ListingEvent} from "./views/Listing.js";


export default function router(URI) {
    const routes = {
        // '/': {
        //     returnView: Home,
        //     state: {},
        //     uri: '/',
        //     title: 'Home',
        // },
        // '/login': {
        //     returnView: Login,
        //     state: {},
        //     uri: '/login',
        //     title: "Login",
        //     viewEvent: LoginEvent
        // },
        '/listings': {
            returnView: ListingIndex,
            state: {},
            uri: '/listings',
            title: "Listings",
            viewEvent: ListingEvent
        }
    };

    return routes[URI];
}