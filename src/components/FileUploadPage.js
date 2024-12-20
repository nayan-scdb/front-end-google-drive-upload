import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FileUpload from './FileUpload';
import FileList from './FileList';
import { Container, Typography } from '@mui/material';

const FileUploadPage = () => {
  const [files, setFiles] = useState([]);

  // Function to fetch files from the server
  const fetchFiles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/list-files');
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  // Fetch the files when the component mounts
  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Google Drive File Manager
      </Typography>

      {/* Pass the fetchFiles function to FileUpload so it can trigger file list refresh */}
      <FileUpload onUploadSuccess={fetchFiles} />

      <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
        File List
      </Typography>

      {/* Pass the list of files to the FileList component */}
      <FileList files={files} />
    </Container>
  );
};

export default FileUploadPage;
