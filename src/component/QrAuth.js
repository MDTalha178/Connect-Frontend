const QrAuth = () =>{
    return(
        <>
        <h2 className="text-xl font-semibold mb-4">Use WhatsApp on your computer</h2>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
          <li>Open Easy Connect on your phone</li>
          <li>Tap <strong>Menu</strong> or <strong>Settings</strong> → <strong>Linked Devices</strong></li>
          <li>Point your phone at this screen to capture the code</li>
        </ul>
        <div className="flex justify-center">
          <div className="w-48 h-48 bg-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
            <img
              src="https://static.toiimg.com/thumb/resizemode-4,msid-80875047,imgsize-60742,width-364/80875047.jpg"
              alt="QR Code"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </>
    )
}

export default QrAuth