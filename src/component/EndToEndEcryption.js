export const EndToEndEcryption = () =>{
    return(
          <div className="flex justify-center items-center mt-2">
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-500"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 00-9 0V10.5M4.5 10.5h15m-1.5 0v7.125a1.875 1.875 0 01-1.875 1.875H7.875A1.875 1.875 0 016 17.625V10.5h12z"
                />
            </svg>
            <p className="text-sm text-gray-600">Messages are end-to-end encrypted</p>
            </div>
        </div>
    )
}