import React, {useEffect, useRef, useState } from 'react';
import { serverCall } from '../utils/client';
import { API_CALL_METHOD } from '../utils/constant';
import { VERIFICATION_URL } from '../utils/clientUrl';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { showToast } from './Toast';

const OtpVerification = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();


    const [otp, setOtp] = useState('');
    const inputRef = useRef([]);
    const email = searchParams.get('email');

    useEffect(() => {
        inputRef.current[0].focus();
    },[]);


    const handleOnSubmit = async () =>{

        const response = await serverCall(VERIFICATION_URL, API_CALL_METHOD.POST, {
            email:email,
            otp:otp
        }, {}, false, {success: 'Verification Succesfull!'})   
        try{
           if(response?.status_code === 200){
                navigate('/');
           }
           if(response?.status_code === 400 && response.data?.non_field_errors) showToast(response.data?.non_field_errors[0], 'error');
           if(response?.status_code === 400 && !response.data?.non_field_errors) showToast('Something went wrong Please try after some time', 'error');
        }catch(e){
            console.log("Error", e);
            if(response?.status_code === 400 && !response.data?.non_field_errors) showToast('Something went wrong Please try after some time', 'error');
        }
    }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Enter Verification Code</h2>
        <p className="text-gray-600 mb-6">We've sent a 6-digit code to your phone number.</p>

        <div className="flex justify-between gap-2 mb-6">
          {Array(6)
            .fill()
            .map((_, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength="1"
                ref={(e) => inputRef.current[index] = e}
                onChange={(e) => {
                    const newOtp = otp + e.target.value
                    setOtp(newOtp);
                    if(index < 5){
                        inputRef.current[index + 1].focus();
                    };
                }}
                className="w-10 h-12 text-xl text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            ))}
        </div>

        <button
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          onClick={handleOnSubmit}
        >
          Verify
        </button>

        <button
          className="mt-4 text-green-600 hover:underline text-sm"
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
};

export default OtpVerification;
