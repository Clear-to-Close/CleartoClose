import createView from "../createView.js";
import {getMessage} from "../messaging.js";

export default function Login(props) {
    //language=HTML
    return `
        <div class=" items-center text-center justify-between flex-wrap min-h-[calc(100vh-75px)]">

            <h1 class="font-sans ui-sans-serif text-5xl leading-snug w-full px-[30px] text-center text-black my-[50px] sm:text-5xl ">Login</h1>
            <form id="login-form" class="flex flex-col items-center text-center justify-center px-[15px] w-full">
                <div id="incorrect-login" class="text-red-600"></div>
                <label for="username" class="px-[10px] my-auto">Email Address</label>
                
                <input id="username" class="rounded  mx-1 my-1" name="username" type="text"/>
                
                <label for="password" class="px-[10px] my-auto">Password</label>
                
                <input id="password" class="rounded mx-1 my-1" name="password" type="password"/>
                
                <input id="login-btn" class="flex flex-wrap justify-between px-[15px] rounded-md mx-1 my-1 bg-dark-blue" type="submit" value="Login"/>
            </form>
            <p class="register-link flex-wrap my-[50px] mx-auto">Don't have an account? Register <a href="">here</a>.</p>
        </div>`;
}

export function LoginEvent() {
    $("#login-btn").click(function () {
        const email = $("#username").val()
        const password = $("#password").val()

        let request = {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        }

        fetch(`http://localhost:8080/api/users?searchByEmail=${email}`, request)
            .then(response => {
                console.log(response.status);
                response.json()
                    .then(user => {
                            if (user[0].password === password) {
                                localStorage.setItem('greenLight', 'go');
                                localStorage.getItem('greenLight');
                                createView("/")
                            } else if(email === "" || password === "") {
                               getMessage("Please enter username or password", 'incorrect-login');
                                return;
                            }else if(user[0].email !== email || user[0].password !== password){
                                getMessage("Please enter correct username or password", 'incorrect-login');
                                return;
                            }

                        }
                    )
            })
    })
}
