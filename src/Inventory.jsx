
import { useState, useEffect, useRef } from 'react'
import './App.scss';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import Accordion from 'react-bootstrap/Accordion';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Pagination from 'react-bootstrap/Pagination';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';


function Inventory() {

  const [data, setData] = useState([{}]);
  const [realData, setRealData] = useState([{}]);
  const [currentPage, setCurrentPage] = useState(1);
  const [num, setNum] = useState(7)
  const [search, setSearch] = useState(null);
  const [result, setResult] = useState([{}]);
  const [remaindata, setRemain] = useState([{}]);
  const itemsPerPage = 10;

  const getupdatedproduct = async () => {
    setLoading(true)
    let result = await fetch('https://brand-b-1.onrender.com/mic/getupdatedproduct', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    result = await result.json();
    const uniqueProducts = result.filter((product, index, self) => 
      index === self.findIndex(p => p['upc'] === product['upc'])
    );
    setData(uniqueProducts)
    console.log(uniqueProducts.length)
    setRealData(uniqueProducts)
    setTotalProduct(result.length);
    setLoading(false)
  };
  const remainingdata = async () => {
    setLoading(true)
    let result = await fetch('https://brand-b-1.onrender.com/mic/remainingdata', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    result = await result.json();
   setRemain(result);
    setLoading(false)
  };
  
  // Pagination calculation for displaying the current page's data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  // --------------------------------------------------------------------
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
  const [errorloading, seterrorLoading] = useState(false);
  const [links1, setLinks1] = useState([]);
  const [links2, setLinks2] = useState([]);
  const [links3, setLinks3] = useState([]);
  const [links4, setLinks4] = useState([]);
  const [links5, setLinks5] = useState([]);
  const [links6, setLinks6] = useState([]);
  const [links7, setLinks7] = useState([]);
  const [links8, setLinks8] = useState([]);
  const [errorlinks, seterrorLinks] = useState([]);
  const [customIndex, setCustomIndex] = useState(0);
  const [customIndex2, setCustomIndex2] = useState(0);
  const [customIndex3, setCustomIndex3] = useState(0);
  const [customIndex4, setCustomIndex4] = useState(0);
  const [customIndex5, setCustomIndex5] = useState(0);
  const [customIndex6, setCustomIndex6] = useState(0);
  const [customIndex7, setCustomIndex7] = useState(0);
  const [customIndex8, setCustomIndex8] = useState(0);
  const [errorcustomIndex, seterrorCustomIndex] = useState(0);

  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(0);
  const [index3, setIndex3] = useState(0);
  const [index4, setIndex4] = useState(0);
  const [index5, setIndex5] = useState(0);
  const [index6, setIndex6] = useState(0);
  const [index7, setIndex7] = useState(0);
  const [index8, setIndex8] = useState(0);
  const [errorindex, seterrorIndex] = useState(0);

  const [speed1, setSpeed1] = useState(0);
  const [speed2, setSpeed2] = useState(0);
  const [speed3, setSpeed3] = useState(0);
  const [speed4, setSpeed4] = useState(0);
  const [speed5, setSpeed5] = useState(0);
  const [speed6, setSpeed6] = useState(0);
  const [speed7, setSpeed7] = useState(0);
  const [speed8, setSpeed8] = useState(0);
  const [errorspeed, setSpeederror] = useState(0);

  const [totalProduct, setTotalProduct] = useState(0);
  const [urlError1, setUrlError1] = useState(false);
  const [urlError2, setUrlError2] = useState(false);
  const [urlError8, setUrlError8] = useState(false);
  const [urlError3, setUrlError3] = useState(false);
  const [urlError4, setUrlError4] = useState(false);
  const [urlError5, setUrlError5] = useState(false);
  const [urlError6, setUrlError6] = useState(false);
  const [urlError7, setUrlError7] = useState(false);
  const [errurlerr, setErrurlerr] = useState(false)
  const stopRef = useRef(false);
  const timerRef = useRef(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  useEffect(() => {
    remainingdata()
    getinvurl();
    getserialnumber();
    geterrorurl();
    getupdatedproduct();
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);



  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate the page numbers to be displayed
  const paginationRange = () => {
    const range = [];
    const maxPageNumbers = 5; // Max page numbers to show
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
  };
  
  const searchproduct = () => {
    setResult([{}])
    if (search !== null) {
      new Promise(resolve => setTimeout(resolve, 1000))
      const sr = realData.filter((d) => d.ASIN.toLowerCase().includes(search.toLowerCase()))
      setResult(sr);
    }
  }

  const cancelsearch = () => {
    setResult([{}]);
    setSearch(null)
  }

  const priceincrease = () => {
    const ip = realData.filter((d) => (d['Current Price'] - d['Product Cost'])>0.5 && d.available==='T');
    setData(ip)
  }

  const pricedecrease = () => {
    const ip = realData.filter((d) => Number(d['Current Price']).toFixed(2) < Number(d['Product Cost']).toFixed(2) && d.available==='T');
    setData(ip)
  }

  const outofstock = () => {
    const ip = realData.filter((d) => d['quantity'] < num && d.available==='T' );
    setData(ip)
  }
  const remain=()=>{
   console.log(remaindata)
setData(remaindata);
  }

  const stock=()=>{
    const s= realData.filter((d)=>d['quantity']>num && d.available === 'F' );
    setData(s)
  }

  const all = () => {
    setData(realData)
  }


  const handleBeforeUnload = (event) => {
    event.preventDefault();
    stopTimer();
  };
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000); // Increment every second

  };
  const stopTimer = async () => {
    settime(timerRef.current)
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
  const getserialnumber = async () => {
    let result = await fetch('https://brand-b-1.onrender.com/mic/getserialnumber', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    result = await result.json();
    setIndex1(result.start_index1);
    setIndex2(result.start_index2);
    setIndex3(result.start_index3);
    setIndex4(result.start_index4);
    setIndex5(result.start_index5);
    setIndex6(result.start_index6);
    setIndex7(result.start_index7);
    setIndex8(result.start_index8);
    setElapsedTime(result.time);

  }


  const getinvurl = async () => {
    try {
      let result = await fetch('https://brand-b-1.onrender.com/mic/getinvurl', {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
      })
      result = await result.json();
      console.log(result);
      setLinks1(result.links1[0].url);
      setLinks2(result.links2[0].url);
      setLinks3(result.links3[0].url);
      setLinks4(result.links4[0].url);
      setLinks5(result.links5[0].url);
      setLinks6(result.links6[0].url);
      setLinks7(result.links7[0].url);
      setLinks8(result.links8[0].url);
    } catch (err) {
      console.log(err)
    }
  };
  const geterrorurl = async () => {
    try {
      let result = await fetch('https://brand-b-1.onrender.com/mic/geterrorurl', {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
      })
      result = await result.json();
      seterrorLinks(result.links);
    } catch (err) {
      console.log(err)
    }
  };
  // --------upload file for inventory update----
  const setInventoryfile = (e) => {
    setInvFile(e.target.files[0]);
  };

  const uploadinventoryfile = async () => {
    setLoading(true)
    const formData = new FormData();
    formData.append('file', invfile);
    try {
      const response = await axios.post('https://brand-b-1.onrender.com/mic/uploadinvfile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert(response.data.msg);
      window.location.reload();
      setLoading(false)

    } catch (error) {
      console.error('Error uploading file:', error);
      setLoading(false)
      alert(error);
    }
  };
  const settime = (time) => {
    fetch('https://brand-b-1.onrender.com/mic/settime', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ time: time + elapsedTime })
    })
  }
  // ------setIndex----
  const setindex = async () => {
    const newIndex = parseInt(customIndex, 10);
    let result = await fetch('https://brand-b-1.onrender.com/mic/setindex', {
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
    let result = await fetch('https://brand-b-1.onrender.com/mic/setindex2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start_index: newIndex })
    });
    result = await result.json();
    result.status ? null : setindex2();
    setIndex2(result.index)
  };
  const setindex3 = async () => {
    const newIndex = parseInt(customIndex3, 10);
    let result = await fetch('https://brand-b-1.onrender.com/mic/setindex3', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start_index: newIndex })
    });
    result = await result.json();
    result.status ? null : setindex3();
    setIndex3(result.index)
  };
  const setindex4 = async () => {
    const newIndex = parseInt(customIndex4, 10);
    let result = await fetch('https://brand-b-1.onrender.com/mic/setindex4', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start_index: newIndex })
    });
    result = await result.json();
    result.status ? null : setindex4();
    setIndex4(result.index)
  };
  const setindex5 = async () => {
    const newIndex = parseInt(customIndex5, 10);
    let result = await fetch('https://brand-b-1.onrender.com/mic/setindex5', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start_index: newIndex })
    });
    result = await result.json();
    result.status ? null : setindex5();
    setIndex5(result.index)
  };
  const setindex6 = async () => {
    const newIndex = parseInt(customIndex6, 10);
    let result = await fetch('https://brand-b-1.onrender.com/mic/setindex6', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start_index: newIndex })
    });
    result = await result.json();
    result.status ? null : setindex6();
    setIndex6(result.index)
  };
  const setindex7 = async () => {
    const newIndex = parseInt(customIndex7, 10);
    let result = await fetch('https://brand-b-1.onrender.com/mic/setindex7', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start_index: newIndex })
    });
    result = await result.json();
    result.status ? null : setindex7();
    setIndex7(result.index)
  };
  const setindex8 = async () => {
    const newIndex = parseInt(customIndex8, 10);
    let result = await fetch('https://brand-b-1.onrender.com/mic/setindex8', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start_index: newIndex })
    });
    result = await result.json();
    result.status ? null : setindex8();
    setIndex8(result.index)
  };
  const seterrorindex = async () => {
    const newIndex = parseInt(errorcustomIndex, 10);
    let result = await fetch('https://brand-b-1.onrender.com/mic/seterrorindex', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start_index: newIndex })
    });
    result = await result.json();
    result.status ? null : seterrorindex();
    seterrorIndex(result.index)
  };

  const autofetchData = async (link) => {
    try {
      let result = await fetch('https://brand-b-1.onrender.com/mic/autofetchdata1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link: link })
      });
      result = await result.json();
      return result
    } catch (err) {
      setUrlError1(true);
      console.log("Error in autofetchData:", err);
      return false; // Return false in case of error to prevent further execution
    }
  };
  const autofetchData2 = async (link) => {
    try {
      let result = await fetch('https://brand-b-1.onrender.com/mic/autofetchdata2', {
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
      let result = await fetch('https://brand-b-1.onrender.com/mic/autofetchdata3', {
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
      let result = await fetch('https://brand-b-1.onrender.com/mic/autofetchdata4', {
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
  const autofetchData5 = async (link) => {
    try {
      let result = await fetch('https://brand-b-1.onrender.com/mic/autofetchdata5', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link: link })
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
      let result = await fetch('https://brand-b-1.onrender.com/mic/autofetchdata6', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link: link })
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
      let result = await fetch('https://brand-b-1.onrender.com/mic/autofetchdata7', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link: link })
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
      let result = await fetch('https://brand-b-1.onrender.com/mic/autofetchdata8', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link: link })
      });
      result = await result.json();
      return result
    } catch (err) {
      console.log("Error in autofetchData8:", err);
      return false; // Return false in case of error to prevent further execution
    }
  };
  const autofetchDataerror = async (link) => {
    try {
      let result = await fetch('https://brand-b-1.onrender.com/mic/autofetchdata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link: link })
      });
      result = await result.json();
      return result
    } catch (err) {
      setErrurlerr(true);
      console.log("Error in autofetchData:", err);
      return false; // Return false in case of error to prevent further execution
    }
  };
  const setautoindex1 = async (index) => {
    const newIndex = parseInt(index, 10);
    let result = await fetch('https://brand-b-1.onrender.com/mic/setindex', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start_index: newIndex })
    });
    result = await result.json();
    result.status ? null : setautoindex1();
    setIndex1(result.index)
  }
  const setautoindex2 = async (index) => {
    const newIndex = parseInt(index, 10);
    let result = await fetch('https://brand-b-1.onrender.com/mic/setindex2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start_index: newIndex })
    });
    result = await result.json();
    result.status ? null : setautoindex2();
    setIndex2(result.index)
  }
  const setautoindex3 = async (index) => {
    const newIndex = parseInt(index, 10);
    let result = await fetch('https://brand-b-1.onrender.com/mic/setindex3', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start_index: newIndex })
    });
    result = await result.json();
    result.status ? null : setautoindex3();
    setIndex3(result.index)
  }
  const setautoindex4 = async (index) => {
    const newIndex = parseInt(index, 10);
    let result = await fetch('https://brand-b-1.onrender.com/mic/setindex4', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start_index: newIndex })
    });
    result = await result.json();
    result.status ? null : setautoindex4();
    setIndex4(result.index)
  }
  const setautoindex5 = async (index) => {
    const newIndex = parseInt(index, 10);
    let result = await fetch('https://brand-b-1.onrender.com/mic/setindex5', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start_index: newIndex })
    });
    result = await result.json();
    result.status ? null : setautoindex5();
    setIndex5(result.index)
  }

  const setautoindex6 = async (index) => {
    const newIndex = parseInt(index, 10);
    let result = await fetch('https://brand-b-1.onrender.com/mic/setindex6', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start_index: newIndex })
    });
    result = await result.json();
    result.status ? null : setautoindex6();
    setIndex6(result.index)
  }
  const setautoindex7 = async (index) => {
    const newIndex = parseInt(index, 10);
    let result = await fetch('https://brand-b-1.onrender.com/mic/setindex7', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start_index: newIndex })
    });
    result = await result.json();
    result.status ? null : setautoindex7();
    setIndex7(result.index)
  }

  const setautoindex8 = async (index) => {
    const newIndex = parseInt(index, 10);
    let result = await fetch('https://brand-b-1.onrender.com/mic/setindex8', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start_index: newIndex })
    });
    result = await result.json();
    result.status ? null : setautoindex8();
    setIndex8(result.index)
  }

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const autofetch = async () => {
    let index = index1;
    setLoading1(true);
    startTimer();
    stopRef.current = false;
    while (index < links1.length && !stopRef.current) {
      try {
        const startTime = performance.now(); // Start the timer
        const result = await autofetchData(links1[index]);
        const endTime = performance.now(); // End the timer
        const timeTaken1 = (endTime - startTime) / 1000;
        setSpeed1(timeTaken1.toFixed(1));
        console.log(`Thread-I || index: ${index} || result ${result}`);
        if (result === true) {
          index += 1;
          setautoindex1(index);
          setUrlError1(false)
        } else {
          setUrlError1(true);
          console.log("An error occurred.");
          await delay(3000);
          index += 1;
          geterrorurl();
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
    while (index < links2.length && !stopRef.current) {
      try {
        const startTime = performance.now(); // Start the timer
        const result = await autofetchData2(links2[index]);
        const endTime = performance.now(); // End the timer
        const timeTaken1 = (endTime - startTime) / 1000;
        setSpeed2(timeTaken1.toFixed(1));
        console.log(`Thread-II || index: ${index} || result ${result}`);
        if (result === true) {
          index += 1;
          setautoindex2(index)
          setUrlError2(false)
        } else {
          setUrlError2(true);
          console.log("An error occurred.");
          await delay(3000);
          index += 1;
          geterrorurl();
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
    while (index < links3.length && !stopRef.current) {
      try {
        const startTime = performance.now(); // Start the timer
        const result = await autofetchData3(links3[index]);
        const endTime = performance.now(); // End the timer
        const timeTaken1 = (endTime - startTime) / 1000;
        setSpeed3(timeTaken1.toFixed(1));
        console.log(`Thread-III || index: ${index} || result ${result}`);
        if (result === true) {
          index += 1;
          setautoindex3(index)
          setUrlError3(false)
        } else {
          setUrlError3(true);
          console.log("An error occurred.");
          await delay(3000);
          index += 1;
          geterrorurl();
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
    while (index < links4.length && !stopRef.current) {
      try {
        const startTime = performance.now(); // Start the timer
        const result = await autofetchData4(links4[index]);
        const endTime = performance.now(); // End the timer
        const timeTaken1 = (endTime - startTime) / 1000;
        setSpeed4(timeTaken1.toFixed(1));
        console.log(`Thread-IV || index: ${index} || result ${result}`);
        if (result === true) {
          index += 1;
          setautoindex4(index)
          setUrlError4(false)
        } else {
          setUrlError4(true);
          console.log("An error occurred.");
          await delay(3000);
          index += 1;
          geterrorurl();
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
    while (index < links5.length && !stopRef.current) {
      try {
        const startTime = performance.now(); // Start the timer
        const result = await autofetchData5(links5[index]);
        const endTime = performance.now(); // End the timer
        const timeTaken1 = (endTime - startTime) / 1000;
        setSpeed5(timeTaken1.toFixed(1));
        console.log(`Thread-V || index: ${index} || result ${result}`);
        if (result === true) {
          index += 1;
          setautoindex5(index)
          setUrlError5(false)
        } else {
          setUrlError5(true);
          console.log("An error occurred.");
          await delay(3000);
          index += 1;
          geterrorurl();
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
    while (index < links6.length && !stopRef.current) {
      try {
        const startTime = performance.now(); // Start the timer
        const result = await autofetchData6(links6[index]);
        const endTime = performance.now(); // End the timer
        const timeTaken1 = (endTime - startTime) / 1000;
        setSpeed6(timeTaken1.toFixed(1));
        console.log(`Thread-VI || index: ${index} || result ${result}`);
        if (result === true) {
          index += 1;
          setautoindex6(index)
          setUrlError6(false)
        } else {
          setUrlError6(true);
          console.log("An error occurred.");
          await delay(3000);
          index += 1;
          geterrorurl();
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
    while (index < links7.length && !stopRef.current) {
      try {
        const startTime = performance.now();
        const result = await autofetchData7(links7[index]);
        const endTime = performance.now();
        const timeTaken1 = (endTime - startTime) / 1000;
        setSpeed7(timeTaken1.toFixed(1));
        console.log(`Thread-VII || index: ${index} || result ${result}`);
        if (result === true) {
          index += 1;
          setautoindex7(index)
          setUrlError7(false)
        } else {
          setUrlError7(true);
          console.log("An error occurred.");
          await delay(3000);
          index += 1;
          geterrorurl();
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
    while (index < links8.length && !stopRef.current) {
      try {
        const startTime = performance.now(); // Start the timer
        const result = await autofetchData8(links8[index]);
        const endTime = performance.now(); // End the timer
        const timeTaken1 = (endTime - startTime) / 1000;
        setSpeed8(timeTaken1.toFixed(1));
        console.log(`Thread-VIII || index: ${index} || result ${result}`);
        if (result === true) {
          index += 1;
          setautoindex8(index)
          setUrlError8(false)
        } else {
          setUrlError8(true);
          console.log("An error occurred.");
          await delay(3000);
          index += 1;
          geterrorurl();
        }
      } catch (err) {
        console.log("Error in autofetch8:", err);
      }
    } setLoading8(false)
  };
  const autofetcherror = async () => {
    let index = errorindex;
    seterrorLoading(true);
    startTimer();
    stopRef.current = false;
    while (index < errorlinks.length && !stopRef.current) {
      try {
        const startTime = performance.now(); // Start the timer
        const result = await autofetchDataerror(errorlinks[index]);
        const endTime = performance.now(); // End the timer
        const timeTaken1 = (endTime - startTime) / 1000;
        setSpeederror(timeTaken1.toFixed(1));
        console.log(`Thread-Error || error_index: ${errorindex} || result ${result}`);
        if (result === true) {
          index += 1;
          seterrorindex(index);
          setErrurlerr(false)
        } else {
          setErrurlerr(true);
          console.log("An error occurred.");
          await delay(5000);
          index += 1;
        }
      } catch (err) {
        console.log("Error in autofetch:", err);
      }
    }
    seterrorLoading(false);
    stopTimer();
  };
  const stopFetching = () => {
    stopRef.current = true; // Set stop condition
  };


  const downloadInvontory = async () => {
    try {
      var ans;
      if (errorlinks.length > 0) {
        ans = confirm("There are some invalid or such a url where error occur. If you visited that then press ok neigher check those url and retry")
      }
      console.log(ans)
      if (!ans) { geterrorurl(); return; }
      if (ans === undefined || true) {
        setLoading(true)
        const response = await axios({
          url: 'https://brand-b-1.onrender.com/mic/download-inventory', // Replace with your backend URL
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
      }
    } catch (error) {
      console.error('Error downloading the file:', error);
      setLoading(false)
    }
  }

  const startall = async() => {
    autofetch();
    await delay(1000)
    autofetch2();
    await delay(1000)
    autofetch3();
    await delay(1000)
    autofetch4();
    await delay(1000)
    autofetch5();
    await delay(1000)
    autofetch6();  
    await delay(1000)
    autofetch7();
    await delay(1000)
    autofetch8();
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
          <div>
            <input type="file" onChange={setInventoryfile} accept=".xlsx, .xls" />
            <button onClick={uploadinventoryfile} >Upload</button>
            <button onClick={startall} className='ms-4' >Start All</button>
            <button onClick={stopFetching} className='ms-4' disabled={!loading1}>
              Pause
            </button>
            <button className='ms-4 mt-4' variant="secondary" onClick={downloadInvontory}>
              Download Result
            </button>
            <Link className='ms-4' to='analysis'>Analysis Data</Link>

          </div>
        </div>
        <div className="timer_container mt-4">
          <div className='timer'>Elapsed Time : &nbsp;<span style={{ fontWeight: 'bolder' }}>{formatElapsedTime(elapsedTime)}</span></div>
          {
            (loading1 || loading2 || loading3 || loading4 || loading5 || loading6 || loading7 || loading8) && <div className='timer'>Expected Time :&nbsp;<span style={{ fontWeight: 'bolder' }}>{formatElapsedTime1((speed1 / 8) * (links1.length + links2.length + links3.length + links4.length + links5.length + links6.length + links7.length + links8.length - (index1 + index2 + index3 + index4 + index5 + index6 + index7 + index8)))}</span> </div>
          }
          <div className="timer">
            Total updated Product : {data.length} <span onClick={getupdatedproduct}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="ms-4 bi bi-arrow-clockwise" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
            </svg></span>
          </div>
        </div>
        <Accordion className='mt-4' defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Total Number of Product's URL: {links1 ? links1.length + links2.length + links3.length + links4.length + links5.length + links6.length + links7.length + links8.length : 0} &nbsp;&nbsp; || &nbsp;&nbsp; Total Number of urls fetched : {index1 + index2 + index3 + index4 + index5 + index6 + index7 + index8} &nbsp;&nbsp; || &nbsp;&nbsp; Remaining urls :  {links1 ? links1.length + links2.length + links3.length + links4.length + links5.length + links6.length + links7.length + links8.length - (index1 + index2 + index3 + index4 + index5 + index6 + index7 + index8) : 0} &nbsp;&nbsp; || &nbsp;&nbsp; Net Speed : &nbsp; <span style={{ color: 'red' }}> {(speed1 / 8).toFixed(1)} s / URL</span></Accordion.Header>
            <Accordion.Body>
            <div className="thread" style={{ backgroundColor: loading1 ? 'rgb(11 109 91 / 99%)' : 'black', boxShadow: loading1 ? '#000000 8px 3px 55px -17px' : '0' }}>
              <div className="container">
                <div className="row">
                  <div className="cus_row col-lg-3 col-md-6 col-sm-12 mt-2 mb-2">
                    <button className='startbtn me-3' onClick={autofetch}>Start-I</button>
                    <input className='inputbtn' type="number" placeholder={index1} onChange={(e) => setCustomIndex(e.target.value)} />
                    <button className='startbtn ms-3' onClick={setindex} >
                      Set Index
                    </button>
                  </div>

                  <div className="cus_row col-lg-3 col-md-6 col-sm-12 mt-2 mb-2">
                    <h4> {index1}/{links1.length}</h4>
                    <div className='ms-4 me-4' style={{ height: 50, width: 50 }}>
                      <CircularProgressbar
                        value={(index1 / links1.length * 100)}
                        text={`${(index1 / links1.length * 100).toFixed(0)}%`}
                      />;
                    </div>
                    <h4>
                      {speed1} s / URL
                    </h4>
                  </div>

                  <div className="cus_row col-lg-6 col-md-6 col-sm-12 mt-2 mb-2">
                    {urlError1 && <p style={{ color: 'red' }}>Error while fetching this url -</p>}
                    <a href={links1[index1]} target='_blank' style={{ color: urlError1 ? 'red' : 'white' }}>{index1 === links1.length ? "Completed" : links1[index1]}</a>
                  </div>

                </div>
              </div>
            </div>

            <div className="thread mt-2" style={{ backgroundColor: loading2 ? 'rgb(11 109 91 / 99%)' : 'black', boxShadow: loading2 ? '#000000 8px 3px 55px -17px' : '0' }}>
              <div className="container">
                <div className="row">
                  <div className="cus_row col-lg-3 col-md-6 col-sm-12 mt-2 mb-2">
                    <button className='startbtn me-3' onClick={autofetch2}>Start-II</button>
                    <input className='inputbtn' type="number" placeholder={index2} onChange={(e) => setCustomIndex2(e.target.value)} />
                    <button className='startbtn ms-3' onClick={setindex2} >
                      Set Index
                    </button>
                  </div>

                  <div className="cus_row col-lg-3 col-md-6 col-sm-12 mt-2 mb-2">
                    <h4> {index2}/{links2.length}</h4>
                    <div className='ms-4 me-4' style={{ height: 50, width: 50 }}>
                      <CircularProgressbar
                        value={(index2 / links2.length * 100)}
                        text={`${(index2 / links2.length * 100).toFixed(0)}%`}
                      />;
                    </div>
                    <h4>
                      {speed2} s / URL
                    </h4>
                  </div>

                  <div className="cus_row col-lg-6 col-md-6 col-sm-12 mt-2 mb-2">
                    {urlError2 && <p style={{ color: 'red' }}>Error while fetching this url -</p>}
                    <a href={links2[index2]} target='_blank' style={{ color: urlError2 ? 'red' : 'white' }}>{index2 === links2.length ? "Completed" : links2[index2]}</a>
                  </div>

                </div>
              </div>
            </div>

            <div className="thread mt-2" style={{ backgroundColor: loading3 ? 'rgb(11 109 91 / 99%)' : 'black', boxShadow: loading3 ? '#000000 8px 3px 55px -17px' : '0' }}>
              <div className="container">
                <div className="row">
                  <div className="cus_row col-lg-3 col-md-6 col-sm-12 mt-2 mb-2">
                    <button className='startbtn me-3' onClick={autofetch3}>Start-III</button>
                    <input className='inputbtn' type="number" placeholder={index3} onChange={(e) => setCustomIndex3(e.target.value)} />
                    <button className='startbtn ms-3' onClick={setindex3} >
                      Set Index
                    </button>
                  </div>

                  <div className="cus_row col-lg-3 col-md-6 col-sm-12 mt-2 mb-2">
                    <h4> {index3}/{links3.length}</h4>
                    <div className='ms-4 me-4' style={{ height: 50, width: 50 }}>
                      <CircularProgressbar
                        value={(index3 / links3.length * 100)}
                        text={`${(index3 / links3.length * 100).toFixed(0)}%`}
                      />;
                    </div>
                    <h4>
                      {speed3} s / URL
                    </h4>
                  </div>

                  <div className="cus_row col-lg-6 col-md-6 col-sm-12 mt-2 mb-2">
                    {urlError3 && <p style={{ color: 'red' }}>Error while fetching this url -</p>}
                    <a href={links3[index3]} target='_blank' style={{ color: urlError3 ? 'red' : 'white' }}>{index3 === links3.length ? "Completed" : links3[index3]}</a>
                  </div>

                </div>
              </div>
            </div>

            <div className="thread mt-2" style={{ backgroundColor: loading4 ? 'rgb(11 109 91 / 99%)' : 'black', boxShadow: loading4 ? '#000000 8px 3px 55px -17px' : '0' }}>
              <div className="container">
                <div className="row">
                  <div className="cus_row col-lg-3 col-md-6 col-sm-12 mt-2 mb-2">
                    <button className='startbtn me-3' onClick={autofetch4}>Start-IV</button>
                    <input className='inputbtn' type="number" placeholder={index4} onChange={(e) => setCustomIndex4(e.target.value)} />
                    <button className='startbtn ms-3' onClick={setindex4} >
                      Set Index
                    </button>
                  </div>

                  <div className="cus_row col-lg-3 col-md-6 col-sm-12 mt-2 mb-2">
                    <h4> {index4}/{links4.length}</h4>
                    <div className='ms-4 me-4' style={{ height: 50, width: 50 }}>
                      <CircularProgressbar
                        value={(index4 / links4.length * 100)}
                        text={`${(index4 / links4.length * 100).toFixed(0)}%`}
                      />;
                    </div>
                    <h4>
                      {speed4} s / URL
                    </h4>
                  </div>

                  <div className="cus_row col-lg-6 col-md-6 col-sm-12 mt-2 mb-2">
                    {urlError4 && <p style={{ color: 'red' }}>Error while fetching this url -</p>}
                    <a href={links4[index4]} target='_blank' style={{ color: urlError4 ? 'red' : 'white' }}>{index4 === links4.length ? "Completed" : links4[index4]}</a>
                  </div>

                </div>
              </div>
            </div>

            <div className="thread mt-2" style={{ backgroundColor: loading5 ? 'rgb(11 109 91 / 99%)' : 'black', boxShadow: loading5 ? '#000000 8px 3px 55px -17px' : '0' }}>
              <div className="container">
                <div className="row">
                  <div className="cus_row col-lg-3 col-md-6 col-sm-12 mt-2 mb-2">
                    <button className='startbtn me-3' onClick={autofetch5}>Start-V</button>
                    <input className='inputbtn' type="number" placeholder={index5} onChange={(e) => setCustomIndex5(e.target.value)} />
                    <button className='startbtn ms-3' onClick={setindex5} >
                      Set Index
                    </button>
                  </div>

                  <div className="cus_row col-lg-3 col-md-6 col-sm-12 mt-2 mb-2">
                    <h4> {index5}/{links5.length}</h4>
                    <div className='ms-4 me-4' style={{ height: 50, width: 50 }}>
                      <CircularProgressbar
                        value={(index5 / links5.length * 100)}
                        text={`${(index5 / links5.length * 100).toFixed(0)}%`}
                      />;
                    </div>
                    <h4>
                      {speed5} s / URL
                    </h4>
                  </div>

                  <div className="cus_row col-lg-6 col-md-6 col-sm-12 mt-2 mb-2">
                    {urlError5 && <p style={{ color: 'red' }}>Error while fetching this url -</p>}
                    <a href={links5[index5]} target='_blank' style={{ color: urlError5 ? 'red' : 'white' }}>{index5 === links5.length ? "Completed" : links5[index5]}</a>
                  </div>

                </div>
              </div>
            </div>

            <div className="thread mt-2" style={{ backgroundColor: loading6 ? 'rgb(11 109 91 / 99%)' : 'black', boxShadow: loading6 ? '#000000 8px 3px 55px -17px' : '0' }}>
              <div className="container">
                <div className="row">
                  <div className="cus_row col-lg-3 col-md-6 col-sm-12 mt-2 mb-2">
                    <button className='startbtn me-3' onClick={autofetch6}>Start-VI</button>
                    <input className='inputbtn' type="number" placeholder={index6} onChange={(e) => setCustomIndex6(e.target.value)} />
                    <button className='startbtn ms-3' onClick={setindex6} >
                      Set Index
                    </button>
                  </div>

                  <div className="cus_row col-lg-3 col-md-6 col-sm-12 mt-2 mb-2">
                    <h4> {index6}/{links6.length}</h4>
                    <div className='ms-4 me-4' style={{ height: 50, width: 50 }}>
                      <CircularProgressbar
                        value={(index6 / links6.length * 100)}
                        text={`${(index6 / links6.length * 100).toFixed(0)}%`}
                      />;
                    </div>
                    <h4>
                      {speed6} s / URL
                    </h4>
                  </div>

                  <div className="cus_row col-lg-6 col-md-6 col-sm-12 mt-2 mb-2">
                    {urlError6 && <p style={{ color: 'red' }}>Error while fetching this url -</p>}
                    <a href={links6[index6]} target='_blank' style={{ color: urlError6 ? 'red' : 'white' }}>{index6 === links6.length ? "Completed" : links6[index6]}</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="thread mt-2" style={{ backgroundColor: loading7 ? 'rgb(11 109 91 / 99%)' : 'black', boxShadow: loading7 ? '#000000 8px 3px 55px -17px' : '0' }}>
              <div className="container">
                <div className="row">
                  <div className="cus_row col-lg-3 col-md-6 col-sm-12 mt-2 mb-2">
                    <button className='startbtn me-3' onClick={autofetch7}>Start-VII</button>
                    <input className='inputbtn' type="number" placeholder={index7} onChange={(e) => setCustomIndex7(e.target.value)} />
                    <button className='startbtn ms-3' onClick={setindex7} >
                      Set Index
                    </button>
                  </div>

                  <div className="cus_row col-lg-3 col-md-6 col-sm-12 mt-2 mb-2">
                    <h4> {index7}/{links7.length}</h4>
                    <div className='ms-4 me-4' style={{ height: 50, width: 50 }}>
                      <CircularProgressbar
                        value={(index7 / links7.length * 100)}
                        text={`${(index7 / links7.length * 100).toFixed(0)}%`}
                      />;
                    </div>
                    <h4>
                      {speed7} s / URL
                    </h4>
                  </div>

                  <div className="cus_row col-lg-6 col-md-6 col-sm-12 mt-2 mb-2">
                    {urlError7 && <p style={{ color: 'red' }}>Error while fetching this url -</p>}
                    <a href={links7[index7]} target='_blank' style={{ color: urlError7 ? 'red' : 'white' }}>{index7 === links7.length ? "Completed" : links7[index7]}</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="thread mt-2" style={{ backgroundColor: loading8 ? 'rgb(11 109 91 / 99%)' : 'black', boxShadow: loading8 ? '#000000 8px 3px 55px -17px' : '0' }}>
              <div className="container">
                <div className="row">
                  <div className="cus_row col-lg-3 col-md-6 col-sm-12 mt-2 mb-2">
                    <button className='startbtn me-3' onClick={autofetch8}>Start-VIII</button>
                    <input className='inputbtn' type="number" placeholder={index8} onChange={(e) => setCustomIndex8(e.target.value)} />
                    <button className='startbtn ms-3' onClick={setindex8} >
                      Set Index
                    </button>
                  </div>

                  <div className="cus_row col-lg-3 col-md-6 col-sm-12 mt-2 mb-2">
                    <h4> {index8}/{links8.length}</h4>
                    <div className='ms-4 me-4' style={{ height: 50, width: 50 }}>
                      <CircularProgressbar
                        value={(index8 / links8.length * 100)}
                        text={`${(index8 / links8.length * 100).toFixed(0)}%`}
                      />;
                    </div>
                    <h4>
                      {speed8} s / URL
                    </h4>
                  </div>

                  <div className="cus_row col-lg-6 col-md-6 col-sm-12 mt-2 mb-2">
                    {urlError8 && <p style={{ color: 'red' }}>Error while fetching this url -</p>}
                    <a href={links8[index8]} target='_blank' style={{ color: urlError8 ? 'red' : 'white' }}>{index8 === links8.length ? "Completed" : links8[index8]}</a>
                  </div>
                </div>
              </div>
            </div>

          </Accordion.Body>
          </Accordion.Item>
          {
          errorlinks.length > 0 &&
          <Accordion.Item eventKey="1">
            <Accordion.Header> <span style={{ color: 'red' }}>Number of url in which error occur: &nbsp; {errorlinks.length} </span> </Accordion.Header>
            <Accordion.Body>
              <div className="thread mt-2 mb-4" style={{ backgroundColor: loading2 ? 'rgb(11 109 91 / 99%)' : 'red', boxShadow: loading2 ? '#000000 8px 3px 55px -17px' : '0' }}>
                <div className="container">
                  <div className="row">
                    <div className="cus_row col-lg-3 col-md-6 col-sm-12 mt-2 mb-2">
                      <button className='startbtn me-3' onClick={autofetcherror}>Start</button>
                      <input className='inputbtn' type="number" placeholder={errorindex} onChange={(e) => seterrorCustomIndex(e.target.value)} />
                      <button className='startbtn ms-3' onClick={seterrorindex} >
                        Set Index
                      </button>
                    </div>

                    <div className="cus_row col-lg-3 col-md-6 col-sm-12 mt-2 mb-2">
                      <h4> {errorindex}/{errorlinks.length}</h4>
                      <div className='ms-4 me-4' style={{ height: 50, width: 50 }}>
                        <CircularProgressbar
                          value={(errorindex / errorlinks.length * 100)}
                          text={`${(errorindex / errorlinks.length * 100).toFixed(0)}%`}
                        />;
                      </div>
                      <h4>
                        {errorspeed} s / URL
                      </h4>
                    </div>

                    <div className="cus_row col-lg-6 col-md-6 col-sm-12 mt-2 mb-2">
                      {errurlerr && <p style={{ color: 'blue' }}>Error while fetching this url -</p>}
                      <a href={errorlinks[errorindex]} target='_blank' style={{ color: errurlerr ? 'blue' : 'white' }}>{errorindex === errorlinks.length ? "Completed" : errorlinks[errorindex]}</a>
                    </div>

                  </div>
                </div>
              </div>
              <h4>Error urls List</h4>
              <ol>
                {
                  errorlinks.map((el,index) => (
                    <li key={index}><a href={el} target='_blank'>{el}</a></li>
                  ))
                }
              </ol>
            </Accordion.Body>
          </Accordion.Item>
        }
          <Accordion.Item eventKey="2">
            <Accordion.Header>Total Number of Updated Products : &nbsp;&nbsp; <span style={{ color: 'blue' }}>{data.length > 1 ? data.length : 0} </span></Accordion.Header>
            <Accordion.Body>

              <div className="d-flex mb-4  p-2 bg-primary text-white"> Filter Product :  
                <button onClick={all} className="text-white p-0 ms-4 me-4" style={{ backgroundColor: 'transparent' }}>All</button>
                <button onClick={priceincrease} className="text-white p-0 ms-4 me-4" style={{ backgroundColor: 'transparent' }}>Price Increased</button>
                <button onClick={pricedecrease} className="text-white p-0 ms-4 me-4" style={{ backgroundColor: 'transparent' }}>Price Decrease</button>
                <button onClick={outofstock} className="text-white p-0 ms-4 me-4" style={{ backgroundColor: 'transparent' }}>Out of Stock </button> 
                <button onClick={stock} className="text-white p-0 ms-4 me-4" style={{ backgroundColor: 'transparent' }}>Come Back in Stock </button> 
                <button onClick={remain} className="text-white p-0 ms-4 me-4" style={{ backgroundColor: 'transparent' }}>Remaining</button> 
                <input onChange={(e) => setNum(e.target.value)} style={{ width: '40px' }} type="number" placeholder={num} /> <span className="ms-2 me-4">Which quantity is less than {num}</span>
                <div>
                  <input type="text" value={search} style={{ width: '20vw' }} placeholder="Search Products by ASIN" onChange={(e) => { setSearch(e.target.value), searchproduct() }} />
                  <svg onClick={cancelsearch} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="ms-2 mb-1 bi bi-x-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                  </svg>

                </div>
                {
                  result.length > 0 && result[0].ASIN !== undefined &&
                  <div className="result">
                    <Table striped bordered hover className="bg-dark">
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Image</th>
                          <th>Input UPC</th>
                          <th>SKU</th>
                          <th>Old Price</th>
                          <th>Current Price</th>
                          <th>Quantity</th>
                          <th>Product URL</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.length > 0 && result.map((detailArray, i) => (
                          <tr key={i}>
                            <td>{indexOfFirstItem + i + 1}</td>
                            <td><img src={detailArray['Image link']} alt="" height='40px' /></td>
                            <td>{detailArray['upc']}</td>
                            <td>{detailArray['SKUs']}</td>
                            <td>{detailArray['Product Cost']}</td>
                            <td>{detailArray['Current Price']}</td>
                            <td>{detailArray['quantity']}</td>
                            <td><a href={detailArray['Vendor URL']} target='_blank'>Click to see details</a></td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                }
              </div>


              <Table striped bordered hover className="bg-dark">
                <thead>
                  <tr>
                  <th>No</th>
                          <th>Image</th>
                          <th>Input UPC</th>
                          <th>SKU</th>
                          <th>Old Price</th>
                          <th>Current Price</th>
                          <th>Quantity</th>
                          <th>Product URL</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 && currentItems.map((detailArray, i) => (
                    <tr key={i}>
                      <td>{indexOfFirstItem + i + 1}</td>
                            <td><img src={detailArray['Image link']} alt="" height='40px' /></td>
                            <td>{detailArray['upc']}</td>
                            <td>{detailArray['SKUs']}</td>
                            <td>{detailArray['Product Cost']}</td>
                            <td>{detailArray['Current Price']}</td>
                            <td>{detailArray['quantity']}</td>
                            <td><a href={detailArray['Vendor URL']} target='_blank'>Click to see details</a></td>
                          </tr>
                  ))}
                </tbody>
              </Table>

              {/* Pagination */}
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
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <hr />
        <LineChart width={1600} className="bg-dark p-1 mb-4" height={300} data={data}>
      {/* <CartesianGrid stroke="#ccc" /> */}
      <XAxis dataKey="diff" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="Product Cost" stroke="#1bb353" />
      <Line type="monotone" dataKey="Current Price" stroke="red" />
    </LineChart>
        <Outlet />
      </div>
  );
}

export default Inventory;
