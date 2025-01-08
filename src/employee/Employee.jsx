import React, { useEffect, useState } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import './Employee.scss'
import '../index.scss'
import {Spinner} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
export default function Employee() {

    // -----pagination setting-------------


// ------------model setting--------------
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true);
        setId(id);
    }


    const localhost = 'http://localhost:10000'
    const api = 'https://admin-gy1z.onrender.com'
    const navigate = useNavigate();


    const [loading, setLoading] = useState(false)
    const [profile, setProfile] = useState({})
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
    const [todayEntry, setTodayEntry] = useState([{}]);
    const [file, setFile] = useState(null);
    const [id, setId] = useState('')
    const [editid,setEditid]= useState()


    useEffect(() => {
        getprofile();
    }, [])

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const getprofile = async () => {
        let token = localStorage.getItem('gstar_employee');
        try {
            let employee = await fetch(`${localhost}/employee/getprofile`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            employee = await employee.json();
            if (employee.employee.mobile !== undefined) {
                setProfile(employee.employee);
            } else {
                alert(admin.msg);
                navigate('/employee/login')
            }
        } catch (err) {
            navigate('/employee/login')
        }
    }
    const addproduct = async () => {
        console.log(order)
        try {
            let res = await fetch(`${localhost}/product/addproduct`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ product: order, id: profile.name, editid:editid })
            });
            res = await res.json();
            alert(res.msg);
            fetchtodayproduct()
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

    const fetchtodayproduct = async () => {
        let res = await fetch(`${localhost}/product/todayyourentry`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: profile.name})
        })
        res = await res.json()
        setTodayEntry(res.product);
        console.log(todayEntry)
        if (res.msg) {
            alert(res.msg)
        }
    }
    const upload = async () => {
        if (!file || !id) {
            alert("Please select a file first or refresh the page.");
            return;
        }
        try {
            setLoading(true);

            // Create FormData and append both file and id
            const formData = new FormData();
            formData.append("pdf", file);
            formData.append("id", id);
            formData.append("uploadedby",profile.name) // Append the id here

            // Send POST request using fetch
            const response = await fetch(`${localhost}/product/upload`, {
                method: "POST",
                body: formData, // Send formData as the body
                headers: {
                    // No need to manually set "Content-Type" for FormData in fetch
                    // The browser will automatically set the correct boundary
                },
            });

            // Handle response
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
  const edit=(id)=>{
   let editItem= todayEntry.filter((t)=> t._id=== id);
   setOrder(editItem[0]);
   setEditid(id);
}
    const handleDownload = (url) => {
        window.open(`https://admin-gy1z.onrender.com/uploads/${url}`, "_blank");
    };
  ("File not found or server error");
   sole.error(err);
   
    return (
        <div className="ps-4 pe-4">

            {/* --------upload modal--------- */}
            <Modal show={show} onHide={handleClose}>
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
            {loading && (
                <div className="spinner">
                    <Spinner animation="border" variant="primary" />
                </div>
            )}

            <Button className="nobackgr"> <Link to='/employee' style={{ textDecoration: 'none' }}>Add Product</Link> </Button>
            <Button className="nobackgr ms-4" onClick={fetchtodayproduct}><a href="#todayentry" style={{ textDecoration: 'none' }}>Today's Entry</a></Button>
            <Button className="nobackgr ms-4"><Link to='/uploadpdf' style={{ textDecoration: 'none' }} state={{role:'employee'}}>Upload PDF</Link></Button>
            <Button className="nobackgr ms-4"><Link to='/bydate' style={{ textDecoration: 'none' }} state={{role:'employee'}}>Entry By Date</Link></Button>
            <Button className="ms-4 nobackgr"><Link to="/products" style={{ textDecoration: 'none' }} state={{role:'employee'}}>All Entry</Link> </Button>
            <hr style={{ margin: 0 }} />
            <div className="container mt-3" id="form_container">
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
                </div>
            </div>

            {todayEntry[0]['ASINs'] !== undefined &&
                <Table className="mt-4" id="todayentry" striped bordered hover >
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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(todayEntry) &&
                            todayEntry.map((p, index) => (
                                <tr key={index}>
                                    <td>{index+1}
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
                                    <td>{p['Vendor Tracking #']}</td>
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
                                    <td>
                                  
                                                <button onClick={() => handleShow(p._id)} className="nobackgr "><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" className="bi bi-upload" viewBox="0 0 16 16">
                                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
                                                </svg> </button>
                                           

                                      
                                            <button onClick={() => handleDownload(p.pdf)} className=" nobackgr"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                        </svg></button>
                                         

                                            <button onClick={() => edit(p._id)} className="nobackgr">
                                           <a href="#form_container"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                            </svg></a>
                                        </button>
                                          
                                      
                                       
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </Table>
            }
            <Outlet />
        </div >
    )
}