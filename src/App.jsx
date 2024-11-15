import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function App() {
  const [url, setUrl] = useState('');
  const [num, setNum] = useState(0);
  const [productUrl, setProductUrl] = useState([]);
  const [file, setFile] = useState('');
  const [invfile, setInvFile] = useState('');
  const [loading, setLoading] = useState(false);
  const [upc, setUpc] = useState([{}]);
  const [links1, setLinks1] = useState([]);
  const [links2, setLinks2] = useState([]);
  const [invProduct, setInvProduct] = useState([{}]);
  // const [startIndex, setStartIndex] = useState(0);
  // const [startIndex2, setStartIndex2] = useState(0);
  const [customIndex, setCustomIndex] = useState();
  const [customIndex2, setCustomIndex2] = useState();
  const [customIndex3, setCustomIndex3] = useState();
  const [customIndex4, setCustomIndex4] = useState();
  const [index1, setIndex1] = useState();
  const [index2, setIndex2] = useState();
  const [index3, setIndex3] = useState();
  const [index4, setIndex4] = useState();

  useEffect(() => {
    getinvurl();
    getinvproducts();
    getproductslink();
    getserialnumber()
  }, []);
  const getserialnumber = async () => {
    let result = await fetch('https://brand-b-1.onrender.com/getserialnumber', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    result = await result.json();
    console.log(result)
    setIndex1(result.start_index1);
    setIndex2(result.start_index2);
    setIndex3(result.start_index3);
    setIndex4(result.start_index4);

  }

  const getinvproducts = async () => {
    try {
      let result = await fetch('https://brand-b-1.onrender.com/getinvproduct', {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
      })
      result = await result.json();
      setInvProduct(result);
    } catch (err) {
      console.log(err)
    }
  }
  const getinvurl = async () => {
    try {
      let result = await fetch('https://brand-b-1.onrender.com/getinvurl', {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
      })
      result = await result.json();
      setLinks1(result.links1[0].url);
      setLinks2(result.links2[0].url);
      // setNoOfTotalPr(result.notp)
    } catch (err) {
      console.log(err)
    }
  };

  const fetchbrand = async () => {
    if (num > 0) {
      setLoading(true)
      let result = await fetch('https://brand-b-1.onrender.com/fetchbrand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, num })
      })
      result = await result.json();
      setLoading(false)
      // scrapproduct()
    } else {
      alert("Please enter number of products on vender website");
      setLoading(false)
    }
  }

  const scrapproduct = async () => {
    alert("Your Previous saved data will be deleted");
    setLoading(true);
    let result = await fetch('https://brand-b-1.onrender.com/scrapproduct', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    })
    alert(result);
    setLoading(false);
  }

  const downloadExcel = async () => {
    try {
      setLoading(true)
      const response = await axios({
        url: 'https://brand-b-1.onrender.com/download-excel', // Replace with your backend URL
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
      const response = await axios.post('https://brand-b-1.onrender.com/upload', formData, {
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
        url: 'https://brand-b-1.onrender.com/downloadfinalSheet', // Replace with your backend URL
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
    let data = await fetch('https://brand-b-1.onrender.com/getproducturl', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    data = await data.json();
    setProductUrl(data.url);
    setUpc(data.upc);
  }

  // --------upload file for inventory update----
  const setInventoryfile = (e) => {
    setInvFile(e.target.files[0]);
  };

  const uploadinventoryfile = async (e) => {
    e.preventDefault();
    setLoading(true)
    const formData = new FormData();
    formData.append('file', invfile);
    try {
      const response = await axios.post('https://brand-b-1.onrender.com/uploadinvfile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert(response.data.msg);
      setLoading(false)
      getinvproducts();
      getproductslink();

    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file');
    }
  };

  // ------setIndex----
  const setindex = async () => {
    const newIndex = parseInt(customIndex, 10);
    let result = await fetch('https://brand-b-1.onrender.com/setindex', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start_index: newIndex })
    });
    result = await result.json();
    if (result.status) {
      setIndex1(result.index);
    } else { setindex() }
  };
  const setindex2 = async () => {
    const newIndex = parseInt(customIndex2, 10);
    let result = await fetch('https://brand-b-1.onrender.com/setindex2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start_index: newIndex })
    });
    result=await result.json();
    result.status ? null : setindex2();
    setIndex2(result.index)
  };
  const setindex3 = async () => {
    const newIndex = parseInt(customIndex3, 10);
    let result = await fetch('https://brand-b-1.onrender.com/setindex3', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start_index: newIndex})
    });
    result=await result.json();
    result.status ? null : setindex3();
    setIndex3(result.index)
  };
  const setindex4 = async () => {
    const newIndex = parseInt(customIndex4, 10);
    let result = await fetch('https://brand-b-1.onrender.com/setindex4', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start_index: newIndex})
    });
    result=await result.json();
    result.status ? null : setindex4();
    setIndex4(result.index)
  };

 
  const autofetchData = async (link) => {
    try {
      let result = await fetch('https://brand-b-1.onrender.com/autofetchdata', {
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

  const autofetchData2 = async (link) => {
    try {
      let result = await fetch('https://brand-b-1.onrender.com/inv/autofetchdata2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link: link })
      });
      result = await result.json();
      return result
    } catch (err) {
      console.log("Error in autofetchData2:", err);
      return false; // Return false in case of error to prevent further execution
    }
  };
const setautoindex1=async(index)=>{
  const newIndex = parseInt(index, 10);
  let result = await fetch('https://brand-b-1.onrender.com/setindex', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ start_index: newIndex })
  });
  result= await result.json();
  result.status ? null : setautoindex1();
  setIndex1(result.index)
}
const setautoindex2=async(index)=>{
  const newIndex = parseInt(index, 10);
  let result = await fetch('https://brand-b-1.onrender.com/setindex2', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ start_index: newIndex })
  });
  result= await result.json();
  result.status ? null : setautoindex2();
  setIndex2(result.index)
}
  const autofetch = async () => {
    let index = index1;
    while (index <links1.length) {
      try {
        const result = await autofetchData(links1[index]);
        console.log(" First URL:", links1[index]);
        console.log(" First Index:", index);
        console.log(" First Result:", result);

        if (result === true) {
          index+=1;
          setautoindex1(index)
        } else {
          console.log("An error occurred.");
          index = index;
        }
      } catch (err) {
        console.log("Error in autofetch:", err);
      }
    }
  };
  const autofetch2 = async () => {
    let index = index2;
    while (index < links2.length) {
      try {
        const result = await autofetchData2(links2[index]);
        console.log(" Second URL:", links2[index]);
        console.log(" Second Index:", index);
        console.log(" Second Result:", result);

        if (result === true) {
          index+=1;
          setautoindex2(index)
        } else {
          console.log("An error occurred.");
          index = index;
        }
      } catch (err) {
        console.log("Error in autofetch:", err);
      }
    }
  };

  const downloadInvontory = async () => {
    try {
      setLoading(true)
      const response = await axios({
        url: 'https://brand-b-1.onrender.com/download-inventory', // Replace with your backend URL
        method: 'GET',
        responseType: 'blob', // Important to get the response as a blob (binary data)
      });
      // Create a link element to trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Updated_inventory.xlsx'); // File name
      document.body.appendChild(link);
      link.click();
      link.remove();
      setLoading(false)
    } catch (error) {
      console.error('Error downloading the file:', error);
      setLoading(false)
    }
  }

  return (
    <div style={{ opacity: loading ? 0.5 : 1, color: loading ? 'black' : null , paddingLeft:'3vw', paddingRight:'3vw'}}>
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
                    <a style={{ background: 'white !important' }} href={p}>{p}</a>
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
                        {u.upc ? u.upc.length > 0 && u.upc.map((p, index) => (
                          <li key={index}>{p}</li>
                        )) : null}
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

        <button className='ms-4 mt-4' variant="secondary" onClick={downloadInvontory}>
          Download Updated Inventory
        </button>
      </div>
      <Accordion className='mt-4' defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Total Number of Product's URL: {links1 ? links1.length + links2.length : 0} &nbsp;&nbsp; || &nbsp;&nbsp; Total Number of urls fetched : {index1+index2} &nbsp;&nbsp; || &nbsp;&nbsp; Remaining urls :  {links1 ? links1.length + links2.length-(index1+index2) : 0}</Accordion.Header>
          <Accordion.Body>
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <Button variant="secondary" className='me-4' onClick={autofetch}>
                    Start-1
                  </Button>
                  <input
                    type="number"
                    className='me-4 p-1'
                    style={{ width: '70px' }}
                    placeholder={index1}
                    onChange={(e) => setCustomIndex(e.target.value)}
                  />

                  <Button variant="secondary" className='me-4' onClick={setindex}>
                    Set Index
                  </Button>
                  <Button variant="secondary" className='me-4' onClick={autofetch}>
                    Resume
                  </Button>
                  <hr />


                  <div className="container">
                    <div className="row">
                      <div className="col-md-6 d-flex justify-content-center align-items-center">
                        <h1>
                          {index1}/{links1.length}
                        </h1>
                      </div>
                      <div className="col-md-6">
                        <div style={{ height: 100, width: 100 }}>
                          <CircularProgressbar value={(index1 / links1.length * 100)} text={`${(index1 / links1.length * 100).toFixed(0)}%`} />;
                        </div>
                      </div>
                    </div>
                  </div>
                  <Table className='mt-4' striped bordered hover>
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Current url &nbsp; &nbsp;(Total urls : {links1.length})</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{index1}</td>
                        <td><a href={links1[index1]} target='_blank'>{links1[index1]}</a></td>
                      </tr>
                    </tbody>

                  </Table>
                </div>
                <div className="col-lg-6">
                  <Button variant="secondary" className='me-4' onClick={autofetch2}>
                    Start-2
                  </Button>
                  <input
                    type="number"
                    className='me-4 p-1'
                    style={{ width: '70px' }}
                    placeholder={index2}
                    onChange={(e) => setCustomIndex2(e.target.value)}
                  />

                  <Button variant="secondary" className='me-4' onClick={setindex2}>
                    Set Index
                  </Button>
                  <Button variant="secondary" className='me-4' onClick={autofetch2}>
                    Resume
                  </Button>
                  <hr />
                  <div className="container">
                    <div className="row">
                      <div className="col-md-6 d-flex justify-content-center align-items-center">
                        <h1>
                          {index2}/{links2.length}
                        </h1>
                      </div>
                      <div className="col-md-6">
                        <div style={{ height: 100, width: 100 }}>
                          <CircularProgressbar value={(index2 / links2.length * 100)} text={`${(index2 / links2.length * 100).toFixed(0)}%`} />;
                        </div>
                      </div>
                    </div>
                  </div>
                  <Table className='mt-4' striped bordered hover>
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Current url &nbsp; &nbsp;(Total urls : {links2.length})</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{index2}</td>
                        <td><a href={links2[index2]} target='_blank'>{links2[index2]}</a></td>
                      </tr>
                    </tbody>

                  </Table>
                </div>
              </div>
            </div>

          </Accordion.Body>
        </Accordion.Item>

        {/* -------inventory updated price and quantity---- */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>Total Updated Products detail : {invProduct ? invProduct.length : 0}</Accordion.Header>
          <Accordion.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Image</th>
                  <th>Input UPC</th>
                  <th>ASIN</th>
                  <th>SKU</th>
                  <th>Old Price</th>
                  <th>Current Price</th>
                  <th>Quantity</th>
                  <th>Product URL</th>
                </tr>
              </thead>
              {invProduct.length > 0 && invProduct.map((detailArray, i) => (
                <tbody>

                  <tr key={i}>
                    <td style={{ padding: '0 !important' }}>
                      {i + 1}
                    </td>
                    <td style={{ padding: '0 !important' }}>
                      <img src={detailArray['Image link']} alt="" height='40px' />
                    </td>
                    <td>{detailArray['Input UPC']}</td>
                    <td>{detailArray['ASIN']}</td>
                    <td>{detailArray['SKU']}</td>
                    <td>{detailArray['Product price']}</td>
                    <td>{detailArray['Current Price']}</td>
                    <td>{detailArray['Current Quantity']}</td>
                    <td><a href={detailArray['Product link']} target='_blank'>Click to see details</a></td>



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
