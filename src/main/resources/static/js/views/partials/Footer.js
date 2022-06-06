export default function Footer(props) {
    //language=HTML
    return `
        <footer class="w-full h-[80px] bottom-0 bg-primary">
            <div class="container-fluid flex justify-center">
                <ul class="flex justify-center items-center text-">
                    <li>
                        <a class="nav-link" href="/realtorListing" data-link>About</a>
                    </li>
                    <li>
                        <a class="navbar-brand" href="/" data-link>
                            <img src="../../../img/logo.png"
                                 alt="Clear to Close Logo">
                        </a>
                    </li>
                    <li>
                        <a class="nav-link" href="/realtorListing" data-link>Contact Us</a>
                    </li>
                </ul>
<!--                <br>-->
<!--                <span>Copyright© 2022, Clear to Close</span>-->
            </div>
        </footer>
    `
}
