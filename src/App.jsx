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

  const [invfile, setInvFile] = useState('');
  const [loading, setLoading] = useState(false);
  const [links1, setLinks1] = useState([]);
  const [links2, setLinks2] = useState([]);
  const [links3, setLinks3] = useState([]);
  const [links4, setLinks4] = useState([]);
  const [invProduct, setInvProduct] = useState([{}]);
  const [customIndex, setCustomIndex] = useState();
  const [customIndex2, setCustomIndex2] = useState();
  const [customIndex3, setCustomIndex3] = useState();
  const [customIndex4, setCustomIndex4] = useState();
  const [index1, setIndex1] = useState();
  const [index2, setIndex2] = useState();
  const [index3, setIndex3] = useState();
  const [index4, setIndex4] = useState();
  const [speed1,setSpeed1]=useState(0);
  const [speed2,setSpeed2]=useState(0);
  const [speed3,setSpeed3]=useState(0);
  const [speed4,setSpeed4]=useState(0);

  useEffect(() => {
    getinvurl();
    getinvproducts();
    getserialnumber()
  }, []);
  const getserialnumber = async () => {
    let result = await fetch('https://brand-b-1.onrender.com/getserialnumber', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    result = await result.json();
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
      setLinks3(result.links3[0].url);
      setLinks4(result.links4[0].url);
      // setNoOfTotalPr(result.notp)
    } catch (err) {
      console.log(err)
    }
  };
 
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
  const autofetchData3 = async (link) => {
    try {
      let result = await fetch('https://brand-b-1.onrender.com/inv/autofetchdata3', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link: link })
      });
      result = await result.json();
      return result
    } catch (err) {
      console.log("Error in autofetchData3:", err);
      return false; // Return false in case of error to prevent further execution
    }
  };
  const autofetchData4 = async (link) => {
    try {
      let result = await fetch('https://brand-b-1.onrender.com/inv/autofetchdata4', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link: link })
      });
      result = await result.json();
      return result
    } catch (err) {
      console.log("Error in autofetchData4:", err);
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
const setautoindex3=async(index)=>{
  const newIndex = parseInt(index, 10);
  let result = await fetch('https://brand-b-1.onrender.com/setindex3', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ start_index: newIndex })
  });
  result= await result.json();
  result.status ? null : setautoindex2();
  setIndex2(result.index)
}
const setautoindex4=async(index)=>{
  const newIndex = parseInt(index, 10);
  let result = await fetch('https://brand-b-1.onrender.com/setindex4', {
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
        const startTime = performance.now(); // Start the timer
        const result = await autofetchData(links1[index]);
        const endTime = performance.now(); // End the timer
        const timeTaken1 = (endTime - startTime) / 1000;
        setSpeed1(timeTaken1.toFixed(1));
        console.log(" First Index:", index);
        console.log(" First Result:", result);
        if (result === true) {
          index+=1;
          setautoindex1(index);
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
        const startTime = performance.now(); // Start the timer
        const result = await autofetchData(links2[index]);
        const endTime = performance.now(); // End the timer
        const timeTaken1 = (endTime - startTime) / 1000;
        setSpeed2(timeTaken1.toFixed(1));
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
  const autofetch3 = async () => {
    let index = index3;
    while (index < links3.length) {
      try {
        const startTime = performance.now(); // Start the timer
        const result = await autofetchData(links3[index]);
        const endTime = performance.now(); // End the timer
        const timeTaken1 = (endTime - startTime) / 1000;
        setSpeed3(timeTaken1.toFixed(1));
        console.log(" Third Index:", index);
        console.log(" Third Result:", result);

        if (result === true) {
          index+=1;
          setautoindex3(index)
        } else {
          console.log("An error occurred.");
          index = index;
        }
      } catch (err) {
        console.log("Error in autofetch:", err);
      }
    }
  };
  const autofetch4 = async () => {
    let index =index4;
    while (index < links4.length) {
      try {
        const startTime = performance.now(); // Start the timer
        const result = await autofetchData(links4[index]);
        const endTime = performance.now(); // End the timer
        const timeTaken1 = (endTime - startTime) / 1000;
        setSpeed4(timeTaken1.toFixed(1));
        console.log(" Forth Index:", index);
        console.log(" Forth Result:", result);

        if (result === true) {
          index+=1;
          setautoindex4(index)
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

      <div>
        <h2>Inventory Updation</h2>
        <div>
          <input type="file" onChange={setInventoryfile} accept=".xlsx, .xls" />
          <button onClick={uploadinventoryfile} >Upload</button>
          <button className='ms-4 mt-4' variant="secondary" onClick={downloadInvontory}>
          Download Result
        </button>
        </div>

       
      </div>
      <Accordion className='mt-4' defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Total Number of Product's URL: {links1 ? links1.length + links2.length : 0} &nbsp;&nbsp; || &nbsp;&nbsp; Total Number of urls fetched : {index1+index2} &nbsp;&nbsp; || &nbsp;&nbsp; Remaining urls :  {links1 ? links1.length + links2.length-(index1+index2) : 0} &nbsp;&nbsp; || &nbsp;&nbsp; Net Speed : <span style={{color:'red'}}>{(speed1+speed2+speed3+speed4)/16} s / URL</span> (Only if all thread started)</Accordion.Header>
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
                  <hr />


                  <div className="container">
                    <div className="row">
                      <div className="col-md-4 d-flex justify-content-center align-items-center">
                        <h1>
                          {index1}/{links1.length}
                        </h1>
                      </div>
                      <div className="col-md-4 d-flex justify-content-center">
                        <div style={{ height: 100, width: 100 }}>
                          <CircularProgressbar value={(index1 / links1.length * 100)} text={`${(index1 / links1.length * 100).toFixed(0)}%`} />;
                        </div>
                      </div>
                      <div className="col-md-4 d-flex justify-content-start align-items-center">
                        <h3>
                          {speed1} s / URL
                        </h3>
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
                  <hr />
                  <div className="container">
                    <div className="row">
                      <div className="col-md-4 d-flex justify-content-center align-items-center">
                        <h1>
                          {index2}/{links2.length}
                        </h1>
                      </div>
                      <div className="col-md-4 d-flex justify-content-center">
                        <div style={{ height: 100, width: 100 }}>
                          <CircularProgressbar value={(index2 / links2.length * 100)} text={`${(index2 / links2.length * 100).toFixed(0)}%`} />;
                        </div>
                      </div>
                      <div className="col-md-4 d-flex justify-content-start align-items-center">
                        <h3>
                          {speed2} s / URL
                        </h3>
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

            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <Button variant="secondary" className='me-4' onClick={autofetch3}>
                    Start-3
                  </Button>
                  <input
                    type="number"
                    className='me-4 p-1'
                    style={{ width: '70px' }}
                    placeholder={index3}
                    onChange={(e) => setCustomIndex3(e.target.value)}
                  />

                  <Button variant="secondary" className='me-4' onClick={setindex3}>
                    Set Index
                  </Button>
                  <hr />


                  <div className="container">
                    <div className="row">
                      <div className="col-md-4 d-flex justify-content-center align-items-center">
                        <h1>
                          {index3}/{links3.length}
                        </h1>
                      </div>
                      <div className="col-md-4 d-flex justify-content-center">
                        <div style={{ height: 100, width: 100 }}>
                          <CircularProgressbar value={(index1 / links1.length * 100)} text={`${(index1 / links1.length * 100).toFixed(0)}%`} />;
                        </div>
                      </div>
                      <div className="col-md-4 d-flex justify-content-start align-items-center">
                        <h3>
                          {speed3} s / URL
                        </h3>
                      </div>
                    </div>
                  </div>
                  <Table className='mt-4' striped bordered hover>
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Current url &nbsp; &nbsp;(Total urls : {links3.length})</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{index3}</td>
                        <td><a href={links3[index3]} target='_blank'>{links3[index3]}</a></td>
                      </tr>
                    </tbody>

                  </Table>
                </div>
                <div className="col-lg-6">
                  <Button variant="secondary" className='me-4' onClick={autofetch4}>
                    Start-4
                  </Button>
                  <input
                    type="number"
                    className='me-4 p-1'
                    style={{ width: '70px' }}
                    placeholder={index4}
                    onChange={(e) => setCustomIndex4(e.target.value)}
                  />

                  <Button variant="secondary" className='me-4' onClick={setindex4}>
                    Set Index
                  </Button>
                  <hr />
                  <div className="container">
                    <div className="row">
                      <div className="col-md-4 d-flex justify-content-center align-items-center">
                        <h1>
                          {index4}/{links4.length}
                        </h1>
                      </div>
                      <div className="col-md-4 d-flex justify-content-center">
                        <div style={{ height: 100, width: 100 }}>
                          <CircularProgressbar value={(index4 / links4.length * 100)} text={`${(index4 / links4.length * 100).toFixed(0)}%`} />;
                        </div>
                      </div>
                      <div className="col-md-4 d-flex justify-content-start align-items-center">
                        <h3>
                          {speed4} s / URL
                        </h3>
                      </div>
                    </div>
                  </div>
                  <Table className='mt-4' striped bordered hover>
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Current url &nbsp; &nbsp;(Total urls : {links4.length})</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{index4}</td>
                        <td><a href={links4[index4]} target='_blank'>{links4[index4]}</a></td>
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
