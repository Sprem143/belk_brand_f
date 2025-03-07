import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import './App.css'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import Accordion from 'react-bootstrap/Accordion';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link, Outlet } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import * as XLSX from 'xlsx';
function App() {
  const navigate = useNavigate()
  const [invfile, setInvFile] = useState('');
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [loading5, setLoading5] = useState(false);
  const [loading6, setLoading6] = useState(false);
  const [loading7, setLoading7] = useState(false);
  const [loading8, setLoading8] = useState(false);
  const [link, setLink] = useState([[], [], [], [], [], [], [], []])

  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(0);
  const [index3, setIndex3] = useState(0);
  const [index4, setIndex4] = useState(0);
  const [index5, setIndex5] = useState(0);
  const [index6, setIndex6] = useState(0);
  const [index7, setIndex7] = useState(0);
  const [index8, setIndex8] = useState(0);

  const [speed1, setSpeed1] = useState(0);
  const [speed2, setSpeed2] = useState(0);
  const [speed3, setSpeed3] = useState(0);
  const [speed4, setSpeed4] = useState(0);
  const [speed5, setSpeed5] = useState(0);
  const [speed6, setSpeed6] = useState(0);
  const [speed7, setSpeed7] = useState(0);
  const [speed8, setSpeed8] = useState(0);

  const [totalProduct, setTotalProduct] = useState(0);
  const [urlError1, setUrlError1] = useState(false);
  const [urlError2, setUrlError2] = useState(false);
  const [urlError8, setUrlError8] = useState(false);
  const [urlError3, setUrlError3] = useState(false);
  const [urlError4, setUrlError4] = useState(false);
  const [urlError5, setUrlError5] = useState(false);
  const [urlError6, setUrlError6] = useState(false);
  const [urlError7, setUrlError7] = useState(false);
  const [graph, setGraph] = useState(null)
  const stopRef = useRef(false);
  const timerRef = useRef(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [linkid, setLinkid] = useState('');
  const local = 'http://localhost:10000'
  const api = 'https://brand-b-1.onrender.com'
  useEffect(() => {
    getinvurl();
    getupdatedproduct();
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
  const getinvurl = async () => {
    try {
      let result = await fetch(`${api}/getinvurl`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
      })
      result = await result.json();
      console.log(result)
      setLinkid(result.url._id)
      let dividedarr = divideArrayIntoParts(result.url.url);
      setLink(dividedarr)
      if (result.data.length > 0) {
        setData(result.data)

      }


    } catch (err) {
      console.log(err)
    }
  };
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000); // Increment every second
  };
  const stopTimer = async () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };
  const formatElapsedTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = (time % 60).toFixed(1);
    return `${minutes} m ${seconds} s`;
  };
  const formatElapsedTime1 = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = (time % 60).toFixed(0);
    return `${minutes} m ${seconds} s`;
  };

  const setInventoryfile = (e) => {
    setInvFile(e.target.files[0]);
  };

  const uploadinventoryfile = async () => {
    setLoading(true)
    if (!invfile) {
      alert("Please select file first");
      setLoading(false)
      return;
    }
    const formData = new FormData();
    formData.append('file', invfile);
    try {
      const response = await axios.post(`${api}/uploadinvfile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      window.location.reload();
      setLoading(false)

    } catch (error) {
      console.error('Error uploading file:', error);
      setLoading(false)
      alert(error);
    }
  };

  const uploadinventoryfile2 = async () => {
    setLoading(true)
    const formData = new FormData();
    formData.append('file', invfile);
    try {
      const response = await axios.post(`${api}/uploadinvfile2`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      window.location.reload();
      setLoading(false)

    } catch (error) {
      console.error('Error uploading file:', error);
      setLoading(false)
      alert(error);
    }
  };
  const autofetchData = async (link) => {
    try {
      let result = await fetch(`${api}/autofetchdata`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link: link, id: linkid })
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
      let result = await fetch(`${api}/inv/autofetchdata2`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link: link, id: linkid })
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
      let result = await fetch(`${api}/inv/autofetchdata3`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link: link, id: linkid })
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
      let result = await fetch(`${api}/inv/autofetchdata4`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link: link, id: linkid })
      });
      result = await result.json();
      return result
    } catch (err) {
      console.log("Error in autofetchData4:", err);
      return false; // Return false in case of error to prevent further execution
    }
  };
  const autofetchData5 = async (link) => {
    try {
      let result = await fetch(`${api}/inv/autofetchdata5`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link: link, id: linkid })
      });
      result = await result.json();
      return result
    } catch (err) {
      console.log("Error in autofetchData5:", err);
      return false; // Return false in case of error to prevent further execution
    }
  };
  const autofetchData6 = async (link) => {
    try {
      let result = await fetch(`${api}/inv/autofetchdata6`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link: link, id: linkid })
      });
      result = await result.json();
      return result
    } catch (err) {
      console.log("Error in autofetchData6:", err);
      return false; // Return false in case of error to prevent further execution
    }
  };
  const autofetchData7 = async (link) => {
    try {
      let result = await fetch(`${api}/inv/autofetchdata7`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link: link, id: linkid })
      });
      result = await result.json();
      return result
    } catch (err) {
      console.log("Error in autofetchData7:", err);
      return false; // Return false in case of error to prevent further execution
    }
  };
  const autofetchData8 = async (link) => {
    try {
      let result = await fetch(`${api}/inv/autofetchdata8`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link: link, id: linkid })
      });
      result = await result.json();
      return result
    } catch (err) {
      console.log("Error in autofetchData8:", err);
      return false; // Return false in case of error to prevent further execution
    }
  };
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const autofetch = async () => {
    let index = index1;
    setLoading1(true);
    startTimer();
    stopRef.current = false;
    while (index < link[0].length && !stopRef.current) {
      try {
        const startTime = performance.now();
        var result = await autofetchData(link[0][index]);
        const endTime = performance.now();
        const timeTaken1 = (endTime - startTime) / 1000;
        setSpeed1(timeTaken1.toFixed(1));
        console.log(`Thread-I || index: ${index} || result ${result}`);
        if (result === true) {
          index += 1;
          setIndex1(index)
        } else {
          setUrlError1(true);
          await delay(3000);
          console.log("An error occurred.");
          setUrlError1(false);
          index += 1;
          setIndex1(index)
        }
      } catch (err) {
        console.log("Error in autofetch:", err);
      }
    }
    setLoading1(false);
    stopTimer();
  };
  const autofetch2 = async () => {
    let index = index2;
    setLoading2(true);
    stopRef.current = false;
    while (index < link[1].length && !stopRef.current) {
      try {
        const startTime = performance.now();
        var result = await autofetchData2(link[1][index]);
        const endTime = performance.now();
        const timeTaken1 = (endTime - startTime) / 1000;
        setSpeed2(timeTaken1.toFixed(1));
        console.log(`Thread-II || index: ${index} || result ${result}`);
        if (result === true) {
          index += 1;
          setIndex2(index)
        } else {
          setUrlError2(true);
          await delay(3000);
          console.log("An error occurred.");
          setUrlError2(false);
          index += 1;
          setIndex2(index)
        }
      } catch (err) {
        console.log("Error in autofetch:", err);
      }
    } setLoading2(false)
  };
  const autofetch3 = async () => {
    let index = index3;
    setLoading3(true);
    stopRef.current = false;
    while (index < link[2].length && !stopRef.current) {
      try {
        const startTime = performance.now();
        var result = await autofetchData3(link[2][index])
        const endTime = performance.now();
        const timeTaken1 = (endTime - startTime) / 1000;
        setSpeed3(timeTaken1.toFixed(1));
        console.log(`Thread-III || index: ${index} || result ${result}`);
        if (result === true) {
          index += 1;
          setIndex3(index)
        } else {
          setUrlError3(true);
          await delay(3000);
          console.log("An error occurred.");
          setUrlError3(false);
          index += 1;
          setIndex3(index)
        }
      } catch (err) {
        console.log("Error in autofetch:", err);
      }
    } setLoading3(false)
  };
  const autofetch4 = async () => {
    let index = index4;
    setLoading4(true);
    stopRef.current = false;
    while (index < link[3].length && !stopRef.current) {
      try {
        const startTime = performance.now();
        var result = await autofetchData4(link[3][index])
        const endTime = performance.now();
        const timeTaken1 = (endTime - startTime) / 1000;
        setSpeed4(timeTaken1.toFixed(1));
        console.log(`Thread-IV || index: ${index} || result ${result}`);
        if (result === true) {
          index += 1;
          setIndex4(index)
        } else {
          setUrlError4(true);
          await delay(3000);
          console.log("An error occurred.");
          setUrlError4(false);
          index += 1;
          setIndex4(index)
        }
      } catch (err) {
        console.log("Error in autofetch:", err);
      }
    } setLoading4(false)
  };
  const autofetch5 = async () => {
    let index = index5;
    setLoading5(true);
    stopRef.current = false;
    while (index < link[4].length && !stopRef.current) {
      try {
        const startTime = performance.now();
        var result = await autofetchData5(link[4][index])
        const endTime = performance.now();
        const timeTaken1 = (endTime - startTime) / 1000;
        setSpeed5(timeTaken1.toFixed(1));
        console.log(`Thread-V || index: ${index} || result ${result}`);
        if (result === true) {
          index += 1;
          setIndex5(index)
        } else {
          setUrlError5(true);
          await delay(3000);
          console.log("An error occurred.");
          setUrlError5(false);
          index += 1;
          setIndex5(index)
        }
      } catch (err) {
        console.log("Error in autofetch5:", err);
      }
    } setLoading5(false)
  };

  const autofetch6 = async () => {
    let index = index6;
    setLoading6(true);
    stopRef.current = false;
    while (index < link[5].length && !stopRef.current) {
      try {
        const startTime = performance.now();
        var result = await autofetchData6(link[5][index])
        const endTime = performance.now();
        const timeTaken1 = (endTime - startTime) / 1000;
        setSpeed6(timeTaken1.toFixed(1));
        console.log(`Thread-VI || index: ${index} || result ${result}`);
        if (result === true) {
          index += 1;
          setIndex6(index)
        } else {
          setUrlError6(true);
          await delay(3000);
          console.log("An error occurred.");
          setUrlError6(false);
          index += 1;
          setIndex6(index)
        }
      } catch (err) {
        console.log("Error in autofetch6:", err);
      }
    } setLoading6(false)
  };
  const autofetch7 = async () => {
    let index = index7;
    setLoading7(true);
    stopRef.current = false;
    stopRef.current = false;
    while (index < link[6].length && !stopRef.current) {
      try {
        const startTime = performance.now();
        var result = await autofetchData7(link[6][index])
        const endTime = performance.now();
        const timeTaken1 = (endTime - startTime) / 1000;
        setSpeed7(timeTaken1.toFixed(1));
        console.log(`Thread-VII || index: ${index} || result ${result}`);
        if (result === true) {
          index += 1;
          setIndex7(index)
        } else {
          setUrlError7(true);
          await delay(3000);
          console.log("An error occurred.");
          setUrlError7(false);
          index += 1;
          setIndex7(index)
        }
      } catch (err) {
        console.log("Error in autofetch7:", err);
      }
    } setLoading7(false)
  };
  const autofetch8 = async () => {
    let index = index8;
    setLoading8(true);
    stopRef.current = false;
    while (index < link[7].length && !stopRef.current) {
      try {
        const startTime = performance.now(); // Start the timer
        var result = await autofetchData8(link[7][index])
        const endTime = performance.now(); // End the timer
        const timeTaken1 = (endTime - startTime) / 1000;
        setSpeed8(timeTaken1.toFixed(1));
        console.log(`Thread-VIII || index: ${index} || result ${result}`);
        if (result === true) {
          index += 1;
          setIndex8(index)
        } else {
          setUrlError8(true);
          await delay(3000);
          console.log("An error occurred.");
          setUrlError8(false);
          index += 1;
          setIndex8(index)
        }
      } catch (err) {
        console.log("Error in autofetch8:", err);
      }
    } setLoading8(false)
  };

  const stopFetching = () => {
    stopRef.current = true;
  };

  const getupdatedproduct = async () => {
    let result = await fetch(`${api}/getupdatedproduct`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    result = await result.json();
    setTotalProduct(result.num);
  }


  const checkremainingdata = async () => {
    let resp = await fetch(`${api}/inv/checkremainingdata`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    resp = await resp.json();
    if (resp.status) {
      if (Array.isArray(resp.url.url) && resp.url.url.length > 0) {
        let res = confirm(`${resp.url.url.length} urls are still pending. Are you sure you want to download incomplete sheet`)
        return res
      } else {
        return true
      }
    }
    console.log(resp)
  }
  const downloadInvontory = async (e) => {
    e.preventDefault();
    let pass= prompt('Enter Password')
    let [a,b,c]= new Date().toLocaleDateString('en-GB').split('/')
   if(pass == a+b+c){
    let response = await checkremainingdata()
    if (response) {
      try {
        setLoading(true)
        const response = await axios({
          url: `${api}/download-inventory`,
          method: 'GET',
          responseType: 'blob',
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Updated_inventory.xlsx');
        document.body.appendChild(link);
        link.click();
        link.remove();
        setLoading(false)
      } catch (error) {
        console.error('Error downloading the file:', error);
        setLoading(false)
      }
    }
   }else{
    alert("Wrong Password")
   }
  }
  const uploadinventoryfile3 = async () => {
    setLoading(true)
    const formData = new FormData();
    formData.append('file', invfile);
    try {
      const response = await axios.post(`${api}/uploadinvfile3`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      window.location.reload();
      setLoading(false)

    } catch (error) {
      console.error('Error uploading file:', error);
      setLoading(false)
      alert(error);
    }
  };
  const removeoutofstock = async () => {
    let res = await fetch(`${api}/inv/removeoutofstock`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    res = await res.json();
   if(res.status){
    return res.count
   }
  }
const savemasterdata = async()=>{
  let res= await fetch(`${api}/inv/savemasterdata`,{
    method:'GET',
    headers:{'Content-Type':'application/json'}
  })
  res= await res.json();
  console.log(res.size)
}
  const startall = async () => {
   await removeoutofstock();
    autofetch();
    // await delay(1000)
    // autofetch2();
    // await delay(1000)
    // autofetch3();
    // await delay(1000)
    // autofetch4();
    // await delay(1000)
    // autofetch5();
    // await delay(1000)
    // autofetch6();
    // await delay(1000)
    // autofetch7();
    // await delay(1000)
    // autofetch8();
    // await delay(1000)
    savemasterdata();
  }

  const [data, setData] = useState([])
  const pricerangeproduct = async () => {
    let resp = await fetch(`${api}/inv/pricerangeproduct`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    resp = await resp.json();
    setData(resp.data)
    navigate('#pricerange')
  }

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  // Pagination calculation for displaying the current page's data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginationRange = () => {
    const range = [];
    const maxPageNumbers = 5;
    let startPage = Math.max(currentPage - Math.floor(maxPageNumbers / 2), 1);
    let endPage = startPage + maxPageNumbers - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxPageNumbers + 1, 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }
    return range;
  }

  const changeprice = async (price, id) => {
    let res = await fetch(`${api}/inv/changeprice`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, price })
    })
    res = await res.json();
    if (res.status) {
      alert(`${res.num} products' price of same varient has been changed`);
      setData(res.data);
      navigate('#pricerange')
    }
  }
  return (
    <div style={{ opacity: loading ? 0.5 : 1, color: loading ? 'black' : null, paddingLeft: '3vw', paddingRight: '3vw' }}>
      {loading && (
        <div className="loading-overlay">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      <div>
        <h2>Inventory Updation</h2>

        <div className='p-2 mt-4' style={{ border: '1px solid black' }}>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h4>Upload direct Belk source file</h4>
                <input type="file" onChange={setInventoryfile} accept=".xlsx, .xls" />
                <button onClick={uploadinventoryfile2} >Upload</button>
              </div>
              <div className="col-md-6" style={{ borderLeft: '2px solid black' }}>
                <h4>Upload direct Boscov source file</h4>
                <input type="file" onChange={setInventoryfile} accept=".xlsx, .xls" />
                <button onClick={uploadinventoryfile3} >Upload</button>
              </div>

            </div>
          </div>
        </div>

        <div>
          <input type="file" onChange={setInventoryfile} accept=".xlsx, .xls" />
          <button onClick={uploadinventoryfile} >Upload</button>
          <button onClick={startall} className='ms-4' >Start All</button>
          <button onClick={stopFetching} className='ms-4' disabled={!loading1}>
            Pause
          </button>
          <a href="#productrange" className='text-dark' style={{ textDecoration: 'none' }}>
            <button onClick={pricerangeproduct} className='ms-4 text-black'>
              Fix Product Range
            </button>
          </a>
          <button className='ms-4 mt-4' variant="secondary" onClick={downloadInvontory}>
            Download Result
          </button>
          <Link className='ms-4' to='analysis'>Analysis Data</Link>
        </div>
      </div>
      <div className="timer_container mt-4">
        <div className='timer'>Elapsed Time : &nbsp;<span style={{ fontWeight: 'bolder' }}>{formatElapsedTime(elapsedTime)}</span></div>
        {
          (loading1 || loading2 || loading3 || loading4 || loading5 || loading6 || loading7 || loading8) && <div className='timer'>Expected Time :&nbsp;<span style={{ fontWeight: 'bolder' }}>{formatElapsedTime1((speed1 / 8) * (link[0].length + link[1].length + link[2].length + link[3].length + link[4].length + link[5].length + link[6].length + link[7].length - (index1 + index2 + index3 + index4 + index5 + index6 + index7 + index8)))}</span> </div>
        }
        <div className="timer">
          Total updated Product : {totalProduct} <span onClick={getupdatedproduct}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="ms-4 bi bi-arrow-clockwise" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
          </svg></span>
        </div>
      </div>
      <Accordion className='mt-4' defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Total Number of Product's URL: {link[0] ? link[0].length + link[1].length + link[2].length + link[3].length + link[4].length + link[5].length + link[6].length + link[7].length : 0} &nbsp;&nbsp; || &nbsp;&nbsp; Total Number of urls fetched : {index1 + index2 + index3 + index4 + index5 + index6 + index7 + index8} &nbsp;&nbsp; || &nbsp;&nbsp; Remaining urls :  {link[0] ? link[0].length + link[1].length + link[2].length + link[3].length + link[4].length + link[5].length + link[6].length + link[7].length - (index1 + index2 + index3 + index4 + index5 + index6 + index7 + index8) : 0} &nbsp;&nbsp; || &nbsp;&nbsp; Net Speed : &nbsp; <span style={{ color: 'red' }}> {(speed1 / 8).toFixed(1)} s / URL</span></Accordion.Header>
          <Accordion.Body>
            <div className="thread" style={{ backgroundColor: loading1 ? 'rgb(11 109 91 / 99%)' : 'black', boxShadow: loading1 ? '#000000 8px 3px 55px -17px' : '0' }}>
              <div className="container">
                <div className="row">
                  <div className="cus_row col-lg-3 col-md-6 col-sm-12 mt-2 mb-2">
                    <button className='startbtn me-3' onClick={autofetch}>Start-I</button>
                    <input className='inputbtn' type="number" placeholder={index1} onChange={(e) => setIndex(e.target.value)} />
                  </div>

                  <div className="cus_row col-lg-3 col-md-6 col-sm-12 mt-2 mb-2">
                    <h4> {index1}/{link[0].length}</h4>
                    <div className='ms-4 me-4' style={{ height: 50, width: 50 }}>
                      <CircularProgressbar
                        value={(index1 / link[0].length * 100)}
                        text={`${(index1 / link[0].length * 100).toFixed(0)}%`}
                      />
                    </div>
                    <h4>
                      {speed1} s / URL
                    </h4>
                  </div>

                  <div className="cus_row col-lg-6 col-md-6 col-sm-12 mt-2 mb-2">
                    {urlError1 && <p style={{ color: 'red' }}>Error while fetching this url -</p>}
                    <a href={link[0][index1]} target='_blank' style={{ color: urlError1 ? 'red' : 'white' }}>{index1 === link[0].length ?
                      (
                        <>
                          Completed <img className='ms-3' src="/static/celebr.png" alt="Completed" height='40' style={{ transform: 'rotate(70deg)' }} />
                        </>
                      ) : link[0][index1]}</a>
                  </div>

                </div>
              </div>
            </div>

            <div className="thread mt-2" style={{ backgroundColor: loading2 ? 'rgb(11 109 91 / 99%)' : 'black', boxShadow: loading2 ? '#000000 8px 3px 55px -17px' : '0' }}>
              <div className="container">
                <div className="row">
                  <div className="cus_row col-lg-3 col-md-6 col-sm-12 mt-2 mb-2">
                    <button className='startbtn me-3' onClick={autofetch2}>Start-II</button>
                    <input className='inputbtn' type="number" placeholder={index2} onChange={(e) => setIndex2(e.target.value)} />
                  </div>

                  <div className="cus_row col-lg-3 col-md-6 col-sm-12 mt-2 mb-2">
                    <h4> {index2}/{link[1].length}</h4>
                    <div className='ms-4 me-4' style={{ height: 50, width: 50 }}>
                      <CircularProgressbar
                        value={(index2 / link[1].length * 100)}
                        text={`${(index2 / link[1].length * 100).toFixed(0)}%`}
                      />
                    </div>
                    <h4>
                      {speed2} s / URL
                    </h4>
                  </div>

                  <div className="cus_row col-lg-6 col-md-6 col-sm-12 mt-2 mb-2">
                    {urlError2 && <p style={{ color: 'red' }}>Error while fetching this url -</p>}
                    <a href={link[1][index2]} target='_blank' style={{ color: urlError2 ? 'red' : 'white' }}>{index2 === link[1].length ? (
                      <>
                        Completed <img className='ms-3' src="/static/celebr.png" alt="Completed" height='40' style={{ transform: 'rotate(70deg)' }} />
                      </>
                    ) : link[1][index2]}</a>
                  </div>

                </div>
              </div>
            </div>

            <div className="thread mt-2" style={{ backgroundColor: loading3 ? 'rgb(11 109 91 / 99%)' : 'black', boxShadow: loading3 ? '#000000 8px 3px 55px -17px' : '0' }}>
              <div className="container">
                <div className="row">
                  <div className="cus_row col-lg-3 col-md-6 col-sm-12 mt-2 mb-2">
                    <button className='startbtn me-3' onClick={autofetch3}>Start-III</button>
                    <input className='inputbtn' type="number" placeholder={index3} onChange={(e) => setIndex3(e.target.value)} />
                  </div>

                  <div className="cus_row col-lg-3 col-md-6 col-sm-12 mt-2 mb-2">
                    <h4> {index3}/{link[2].length}</h4>
                    <div className='ms-4 me-4' style={{ height: 50, width: 50 }}>
                      <CircularProgressbar
                        value={(index3 / link[2].length * 100)}
                        text={`${(index3 / link[2].length * 100).toFixed(0)}%`}
                      />
                    </div>
                    <h4>
                      {speed3} s / URL
                    </h4>
                  </div>

                  <div className="cus_row col-lg-6 col-md-6 col-sm-12 mt-2 mb-2">
                    {urlError3 && <p style={{ color: 'red' }}>Error while fetching this url -</p>}
                    <a href={link[2][index3]} target='_blank' style={{ color: urlError3 ? 'red' : 'white' }}>{index3 === link[2].length ? (
                      <>
                        Completed <img className='ms-3' src="/static/celebr.png" alt="Completed" height='40' style={{ transform: 'rotate(70deg)' }} />
                      </>
                    ) : link[2][index3]}</a>
                  </div>

                </div>
              </div>
            </div>

            <div className="thread mt-2" style={{ backgroundColor: loading4 ? 'rgb(11 109 91 / 99%)' : 'black', boxShadow: loading4 ? '#000000 8px 3px 55px -17px' : '0' }}>
              <div className="container">
                <div className="row">
                  <div className="cus_row col-lg-3 col-md-6 col-sm-12 mt-2 mb-2">
                    <button className='startbtn me-3' onClick={autofetch4}>Start-IV</button>
                    <input className='inputbtn' type="number" placeholder={index4} onChange={(e) => setIndex4(e.target.value)} />
                  </div>

                  <div className="cus_row col-lg-3 col-md-6 col-sm-12 mt-2 mb-2">
                    <h4> {index4}/{link[3].length}</h4>
                    <div className='ms-4 me-4' style={{ height: 50, width: 50 }}>
                      <CircularProgressbar
                        value={(index4 / link[3].length * 100)}
                        text={`${(index4 / link[3].length * 100).toFixed(0)}%`}
                      />
                    </div>
                    <h4>
                      {speed4} s / URL
                    </h4>
                  </div>

                  <div className="cus_row col-lg-6 col-md-6 col-sm-12 mt-2 mb-2">
                    {urlError4 && <p style={{ color: 'red' }}>Error while fetching this url -</p>}
                    <a href={link[3][index4]} target='_blank' style={{ color: urlError4 ? 'red' : 'white' }}>{index4 === link[3].length ? (
                      <>
                        Completed <img className='ms-3' src="/static/celebr.png" alt="Completed" height='40' style={{ transform: 'rotate(70deg)' }} />
                      </>
                    ) : link[3][index4]}</a>
                  </div>

                </div>
              </div>
            </div>

            <div className="thread mt-2" style={{ backgroundColor: loading5 ? 'rgb(11 109 91 / 99%)' : 'black', boxShadow: loading5 ? '#000000 8px 3px 55px -17px' : '0' }}>
              <div className="container">
                <div className="row">
                  <div className="cus_row col-lg-3 col-md-6 col-sm-12 mt-2 mb-2">
                    <button className='startbtn me-3' onClick={autofetch5}>Start-V</button>
                    <input className='inputbtn' type="number" placeholder={index5} onChange={(e) => setIndex5(e.target.value)} />
                  </div>

                  <div className="cus_row col-lg-3 col-md-6 col-sm-12 mt-2 mb-2">
                    <h4> {index5}/{link[4].length}</h4>
                    <div className='ms-4 me-4' style={{ height: 50, width: 50 }}>
                      <CircularProgressbar
                        value={(index5 / link[4].length * 100)}
                        text={`${(index5 / link[4].length * 100).toFixed(0)}%`}
                      />
                    </div>
                    <h4>
                      {speed5} s / URL
                    </h4>
                  </div>

                  <div className="cus_row col-lg-6 col-md-6 col-sm-12 mt-2 mb-2">
                    {urlError5 && <p style={{ color: 'red' }}>Error while fetching this url -</p>}
                    <a href={link[4][index5]} target='_blank' style={{ color: urlError5 ? 'red' : 'white' }}>{index5 === link[4].length ? (
                      <>
                        Completed <img className='ms-3' src="/static/celebr.png" alt="Completed" height='40' style={{ transform: 'rotate(70deg)' }} />
                      </>
                    ) : link[4][index5]}</a>
                  </div>

                </div>
              </div>
            </div>

            <div className="thread mt-2" style={{ backgroundColor: loading6 ? 'rgb(11 109 91 / 99%)' : 'black', boxShadow: loading6 ? '#000000 8px 3px 55px -17px' : '0' }}>
              <div className="container">
                <div className="row">
                  <div className="cus_row col-lg-3 col-md-6 col-sm-12 mt-2 mb-2">
                    <button className='startbtn me-3' onClick={autofetch6}>Start-VI</button>
                    <input className='inputbtn' type="number" placeholder={index6} onChange={(e) => setIndex6(e.target.value)} />
                  </div>

                  <div className="cus_row col-lg-3 col-md-6 col-sm-12 mt-2 mb-2">
                    <h4> {index6}/{link[5].length}</h4>
                    <div className='ms-4 me-4' style={{ height: 50, width: 50 }}>
                      <CircularProgressbar
                        value={(index6 / link[5].length * 100)}
                        text={`${(index6 / link[5].length * 100).toFixed(0)}%`}
                      />
                    </div>
                    <h4>
                      {speed6} s / URL
                    </h4>
                  </div>

                  <div className="cus_row col-lg-6 col-md-6 col-sm-12 mt-2 mb-2">
                    {urlError6 && <p style={{ color: 'red' }}>Error while fetching this url -</p>}
                    <a href={link[5][index6]} target='_blank' style={{ color: urlError6 ? 'red' : 'white' }}>{index6 === link[5].length ? (
                      <>
                        Completed <img className='ms-3' src="/static/celebr.png" alt="Completed" height='40' style={{ transform: 'rotate(70deg)' }} />
                      </>
                    ) : link[5][index6]}</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="thread mt-2" style={{ backgroundColor: loading7 ? 'rgb(11 109 91 / 99%)' : 'black', boxShadow: loading7 ? '#000000 8px 3px 55px -17px' : '0' }}>
              <div className="container">
                <div className="row">
                  <div className="cus_row col-lg-3 col-md-6 col-sm-12 mt-2 mb-2">
                    <button className='startbtn me-3' onClick={autofetch7}>Start-VII</button>
                    <input className='inputbtn' type="number" placeholder={index7} onChange={(e) => setIndex7(e.target.value)} />
                  </div>

                  <div className="cus_row col-lg-3 col-md-6 col-sm-12 mt-2 mb-2">
                    <h4> {index7}/{link[6].length}</h4>
                    <div className='ms-4 me-4' style={{ height: 50, width: 50 }}>
                      <CircularProgressbar
                        value={(index7 / link[6].length * 100)}
                        text={`${(index7 / link[6].length * 100).toFixed(0)}%`}
                      />
                    </div>
                    <h4>
                      {speed7} s / URL
                    </h4>
                  </div>

                  <div className="cus_row col-lg-6 col-md-6 col-sm-12 mt-2 mb-2">
                    {urlError7 && <p style={{ color: 'red' }}>Error while fetching this url -</p>}
                    <a href={link[6][index7]} target='_blank' style={{ color: urlError7 ? 'red' : 'white' }}>{index7 === link[6].length ? (
                      <>
                        Completed <img className='ms-3' src="/static/celebr.png" alt="Completed" height='40' style={{ transform: 'rotate(70deg)' }} />
                      </>
                    ) : link[6][index7]}</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="thread mt-2" style={{ backgroundColor: loading8 ? 'rgb(11 109 91 / 99%)' : 'black', boxShadow: loading8 ? '#000000 8px 3px 55px -17px' : '0' }}>
              <div className="container">
                <div className="row">
                  <div className="cus_row col-lg-3 col-md-6 col-sm-12 mt-2 mb-2">
                    <button className='startbtn me-3' onClick={autofetch8}>Start-VIII</button>
                    <input className='inputbtn' type="number" placeholder={index8} onChange={(e) => setIndex8(e.target.value)} />
                  </div>

                  <div className="cus_row col-lg-3 col-md-6 col-sm-12 mt-2 mb-2">
                    <h4> {index8}/{link[7].length}</h4>
                    <div className='ms-4 me-4' style={{ height: 50, width: 50 }}>
                      <CircularProgressbar
                        value={(index8 / link[7].length * 100)}
                        text={`${(index8 / link[7].length * 100).toFixed(0)}%`}
                      />
                    </div>
                    <h4>
                      {speed8} s / URL
                    </h4>
                  </div>

                  <div className="cus_row col-lg-6 col-md-6 col-sm-12 mt-2 mb-2">
                    {urlError8 && link[7].length < index8 && <p style={{ color: 'red' }}>Error while fetching this url -</p>}
                    <a href={link[7][index8]} target='_blank' style={{ color: (urlError8 && link[7].length < index8) ? 'red' : 'white' }}>{index8 === link[7].length ? (
                      <>
                        Completed <img className='ms-3' src="/static/celebr.png" alt="Completed" height='40' style={{ transform: 'rotate(70deg)' }} />
                      </>
                    ) : link[7][index8]}</a>
                  </div>
                </div>
              </div>
            </div>

          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <hr />

      {data.length > 0 &&
        <div id='productrange' className="container d-flex justify-content-center align-items-center flex-column">
          <div className="tableheader row">
            {/* <div className="col-md-2"> <button className="nobtn p-2 text-white" onClick={all}><h5>Total Products : {realdata.length}</h5></button></div> */}
            <div className="col-md-2"> <button className="nobtn p-2 text-white"><h5>Total Products : {data.length}</h5></button></div>
          </div>

          <Table striped bordered hover className="bg-dark">
            <thead>
              <tr>
                <th>No</th>
                <th>UPC</th>
                <th>ASIN</th>
                <th>SKU</th>
                <th>Current Price</th>
                <th>Price Range</th>
                <th>Quantity</th>
                <th>URL</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 && currentItems.map((detailArray, i) => (
                <tr key={i}>
                  <td>{indexOfFirstItem + i + 1}</td>
                  <td>{detailArray['Input UPC']}</td>
                  <td>{detailArray['ASIN']}</td>
                  <td>{detailArray['SKU']}</td>
                  <td>{detailArray['Current Price'] && detailArray['Current Price'].toFixed(2)}</td>
                  <td>{
                    detailArray['PriceRange'].length > 0 &&
                    detailArray['PriceRange'].map((d) => (
                      <button onClick={() => changeprice(d, detailArray._id)}>{d}</button>
                    ))
                  }</td>
                  <td>{detailArray['Current Quantity']}</td>
                  <td><a href={detailArray['Product link']} target='_blank'>Link</a></td>
                  <td><button className='pt-1 pb-1 ps-2 pe-2' onClick={() => deleteproduct(detailArray._id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                      <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                    </svg>
                  </button></td>

                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination>
            <Pagination.Prev onClick={() => handlePaginationClick(currentPage - 1)} disabled={currentPage === 1} />

            {/* Display page numbers with ellipses if needed */}
            {currentPage > 1 && <Pagination.Item onClick={() => handlePaginationClick(1)}>1</Pagination.Item>}
            {currentPage > 3 && <Pagination.Ellipsis />}
            {paginationRange().map((page) => (
              <Pagination.Item
                key={page}
                active={page === currentPage}
                onClick={() => handlePaginationClick(page)}
              >
                {page}
              </Pagination.Item>
            ))}
            {currentPage < totalPages - 2 && <Pagination.Ellipsis />}
            {currentPage < totalPages && <Pagination.Item onClick={() => handlePaginationClick(totalPages)}>{totalPages}</Pagination.Item>}

            <Pagination.Next onClick={() => handlePaginationClick(currentPage + 1)} disabled={currentPage === totalPages} />
          </Pagination>
        </div>

      }
      <Outlet />
    </div>
  )
}

export default App
