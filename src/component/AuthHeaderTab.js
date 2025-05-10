const AuthHeaderTab = ({tab, setTab}) =>{

    return (
        <div className="flex mb-4 border-b">
            <button
            className={`flex-1 py-2 text-center ${tab === 'qr' ? 'border-b-2 border-green-600 font-semibold' : 'text-gray-500'}`}
            onClick={() => setTab('qr')}
            >
            <p>Login with QR <strong>(Coming Soon)</strong></p>
            </button>
            <button
            className={`flex-1 py-2 text-center ${tab === 'phone' ? 'border-b-2 border-green-600 font-semibold' : 'text-gray-500'}`}
            onClick={() => setTab('phone')}
            >
            Login with Email
            </button>
            <button
            className={`flex-1 py-2 text-center ${tab === 'signup' ? 'border-b-2 border-green-600 font-semibold' : 'text-gray-500'}`}
            onClick={() => setTab('signup')}
            >
            Sign Up
            </button>
      </div>
    )
}

export default AuthHeaderTab