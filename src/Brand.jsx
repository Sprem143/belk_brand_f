import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import * as XLSX from 'xlsx';
import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Brand() {
  const navigate= useNavigate()
  const [upc, setUpc] = useState([{}]);
  const [productUrl, setProductUrl] = useState([]);
  const [url, setUrl] = useState('');
  const [urlLen, setUrlLen] = useState('')
  const [num, setNum] = useState(0);
  const [file, setFile] = useState('');
  const [loading, setLoading] = useState(false);
  const [totalProduct, setTotalProduct] = useState(0);
  const [link, setLink] = useState([[], [], [], [], [], [], [], []]);
  const [arrayid, setArrayid] = useState('');
  const [index, setIndex] = useState({ index1: 0, index2: 0, index3: 0, index4: 0, index5: 0, index6: 0, index7: 0, index8: 0 });
  const [l, setL] = useState({ l1: false, l2: false, l3: false, l4: false, l5: false, l6: false, l7: false, l8: false })
  const [purl, setPurl] = useState('')
  const local = 'http://localhost:10000'
  const api = 'https://brand-b-1.onrender.com'
  useEffect(() => {
    getproductslink();
    getupdatedproduct()
  }, []);

  function divideArrayIntoParts(array) {
    const totalParts = 8;
    const partSize = Math.ceil(array.length / totalParts); // Calculate size of each part
    const result = [];

    for (let i = 0; i < totalParts; i++) {
      const start = i * partSize;
      const end = start + partSize;
      result.push(array.slice(start, end)); // Slice array into parts
    }
    return result;
  }

  const getupdatedproduct = async () => {
    try {
      let res = await fetch(`${api}/totalproducts`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      res = await res.json();
      if (res.status) {
        setTotalProduct(res.num);
        setUrl(res.num2);
      }
    } catch (err) {
      console.log(err);
      alert(err)
    }
  }
  const getproductslink = async () => {
    let data = await fetch(`${api}/getproducturl`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    data = await data.json();
    setProductUrl(data.url);
    setArrayid(data.id);
    setUrlLen(data.url.length)
    let dividedarr = divideArrayIntoParts(data.url);
    setLink(dividedarr);
    setUpc(data.upc);
  }

  const fetchbrand = async () => {
    let resp = confirm('All Previous data will be deleted.Are you sure?');
    if (resp) {
      if (num > 0) {
        setLoading(true)
        let result = await fetch(`${api}/fetchbrand`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url, num })
        })
        result = await result.json();
        if (result.status) {
          scrapproduct()
        }
        setLoading(false)
        getupdatedproduct()
      } else {
        alert("Please enter number of products on vender website");
        setLoading(false)
      }
    }
  }
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const scrapproduct = async () => {
    thread1();
    await delay(1000)
    thread2();
    await delay(1000)
    thread3();
    await delay(1000)
    thread4();
    await delay(1000)
    thread5();
    await delay(1000)
    thread6();
    await delay(1000)
    thread7();
    await delay(1000)
    thread8();
    await delay(1000)

  }

  const downloadExcel = async () => {
    try {
      setLoading(true)
      const response = await axios({
        url: `${api}/download-excel`,
        method: 'GET',
        responseType: 'blob',
      });

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

  const handleFileChange2 = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post(`${api}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setLoading(false)
      // navigate('/checkproduct')
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file');
    }
  };

  const removeexistingurl=async(e)=>{
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
     let res=  await axios.post(`${api}/removeexistingurl`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setLoading(false)
     if(res.data.status){
      alert(`Total ${res.data.count} urls removed from ${urlLen} urls`);
      window.location.reload()
     }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file');
    }
  }

  const exp = async () => {
    console.log("Exp function")
    let res = await fetch(`${api}/exp`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    res = await res.json();
    console.log(res.length)
    console.log(res)
  }

  // const downloadpartialExcel = async () => {
  //   let res = await fetch(`${api}/downloadpartiallist`, {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' }
  //   })
  //   res = await res.json();
  //   if (Array.isArray(res.upc)) {
  //     const jsondata = res.upc.map((item) => {
  //       return {
  //         upc: item,
  //       }
  //     });
  //     const wb = XLSX.utils.book_new();
  //     const ws = XLSX.utils.json_to_sheet(jsondata);
  //     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  //     const excelFile = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  //     const blob = new Blob([excelFile], { type: 'application/octet-stream' });

  //     const link = document.createElement('a');
  //     link.href = URL.createObjectURL(blob);
  //     link.download = 'Partiallist.xlsx'; // Set the file name
  //     link.click(); // Trigger the download
  //   } else {
  //     alert('Error while fetching upc list')
  //   }
  // };

  const thread1 = async () => {
    setL((prev) => (
      { ...prev, l1: true }
    ))
    let urls = link[0];
    let index = 0;
    while (index < urls.length) {
      let url = urls[index]
      let res = await fetch(`${api}/thread1`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, arrayid })
      })
      res = await res.json();
      console.log(`Thread-I - ${res.status}|| ${url}`);
      res.status ? index++ : null
      setIndex((prevState) => ({
        ...prevState,
        index1: index
      }));
    }
    setL((prev) => (
      { ...prev, l1: false }
    ))
  }

  const thread2 = async () => {
    setL((prev) => (
      { ...prev, l2: true }
    ))
    let urls = link[1];
    let index = 0;
    while (index < urls.length) {
      let url = urls[index]
      let res = await fetch(`${api}/thread2`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, arrayid })
      })
      res = await res.json();
      console.log(`Thread-II- ${res.status}|| ${url}`);
      res.status ? index++ : null
      setIndex((prevState) => ({
        ...prevState,
        index2: index
      }));
    }
    setL((prev) => (
      { ...prev, l2: false }
    ))
  }

  const thread3 = async () => {
    setL((prev) => (
      { ...prev, l3: true }
    ))
    let urls = link[2];
    let index = 0;
    while (index < urls.length) {
      let url = urls[index]
      let res = await fetch(`${api}/thread3`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, arrayid })
      })
      res = await res.json();
      console.log(`Thread-III - ${res.status}|| ${url}`);
      res.status ? index++ : null
      setIndex((prevState) => ({
        ...prevState,
        index3: index
      }));
    }
    setL((prev) => (
      { ...prev, l3: false }
    ))
  }

  const thread4 = async () => {
    setL((prev) => (
      { ...prev, l4: true }
    ))
    let urls = link[3];
    let index = 0;
    while (index < urls.length) {
      let url = urls[index]
      let res = await fetch(`${api}/thread4`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, arrayid })
      })
      res = await res.json();
      console.log(`Thread-IV - ${res.status}|| ${url}`);
      res.status ? index++ : null
      setIndex((prevState) => ({
        ...prevState,
        index4: index
      }));
    }
    setL((prev) => (
      { ...prev, l4: false }
    ))
  }

  const thread5 = async () => {
    setL((prev) => (
      { ...prev, l5: true }
    ))
    let urls = link[4];
    let index = 0;
    while (index < urls.length) {
      let url = urls[index]
      let res = await fetch(`${api}/thread5`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, arrayid })
      })
      res = await res.json();
      console.log(`Thread-V - ${res.status}|| ${url}`);
      res.status ? index++ : null
      setIndex((prevState) => ({
        ...prevState,
        index5: index
      }));
    }
    setL((prev) => (
      { ...prev, l5: false }
    ))
  }

  const thread6 = async () => {
    setL((prev) => (
      { ...prev, l6: true }
    ))
    let urls = link[5];
    let index = 0;
    while (index < urls.length) {
      let url = urls[index]
      let res = await fetch(`${api}/thread6`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, arrayid })
      })
      res = await res.json();
      console.log(`Thread-VI - ${res.status}|| ${url}`);
      res.status ? index++ : null
      setIndex((prevState) => ({
        ...prevState,
        index6: index
      }));
    }
    setL((prev) => (
      { ...prev, l6: false }
    ))
  }

  const thread7 = async () => {
    setL((prev) => (
      { ...prev, l7: true }
    ))
    let urls = link[6];
    let index = 0;
    while (index < urls.length) {
      let url = urls[index]
      let res = await fetch(`${api}/thread7`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, arrayid })
      })
      res = await res.json();
      console.log(`Thread-VII - ${res.status}|| ${url}`);
      res.status ? index++ : null
      setIndex((prevState) => ({
        ...prevState,
        index7: index
      }));
    }
    setL((prev) => (
      { ...prev, l7: false }
    ))
  }

  const thread8 = async () => {
    setL((prev) => (
      { ...prev, l8: true }
    ))
    let urls = link[7];
    let index = 0;
    while (index < urls.length) {
      let url = urls[index]
      let res = await fetch(`${api}/thread8`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, arrayid })
      })
      res = await res.json();
      console.log(`Thread-VIII - ${res.status}|| ${url}`);
      res.status ? index++ : null
      setIndex((prevState) => ({
        ...prevState,
        index8: index
      }));
    }
    setL((prev) => (
      { ...prev, l8: false }
    ))
  }

  const pratical = async () => {

    let res = await fetch(`${api}/pratical`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: purl })
    })
    res = await res.json()
  }
  return (
    <div style={{ opacity: loading ? 0.5 : 1, color: loading ? 'black' : null, paddingLeft: '3vw', paddingRight: '3vw' }}>
      {loading && ( // Show spinner while loading is true
        <div className="loading-overlay">
          <Spinner animation="border" variant="primary" /> {/* Spinner from Bootstrap */}
        </div>
      )}
      <h1 className="text-center bg-dark text-white p-2 mb-3 mt-0">Brand Scrapping</h1>
      {/* <button onClick={exp}>Exp data</button>
      <input type="text" onChange={(e) => setPurl(e.target.value)} />
      <button onClick={pratical}>Pratical</button> */}
      <p>Brand URL</p>
      <input type="text" onChange={(e) => setUrl(e.target.value)} placeholder='Brand URL' className='w-25 p-2'  />
      <input type="text" className='ms-3 p-2' onChange={(e) => setNum(e.target.value)} placeholder='Number of products' />

      <button className='ms-4' onClick={fetchbrand}>Fetch All product URLs</button>
      <br />

      <div className="timer_container mt-4">
        <div className='timer'>Total Products' Url : &nbsp;<span style={{ fontWeight: 'bolder' }}>{urlLen}</span></div>

        <div className="timer">
          Total fetched Product : {totalProduct} <span onClick={getupdatedproduct}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="ms-4 bi bi-arrow-clockwise" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
          </svg></span>
        </div>
      </div>
      <button className='ms-4 mt-3' onClick={scrapproduct}>Start Scraping UPCs</button>



      {/* <div className="container mt-4">
        <div className="row">

        </div>
       </div> */}

      <div className="container mt-4">
        <div className="row">


          <div className="col-lg-3 col-md-4 col-sm-6" >
            <div className="threadbox m-2 p-2" style={{ backgroundColor: l.l1 ? 'rgb(108 11 109 / 99%)' : 'black', boxShadow: l.l1 ? '#000000 8px 3px 55px -17px' : '0' }}>
              <h5>Thread - I &nbsp;|| &nbsp;Total urls- {link[0].length} </h5>
              <div className='mt-2 mb-2' style={{ height: 60, width: 60 }}>
                <CircularProgressbar
                  value={(index.index1 / link[0].length * 100)}
                  text={`${(index.index1 / link[0].length * 100).toFixed(0)}%`}
                />
              </div>
              <a href={link[0][index.index1]} target='_blank'>{link[0][index.index1]}</a>
            </div>
          </div>

          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="threadbox m-2 p-2" style={{ backgroundColor: l.l2 ? 'rgb(108 11 109 / 99%)' : 'black', boxShadow: l.l2 ? '#000000 8px 3px 55px -17px' : '0' }}>
              <h5>Thread - II  &nbsp;|| &nbsp;Total urls- {link[1].length} </h5>
              <div className='mt-2 mb-2' style={{ height: 60, width: 60 }}>
                <CircularProgressbar
                  value={(index.index2 / link[1].length * 100)}
                  text={`${(index.index2 / link[1].length * 100).toFixed(0)}%`}
                />
              </div>
              <a href={link[1][index.index2]} target='_blank'>{link[1][index.index2]}</a>
            </div>
          </div>

          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="threadbox m-2 p-2" style={{ backgroundColor: l.l3 ? 'rgb(108 11 109 / 99%)' : 'black', boxShadow: l.l3 ? '#000000 8px 3px 55px -17px' : '0' }}>
              <h5>Thread - III  &nbsp;|| &nbsp;Total urls- {link[2].length}  </h5>
              <div className='mt-2 mb-2' style={{ height: 60, width: 60 }}>
                <CircularProgressbar
                  value={(index.index3 / link[2].length * 100)}
                  text={`${(index.index3 / link[2].length * 100).toFixed(0)}%`}
                />
              </div>
              <a href={link[2][index.index3]} target='_blank'>{link[2][index.index3]}</a>
            </div>
          </div>

          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="threadbox m-2 p-2" style={{ backgroundColor: l.l4 ? 'rgb(108 11 109 / 99%)' : 'black', boxShadow: l.l4 ? '#000000 8px 3px 55px -17px' : '0' }}>
              <h5>Thread - IV  &nbsp;|| &nbsp;Total urls- {link[3].length}  </h5>
              <div className='mt-2 mb-2' style={{ height: 60, width: 60 }}>
                <CircularProgressbar
                  value={(index.index4 / link[3].length * 100)}
                  text={`${(index.index4 / link[3].length * 100).toFixed(0)}%`}
                />
              </div>
              <a href={link[3][index.index4]} target='_blank'>{link[3][index.index4]}</a>
            </div>
          </div>

          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="threadbox m-2 p-2" style={{ backgroundColor: l.l5 ? 'rgb(108 11 109 / 99%)' : 'black', boxShadow: l.l5 ? '#000000 8px 3px 55px -17px' : '0' }}>
              <h5>Thread - V  &nbsp;|| &nbsp;Total urls- {link[4].length} </h5>
              <div className='mt-2 mb-2' style={{ height: 60, width: 60 }}>
                <CircularProgressbar
                  value={(index.index5 / link[4].length * 100)}
                  text={`${(index.index5 / link[4].length * 100).toFixed(0)}%`}
                />
              </div>
              <a href={link[4][index.index5]} target='_blank'>{link[4][index.index5]}</a>
            </div>
          </div>

          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="threadbox m-2 p-2" style={{ backgroundColor: l.l6 ? 'rgb(108 11 109 / 99%)' : 'black', boxShadow: l.l6 ? '#000000 8px 3px 55px -17px' : '0' }}>
              <h5>Thread - VI  &nbsp;|| &nbsp;Total urls- {link[5].length}  </h5>
              <div className='mt-2 mb-2' style={{ height: 60, width: 60 }}>
                <CircularProgressbar
                  value={(index.index6 / link[5].length * 100)}
                  text={`${(index.index6 / link[5].length * 100).toFixed(0)}%`}
                />
              </div>
              <a href={link[5][index.index6]} target='_blank'>{link[5][index.index6]}</a>
            </div>
          </div>

          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="threadbox m-2 p-2" style={{ backgroundColor: l.l7 ? 'rgb(108 11 109 / 99%)' : 'black', boxShadow: l.l7 ? '#000000 8px 3px 55px -17px' : '0' }}>
              <h5>Thread - VII  &nbsp;|| &nbsp;Total urls- {link[6].length} </h5>
              <div className='mt-2 mb-2' style={{ height: 60, width: 60 }}>
                <CircularProgressbar
                  value={(index.index7 / link[6].length * 100)}
                  text={`${(index.index7 / link[6].length * 100).toFixed(0)}%`}
                />
              </div>
              <a href={link[6][index.index7]} target='_blank'>{link[6][index.index7]}</a>
            </div>
          </div>

          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="threadbox m-2 p-2" style={{ backgroundColor: l.l8 ? 'rgb(108 11 109 / 99%)' : 'black', boxShadow: l.l8 ? '#000000 8px 3px 55px -17px' : '0' }}>
              <h5>Thread - VIII  &nbsp;|| &nbsp;Total urls- {link[7].length} </h5>
              <div className='mt-2 mb-2' style={{ height: 60, width: 60 }}>
                <CircularProgressbar
                  value={(index.index8 / link[7].length * 100)}
                  text={`${(index.index8 / link[7].length * 100).toFixed(0)}%`}
                />
              </div>
              <a href={link[7][index.index8]} target='_blank'>{link[7][index.index8]}</a>
            </div>
          </div>
        </div>
      </div>
      <p className='fs-4'> <span className='text-danger fw-bolder'>Note :</span> Please refresh page once all thread completed. In case of error in any url, that will be visible after refresh. If there is remaining url, then start scrapping again.</p>

      {/* <button className='me-4 mt-4' variant="secondary" onClick={downloadpartialExcel}>
        Download Test UPC List
      </button> */}
      {/* <input type="file" onChange={handleFileChange} accept=".xlsx, .xls" />
          <button onClick={handleSubmit}>Upload</button> */}
      <button className='ms-4 mt-4' variant="secondary" onClick={downloadExcel}>
        Download UPC List
      </button>

      <div className='d-flex mt-4'>

        <h2 className='me-4'>Upload ASIN-SCOPE SHEET</h2>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} accept=".xlsx, .xls" />
          <button className='me-4' type="submit">Upload</button>
        </form>
{/*         <Link to='/checkproduct'>Check Final Data</Link> */}
        <br />
        <form onSubmit={removeexistingurl}>
          <input type="file" onChange={handleFileChange2} accept=".xlsx, .xls" />
          <button className='me-4' type="submit">Upload For remove existing url</button>
        </form>
        {/* <button onClick={downloadFinalSheet}>Download Comparison Sheet</button> */}
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
      <Outlet />
    </div >
  )
}

