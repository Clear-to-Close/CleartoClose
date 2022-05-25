import createView from "../createView.js";
import {getMessage} from "../messaging.js";

export default function Login(props) {
    //language=HTML
    return `
        <div class="bg-primary flex items-center text-center justify-center min-h-[calc(100vh-90px)]">
            <div class="bg-secondary w-3/4 lg:w-1/2">
                <h1 class="font-sans ui-sans-serif text-5xl leading-snug w-full px-[30px] text-center text-black my-[50px] sm:text-5xl">Login</h1>
                <form id="login-form" class="flex flex-col items-center text-center justify-center px-[15px] w-full">
                    <div id="incorrect-login" class="text-red-600"></div>
                    <label for="username" class="px-[10px] my-auto">Email Address</label>

                    <input id="username" class="w-11/12 rounded mx-1 my-1 p-1" name="username" type="text"/>

                    <label for="password" class="px-[10px] my-auto">Password</label>

                    <input id="password" class="w-11/12 rounded mx-1 my-1 p-1" name="password" type="password"/>

                    <button id="login-btn" class="w-1/2 p-2 mx-1 my-2 rounded-md shadow-xl text-white bg-callToAction">Login</button>
                </form>
                <p class="register-link flex-wrap my-[50px]">Don't have an account?
                    <button class="p-2 mx-1 my-2 rounded-md shadow-xl text-white bg-callToAction" id="goToRegister">Register Here</button>
                </p>
            </div>
        </div>`;
}

const login = _ => {
    $("#login-btn").click(e => {
        e.preventDefault();
        const email = $("#username").val();
        const password = $("#password").val();

        let request = {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        }

        fetch(`http://${BACKEND_HOST}:${PORT}/api/users/searchByEmail?email=${email}`, request)
            .then(response => {
                console.log(response.status);
                response.json()
                    .then(user => {
                            console.log(user)
                            if (user.password === password) {
                                localStorage.setItem('accessToken', `${user.id}`);
                                createView("/")
                            } else if (email === "" || password === "") {
                                getMessage("Please enter username or password", 'incorrect-login');
                                return;
                            } else if (user.email !== email || user.password !== password) {
                                getMessage("Please enter correct username or password", 'incorrect-login');
                                return;
                            }
                        }
                    )
            })
    })
}

const registrationPage = _ => {
    $("#goToRegister").click(e => {
        e.preventDefault();
        createView("/register")
    })
}

export function LoginEvent() {
    login();
    registrationPage();
}
