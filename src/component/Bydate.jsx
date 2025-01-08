import React, { useEffect, useState } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import '../employee/Employee.scss'
import '../index.scss'
import '../App.scss'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useLocation } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import { Spinner } from "react-bootstrap";
import Pagination from 'react-bootstrap/Pagination';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';

export default function Bydate() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true);
        setId(id);
    }
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = (id) => {
        edit(id)
        setResult([{}]);
        setShow2(true);
    }
    const localhost = 'http://localhost:10000'
    const api = 'https://admin-gy1z.onrender.com'
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)
    const [profile, setProfile] = useState({})
    const [realData, setRealData] = useState([{}])

    const [search, setSearch] = useState('');
    const [result, setResult] = useState([{}]);
    const [data, setData] = useState([{}]);
    const [file, setFile] = useState(null);
    const [id, setId] = useState('');
    const [editid, setEditid] = useState('')
    const [order, setOrder] = useState({
        'Date ordered': '',
        'Retailer': '',
        'Amazon Order id': '',
        'Vendor ID': '',
        'Description': '',
        'SKUs to match': '',
        'Vendor Tracking #': '',
        'ASINs': '',
        'Qty': '',
        "Qty Rec'd": '',
        'Date Received': '',
        'Qty Shipped': '',
        'Shoes': '',
        'Date Shipped': '',
        'Notes': '',
        'Replacement Shoe Box': '',
        'Vendor Return': '',
        'Return date': '',
    })

    // ----------calender setting_-----------
    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });
    const formatDate = (date) => {
        const [d, m, y] = date.toLocaleDateString('en-GB').split('/');
        const newDate = `${y}-${m}-${d}`
        return newDate
    };
    const handleSelect = async (ranges) => {
        const startDate = formatDate(ranges.selection.startDate);
        const endDate = formatDate(ranges.selection.endDate);
        console.log(startDate, endDate)
        setSelectionRange(ranges.selection);
        try {
            let res = await fetch(`${localhost}/product/entrybydate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ startDate, endDate })
            })
            res = await res.json()
            if (res.data) {
                setData(res.data);
                setRealData(res.data)
            }
            if (res.msg) {
                alert(res.msg)
            }
        } catch (err) {
            console.log(err);
        }

    };


    useEffect(() => {
       getprofile()
    }, [])

    const searchproduct = () => {
        setResult([{}])
        if (search !== null) {
            new Promise(resolve => setTimeout(resolve, 1000))
            const sr = realData.filter((d) => d['SKUs to match'].toLowerCase().includes(search.toLowerCase()) || d['ASINs'].toLowerCase().includes(search.toLowerCase()) || d['Amazon Order id'].toLowerCase().includes(search.toLowerCase()) || d['Vendor ID'].toLowerCase().includes(search.toLowerCase()) || d['Vendor Tracking #'].toLowerCase().includes(search.toLowerCase()));
            setResult(sr);
        }
    }

    const cancelsearch = () => {
        setResult([{}]);
        setSearch(null)
    }
    const all = () => {
        setData(realData)
    }

    // Pagination calculation for displaying the current page's data
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = Array.isArray(data) && data.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

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

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const getprofile = async () => {
        try {
            let employeeToken = localStorage.getItem('gstar_employee')
            let employee = await fetch(`${localhost}/employee/getprofile`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${employeeToken}` }
            });
            employee = await employee.json();
            if (employee.employee.mobile !== undefined) {
                setProfile(employee.employee);
            } else {
                alert(admin.msg);
                navigate('/')
            }
        } catch (err) {
            navigate('/')
        }
    }
    const addproduct = async () => {
        try {
            let res = await fetch(`${localhost}/product/addproduct`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ product: order, id: profile.name, editid: editid })
            });
            res = await res.json();
            alert(res.msg);
            setShow2(false)
        } catch (err) {
            console.log(err);
            alert("Error while saving product details. Please retry")
        }
    }
    const reset = () => {
        setOrder({
            'Date ordered': '',
            'Retailer': '',
            'Amazon Order id': '',
            'Vendor ID': '',
            'Description': '',
            'SKUs to match': '',
            'Vendor Tracking #': '',
            'ASINs': '',
            'Qty': '',
            "Qty Rec'd": '',
            'Date Received': '',
            'Qty Shipped': '',
            'Shoes': '',
            'Date Shipped': '',
            'Notes': '',
            'Replacement Shoe Box': '',
            'Vendor Return': '',
            'Return date': '',
        })
    }

    const upload = async () => {
        setShow(false)
        if (!file || !id) {
            alert("Please select a file first or refresh the page.");
            return;
        }
        try {
            setLoading(true);

            // Create FormData and append both file and id
            const formData = new FormData();
            formData.append("pdf", file);
            formData.append("id", id); // Append the id here

            // Send POST request using fetch
            const response = await fetch(`${localhost}/product/upload`, {
                method: "POST",
                body: formData, // Send formData as the body
                headers: {
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            alert("File uploaded successfully.");
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err);
            alert("Error while uploading file");
        }
    };
    const edit = (id) => {
        let editItem = data.filter((t) => t._id === id);
        setOrder(editItem[0]);
        setEditid(id);
    }
    const handleDownload = (url) => {
        window.open(`https://admin-gy1z.onrender.com/uploads/${url}`, "_blank");
    };
    // const handleDownload =async (filename) => {
    //     try {
    //         const response = await fetch(`${localhost}/product/download`, {
    //             method: "POST",
    //             body:JSON.stringify({filename}),
    //             headers:{'Content-Type':'application/json'}
    //           });

    //           // Check if the response is successful
    //           if (!response.ok) {
    //             throw new Error("File not found or server error");
    //           }
    //           const blob = await response.blob();
    //         const url = window.URL.createObjectURL(new Blob([response.data]));
    //         const link = document.createElement("a");
    //         link.href = url;
    //         link.setAttribute("download", filename);
    //         document.body.appendChild(link);
    //         link.click();
    //         link.remove();
    //       } catch (err) {
    //         console.error(err);
    //         alert("Error downloading file");
    //       }
    //   };
    return (
        <div className="ps-4 pe-4" style={{ opacity: loading ? 0.5 : 1, color: loading ? 'black' : null }}>
            {loading && (
                <div className="spinner">
                    <Spinner animation="border" variant="primary" />
                </div>
            )}
            {/* --------upload modal--------- */}
            <Modal show={show} onHide={handleClose} className="d-flex justify-content-center">
                <Modal.Header closeButton>
                    <Modal.Title>Uplaod PDF</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="file" accept=".pdf" onChange={handleFileChange} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={upload}>
                        Upload
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={show2} onHide={handleClose2} className="d-flex justify-content-center">
                <Modal.Header closeButton>
                    <Modal.Title>Edit Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container mt-3 d-flex flex-column" id="form_container2" style={{ border: '1px solid blue', borderRadius: '8px', padding: '30px' }} >
                        <h2 className="text-primary mb-4">Add Orders details</h2>
                        <div className="row">
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="dateOrdered">Date Ordered</label>
                                    <input type="date" id="dateOrdered" name="dateOrdered" onChange={(e) => setOrder({ ...order, 'Date ordered': e.target.value })} value={order['Date ordered']} required />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="retailer">Retailer</label>
                                    <input type="text" id="retailer" name="retailer" onChange={(e) => setOrder({ ...order, 'Retailer': e.target.value })} value={order['Retailer']} required />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="amazonOrderId">Amazon Order ID</label>
                                    <input type="text" id="amazonOrderId" name="amazonOrderId" onChange={(e) => setOrder({ ...order, 'Amazon Order id': e.target.value })} value={order['Amazon Order id']} required />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="vendorId">Vendor ID</label>
                                    <input type="text" id="vendorId" name="vendorId" onChange={(e) => setOrder({ ...order, 'Vendor ID': e.target.value })} value={order['Vendor ID']} required />
                                </div>

                            </div>

                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="sku">SKUs,to match</label>
                                    <input type="text" id="sku" name="sku" onChange={(e) => setOrder({ ...order, 'SKUs to match': e.target.value })} value={order['SKUs to match']} required />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="vendorTracking">Vendor Tracking #</label>
                                    <input type="text" id="vendorTracking" name="vendorTracking" onChange={(e) => setOrder({ ...order, 'Vendor Tracking #': e.target.value })} value={order['Vendor Tracking #']} required />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="asins">ASINs</label>
                                    <input type="text" id="asins" name="asins" onChange={(e) => setOrder({ ...order, 'ASINs': e.target.value })} value={order['ASINs']} required />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="quantity">Qty.</label>
                                    <input type="number" id="quantity" name="quantity" onChange={(e) => setOrder({ ...order, 'Qty': e.target.value })} value={order['Qty']} required />
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="quantityReceived">Qty. Rec'd</label>
                                    <input type="number" id="quantityReceived" name="quantityReceived" onChange={(e) => setOrder({ ...order, "Qty Rec'd": e.target.value })} value={order["Qty Rec'd"]} required />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="dateReceived">Date Received</label>
                                    <input type="date" id="dateReceived" name="dateReceived" onChange={(e) => setOrder({ ...order, 'Date Received': e.target.value })} value={order['Date Received']} required />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="quantityShipped">Qty Shipped</label>
                                    <input type="number" id="quantityShipped" name="quantityShipped" onChange={(e) => setOrder({ ...order, 'Qty Shipped': e.target.value })} value={order['Qty Shipped']} required />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="shoes">Shoes</label>
                                    <input type="text" id="shoes" name="shoes" onChange={(e) => setOrder({ ...order, 'Shoes': e.target.value })} value={order['Shoes']} required />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="dateShipped">Date Shipped</label>
                                    <input type="date" id="dateShipped" name="dateShipped" onChange={(e) => setOrder({ ...order, 'Date Shipped': e.target.value })} value={order['Date Shipped']} required />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="notes">Notes</label>
                                    <textarea id="notes" name="notes" rows="1" onChange={(e) => setOrder({ ...order, 'Notes': e.target.value })} value={order['Notes']} ></textarea>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea id="description" name="description" rows="1" onChange={(e) => setOrder({ ...order, 'Description': e.target.value })} value={order['Description']} required ></textarea>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="replacement">Replacement</label>
                                    <input type="text" id="replacement" name="replacement" onChange={(e) => setOrder({ ...order, 'Replacement Shoe Box': e.target.value })} value={order['Replacement Shoe Box']} required />
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="vendorReturn">Vendor Return</label>
                                    <input type="text" id="vendorReturn" name="vendorReturn" onChange={(e) => setOrder({ ...order, 'Vendor Return': e.target.value })} value={order['Vendor Return']} required />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="returnDate">Return Date</label>
                                    <input type="date" id="returnDate" name="returnDate" onChange={(e) => setOrder({ ...order, 'Return date': e.target.value })} value={order['Return date']} required />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <div className="form-group">
                                    <Button className="mt-4 btn btn-secondary" onClick={reset}>Reset</Button>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <div className="form-group">
                                    <Button className="mt-4 btn btn-primary" onClick={addproduct}>Submit</Button>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <div className="form-group">
                                    <Button variant="secondary" className="mt-4" onClick={handleClose2}>
                                        Close
                                    </Button>                        </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>

            </Modal>
            <Button className="nobackgr"> <Link to='/employee' style={{ textDecoration: 'none' }}>Home Page</Link> </Button>
            <Button className="nobackgr"> <Link to='/employee' style={{ textDecoration: 'none' }}>Add Product</Link> </Button>
            <Button className="ms-4 nobackgr"><Link to="/products" style={{ textDecoration: 'none' }}>All Entry</Link> </Button>
            <hr style={{ margin: 0 }} />
            {/* -----------calender---- */}
            <DateRangePicker
                ranges={[selectionRange]}
                onChange={handleSelect}
            />
            {/* ---------show data---------- */}
            <Accordion className="mb-4 mt-4" defaultActiveKey={'0'}>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Total Number of Updated Products : &nbsp;&nbsp; <span style={{ color: 'blue' }}>{data.length > 1 ? data.length : 0} </span></Accordion.Header>
                    <Accordion.Body>

                        <div className="d-flex mb-4  p-2 bg-primary text-white"> Filter Product :  <button onClick={all} className="text-white p-0 ms-4 me-4" style={{ backgroundColor: 'transparent', border: 'none' }}>All</button>

                            <div>
                                <input type="text" value={search} style={{ width: '20vw' }} placeholder="Search Products by ASIN" onChange={(e) => { setSearch((e.target.value).trim()), searchproduct() }} onKeyDown={searchproduct} on />
                                <svg onClick={cancelsearch} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="ms-2 mb-1 bi bi-x-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                                </svg>

                            </div>
                            {
                                result.length > 0 && result[0].ASINs !== undefined &&
                                <div className="result">
                                    <Table striped bordered hover className="bg-dark">
                                        <thead>
                                            <tr>
                                                <th>S.N</th>
                                                <th>Date ordered</th>
                                                <th>Retlr.</th>
                                                <th>Amazon Order id</th>
                                                <th>Vendor ID </th>
                                                <th>Description</th>
                                                <th>SKUs,to match</th>
                                                <th>Vendor Tracking #</th>
                                                <th>ASINs</th>
                                                <th>Qty.</th>
                                                <th>Qty. Rec'd</th>
                                                <th>Date Received</th>
                                                <th>Qty Siped</th>
                                                <th>Shoes</th>
                                                <th>Date Siped</th>
                                                <th>Notes</th>
                                                <th>Rplc Shoe Box</th>
                                                <th>Vendor Return</th>
                                                <th>Return date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {result.length > 0 && result.map((p, i) => (
                                                <tr className="products" key={i} style={{ minHeight: '350px !important' }}>
                                                    <td>{i}
                                                    <div className="details">
                                                            <p className="pt-0 pb-0 mb-0">Entry By : {p.entryby}</p>
                                                            {p.uploadedby && <p>Uploaded By : {p.uploadedby}</p>}
                                                        </div>
                                                    </td>
                                                    <td>{p['Date ordered']}</td>
                                                    <td>{p['Retailer']}</td>
                                                    <td>{p['Amazon Order id']}</td>
                                                    <td>{p['Vendor ID']}</td>
                                                    <td>{p['Description']}</td>
                                                    <td>{p['SKUs to match']}</td>
                                                    <td>{p['Vendor Tracking #']}
                                                        <div className="details2">
                                                          
                                                                    <button onClick={() => handleShow(p._id)} className="nobackgr "><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" className="bi bi-upload" viewBox="0 0 16 16">
                                                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                                        <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
                                                                    </svg> </button>
                                                                

                                                         
                                            <button onClick={() => handleDownload(p.pdf)} className=" nobackgr"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                        </svg></button>
                                          
                                                          
                                                                    <button onClick={() => handleShow2(p._id)} className="nobackgr">
                                                                        <a href="#form_container2"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                                        </svg></a>
                                                                    </button>
                                                                
                                                        </div>
                                                    </td>
                                                    <td>{p['ASINs']}</td>
                                                    <td>{p['Qty']}</td>
                                                    <td>{p["Qty Rec'd"]}</td>
                                                    <td>{p['Date Received']}</td>
                                                    <td>{p['Qty Shipped']}</td>
                                                    <td>{p['Shoes']}</td>
                                                    <td>{p['Date Shipped']}</td>
                                                    <td>{p['Notes']}</td>
                                                    <td>{p['Replacement Shoe Box']}</td>
                                                    <td>{p['Vendor Return']}</td>
                                                    <td>{p['Return date']}</td>
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
                                    <th>S.N</th>
                                    <th>Date ordered</th>
                                    <th>Retlr.</th>
                                    <th>Amazon Order id</th>
                                    <th>Vendor ID </th>
                                    <th>Description</th>
                                    <th>SKUs,to match</th>
                                    <th>Vendor Tracking #</th>
                                    <th>ASINs</th>
                                    <th>Qty.</th>
                                    <th>Qty. Rec'd</th>
                                    <th>Date Received</th>
                                    <th>Qty Siped</th>
                                    <th>Shoes</th>
                                    <th>Date Siped</th>
                                    <th>Notes</th>
                                    <th>Rplc Shoe Box</th>
                                    <th>Vendor Return</th>
                                    <th>Return date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.length > 0 && currentItems.map((p, i) => (

                                    <tr className="products" key={i}>
                                        <td>{i + 1}
                                        <div className="details">
                                                            <p className="pt-0 pb-0 mb-0">Entry By : {p.entryby}</p>
                                                            {p.uploadedby && <p>Uploaded By : {p.uploadedby}</p>}
                                                        </div>
                                        </td>
                                        <td>{p['Date ordered']}</td>
                                        <td>{p['Retailer']}</td>
                                        <td>{p['Amazon Order id']}</td>
                                        <td>{p['Vendor ID']}</td>
                                        <td>{p['Description']}</td>
                                        <td>{p['SKUs to match']}</td>
                                        <td>{p['Vendor Tracking #']}
                                            <div className="details2">
                                               
                                                        <button onClick={() => handleShow(p._id)} className="nobackgr "><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" className="bi bi-upload" viewBox="0 0 16 16">
                                                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
                                                        </svg> </button>
                                                   

                                                        <button onClick={() => handleShow2(p._id)} className="nobackgr">
                                                            <a href="#form_container2"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                            </svg></a>
                                                        </button>
                                                
                                            </div>
                                        </td>
                                        <td>{p['ASINs']}</td>
                                        <td>{p['Qty']}</td>
                                        <td>{p["Qty Rec'd"]}</td>
                                        <td>{p['Date Received']}</td>
                                        <td>{p['Qty Shipped']}</td>
                                        <td>{p['Shoes']}</td>
                                        <td>{p['Date Shipped']}</td>
                                        <td>{p['Notes']}</td>
                                        <td>{p['Replacement Shoe Box']}</td>
                                        <td>{p['Vendor Return']}</td>
                                        <td>{p['Return date']}</td>
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
            <Outlet />
        </div >
    )
}