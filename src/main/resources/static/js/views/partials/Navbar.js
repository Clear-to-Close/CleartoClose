import {isLoggedIn} from "../../auth.js";


export default function Navbar(props) {
    const loggedIn = isLoggedIn();
    //language=HTML
    let html = `
        <nav>
            <a href="/" data-link>Home</a>
            <a href="/listings" data-link>Listings</a>
            <a href="/login" data-link>Login</a>
            <a href="/realtorListing" data-link>Realtor Listing</a>`;

    html = html + `</nav>`;
    return html;
}


// <a href="/user" data-link>Profile</a>
// <a href="/logout" data-link>Log Out</a>
