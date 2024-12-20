import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, InputAdornment, Typography } from '@mui/material';

const FileUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage('File uploaded successfully: ' + response.data.fileName);
      setFile(null); // Clear file input
      onUploadSuccess(); // Call the parent function to refresh the file list
    } catch (error) {
      setMessage('Error uploading file: ' + error.message);
    }
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Upload File to Google Drive
      </Typography>
      <TextField
        type="file"
        onChange={handleFileChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button variant="contained" color="primary" onClick={handleUpload}>
                Upload
              </Button>
            </InputAdornment>
          ),
        }}
        fullWidth
      />
      {message && <Typography variant="body1" color="error" mt={2}>{message}</Typography>}
    </div>
  );
};

export default FileUpload;
