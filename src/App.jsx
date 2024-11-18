import { useState, useEffect, useRef } from 'react'
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
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [loading5, setLoading5] = useState(false);
  const [loading6, setLoading6] = useState(false);
  const [loading7, setLoading7] = useState(false);
  const [loading8, setLoading8] = useState(false);
  const [links1, setLinks1] = useState([]);
  const [links2, setLinks2] = useState([]);
  const [links3, setLinks3] = useState([]);
  const [links4, setLinks4] = useState([]);
  const [links5, setLinks5] = useState([]);
  const [links6, setLinks6] = useState([]);
  const [links7, setLinks7] = useState([]);
  const [links8, setLinks8] = useState([]);
  const [invProduct, setInvProduct] = useState([{}]);
  const [customIndex, setCustomIndex] = useState(0);
  const [customIndex2, setCustomIndex2] = useState(0);
  const [customIndex3, setCustomIndex3] = useState(0);
  const [customIndex4, setCustomIndex4] = useState(0);
  const [customIndex5, setCustomIndex5] = useState(0);
  const [customIndex6, setCustomIndex6] = useState(0);
  const [customIndex7, setCustomIndex7] = useState(0);
  const [customIndex8, setCustomIndex8] = useState(0);
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
  const stopRef = useRef(false);
  const timerRef = useRef(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  useEffect(() => {
    getinvurl();
    getinvproducts();
    getserialnumber();
    getupdatedproduct()
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
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
    let result = await fetch('https://brand-b-1.onrender.com/getserialnumber', {
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
      setLinks5(result.links5[0].url);
      setLinks6(result.links6[0].url);
      setLinks7(result.links7[0].url);
      setLinks8(result.links8[0].url);
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
      window.location.reload();
      setLoading(false)
      getinvproducts();

    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file');
    }
  };
  const settime = (time) => {
    fetch('https://brand-b-1.onrender.com/settime', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ time: time + elapsedTime })
    })
  }
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
    result = await result.json();
    result.status ? null : setindex2();
    setIndex2(result.index)
  };
  const setindex3 = async () => {
    const newIndex = parseInt(customIndex3, 10);
    let result = await fetch('https://brand-b-1.onrender.com/setindex3', {
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
    let result = await fetch('https://brand-b-1.onrender.com/setindex4', {
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
    let result = await fetch('https://brand-b-1.onrender.com/setindex5', {
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
    let result = await fetch('https://brand-b-1.onrender.com/setindex6', {
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
    let result = await fetch('https://brand-b-1.onrender.com/setindex7', {
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
    let result = await fetch('https://brand-b-1.onrender.com/setindex8', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start_index: newIndex })
    });
    result = await result.json();
    result.status ? null : setindex8();
    setIndex8(result.index)
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
  const autofetchData5 = async (link) => {
    try {
      let result = await fetch('https://brand-b-1.onrender.com/inv/autofetchdata5', {
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
      let result = await fetch('https://brand-b-1.onrender.com/inv/autofetchdata6', {
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
      let result = await fetch('https://brand-b-1.onrender.com/inv/autofetchdata7', {
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
      let result = await fetch('https://brand-b-1.onrender.com/inv/autofetchdata8', {
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
  const setautoindex1 = async (index) => {
    const newIndex = parseInt(index, 10);
    let result = await fetch('https://brand-b-1.onrender.com/setindex', {
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
    let result = await fetch('https://brand-b-1.onrender.com/setindex2', {
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
    let result = await fetch('https://brand-b-1.onrender.com/setindex3', {
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
    let result = await fetch('https://brand-b-1.onrender.com/setindex4', {
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
    let result = await fetch('https://brand-b-1.onrender.com/setindex5', {
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
    let result = await fetch('https://brand-b-1.onrender.com/setindex6', {
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
    let result = await fetch('https://brand-b-1.onrender.com/setindex7', {
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
    let result = await fetch('https://brand-b-1.onrender.com/setindex8', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start_index: newIndex })
    });
    result = await result.json();
    result.status ? null : setautoindex8();
    setIndex8(result.index)
  }
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
          setautoindex1(index)
        } else {
          console.log("An error occurred.");
          index = index;
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
        } else {
          console.log("An error occurred.");
          index = index;
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
        } else {
          console.log("An error occurred.");
          index = index;
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
        } else {
          console.log("An error occurred.");
          index = index;
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
        } else {
          console.log("An error occurred.");
          index = index;
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
        } else {
          console.log("An error occurred.");
          index = index;
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
        } else {
          console.log("An error occurred.");
          index = index;
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
        const result = await autofetchData8(links7[index]);
        const endTime = performance.now(); // End the timer
        const timeTaken1 = (endTime - startTime) / 1000;
        setSpeed8(timeTaken1.toFixed(1));
        console.log(`Thread-VIII || index: ${index} || result ${result}`);
        if (result === true) {
          index += 1;
          setautoindex8(index)
        } else {
          console.log("An error occurred.");
          index = index;
        }
      } catch (err) {
        console.log("Error in autofetch8:", err);
      }
    } setLoading8(false)
  };
  const stopFetching = () => {
    stopRef.current = true; // Set stop condition
  };

  const getupdatedproduct=async()=>{

    let result= await fetch('https://brand-b-1.onrender.com/getupdatedproduct',{
      method:'GET',
      headers:{'Content-Type':'application/json'}
    });
    result= await result.json();
    setTotalProduct(result.num);
  }
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

  const startall = () => {
    autofetch();
    autofetch2();
    autofetch3();
    autofetch4();
    autofetch5();
    autofetch6();
    autofetch7();
    autofetch8();
  }
  return (
    <div style={{ opacity: loading ? 0.5 : 1, color: loading ? 'black' : null, paddingLeft: '3vw', paddingRight: '3vw' }}>
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
          <button onClick={startall} className='ms-4' >Start All</button>
          <button onClick={stopFetching} className='ms-4' disabled={!loading1}>
            Pause
          </button>
          <button className='ms-4 mt-4' variant="secondary" onClick={downloadInvontory}>
            Download Result
          </button>
        </div>
      </div>
      <div className="timer_container mt-4">
        <div className='timer'>Elapsed Time : &nbsp;<span style={{ fontWeight: 'bolder' }}>{formatElapsedTime(elapsedTime)}</span></div>
        {
          (loading1 || loading2 || loading3 || loading4 || loading5 || loading6 || loading7 || loading8) && <div className='timer'>Expected Time :&nbsp;<span style={{ fontWeight: 'bolder' }}>{formatElapsedTime1((speed1 / 8) * (links1.length + links2.length + links3.length + links4.length + links5.length + links6.length + links7.length + links8.length - (index1 + index2 + index3 + index4 + index5 + index6 + index7 + index8)))}</span> </div>
        }
        <div className="timer">
        Total updated Product : {totalProduct} <span onClick={getupdatedproduct}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="ms-4 bi bi-arrow-clockwise" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
          </svg></span> 
        </div>
      </div>
      <Accordion className='mt-4' defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Total Number of Product's URL: {links1 ? links1.length + links2.length + links3.length + links4.length + links5.length + links6.length + links7.length + links8.length : 0} &nbsp;&nbsp; || &nbsp;&nbsp; Total Number of urls fetched : {index1 + index2 + index3 + index4 + index5 + index6 + index7 + index8} &nbsp;&nbsp; || &nbsp;&nbsp; Remaining urls :  {links1 ? links1.length + links2.length + links3.length + links4.length + links5.length + links6.length + links7.length + links8.length - (index1 + index2 + index3 + index4 + index5 + index6 + index7 + index8) : 0} &nbsp;&nbsp; || &nbsp;&nbsp; Net Speed : &nbsp; <span style={{ color: 'red' }}> {(speed1 / 8).toFixed(1)} s / URL</span></Accordion.Header>
          <Accordion.Body>
            {/* --------first row of process */}
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
                      <div className="col-lg-4 d-flex justify-content-center align-items-center">
                        <h4>
                          {index1}/{links1.length}
                        </h4>
                        {loading1 && (
                          <div className="loading-overlay ms-2">
                            <Spinner animation="border" variant="primary" />
                          </div>
                        )}
                      </div>
                      <div className="col-lg-4 d-flex justify-content-center">
                        <div style={{ height: 70, width: 70 }}>
                          <CircularProgressbar value={(index1 / links1.length * 100)} text={`${(index1 / links1.length * 100).toFixed(0)}%`} />;
                        </div>
                      </div>
                      <div className="col-lg-4 d-flex justify-content-start align-items-center">
                        <h3>
                          {speed1} s / URL
                        </h3>
                      </div>
                    </div>
                  </div>
                  <Table className='mt-4' striped bordered hover>
                    <thead>
                      <tr>
                        <th>Index</th>
                        <th>Current url &nbsp; &nbsp;(Total urls : {links1.length})</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{index1}</td>
                        <td><a href={links1[index1]} target='_blank'>{index1 === links1.length ? links1[index1] : "Completed"}</a></td>
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
                        <h4>
                          {index2}/{links2.length}
                        </h4>
                        {loading2 && (
                          <div className="loading-overlay ms-2">
                            <Spinner animation="border" variant="primary" />
                          </div>
                        )}
                      </div>
                      <div className="col-md-4 d-flex justify-content-center">
                        <div style={{ height: 70, width: 70 }}>
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
                        <th>Index</th>
                        <th>Current url &nbsp; &nbsp;(Total urls : {links2.length})</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{index2}</td>
                        <td><a href={links2[index2]} target='_blank'>{index2 === links2.length ? links2[index2] : "Completed"}</a></td>
                      </tr>
                    </tbody>

                  </Table>
                </div>
              </div>
            </div>
            {/* -------------second row of process--- */}
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
                        <h4>
                          {index3}/{links3.length}
                        </h4>
                        {loading3 && (
                          <div className="loading-overlay ms-2">
                            <Spinner animation="border" variant="primary" />
                          </div>
                        )}
                      </div>
                      <div className="col-md-4 d-flex justify-content-center">
                        <div style={{ height: 70, width: 70 }}>
                          <CircularProgressbar value={(index3 / links3.length * 100)} text={`${(index3 / links3.length * 100).toFixed(0)}%`} />;
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
                        <th>Index</th>
                        <th>Current url &nbsp; &nbsp;(Total urls : {links3.length})</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{index3}</td>
                        <td><a href={links3[index3]} target='_blank'>{index3 === links3.length ? links3[index3] : "Completed"}</a></td>
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
                        <h4>
                          {index4}/{links4.length}
                        </h4>
                        {loading4 && (
                          <div className="loading-overlay ms-2">
                            <Spinner animation="border" variant="primary" />
                          </div>
                        )}
                      </div>
                      <div className="col-md-4 d-flex justify-content-center">
                        <div style={{ height: 70, width: 70 }}>
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
                        <th>Index</th>
                        <th>Current url &nbsp; &nbsp;(Total urls : {links4.length})</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{index4}</td>
                        <td><a href={links4[index4]} target='_blank'>{index4 === links4.length ? links4[index4] : "Completed"}</a></td>
                      </tr>
                    </tbody>

                  </Table>
                </div>
              </div>
            </div>

            {/* ----------third row of process-------- */}
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <Button variant="secondary" className='me-4' onClick={autofetch5}>
                    Start-5
                  </Button>
                  <input
                    type="number"
                    className='me-4 p-1'
                    style={{ width: '70px' }}
                    placeholder={index5}
                    onChange={(e) => setCustomIndex5(e.target.value)}
                  />

                  <Button variant="secondary" className='me-4' onClick={setindex5}>
                    Set Index
                  </Button>
                  <hr />


                  <div className="container">
                    <div className="row">
                      <div className="col-md-4 d-flex justify-content-center align-items-center">
                        <h4>
                          {index5}/{links5.length}
                        </h4>
                        {loading5 && (
                          <div className="loading-overlay ms-2">
                            <Spinner animation="border" variant="primary" />
                          </div>
                        )}
                      </div>
                      <div className="col-md-4 d-flex justify-content-center">
                        <div style={{ height: 70, width: 70 }}>
                          <CircularProgressbar value={(index5 / links5.length * 100)} text={`${(index5 / links5.length * 100).toFixed(0)}%`} />;
                        </div>
                      </div>
                      <div className="col-md-4 d-flex justify-content-start align-items-center">
                        <h3>
                          {speed5} s / URL
                        </h3>
                      </div>
                    </div>
                  </div>
                  <Table className='mt-4' striped bordered hover>
                    <thead>
                      <tr>
                        <th>Index</th>
                        <th>Current url &nbsp; &nbsp;(Total urls : {links5.length})</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{index5}</td>
                        <td><a href={links5[index5]} target='_blank'>{index5 === links5.length ? links5[index5] : "Completed"}</a></td>
                      </tr>
                    </tbody>

                  </Table>
                </div>
                <div className="col-lg-6">
                  <Button variant="secondary" className='me-4' onClick={autofetch6}>
                    Start-6
                  </Button>
                  <input
                    type="number"
                    className='me-4 p-1'
                    style={{ width: '70px' }}
                    placeholder={index6}
                    onChange={(e) => setCustomIndex6(e.target.value)}
                  />

                  <Button variant="secondary" className='me-4' onClick={setindex6}>
                    Set Index
                  </Button>
                  <hr />
                  <div className="container">
                    <div className="row">
                      <div className="col-md-4 d-flex justify-content-center align-items-center">
                        <h4>
                          {index6}/{links6.length}
                        </h4>
                        {loading6 && (
                          <div className="loading-overlay ms-2">
                            <Spinner animation="border" variant="primary" />
                          </div>
                        )}
                      </div>
                      <div className="col-md-4 d-flex justify-content-center">
                        <div style={{ height: 70, width: 70 }}>
                          <CircularProgressbar value={(index6 / links6.length * 100)} text={`${(index6 / links6.length * 100).toFixed(0)}%`} />;
                        </div>
                      </div>
                      <div className="col-md-4 d-flex justify-content-start align-items-center">
                        <h3>
                          {speed6} s / URL
                        </h3>
                      </div>
                    </div>
                  </div>
                  <Table className='mt-4' striped bordered hover>
                    <thead>
                      <tr>
                        <th>Index</th>
                        <th>Current url &nbsp; &nbsp;(Total urls : {links6.length})</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{index6}</td>
                        <td><a href={links6[index6]} target='_blank'>{index6 === links6.length ? links6[index6] : "Completed"}</a></td>
                      </tr>
                    </tbody>

                  </Table>
                </div>
              </div>
            </div>

            {/* --------fourth row of process---------- */}
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <Button variant="secondary" className='me-4' onClick={autofetch7}>
                    Start-7
                  </Button>
                  <input
                    type="number"
                    className='me-4 p-1'
                    style={{ width: '70px' }}
                    placeholder={index7}
                    onChange={(e) => setCustomIndex7(e.target.value)}
                  />

                  <Button variant="secondary" className='me-4' onClick={setindex7}>
                    Set Index
                  </Button>
                  <hr />
                  <div className="container">
                    <div className="row">
                      <div className="col-md-4 d-flex justify-content-center align-items-center">
                        <h4>
                          {index7}/{links7.length}
                        </h4>
                        {loading7 && (
                          <div className="loading-overlay ms-2">
                            <Spinner animation="border" variant="primary" />
                          </div>
                        )}
                      </div>
                      <div className="col-md-4 d-flex justify-content-center">
                        <div style={{ height: 70, width: 70 }}>
                          <CircularProgressbar value={(index7 / links7.length * 100)} text={`${(index7 / links7.length * 100).toFixed(0)}%`} />;
                        </div>
                      </div>
                      <div className="col-md-4 d-flex justify-content-start align-items-center">
                        <h3>
                          {speed7} s / URL
                        </h3>
                      </div>
                    </div>
                  </div>
                  <Table className='mt-4' striped bordered hover>
                    <thead>
                      <tr>
                        <th>Index</th>
                        <th>Current url &nbsp; &nbsp;(Total urls : {links7.length})</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{index7}</td>
                        <td><a href={links7[index7]} target='_blank'>{index7 === links7.length ? links7[index7] : "Completed"}</a></td>
                      </tr>
                    </tbody>

                  </Table>
                </div>
                <div className="col-lg-6">
                  <Button variant="secondary" className='me-4' onClick={autofetch8}>
                    Start-8
                  </Button>
                  <input
                    type="number"
                    className='me-4 p-1'
                    style={{ width: '70px' }}
                    placeholder={index8}
                    onChange={(e) => setCustomIndex8(e.target.value)}
                  />

                  <Button variant="secondary" className='me-4' onClick={setindex8}>
                    Set Index
                  </Button>
                  <hr />
                  <div className="container">
                    <div className="row">
                      <div className="col-md-4 d-flex justify-content-center align-items-center">
                        <h4>
                          {index8}/{links8.length}
                        </h4>
                        {loading8 && (
                          <div className="loading-overlay ms-2">
                            <Spinner animation="border" variant="primary" />
                          </div>
                        )}
                      </div>
                      <div className="col-md-4 d-flex justify-content-center">
                        <div style={{ height: 70, width: 70 }}>
                          <CircularProgressbar value={(index8 / links8.length * 100)} text={`${(index8 / links8.length * 100).toFixed(0)}%`} />;
                        </div>
                      </div>
                      <div className="col-md-4 d-flex justify-content-start align-items-center">
                        <h3>
                          {speed8} s / URL
                        </h3>
                      </div>
                    </div>
                  </div>
                  <Table className='mt-4' striped bordered hover>
                    <thead>
                      <tr>
                        <th>Index</th>
                        <th>Current url &nbsp; &nbsp;(Total urls : {links8.length})</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{index8}</td>
                        <td><a href={links8[index8]} target='_blank'>{index8 === links8.length ? links8[index8] : "Completed"}</a></td>
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
