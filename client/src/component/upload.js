import React, { useState } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";

const UploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      await axios.post("/upload", formData);
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  return (
    <div>
      <Dropzone onDrop={handleFileSelect} accept="image/*">
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag and drop an image here, or click to select a file</p>
          </div>
        )}
      </Dropzone>
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadForm;
