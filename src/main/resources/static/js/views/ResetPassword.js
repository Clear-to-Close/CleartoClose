import createView from "../createView.js";
import fetchData from "../fetchData.js";
import {validatePassword} from "./Register.js";
import {getHeaders} from "../auth.js";


export default function ResetPassword (){

    //language=html
    return `
	    <div class="flex items-center text-center justify-center bg-cover content-height"
	         style="background-image: url('https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')">
		    <div class="content-height w-full flex flex-col items-center justify-center">
			    <div class="bg-slate-200 opacity-95 border-2 border-slate-300 shadow-xl rounded-md w-3/4 lg:w-1/2">
				    <form id="login-form"
				          class="flex flex-col items-center justify-center px-[15px] w-full mx-1 my-3 p-1">
					    <div id="registration-error" class="text-red-600"></div>
                        
					    <label for="password" class="px-[10px] my-auto"></label>
					    <input id="password"
					           class="bg-slate-200 border-b-2 border-callToAction outline-0 placeholder-primary font-medium w-full mx-1 my-3 p-1"
					           name="password" type="password"
					           pattern="^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\\\\d]){1,})(?=(.*[\\\\W]){1,})(?!.*\\\\s).{8,}$"
					           placeholder="Password"/>

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

					    <button id="submit-new-password"
					            class="w-full p-2 mx-2 my-2 rounded-md shadow-xl bg-callToAction font-medium">Save
					    </button>
				    </form>
			    </div>
		    </div>
	    </div>\`;
    `
}

export function ResetEvent() {
    validatePassword();
    console.log("reset event called");
    let token = sessionStorage.getItem('token');
    $('#submit-new-password').click(function () {
        let newPassword;
        let password = $('#password').val();
        let confirmPassword = $('confirm-password').val();

        if( password === confirmPassword){
            newPassword = password;

            let request = {
                method: "PUT",
                headers: getHeaders()
            }
            fetchData({server: `/api/users/reset?password=${newPassword}&token=${token}`}, request)
                .then(response => {
                    if (response.server.status === 201) {
                        createView("/");
                    }else {
                        createView('/login')
                    }
                })
        }

    })
}
