/**
 * Returns the route object for a specific route based on the given URI
 * @param URI
 * @returns {*}
 */
import Home, {HomeEvents} from "./views/Home.js";
import ListingIndex, {ListingEvent} from "./views/Listing.js";
import Error404 from "./views/Error404.js";
import Loading from "./views/Loading.js";
import RealtorListing, {RealtorListingEvent} from "./views/RealtorListing.js";
import Login, {LoginEvent} from "./views/Login.js";
import {LogoutEvent} from "./views/Logout.js";
import Offers, {OfferEvent} from "./views/Offers.js";
import MakeOffer, {MakeAnOffer} from "./views/MakeOffer.js";
import AllListings, {AllListingsEvent} from "./views/AllListings.js";
import Register, {RegisterEvent} from "./views/Register.js";
import ProfilePage, {ProfileEvents} from "./views/Profile.js";


export default function router(URI) {
    const routes = {
        '/': {
            returnView: Home,
            state: {},
            uri: '/',
            title: 'Home',
            viewEvent: HomeEvents
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
            state: {
                realtorListing: '/api'
            },
            uri: '/realtorListing',
            title: "Realtor Listing",
            viewEvent: RealtorListingEvent
        },
        '/listing': {
            returnView: ListingIndex,
            state: {
                listing: "/api/listings"
            },
            uri: '/listing',
            title: "Listing",
            viewEvent: ListingEvent
        },
        '/offers': {
            returnView: Offers,
            state: {
                offers: "/api/offers",
            },
            uri: '/offers',
            title: 'Offers',
            viewEvent: OfferEvent
        },
        '/makeOffer': {
            returnView: MakeOffer,
            state: {
                makeOffer: '/api'
            },
            uri: '/makeOffer',
            title: "Make an Offer",
            viewEvent: MakeAnOffer
        },
        '/allListings': {
            returnView: AllListings,
            state: {},
            uri: '/allListings',
            title: 'All Listings',
            viewEvent: AllListingsEvent
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
        '/register': {
            returnView: Register,
            state: {},
            uri: '/register',
            title: 'Register',
            viewEvent: RegisterEvent
        },
        '/profile': {
            returnView: ProfilePage,
            state: {
                loggedInUser: "/api/users/1"
            },
            uri: '/users',
            title: 'Your profile page',
            viewEvent: ProfileEvents
        }
    };


    let piecesOfURI = URI.split("/");
    for (const key in routes) {
        if (key === URI) {
            return routes[URI];
        } else if (key.includes(`/${piecesOfURI[1]}`)) {
            let stateBase = piecesOfURI[1];
            let pieceOfState = "";
            for (let i = 0; i < piecesOfURI.length; i++) {
                if (i > 1) {
                    pieceOfState += `/${piecesOfURI[i]}`;
                }
            }
            routes[`/${piecesOfURI[1]}`].state[stateBase] = `${routes[`/${piecesOfURI[1]}`].state[stateBase]}${pieceOfState}`
            return routes[`/${piecesOfURI[1]}`]
        }
    }
}
