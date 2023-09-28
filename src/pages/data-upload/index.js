import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { useDropzone } from 'react-dropzone';


const UploadDataForm = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isFileHovered, setIsFileHovered] = useState(false);

  const onDrop = async (acceptedFiles) => {
    setIsFileHovered(false); // Reset hover indicator
    if (acceptedFiles.length === 0) {
      setErrorMessage('Please upload a valid CSV file.');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    } else {
      setSuccessMessage('Uploading...'); // Show a message while uploading
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      try {
        const formData = new FormData();
        formData.append('csvFile', acceptedFiles[0]);

        const response = await fetch('http://localhost:3001/api/upload-csv', {
          method: 'POST',
          body: formData,
        });

        if (response.status === 200) {
          setSuccessMessage('File uploaded successfully.');
        } else {
          setErrorMessage('Failed to upload the file.');
        }
      } catch (error) {
        setErrorMessage('An error occurred during upload.');
        console.error('Error uploading the file:', error);
      }
    }
  };

  const { getInputProps } = useDropzone({
    onDrop,
    onDragEnter: () => setIsFileHovered(true),
    onDragLeave: () => setIsFileHovered(false),
  });

  return (
    <Card>
      <CardHeader title="Upload CSV File" titleTypographyProps={{ variant: 'h6' }} />
      <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <div className={`overlay ${isFileHovered ? 'visible' : ''}`}>Drop File To Upload</div>
        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
          Upload file
          <input {...getInputProps()} type="file" style={{ display: 'none' }} />
        </Button>
      </CardContent>
      <style jsx>{`
        .overlay {
          position: absolute;
          background: rgba(255, 255, 255, 0.4);
          padding: 5px;
          border: 1px solid #ccc;
          border-radius: 4px;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: none;
          justify-content: center;
          align-items: center;
        }

        .overlay.visible {
          display: flex;
        }
      `}</style>
    </Card>
  );
};

export default UploadDataForm;
