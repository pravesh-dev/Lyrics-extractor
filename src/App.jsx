import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
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
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p><strong>File Name:</strong> {file.name}</p>
          <p><strong>File Type:</strong> {file.type}</p>
        </div>
      )}
    </div>
  );
}

export default App;
