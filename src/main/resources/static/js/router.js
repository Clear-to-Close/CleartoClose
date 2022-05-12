/**
 * Returns the route object for a specific route based on the given URI
 * @param URI
 * @returns {*}
 */
import Home from "./views/Home.js";
import ListingIndex, {ListingEvent} from "./views/Listing.js";
import Error404 from "./views/Error404.js";
import Loading from "./views/Loading.js";
import RealtorListing, {RealtorListingEvent} from "./views/RealtorListing.js";
import Login, {LoginEvent} from "./views/Login.js";
import {LogoutEvent} from "./views/Logout.js";
import Offers, {OfferEvent} from "./views/Offers.js";
import AllListings, {AllListingsEvent} from "./views/AllListings.js";

export default function router(URI) {
    const routes = {
        '/': {
            returnView: Home,
            state: {},
            uri: '/',
            title: 'Home',
        },
        '/login': {
            returnView: Login,
            state: {},
            uri: '/login',
            title: "Login",
            viewEvent: LoginEvent
        },
        '/logout': {
            returnView: Login,
            state: {},
            uri: '/logout',
            title: "Logout",
            viewEvent: LogoutEvent
        },
        '/realtorListing': {
            returnView: RealtorListing,
            state: {},
            uri: '/realtorListing',
            title: "Realtor Listing",
            viewEvent: RealtorListingEvent
        },
        '/listings': {
            returnView: ListingIndex,
            state: {
                listings: "/api/listings"
            },
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
        },
        '/offers': {
            returnView: Offers,
            state: {
                offers: "/api/offers/findByListing",
            },
            uri: '/offers',
            title: 'Offers',
            viewEvent: OfferEvent
        },
        '/allListings': {
            returnView: AllListings,
            state: {},
            uri: '/allListings',
            title: 'All Listings',
            viewEvent: AllListingsEvent
        }
    };
    let [base, extra] =URI.split("?")
    for (const key in routes) {
        if (key.includes(URI)){
            return routes[URI]
        } else if(key.includes(base)) {
            let stateBase = base.split("/")[1]
            console.log(stateBase)
            routes[base].state[stateBase] = `${routes[base].state[stateBase]}?${extra}`
            return routes[base]
        }
    }
}
