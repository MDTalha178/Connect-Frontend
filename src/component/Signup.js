import { useRef, useState } from "react";
import { checkEmailValidation, checkFisrNameValidation, lastNameValidation, PhoneValidation } from "../utils/validation";
import { serverCall } from "../utils/client";
import { SIGNUP_URL } from "../utils/clientUrl";
import { API_CALL_METHOD } from "../utils/constant";
import { showToast } from "./Toast";
import { useNavigate } from "react-router-dom";
import { userCredentials } from "../utils/localStorage";

const Signup = ({email, firstName, lastName, phone, setTab}) =>{

    const navigate = useNavigate();

    const [emailError, setError] = useState('');
    const [firstNameError, setfirstNameError] = useState('');
    const [lastNameError, setlastNameError] = useState('');
    const [phoneError, setphoneError] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const checkEmailError = checkEmailValidation(email.current.value);
        const checkPhoneError = PhoneValidation(phone.current.value);
        const checkFisrNameError = checkFisrNameValidation(firstName.current.value);
        const lastNameError = lastNameValidation(lastName.current.value);

        if(checkEmailError) setError(checkEmailError);
        if(checkPhoneError) setphoneError(checkPhoneError);
        if(checkFisrNameError) setfirstNameError(checkFisrNameError);
        if(lastNameError) setlastNameError(lastNameError);

        if(!checkEmailError && !checkPhoneError && !checkFisrNameError && !lastNameError){
            const response = await serverCall(SIGNUP_URL, API_CALL_METHOD.POST, {
                email: email.current.value,
                first_name: firstName.current.value, 
                last_name: lastName.current.value,
                phone: phone.current.value
            });
            try{
                if (response.status_code === 200 || response.status_code === 201) {
                    userCredentials(response.data.data);
                    navigate(`/verification?email=${email.current.value}`);
                }
                throw new Error("Something went wrong");
            }catch(e){
                if(response?.status_code === 400 && response?.data?.phone) showToast(response?.data?.phone[0] ||  'Something went wrong', 'error');
                if(response?.status_code === 400) response.data?.email && showToast(response.data.email[0] || 'Something went wrong', 'error');
            }
            
        }
    }

    return(
        <>
            <h2 className="text-xl font-semibold mb-4">Create your WhatsApp account</h2>
            <form className="space-y-4">
              <div>
                <label className="block mb-1 text-gray-600">Phone Number</label>
                <input

                  ref={phone}
                  type="tel"
                  placeholder="+91 9876543210"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {phoneError ?<p className="text-red-500 pt-1 py-1 ml-1">Please Enter a valid Phone format</p>: null}
              </div>
              <div>
                <label className="block mb-1 text-gray-600">Email</label>
                <input
                  ref={email}
                  type="email"
                  placeholder="user@gmail.com"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {emailError ? <p className="text-red-500 pt-1 py-1 ml-1">Please Enter a valid Phone format</p>: null}
              </div>
              <div>
                <label className="block mb-1 text-gray-600">First Name</label>
                <input
                  ref={firstName}
                  type="text"
                  placeholder="John"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {firstNameError ? <p className="text-red-500 pt-1 py-1 ml-1">Please Enter a valid Phone format</p>: null}
              </div>
              <div>
                <label className="block mb-1 text-gray-600">Last Name</label>
                <input
                  ref={lastName}
                  type="text"
                  placeholder="Doe"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {lastNameError ?<p className="text-red-500 pt-1 py-1 ml-1">Please Enter a valid Phone format</p>: null}
              </div>
              <button
                type="submit"
                onClick={(e) => handleSubmit(e)}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
              >
                Sign Up
              </button>
            </form>
        </>
    )
}

export default Signup;