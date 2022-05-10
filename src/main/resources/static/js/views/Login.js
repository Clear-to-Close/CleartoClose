import createView from "../createView.js";

export default function Login(props) {
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <title>Log In</title>
</head>
<body class="h-screen items-center text-center">
<div class="flex items-center text-center justify-between flex-wrap">

<h1 class="font-sans ui-sans-serif text-5xl leading-snug w-full px-[30px] text-center text-black my-[50px]">Login</h1>
<form id="login-form" class="flex items-center text-center justify-center px-[15px] w-full">
    <label for="username" class="px-[10px]">Email Address</label>
    <input id="username" name="username" type="text"/>
    <label for="password" class="px-[10px]">Password</label>
    <input id="password" name="password" type="password"/>
    <input id="login-btn" class="flex-wrap justify-between px-[15px]" type="submit" value="Login"/>
</form>
<p class="register-link flex-wrap px-[648px] my-[50px]">Don't have an account? Register <a href="">here</a>.</p>
</div>
<style>
body{
background: linear-gradient(to top left, #9ad5e7, #0592cd);
}
</style>
</body>
</html>`;
}
    //TODO
    // 1. Get user object using fetch()
    // 2. Compare user object password to input field password
    // 3 .if same createView("/listings")

    export function LoginEvent(){
        $("#login-btn").click(function(){
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
                            if(user[0].password === password){
                                localStorage.setItem('greenLight', 'go');
                                localStorage.getItem('greenlight');
                                createView("/listings")
                            } else  {
                                console.log("The password is incorrect")
                            }
                        })
                }).catch(error=>{
                console.log(error.status)
            })
        })
    }
