/**
 * Returns the route object for a specific route based on the given URI
 * @param URI
 * @returns {*}
 */
import ListingIndex, {ListingEvent} from "./views/Listing.js";
import Error404 from "./views/Error404.js";
import Loading from "./views/Loading.js";
import RealtorListing from "./views/RealtorListing.js";


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
        '/realtorListing': {
            returnView: ListingIndex,
            state: {},
            uri: '/realtorListing',
            title: "Realtor Listing",
            viewEvent: ListingEvent
        },
        '/listings': {
            returnView: ListingIndex,
            state: {},
            uri: '/listings',
            title: "Listings",
            viewEvent: ListingEvent
        },
        '/error': {
            returnView: Error404,
            state: {},
            uri: location.pathname,
            title: 'ERROR',
        },
        '/loading': {
            returnView: Loading,
            state: {},
            uri: location.pathname,
            title: 'Loading...',
        }
    };

    return routes[URI];
}
