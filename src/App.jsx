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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Upload a Song</h1>
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="mb-4 p-2 border rounded-lg"
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
