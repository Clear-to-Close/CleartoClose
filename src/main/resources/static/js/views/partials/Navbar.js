import {isLoggedIn} from "../../auth.js";


export default function Navbar(props) {
    const loggedIn = isLoggedIn();

    let html =
        `
            <nav class="navbar navbar-expand-lg navbar-light">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler"
                            aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarToggler">
                        <a class="navbar-brand" href="/" data-link>Clear To Close</a>
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0 justify-end">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/" data-link>Home</a>
                            </li>
        `

    if (isLoggedIn()) {
        //language=HTML
        html += `
            <li class="nav-item">
                <a class="nav-link" href="/realtorListing" data-link>Realtor Listing</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/logout" data-link>Logout</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/makeOffer" data-link>Make an Offer</a>
            </li>
        `

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
