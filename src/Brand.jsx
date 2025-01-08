import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar } from 'react-circular-progressbar';


export default function Brand() {
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
  const [l,setL]= useState({l1:false,l2:false,l3:false,l4:false,l5:false,l6:false,l7:false,l8:false,})

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
        setUrlLen(res.num2.length)
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
    console.log(data)
    setArrayid(data.id)
    let dividedarr = divideArrayIntoParts(data.url);
    setLink(dividedarr);
    console.log(dividedarr)
    setUpc(data.upc);
  }

  const fetchbrand = async () => {
    let resp = confirm('All Previous data will be deleted.Are you sure?');
    console.log(resp)
    if (resp) {
      if (num > 0) {
        setLoading(true)
        let result = await fetch(`${api}/fetchbrand`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url, num })
        })
        result = await result.json();
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
        url: `${api}/download-excel`, // Replace with your backend URL
        method: 'GET',
        responseType: 'blob', // Important to get the response as a blob (binary data)
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
        url: `${api}/downloadfinalSheet`, // Replace with your backend URL
        method: 'GET',
        responseType: 'blob',
      });

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

  const thread1 = async () => {
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
  }

  const thread2 = async () => {
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
  }

  const thread3 = async () => {
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
  }

  const thread4 = async () => {
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
  }

  const thread5 = async () => {
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
  }

  const thread6 = async () => {
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
  }

  const thread7 = async () => {
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
  }

  const thread8 = async () => {
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
  }

  return (
    <div style={{ opacity: loading ? 0.5 : 1, color: loading ? 'black' : null, paddingLeft: '3vw', paddingRight: '3vw' }}>
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

      <div className="timer_container mt-4">
        <div className='timer'>Total Products' Url : &nbsp;<span style={{ fontWeight: 'bolder' }}>{urlLen}</span></div>

        <div className="timer">
          Total fetched Product : {totalProduct} <span onClick={getupdatedproduct}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="ms-4 bi bi-arrow-clockwise" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
          </svg></span>
        </div>
      </div>
      <button className='ms-4' onClick={scrapproduct}>Start Scraping UPCs</button>
      <button className='ms-4 mt-4' variant="secondary" onClick={downloadExcel}>
        Download UPC List
      </button>
      <div className="container mt-4">
        <div className="row">


          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="threadbox m-2 p-2">
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
            <div className="threadbox m-2 p-2">
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
            <div className="threadbox m-2 p-2">
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
            <div className="threadbox m-2 p-2">
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
            <div className="threadbox m-2 p-2">
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
            <div className="threadbox m-2 p-2">
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
            <div className="threadbox m-2 p-2">
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
            <div className="threadbox m-2 p-2">
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
    </div >
  )
}

