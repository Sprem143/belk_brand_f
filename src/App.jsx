import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function App() {
  const [url, setUrl] = useState('');
  const [num, setNum] = useState(0);
  const [productUrl, setProductUrl] = useState([]);
  const [file, setFile] = useState('');
  const [invfile, setInvFile] = useState('');
  const [loading, setLoading] = useState(false);
  const [upc,setUpc]=useState([{}]);
  const [links, setLinks] = useState([]);
  const [invProduct,setInvProduct]=useState([{}]);


  useEffect(() => {
    getinvurl();
    getinvproducts();
    getproductslink();
    
  }, []);

  const getinvproducts=async()=>{
    try {
      console.log("get links called")
      let result = await fetch('https://brand-b.onrender.com/getinvproduct', {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
      })
      result = await result.json();
      setInvProduct(result);
      console.log(result)
    } catch (err) {
      console.log(err)
    }
  }
  const getinvurl = async () => {
    try {
      console.log("get links called")
      let result = await fetch('https://brand-b.onrender.com/getinvurl', {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
      })
      result = await result.json();
      setLinks(result.links[0].url);
      // setNoOfTotalPr(result.notp)
    } catch (err) {
      console.log(err)
    }
  };

  const fetchbrand = async () => {
    if (num > 0) {
      setLoading(true)
      let result = await fetch('https://brand-b.onrender.com/fetchbrand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, num })
      })
      result = await result.json();
      setLoading(false)
      console.log(result);
      // scrapproduct()
    } else {
      alert("Please enter number of products on vender website");
      setLoading(false)
    }
  }

  const scrapproduct = async () => {
    alert("Your Previous saved data will be deleted");
    setLoading(true);
    let result = await fetch('https://brand-b.onrender.com/scrapproduct', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    })
    console.log(result);
    alert(result);
    setLoading(false);
  }

  const downloadExcel = async () => {
    try {
      setLoading(true)
      const response = await axios({
        url: 'https://brand-b.onrender.com/download-excel', // Replace with your backend URL
        method: 'GET',
        responseType: 'blob', // Important to get the response as a blob (binary data)
      });

      // Create a link element to trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Upc_list.xlsx'); // File name
      document.body.appendChild(link);
      link.click();
      link.remove();
      setLoading(false)
    } catch (error) {
      console.error('Error downloading the file:', error);
      setLoading(false)
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('https://brand-b.onrender.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setLoading(false)
      alert(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file');
    }
  };

  const downloadFinalSheet = async () => {
    try {
      setLoading(true);
      const response = await axios({
        url: 'https://brand-b.onrender.com/downloadfinalSheet', // Replace with your backend URL
        method: 'GET',
        responseType: 'blob', // Important to get the response as a blob (binary data)
      });

      // Create a link element to trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'comparison_sheet.xlsx'); // File name
      document.body.appendChild(link);
      link.click();
      link.remove();
      setLoading(false)
    } catch (error) {
      console.error('Error downloading the file:', error);
      setLoading(false)
    }
  }

  // -----get products links-------
  const getproductslink = async () => {
    let data = await fetch('https://brand-b.onrender.com/getproducturl', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    data =await data.json();
    setProductUrl(data.url);
    setUpc(data.upc);
    console.log(data)
  }

  // --------upload file for inventory update----
  const setInventoryfile = (e) => {
    setInvFile(e.target.files[0]);
  };

  const uploadinventoryfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file',invfile);

    try {
      const response = await axios.post('https://brand-b.onrender.com/uploadinvfile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert(response.data.msg);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file');
    }
  };

  // ----auto fetch data call----------

  const autofetchData = async (link) => {
    try {
      console.log("Fetching data for:", link);
      let result = await fetch('https://brand-b.onrender.com/autofetchdata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link: link })
      });
      result = await result.json(); 
      return result
    } catch (err) {
      console.log("Error in autofetchData:", err);
      return false; // Return false in case of error to prevent further execution
    }
  };
  
  const autofetch = async () => {
    console.log("Starting autofetch...");
    let index = 0; // Starting index
  
    while (index < 5) {
      try {
        const result = await autofetchData(links[index]); // Wait for autofetchData to complete
        
        console.log("Index:", index);
        console.log("Result:", result);
        if (result === true) {
          index++; 
          // getnumberofupdatedpr(); 
        } else {
          console.log("No update required for this link or an error occurred.");
           index=index
        }
      } catch (err) {
        console.log("Error in autofetch:", err);
        break; 
      }
    }
  };
  return (
    <div style={{ opacity: loading ? 0.5 : 1, color: loading ? 'black' : null }}>
      {loading && ( // Show spinner while loading is true
        <div className="loading-overlay">
          <Spinner animation="border" variant="primary" /> {/* Spinner from Bootstrap */}
        </div>
      )}
      <p>Brand URL</p>
      <input type="text" onChange={(e) => setUrl(e.target.value)} placeholder='Brand URL' />
      <input type="text" className='ms-3' onChange={(e) => setNum(e.target.value)} placeholder='Number of products' />

      <button className='ms-4' onClick={fetchbrand}>Fetch All product URLs</button>
      <br />
      {/* <input type="text" onChange={(e) => setPurl(e.target.value)} placeholder='Brand URL' /> */}
      <button className='ms-4' onClick={scrapproduct}>Start Scraping UPCs</button>
      <button className='ms-4 mt-4' variant="secondary" onClick={downloadExcel}>
        Download UPC List
      </button>

      <div className='d-flex mt-4'>
        <h2 className='me-4'>Upload UPC List</h2>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} accept=".xlsx, .xls" />
          <button className='me-4' type="submit">Upload</button>
        </form>
        <button onClick={downloadFinalSheet}>Download Comparison Sheet</button>

      </div>
      <Accordion className='mt-4'>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Number of Products fetched : {productUrl.length}</Accordion.Header>
          <Accordion.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Products' url</th>
                </tr>
              </thead>
              {productUrl.length > 0 && productUrl.map((p, i) => (
                <tbody>
                  <tr key={i}>
                    <td style={{ padding: '0 !important' }}>
                      {i + 1}
                    </td>
                    <a style={{background:'white !important'}} href={p}>{p}</a>
                  </tr>
                </tbody>
              ))}
            </Table>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
        <Accordion.Header>TOtal UPCs list: {upc.length}</Accordion.Header>
        <Accordion.Body>
        <Table striped bordered hover>
            <thead>
              <tr>
            
                <th>S.No</th>
                <th>Product URL</th>
              </tr>
            </thead>
            {upc.length > 0 && upc.map((u, i) => (
              <tbody>
                <tr key={i}>
                  <td style={{ padding: '0 !important' }}>
                    {i + 1}
                  </td>
                 
                  <td>
                    <p>{u.url}</p>
                    <ul>
                      {u.upc? u.upc.length>0 && u.upc.map((p)=>(
                        <li>{p}</li>
                      )):null}
                    </ul>
                  </td>
                 
                  </tr>
              </tbody>
            ))}
          </Table>
        </Accordion.Body>
      </Accordion.Item>
      </Accordion>
      <hr />
      <div>
        <h2>Inventory Updation</h2>
        <form onSubmit={uploadinventoryfile}>
          <input type="file" onChange={setInventoryfile} accept=".xlsx, .xls" />
          <button type="submit">Upload</button>
        </form>
        <Button variant="secondary" className='me-4' onClick={autofetch}>
        Start Auto Fetch
      </Button>
      </div>

      <Accordion className='mt-4'>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Number of Product's URL to be fetched : {links?links.length:0}</Accordion.Header>
          <Accordion.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Inventory Products' url</th>
                </tr>
              </thead>
              { links.length > 0 && links.map((l, i) => (
                <tbody>
                  <tr key={i}>
                    <td style={{ padding: '0 !important' }}>
                      {i + 1}
                    </td>
                    <a style={{background:'white !important'}} href={l}>{l}</a>
                  </tr>
                </tbody>
              ))}
            </Table>
          </Accordion.Body>
        </Accordion.Item>

        {/* -------inventory updated price and quantity---- */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>Total Updated Products detail : {invProduct>1?invProduct.length:0}</Accordion.Header>
          <Accordion.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                <th>No</th>
                <th>Image</th>
                <th>UPC</th>
                <th>New Price</th>
                <th>Offer Price</th>
                <th>Old Price</th>
                <th>Color & Size</th>
                <th>Quantity</th>
                <th>Available</th>
                <th>Product URL</th>
                </tr>
              </thead>
              { invProduct.length > 0 && invProduct.map((detailArray, i) => (
                <tbody>

                <tr key={i}>
                  <td style={{ padding: '0 !important' }}>
                    {i + 1}
                  </td>
                  <td style={{ padding: '0 !important' }}>
                    <img src={detailArray.imgurl} alt="" height='40px' />
                  </td>
                  <td>{detailArray.upc}</td>
                  <td>{detailArray.newPrice}</td>
                  {detailArray.onsale==='false'  && detailArray.offer !==null ?<td style={{ color: "#0b6bff", fontWeight: 'bold' }}>{detailArray.newPrice  && (detailArray.newPrice - (detailArray.newPrice * Number(detailArray.offer) / 100)).toFixed(2)} <br /> <span style={{color:'black', fontWeight:'initial'}}>{detailArray.offerend}</span></td>
                : <td>NA</td> }
                  <td style={{ color: Number(detailArray.oldPrice) !== Number(detailArray.newPrice) ? 'red' : 'black' }}>
                    {detailArray.oldPrice && detailArray.oldPrice.toFixed(2)}
                  </td>
                  <td>{detailArray.clrsize}</td>
                  <td style={{ color: (detailArray.quantity < 8 && detailArray.available === 'T') || (detailArray.quantity > 8 && detailArray.available === 'F') ? 'red' : 'black' }}>
                  {detailArray.quantity}
                  </td>
                  <td>{detailArray.available}</td>
                  <td> <a href={detailArray.url} target='_blank'>{detailArray.url}</a> </td>
                </tr>

              </tbody>
              ))}
            </Table>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <hr />
    </div>



  )
}

export default App
