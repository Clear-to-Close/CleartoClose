import {isLoggedIn} from "../../auth.js";


export default function Navbar(props) {
    const loggedIn = isLoggedIn();

    let html =
        `
            <nav class="navbar navbar-expand-lg p-3">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler"
                            aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse flex justify-between" id="navbarToggler">
                        <a class="navbar-brand text-[#FFCA36] bg-[#FFCA36]" href="/" data-link>Clear to Close</a>
                        `

    if (isLoggedIn()) {
        //language=HTML
        html += `
            <ul class="navbar-nav me-auto mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link" href="/realtorListing" data-link>Realtor Listing</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/profile" data-link>Profile</a>
                </li>
            </ul>
            <ul>
                <li class="nav-item">
                    <a class="nav-link" href="/logout" data-link>Logout</a>
                </li>
            </ul>`
    } else {
        //language=html
        html += `
            <ul>
                <li class="nav-item">
                    <a class="nav-link text-white" href="/login" data-link>Login</a>
                </li>
            </ul>`
    }

    //language=HTML
    html += `
        </div>
        </div>
        </nav>`

    return html;
}
