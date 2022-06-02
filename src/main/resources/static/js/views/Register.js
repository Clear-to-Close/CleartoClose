import createView from "../createView.js";
import { getHeaders } from "../auth.js";
import fetchData from "../fetchData.js";
import { getMessage } from "../utility.js";

export default function Register(props) {
    //language=HTML
    return `
        <div class="flex items-center text-center justify-center bg-cover content-height"
             style="background-image: url('https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')">
            <div class="content-height w-full flex flex-col items-center justify-center">
                <div class="bg-slate-200 opacity-95 border-2 border-slate-300 shadow-xl rounded-md w-3/4 lg:w-1/2">
                    <form id="login-form" class="flex flex-col items-center justify-center px-[15px] w-full mx-1 my-3 p-1">
                        <div id="registration-error" class="text-red-600"></div>

                        <label for="firstname" class="px-[10px] my-auto"></label>
                        <input id="firstname"
                               class="bg-slate-200 border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full mx-1 my-3 p-1"
                               name="firstname" type="text" placeholder="First Name"/>

                        <label for="lastname" class="px-[10px] my-auto"></label>
                        <input id="lastname"
                               class="bg-slate-200 border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full mx-1 my-3 p-1"
                               name="lastname" type="text" placeholder="Last Name"/>

                        <label for="email" class="px-[10px] my-auto"></label>
                        <input id="email"
                               class="bg-slate-200 border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full mx-1 my-3 p-1"
                               name="email" type="text" placeholder="Email"/>

                        <label for="phone-number" class="px-[10px] my-auto"></label>
                        <input id="phone-number"
                               class="bg-slate-200 border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full mx-1 my-3 p-1"
                               name="phone-number" type="text" placeholder="Phone Number"/>

                        <label for="username" class="px-[10px] my-auto"></label>
                        <input id="username"
                               class="bg-slate-200 border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full mx-1 my-3 p-1"
                               name="username" type="text" placeholder="Username"/>

                        <label for="password" class="px-[10px] my-auto"></label>
                        <input id="password"
                               class="bg-slate-200 border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full mx-1 my-3 p-1"
                               name="password" type="password"
                               pattern="^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\\d]){1,})(?=(.*[\\W]){1,})(?!.*\\s).{8,}$" placeholder="Password"/>

                        <div id="message" class="hidden font-medium">
                            <h3>Password must contain the following:</h3>
                            <p id="letter" class="invalid">A <b>lowercase</b> letter</p>
                            <p id="capital" class="invalid">A <b>capital (uppercase)</b> letter</p>
                            <p id="number" class="invalid">A <b>number</b></p>
                            <p id="specialCharacter" class="invalid">A <b>special character</b></p>
                            <p id="length" class="invalid">Minimum <b>8 characters</b></p>
                        </div>

                        <label for="confirm-password" class="hidden"></label>
                        <input id="confirm-password"
                               class="bg-slate-200 border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full mx-1 my-3 p-1"
                               name="confirm-password" type="password" placeholder="Confirm Password"/>

                        <button id="register-btn" class="w-full p-2 mx-2 my-2 rounded-md shadow-xl bg-callToAction font-medium">Register</button>
                    </form>
                </div>
            </div>
        </div>`;
}

const validatePassword = _ => {
    let $password = $("#password");
    let $letter = $("#letter");
    let $capital = $("#capital");
    let $number = $("#number");
    let $specialCharacter = $("#specialCharacter");
    let $passwordLength = $("#length");
    let $message = $("#message");

    $password.focus(_ => {
        $message.removeClass("hidden");
    })

    $password.blur(_ => {
        $message.addClass("hidden");
    })

    $password.keyup(function () {
        // Validate lowercase letters
        const lowerCaseLetters = /[a-z]/g;
        if (lowerCaseLetters.test($password.val())) {
            $letter.removeClass("invalid");
            $letter.addClass("valid");
        } else {
            $letter.removeClass("valid");
            $letter.addClass("invalid");
        }

        // Validate capital letters
        const upperCaseLetters = /[A-Z]/g;
        if (upperCaseLetters.test($password.val())) {
            $capital.removeClass("invalid");
            $capital.addClass("valid");
        } else {
            $capital.removeClass("valid");
            $capital.addClass("invalid");
        }

        // Validate numbers
        const numbers = /[0-9]/g;
        if (numbers.test($password.val())) {
            $number.removeClass("invalid");
            $number.addClass("valid");
        } else {
            $number.removeClass("valid");
            $number.addClass("invalid");
        }

        const specialCharacters = /[@$!%*#?&]/g;
        if (specialCharacters.test($password.val())) {
            $specialCharacter.removeClass("invalid");
            $specialCharacter.addClass("valid");
        } else {
            $specialCharacter.removeClass("valid");
            $specialCharacter.addClass("invalid");
        }

        // Validate length
        if ($password.val().length >= 8) {
            $passwordLength.removeClass("invalid");
            $passwordLength.addClass("valid");
        } else {
            $passwordLength.removeClass("valid");
            $passwordLength.addClass("invalid");
        }
    })
}

const registerUser = _ => {
    $("#register-btn").click(function (e) {
        e.preventDefault();

        const email = $("#email").val()
        const password = $("#password").val()
        const confirmPassword = $("#confirm-password").val()
        const phoneNumber = $("#phone-number").val()
        const firstName = $("#firstname").val()
        const lastName = $("#lastname").val()
        const username = $("#username").val()

        if (password !== confirmPassword) {
            getMessage("Passwords Do Not Match","registration-error");
            return;
        }

        const newUser = {
            firstName,
            lastName,
            phoneNumber,
            email,
            username,
            password
        }

        let request = {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(newUser)
        }

        if (email === "" || password === "" || firstname === "" || lastname === "" || username === "") {
            getMessage("Please enter your information","registration-error");
        } else {
            fetchData({server: "/api/users/create"}, request)
                .then(response => {
                    if (response.server.status === 201) {
                        createView("/");
                    }
                })
        }
    })
}

export function RegisterEvent() {
    validatePassword();
    registerUser();
}

