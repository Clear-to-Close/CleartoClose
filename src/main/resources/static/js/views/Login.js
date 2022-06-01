import createView from "../createView.js";

// <h1 className="text-black font-sans ui-sans-serif text-5xl leading-snug w-full px-[30px] text-center my-[50px] sm:text-5xl">Login</h1>

export default function Login(props) {
    //language=HTML
    return `
        <div class="flex items-center text-center justify-center bg-cover content-height"
             style="background-image: url('https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')">
            <div class="bg-[#c7c7dd] opacity-95 w-3/4 lg:w-1/2 border-2 border-slate-300 shadow-xl rounded-md">
                <form id="login-form" class="flex flex-col items-center text-center justify-center px-[15px] w-full mt-[100px]">
                    <div id="log-error-message" class="text-red-600 font-bold"></div>
                    <label for="email" class="px-[10px] my-auto"></label>

                    <input id="email" class=" bg-[#c7c7dd] w-3/4 mx-1 my-3 p-1 border-b-2 border-callToAction outline-0 placeholder-callToAction" name="email" type="email" placeholder="Email"/>

                    <label for="password" class="px-[10px] my-auto"></label>

                    <input id="password" class="bg-[#c7c7dd] w-3/4 mx-1 my-3 p-1 border-b-2 border-callToAction outline-0 placeholder-callToAction" name="password" type="password" placeholder="Password"/>

                    <button id="login-btn" class="w-1/4 p-2 mx-2 my-2 rounded-md shadow-xl text-white bg-callToAction">Login</button>
                </form>
                <p class="register-link flex-wrap my-[50px]">Don't have an account?
                    <button class="p-2 mx-1 my-2 rounded-md shadow-xl text-white bg-callToAction" id="goToRegister">Register Here</button>
                </p>
            </div>
        </div>`;
}

export function registrationPage () {
    $("#goToRegister").click(e => {
        e.preventDefault();
        createView("/register")
    })
}
