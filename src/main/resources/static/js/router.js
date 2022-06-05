/**
 * Returns the route object for a specific route based on the given URI
 * @param URI
 * @returns {*}
 */

import Home, {HomeEvents} from "./views/Home.js";
import ListingIndex, {ListingEvent} from "./views/Listing.js";
import Error404 from "./views/Error404.js";
import Loading from "./views/Loading.js";
import LoginEvent from "./auth.js";
import RealtorListing, {RealtorListingEvent} from "./views/RealtorListing.js";
import Login from "./views/Login.js";
import {LogoutEvent} from "./views/Logout.js";
import Offers, {OfferEvent} from "./views/Offers.js";
import MakeOffer, {MakeAnOffer} from "./views/MakeOffer.js";
import AllListings, {AllListingsEvent} from "./views/AllListings.js";
import Register, {RegisterEvent} from "./views/Register.js";
import ProfilePage, {ProfileEvents} from "./views/Profile.js";
import {getLoggedInUser} from "./utility.js";
import EditOffer, {EditEvent} from "./views/EditOffer.js";
import ResetPassword, {ResetEvent} from "./views/ResetPassword.js";


export default function router(URIObject) {
    console.log(URIObject)
    const newURI = JSON.parse(sessionStorage.getItem("URI"));
    console.log(newURI)

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
            state: {},
            uri: '/realtorListing',
            title: "Realtor Listing",
            viewEvent: RealtorListingEvent
        },
        '/listing': {
            returnView: ListingIndex,
            state: {},
            uri: '/listing',
            title: "Listing",
            viewEvent: ListingEvent
        },
        '/offers': {
            returnView: Offers,
            state: {},
            uri: '/offers',
            title: 'Offers',
            viewEvent: OfferEvent
        },
        '/makeOffer': {
            returnView: MakeOffer,
            state: {},
            uri: '/makeOffer',
            title: "Make an Offer",
            viewEvent: MakeAnOffer
        },
        '/editOffer': {
            returnView: EditOffer,
            state: {},
            uri: '/editOffer',
            title: 'Edit your Offer',
            viewEvent: EditEvent
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
                profile: `/api/users/searchByEmail?email=${getLoggedInUser()}`
            },
            uri: '/profile',
            title: 'Your profile page',
            viewEvent: ProfileEvents
        },
        '/reset': {
            returnView: ResetPassword,
            state: {
            },
            uri: '/reset',
            title: 'Reset Password',
            viewEvent: ResetEvent
        }
    };

    const URIkey = Object.keys(URIObject)[0]
    console.log(URIkey)
    for (const routeKey in routes) {
        if (routeKey === URIObject) {
            if (newURI !== null) {
                routes[routeKey].state = newURI
            }
            return routes[URIObject];
        } else if (routeKey.includes(`/${URIkey}`)) {
            let URIStrings = Object.values(URIObject)[0];
            Object.keys(URIStrings).forEach(endpointKey => {
                routes[`/${URIkey}`].state[`${endpointKey}`] = `${URIStrings[endpointKey]}`
            })
            let URIToSave = routes[`/${URIkey}`].state
            console.log(URIToSave)
            sessionStorage.setItem("URI", JSON.stringify(URIToSave))
            console.log(routes[`/${URIkey}`])
            return routes[`/${URIkey}`]
        }
    }
}
