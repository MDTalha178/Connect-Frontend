import React, { useEffect, useRef, useState } from 'react';
import AuthHeaderTab from './AuthHeaderTab';
import QrAuth from './QrAuth';
import PhoneAuth from './PhoneAuth';
import Signup from './Signup';

const Login = () => {

  const [tab, setTab] = useState('qr');

  const email = useRef("");
  const firstName = useRef("");
  const lastName = useRef("");
  const phone = useRef("");

  useEffect(() =>{
    setTab('qr')
  }, [setTab])


  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100 p-4">
      {/* Left: Branding */}
      <div className="text-center md:w-1/3 w-full mb-6 md:mb-0 md:mr-6">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp Logo"
          className="w-20 mx-auto mb-4"
        />
        <h1 className="text-3xl font-bold text-green-600">Easy Connect</h1>
        <p className="text-gray-600 mt-2">Connect securely and quickly.</p>
      </div>

      {/* Right: Auth Section */}
      <div className="bg-white shadow-md rounded-lg p-6 md:w-1/2 w-full">
        {/* Tabs */}
       
        <AuthHeaderTab  setTab={setTab} tab={tab}/>
        {/* QR Login */}
        {tab === 'qr' && (
         <QrAuth />
        )}

        {/* Phone Login */}
        {tab === 'phone' && (
         <PhoneAuth email={email}/>
        )}

        {/* Sign Up */}
        {tab === 'signup' && (
         <Signup email={email} firstName={firstName} lastName={lastName} phone={phone} setTab={setTab}/>
        )}
      </div>
    </div>
  );
};

export default Login;
