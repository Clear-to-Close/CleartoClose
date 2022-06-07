import {isLoggedIn} from "../../auth.js";
import {getUserRole} from "../../utility.js";


export default function Navbar(props) {
    //language=HTML
    let html =
        `
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                <div class="container-fluid">

                    <a class="navbar-brand" href="/">
                        <img data-link src="../../../img/logo.png"
                             alt="Clear to Close Logo">
                    </a>
                    <button class="navbar-toggler outline-0" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarToggler"
                            aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-end" id="navbarToggler">
                        <ul class="navbar-nav mb-lg-0">
        `

    if (isLoggedIn()) {
        if (getUserRole() === "REALTOR") {
            //language=HTML
            html += `<li class="nav-item">
                <a class="nav-link" href="/realtorListing" data-link>Create Listing</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/logout" data-link>Logout</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/profile" data-link>Profile</a>
            </li>`
        } else {
            //language=HTML
            html += `
            <li class="nav-item">
                <a class="nav-link" href="/logout" data-link>Logout</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/profile" data-link>Profile</a>
            </li>`
        }
    } else {
        html += `
            <li class="nav-item">
                <a class="nav-link" href="/login" data-link>Login</a>
            </li>`
    }

    //language=HTML
    html += `
        </ul>
        </div>
        </div>
        </nav>`

    return html;
}
