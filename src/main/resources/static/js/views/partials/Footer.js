export default function Footer(props) {
    //language=HTML
    return `
        <footer class="w-full h-[80px] flex justify-center bottom-0 bg-primary">
            <div class="container-fluid flex justify-center">
                <ul class="flex justify-center items-center">
                    <li class="flex justify-center items-center px-3">
                        <a class="text-navLink text-sm" href="/realtorListing" data-link>About</a>
                    </li>
                    <li class="flex justify-center items-center px-3">
                        <a href="/" data-link>
                            <img src="../../../img/logoMedium.png"
                                 alt="Clear to Close Logo">
                        </a>
                    </li class="flex justify-center items-center px-3">
                    <li>
                        <a class="text-navLink text-sm" href="/realtorListing" data-link>Contact Us</a>
                    </li>
                </ul>
<!--                <br>-->
<!--                <span>Copyright© 2022, Clear to Close</span>-->
            </div>
        </footer>
    `
}
