import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function App() {
  const [url, setUrl] = useState('');
  const [num, setNum]=useState(0);
  const [purl,setPurl]=useState('');
  const [file,setFile]=useState('');

  const fetchbrand=async()=>{
    if(num>0){
      let result= await fetch('https://brand-b.onrender.com/fetchbrand',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({url,num})
      })
      result= await result.json();
      console.log(result);
      scrapproduct()
    }else{
      alert("Please enter number of products on vender website")
    }
   
  }

  const scrapproduct=async()=>{

    let result= await fetch('https://brand-b.onrender.com/scrapproduct',{
        method:'get',
        headers:{'Content-Type':'application/json'},
    })
    console.log(result);
  }
  
  const downloadExcel = async () => {
    try {
      const response = await axios({
        url: 'https://brand-b.onrender.com/download-excel', // Replace with your backend URL
        method: 'GET',
        responseType: 'blob', // Important to get the response as a blob (binary data)
      });

      // Create a link element to trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'data.xlsx'); // File name
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://brand-b.onrender.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file');
    }
  };

  const downloadFinalSheet=async()=>{
    try {
      const response = await axios({
        url: 'https://brand-b.onrender.com/downloadfinalSheet', // Replace with your backend URL
        method: 'GET',
        responseType: 'blob', // Important to get the response as a blob (binary data)
      });

      // Create a link element to trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'finalsheet.xlsx'); // File name
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  }
  return (
   <>
    <p>Brand URL</p>
    <input type="text" onChange={(e) => setUrl(e.target.value)} placeholder='Brand URL' />
    <input type="text" className='ms-3' onChange={(e) => setNum(e.target.value)} placeholder='Number of products' />

    <button className='ms-4' onClick={fetchbrand}>Fetch All product</button>
    <br />
    {/* <input type="text" onChange={(e) => setPurl(e.target.value)} placeholder='Brand URL' /> */}
    <button className='ms-4' onClick={scrapproduct}>Start Scraping UPCs</button>
    <button className='ms-4 mt-4' variant="secondary" onClick={downloadExcel}>
        Download UPC List
      </button>

      <div className='d-flex mt-4'>
        <h2 className='me-4'>Upload Excel File</h2>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} accept=".xlsx, .xls" />
          <button className='me-4' type="submit">Upload</button>
        </form>
        <button onClick={downloadFinalSheet}>Download Final Sheet</button>

      </div>
   </>

   
   
  )
}

export default App
