import { useState } from "react";
import { serverCall } from "../utils/client";
import { LOGIN_URL } from "../utils/clientUrl";
import { API_CALL_METHOD } from "../utils/constant";
import { checkEmailValidation } from "../utils/validation";
import { showToast } from "./Toast";
import { useNavigate } from "react-router-dom";
import { userCredentials } from "../utils/localStorage";

const PhoneAuth = ({email}) =>{
    const navigate = useNavigate();
    const [emailError, setEmailError] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const checkEmailError = checkEmailValidation(email.current.value);

        if(checkEmailError) setEmailError(checkEmailError);

        if(!checkEmailError){
            const response = await serverCall(LOGIN_URL, API_CALL_METHOD.POST,{
                email:email.current.value,
                
            }, {}, false, {success: "We've sent a one-time password (OTP) to your email. Please check your inbox."})

            try{
                if(response.status_code === 200){
                    userCredentials(response.data.data);
                    navigate(`/verification?email=${email.current.value}`);
                }
            }catch(e){
                if(response?.status_code === 400) showToast('Something went wrong', 'error');
            }
        }

    }
    return(
        <>
            <h2 className="text-xl font-semibold mb-4">Login with your Email</h2>
            <form className="space-y-4">
            <div>
                <label className="block mb-1 text-gray-600">Email</label>
                <input
                ref={email}
                type="email"
                placeholder="Enter you email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {emailError ?<p className="text-red-500 pt-1 py-1 ml-1">{emailError}</p>: null}
            </div>
            <button
                onClick={(e) => handleSubmit(e)}
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
                Continue
            </button>
            </form>
      </>
    )
}

export default PhoneAuth;