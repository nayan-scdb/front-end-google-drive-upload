// import logo from './logo.svg';
// import './App.css';
// import FileUpload from './components/FileUpload';
// import FileList from './components/FileList'; // Import the FileList component
import {  Container } from '@mui/material';
// const App = () => {
//   return (
//     <Container>
//       <h1>Google Drive File Upload</h1>
//       <FileUpload />
//       <FileList />  
//     </Container>
//   );
// };

// export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login'; // Import the Login component
import FileUpload from './components/FileUpload'; // Import the FileUpload component
import FileList from './components/FileList'; // Import the FileList component
import FileUploadPage from './components/FileUploadPage'; // Import the FileList component


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/file-upload" element={
          <FileUploadPage />
        } />
      </Routes>
    </Router>

  );

};

export default App;
