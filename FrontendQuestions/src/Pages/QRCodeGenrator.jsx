import React, { useEffect, useState } from 'react'

function QRCodeGenrator() {
    const [size,setSize]=useState(100);
    const [input,setInput]=useState('');
    const [qrCode,setQrCode]=useState('');
    const [show,setShow]=useState(false);
    useEffect(()=>{
        setQrCode(`http://api.qrserver.com/v1/create-qr-code/?data=${input}!&size=${size}x${size}&bgcolor=ffffff`);
    },[input,size]);
    const genrateQr=()=>{
        setShow(true);
    }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        QR Code Generator
      </h1>
      <p className="text-gray-600">
        Enter a URL or text to generate a QR code.
      </p>
    </div>

    <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
      <div className="mb-4">
        <input
          type="text"
          value={input}
          placeholder="Enter URL or text..."
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="size"
          className="block text-sm font-medium text-gray-700"
        >
          Size (pixels):
        </label>
        <input
          type="number"
          id="size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <button
        onClick={genrateQr}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
      >
        Generate QR Code
      </button>

      {show && (
        <div className="mt-6 text-center">
          <a
            href={qrCode}
            download="qrcode.png"
            className="inline-block"
          >
            <img
              src={qrCode}
              alt="Generated QR Code"
              className="max-w-full rounded"
            />
          </a>
        </div>
      )}
    </div>
  </div>
  )
}

export default QRCodeGenrator
