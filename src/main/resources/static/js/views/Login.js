import createView from "../createView.js";

export default function Login(props) {
    //language=HTML
    return `
        <div class="flex items-center text-center justify-center bg-cover content-height"
             style="background-image: url('https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')">
            <div class="content-height w-full flex flex-col items-center justify-center">
                <div class="bg-slate-200 opacity-95 border-2 border-slate-300 shadow-xl rounded-md w-3/4 lg:w-1/2">
                    <form id="login-form" class="flex flex-col items-center text-center justify-center px-[15px] w-full mt-[100px]">
                        <div id="log-error-message" class="text-red-600 font-bold"></div>

                        <label for="email" class="px-[10px] my-auto"></label>
                        <input id="email" class="bg-slate-200 border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full mx-1 my-3 p-1"
                               name="email" type="email" placeholder="Email"/>

                        <label for="password" class="px-[10px] my-auto"></label>
                        <input id="password" class="bg-slate-200 border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full mx-1 my-3 p-1"
                               name="password" type="password" placeholder="Password"/>

                        <button id="login-btn" class="w-full p-2 mx-2 my-2 rounded-md shadow-xl bg-callToAction font-medium">Login</button>
                    </form>
                    <p class="register-link flex-wrap my-[50px]">Don't have an account?
                        <button class="p-2 mx-1 my-2 rounded-md shadow-xl bg-callToAction font-medium" id="goToRegister">Register Here</button>
                    </p>
                </div>
            </div>
        </div>`;
}

export function registrationPage() {
    $("#goToRegister").click(e => {
        e.preventDefault();
        createView("/register")
    })
}
