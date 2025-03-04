import { useState, useEffect, useRef } from "react"
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import * as XLSX from 'xlsx';
import Spinner from 'react-bootstrap/Spinner';
import './App.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
export default function Checkproduct() {

    const [currentPage, setCurrentPage] = useState(localStorage.getItem('gstarpage'));
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [edititem, setEdititem] = useState({})
    const [newSku, setNewsku] = useState('')
    const handleShow = (obj) => {
        setEdititem(obj)
        setShow(true)
    };
    useEffect(() => {
        let pagenumber = localStorage.getItem('gstarpage');
        setCurrentPage(pagenumber)
    }, [])

    useEffect(() => {
        localStorage.setItem('gstarpage', currentPage)
    }, [currentPage])
    const [data, setData] = useState([{}])
    const [realdata, setRealData] = useState([{}])
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState(1);
    const [uncheck, setUnCheck] = useState([{}]);
    const [check, setCheck] = useState(0)

    const [value, setValue] = useState('')
    const [id, setId] = useState('')
    const itemsPerPage = 50;
    // Pagination calculation for displaying the current page's data
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);
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

    const local = 'http://localhost:10000'
    const api = 'https://brand-b-1.onrender.com'

    useEffect(() => {
        getdata();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);
        try {
            await axios.post(`${api}/uploadforcheck`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setLoading(false);
            alert("Sheet Uploaded successfully");
            handleShowAlert()
            window.location.reload()
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Failed to upload file');
        }
    };
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const setcurrentpage = async (n) => {
        await new Promise(resolve => setTimeout(resolve, 1000))
        n > 0 ? setCurrentPage(n) : setCurrentPage(1)
        setLoading(false)
    }
    const getdata = async () => {
        setLoading(true);
        let res = await fetch(`${api}/downloadfinalSheet`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        res = await res.json();
        setLoading(false)
        if (res.status) {
            setRealData(res.data);
            console.log(res.data[0])
            let unchecked = res.data.filter((d) => !d.isCheked)
            setUnCheck(unchecked)
            setData(unchecked);
            setCheck(res.data.length - unchecked.length);
        } else {
            setLoading(false)
            alert('Error while fetching data')
        }
    }

    const openlink = (url1, url2) => {
        window.open(url2, '_blank', 'noopener,noreferrer');
        window.open(url1, '_blank', 'noopener,noreferrer');
    }

    const deleteproduct = async (id) => {
        let ans = confirm('Are you sure, You want to delete?')
        if (ans) {
            let res = await fetch(`${api}/deleteproduct`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            })
            res = await res.json();
            if (res.status) {
                handleShowAlert()
            } else {
                alert('Error while deleting product')
            }
        }
    }

    const editsku = async () => {
        let res = await fetch(`${api}/editsku`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: edititem._id, newsku: newSku })
        });
        res = await res.json();
        if (res.status) {
            setShow(false);
            handleShowAlert()
        }
        else {
            alert('Error, plz retry')
        }
    }

    const downloadfinalexcel = () => {
        let Brand = prompt('Enter Brand Name')

        let jsondata = data.map((d) => {
            return {
                'Date': new Date().toDateString().slice(4).replaceAll(" ", '-'),
                'SKU': d.SKU,
                'Vendor': 'BELK',
                'SKU length': d.SKU.length,
                'Amz Title': d.Title,
                'Belk link': d['Belk link'],
                'Brand': Brand,
                'upc': "'" + d.UPC.slice(3),
                'UPC': d.UPC,
                'ASIN': d.ASIN,
                'gap1': '',
                'gap2': '',
                'gap3': '',
                'size': d.Size,
                'sku2': d.SKU,
                'Product price': d['Product price'],
                'Vendor Shipping': '0.00',
                'Fulfillment Shipping': d['Fulfillment Shipping'],


                // 'BLK Title': d['Product name'],


                // 'Available Quantity': d['Available Quantity'],

                // 'EAN List': d['EAN List'],
                // 'MPN': d.MPN,
                // 'ISBN': d.ISBN,
                // 'Amazon link': d['Amazon link'],
                // 'Img link': d['Img link'],

                // 'Color': d['Color'],
                // 'Any other variations': d['Any other variations'],
            };
        })
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(jsondata);
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const excelFile = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelFile], { type: 'application/octet-stream' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Final_Product_list.xlsx'; // Set the file name
        link.click(); // Trigger the download
    }
  

    const setChecked = async (id, bool) => {
        if (!bool) {
            let res = await fetch(`${api}/setchecked`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            setCheck((prev) => prev + 1)
        }
    }

    const setUncheckproduct = () => {
        setData(uncheck)
    }
    const setcheckproduct = () => {
        let d = realdata.filter((r) => r.isCheked)
        setData(d)
    }
    const all = () => {
        setData(realdata)
    }
    const refresh = () => {
        window.location.reload()
    }
    const editshippingcost = (value, id) => {
        setValue(value)
        setId(id)
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [value]);
    const inputRef = useRef(null);

    const handleOutsideClick = async (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
            if (value) {
                let res = await fetch(`${api}/editshippingcost`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id, value })
                })
                res = await res.json();
                if (res.status) {
                    handleShowAlert()
                }
                setValue('')
                setId('')
            }
        }
    };

    const [showAlert, setShowAlert] = useState(false);
    const [showAlert1, setShowAlert1] = useState(false);

    const handleShowAlert = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 2000); // Alert disappears after 2 seconds
    };

    const handleShowAlert1 = () => {
        setShowAlert1(true);
        setTimeout(() => {
            setShowAlert1(false);
        }, 1500); 
    };

    const deletedata = async () => {
        let res = await fetch(`${api}/deletedata`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }

        })
        res = await res.json();
        if (res.status) {
            window.location.reload()
        } else {
            console.log(err)
        }
    }
    // ---------check box
    const [idarr, setIdarr] = useState([])
    const handleCheckboxChange = (id) => {
        setIdarr((prevIdArr) => {
            if (prevIdArr.includes(id)) {
                return prevIdArr.filter((item) => item !== id); // Remove id if it exists
            } else {
                return [...prevIdArr, id]; // Add id if not exists
            }
        });
        console.log(idarr)
    };
    const [deletecount, setDeletecount]=useState(0)
    const deletemanyproduct = async () => {
        let res = await fetch(`${api}/deletemanyproduct`, {
            method: 'DELETE',
            body: JSON.stringify({ arr: idarr }),
            headers: { 'Content-Type': 'application/json' }
        })
        res = await res.json()
        if (!res.status) {
            alert('Error while deleting')
        } else {
            setDeletecount(res.count)
            handleShowAlert1()
            
            setIdarr([])
        }
    }

    return (
        <div className="d-flex flex-column align-items-center" style={{ opacity: loading ? 0.5 : 1, color: loading ? 'black' : null, paddingLeft: '3vw', paddingRight: '3vw' }}>
            {loading && ( // Show spinner while loading is true
                <div className="loading-overlay">
                    <Spinner animation="border" variant="primary" /> {/* Spinner from Bootstrap */}
                </div>
            )}
            {showAlert && (
                <div className="d-flex justify-content-end">
                    <h5
                        className="fixed top-2 bg-success text-white w-20 px-4 py-3 shadow-lg"
                        style={{ zIndex: 1000, position: 'fixed' }}
                    >
                        Successfully Updated
                    </h5>
                </div>
            )}

            {showAlert1 && (
                <div className="d-flex justify-content-end" style={{position:'fixed', right:'40%', bottom:'10%'}}>
                    <h5
                        className=" bg-success text-white w-20 px-4 py-3 shadow-lg"
                        style={{ zIndex: 1000, position: 'fixed' }}
                    >
                       {deletecount} products deleted
                    </h5>
                </div>
            )}
            <h1 className="text-center">Match Product Details</h1>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" value={edititem.SKU} className="me-4 w-25" />
                    <input type="text" className="me-4 w-25" placeholder="Enter new SKU" onChange={(e) => setNewsku(e.target.value)} />
                    <button onClick={editsku}>Submit</button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <form className="mt-4 mb-4" onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} accept=".xlsx, .xls" />
                <button className='me-4' type="submit">Upload Custom Sheet</button>
            </form>

            <div className="container d-flex justify-content-center align-items-center flex-column">
                <div className="tableheader row">
                    <div className="col-md-2"> <button className="nobtn p-2 text-white" onClick={all}><h5>Total Products : {realdata.length}</h5></button></div>
                    <div className="col-md-3"> <button onClick={setUncheckproduct} className="nobtn p-2 text-white"><h5>Unchecked Products : {realdata.length - check}</h5></button></div>
                    <div className="col-md-2"> <button onClick={refresh} className="nobtn p-2 text-white"><h5> Refresh <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="ms-2 mb-1 bi bi-arrow-clockwise" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                    </svg></h5></button></div>
                    <div className="col-md-2"> <h5 className="text-white">Current Page {currentPage}</h5></div>
                    <div className="col-md-3">
                        <h5 className="text-white">Go to Page  <input type="text" className="w-25 ms-4 p-1" onChange={(e) => setcurrentpage(e.target.value)} /></h5>
                    </div>
                </div>

                <Table striped bordered hover className="bg-dark">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Select</th>
                            <th>Amz Img</th>
                            <th>UPC</th>
                            <th>ASIN</th>
                            <th>SKU</th>
                            <th>SKU len.</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Shp. Cost</th>
                            <th>Open Link</th>

                            <th>Is Checked</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 && currentItems.map((detailArray, i) => (
                            <tr key={i}>
                                <td>{indexOfFirstItem + i + 1}</td>
                                <td className="p-0" style={{ placeContent: 'center' }}>
                                    <input
                                        type="checkbox"
                                        onChange={() => handleCheckboxChange(detailArray.ASIN)}
                                        className="hidden inptbox"
                                    />
                                </td>
                                <td className="p-0"><img src={detailArray['Image link']} alt="img" height='50px' className="brand_img" /></td>
                                <td>{detailArray['UPC']}</td>
                                <td>{detailArray['ASIN']}</td>
                                {
                                    detailArray['SKU'] &&
                                    <>
                                        <td style={{ border: detailArray['SKU'].length > 40 ? '2px solid red' : null }}>
                                            {detailArray['SKU']}
                                            <button className="nobtn" onClick={() => handleShow(detailArray)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                                                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001" />
                                                </svg>
                                            </button>
                                        </td>
                                        <td>{detailArray['SKU'].length}</td>
                                    </>
                                }
                                <td>{detailArray['Product price'] && detailArray['Product price'].toFixed(2)}</td>
                                <td>{detailArray['Available Quantity']}</td>
                                <td> <input style={{ width: '60px' }} ref={inputRef} type="text" onChange={(e) => editshippingcost(e.target.value, detailArray._id)} on placeholder={detailArray['Fulfillment Shipping']} /></td>
                                <td><button className='pt-1 pb-1 ps-2 pe-2' onClick={() => openlink(detailArray['Amazon link'], detailArray['Belk link'])}>Check links</button></td>
                                <td><button className='pt-1 pb-1 ps-2 pe-2 nobtn' onClick={() => setChecked(detailArray._id, detailArray.isCheked)}>
                                    {
                                        detailArray.isCheked ?
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="green" class="bi bi-patch-check-fill" viewBox="0 0 16 16">
                                                <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708" />
                                            </svg> :
                                            <button className="pt-1 pb-1 ps-2 pe-2" style={{ border: '0px !important' }} >Confirm</button>
                                    }
                                </button></td>
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
            <h1>
                <Button className="btn btn-primary mb-4" onClick={downloadfinalexcel}>Download Final Sheet</Button>
                <Button className="btn btn-primary mb-4 ms-4" onClick={deletedata}>Delete Data</Button>
            </h1>

            {
                idarr.length > 0 &&
                <div className="bulk">
                    <div className="upclist">{idarr.join(", ")}</div>
                    <div className="action mt-3"><button className='pt-1 pb-1 ps-2 pe-2' onClick={deletemanyproduct}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                        </svg>
                    </button> </div>
                </div>
            }
        </div>
    )
}
