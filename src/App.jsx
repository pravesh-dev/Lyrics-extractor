import { useState } from "react";
import * as mm from 'music-metadata-browser';
import { Buffer } from "buffer";  // Import Buffer

window.Buffer = Buffer;  // Polyfill Buffer for browser

function App() {
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState(null);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
  
      // Read file as an ArrayBuffer
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const arrayBuffer = e.target.result;
          const uint8Array = new Uint8Array(arrayBuffer); // Convert to Uint8Array
  
          const metadata = await mm.parseBuffer(uint8Array, {
            mimeType: selectedFile.type,
            size: selectedFile.size,
          });
  
          setMetadata({
            title: metadata.common.title || "Unknown Title",
            artist: metadata.common.artist || "Unknown Artist",
            album: metadata.common.album || "Unknown Album",
          });
        } catch (error) {
          console.error("Error reading metadata:", error);
          setMetadata(null);
        }
      };
  
      reader.readAsArrayBuffer(selectedFile); // Read file as ArrayBuffer
    }
  };
  

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen bg-[#101010] text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Upload a Song</h1>
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="w-52 mb-4 my-2 border rounded-md bg-slate-600"
      />
      {file && (
        <div className="bg-[#202020] flex flex-col rounded-lg shadow-md">
          <p><strong>File Name:</strong> {file.name}</p>
          <p><strong>File Type:</strong> {file.type}</p>
          {metadata && (
            <>
              <p><strong>Title:</strong> {metadata.title}</p>
              <p><strong>Artist:</strong> {metadata.artist}</p>
              <p><strong>Album:</strong> {metadata.album}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
