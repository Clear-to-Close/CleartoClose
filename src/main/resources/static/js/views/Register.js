import createView from "../createView.js";

export default function Register(props) {
    //language=HTML
    return `
        <div class="bg-primary flex justify-center items-center content-height">
            <div class="bg-secondary w-3/4 lg:w-1/2">
                <h1 class="font-sans ui-sans-serif text-5xl leading-snug w-full px-[30px] text-center text-black my-[50px] sm:text-5xl ">
                    Register</h1>
                <form id="login-form" class="flex flex-col items-center text-center justify-center px-[15px] w-full">
                    <div id="emptyInfo" class="text-red-600"></div>
                    <label for="firstname" class="px-[10px] my-auto">First Name</label>

                    <input id="firstname" class="w-11/12 rounded mx-1 my-1 p-1" name="firstname" type="text"/>

                    <label for="lastname" class="px-[10px] my-auto">Last Name</label>

                    <input id="lastname" class="w-11/12 rounded mx-1 my-1 p-1" name="lastname" type="text"/>

                    <label for="email" class="px-[10px] my-auto">Email Address</label>

                    <input id="email" class="w-11/12 rounded mx-1 my-1 p-1" name="email" type="text"/>

                    <label for="phone-number" class="px-[10px] my-auto">Phone Number</label>

                    <input id="phone-number" class="w-11/12 rounded mx-1 my-1 p-1" name="phone-number" type="text"/>

                    <label for="username" class="px-[10px] my-auto">Username</label>

                    <input id="username" class="w-11/12 rounded mx-1 my-1 p-1" name="username" type="text"/>

                    <label for="password" class="px-[10px] my-auto">Password</label>

                    <input id="password" class="w-11/12 rounded mx-1 my-1 p-1" name="password" type="password"/>

                    <button id="register-btn" class="w-1/2 p-2 mx-1 my-2 rounded-md shadow-xl text-white bg-callToAction">Register</button>
                </form>
            </div>
        </div>`;
}

export function RegisterEvent() {
    $("#register-btn").click(function (e) {
        e.preventDefault();
        console.log("#register-btn");

        const email = $("#email").val()
        const password = $("#password").val()
        const phoneNumber = $("#phone-number").val()
        const firstName = $("#firstname").val()
        const lastName = $("#lastname").val()
        const username = $("#username").val()


        const newUser = {
            firstName,
            lastName,
            phoneNumber,
            email,
            username,
            password
        }
        console.log(newUser);

        let request = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newUser)
        }

        if(email === "" || password === "" || firstname === "" || lastname === "" || username === ""){
            alert("Please enter your information.")
        }else {
            fetch(`http://${BACKEND_HOST}:${PORT}/api/users/create`, request)
                .then(response => {
                    console.log(response.status);
                    createView("/");

                })
        }
    })
}

