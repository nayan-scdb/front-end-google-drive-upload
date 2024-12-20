import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const folderMappings = {
  '1C3p0FDbZelIhLJARnKP0nQrVPTUFOb9a': 'Doc',
  '1XP0hMLODyJ_NNgLxGZKelEcgXuGMlLtI': 'docx',
  '1sECQpnkPIj3cIXwO0PVIBq5lWwhBzfRK': 'xls',
  'xls': 'Excel Spreadsheets',
  'docx': 'Word Documents',
  'pdf': 'PDF Files', 
  'txt': 'Text Files'
};

const FileList = ({ files }) => {
  const [selectedFolder, setSelectedFolder] = useState('all');

  // Group files by folder based on folderMappings
  const groupedFiles = files.reduce((acc, file) => {
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const parentFolderId = file.parents[0];
    const folderName = folderMappings[parentFolderId] || folderMappings[fileExtension] || 'Other Files';

    if (!acc[folderName]) acc[folderName] = { type: 'folder', name: folderName, files: [] };
    acc[folderName].files.push(file);
    
    return acc;
  }, {});

  const renderFileRow = (file) => (
    <TableRow key={file.id}>
      <TableCell>
        <InsertDriveFileIcon style={{ marginRight: 8 }} />
        {file.name}
      </TableCell>
      <TableCell>{file.mimeType}</TableCell>
      <TableCell>
        <a href={`https://drive.google.com/uc?id=${file.id}`} target="_blank" rel="noopener noreferrer">
          Download
        </a>
      </TableCell>
    </TableRow>
  );

  const renderFileList = (folderName) => {
    const folderFiles = folderName === 'all' ? files : groupedFiles[folderName]?.files || [];
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>MIME Type</TableCell>
              <TableCell>Download</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {folderFiles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3}>No files found.</TableCell>
              </TableRow>
            ) : (
              folderFiles.map(file => renderFileRow(file))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const renderFolderList = () => (
    <List>
      <ListItem button selected={selectedFolder === 'all'} onClick={() => setSelectedFolder('all')}>
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary="All Files" />
      </ListItem>
      {Object.entries(groupedFiles).map(([folderName, folder]) => (
        <ListItem button key={folderName} selected={selectedFolder === folderName} onClick={() => setSelectedFolder(folderName)}>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary={folder.name} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '25%' }}>{renderFolderList()}</div>
      <div style={{ width: '75%' }}>{renderFileList(selectedFolder)}</div>
    </div>
  );
};

export default FileList;
