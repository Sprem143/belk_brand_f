import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Spinner, Button } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import Pagination from 'react-bootstrap/Pagination';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import '../App.scss'
import * as XLSX from "xlsx";

export default function Superadmin() {

    // -----pagination setting-------------
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [realData, setRealData] = useState([{}]);
    const [data, setData] = useState([{}]);
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
        setSearch('')
    }
    const localhost = 'http://localhost:10000'
    const api = 'https://admin-gy1z.onrender.com'

    const navigate = useNavigate();
    const [profile, setProfile] = useState({})
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState({
        'Date ordered': '',
        'Retailer': 'Belk',
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
        'pdf': '',
        'entryby': '',
        'uploadedby': '',
        'Original Row #': '',
        'Condition': '',
        'Return Received date': '',
        'Return tracking id': '',
        'AZ id': '',
        'Old SKUs': '',
        'Product': '',
        'Return reason': '',
        'Returned QTy': '',
        'V Cost': '',
        'Assigned to new AZ id': '',
        'Vendor Return Tracking ids': '',
    })

    const [uploaded, setUploaded] = useState(false)
    const [file, setFile] = useState(null);
    const [id, setId] = useState('')
    const [editid, setEditid] = useState()
    const [search, setSearch] = useState('');
    const [result, setResult] = useState([{}]);
    const [card, setCard] = useState({})

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true);
        setId(id);
    }

    useEffect(() => {
        getprofile();
    }, [])

    const carddetails = async () => {
        let card = await fetch(`${localhost}/superadmin/carddetails`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        card = await card.json();
        setCard(card)
        console.log(card)
    }

    const fetchtodayproduct = async () => {
        setLoading(true)
        let res = await fetch(`${localhost}/product/todayentry`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        res = await res.json()
        setLoading(false)
        setData(res.product);
        setRealData(res.product)
        if (res.msg) {
            alert(res.msg)
        }
    }

    const getprofile = async () => {
        let token = localStorage.getItem('gstar_superadmin');
        try {
            let superadmin = await fetch(`${localhost}/superadmin/getprofile`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            superadmin = await superadmin.json();
            if (superadmin.superadmin.mobile !== undefined) {
                setProfile(superadmin.superadmin);
                fetchtodayproduct()
                carddetails()
            } else {
                navigate('/')
            }
        } catch (err) {
            navigate('/')
        }
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const showForm = () => {
        document.getElementById('form_container').style.display = 'block'
    }
    const addproduct = async () => {
        try {
            console.log(order)
            let res = await fetch(`${localhost}/product/addproduct`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ product: order, id: profile.name, editid: editid })
            });
            res = await res.json();
            alert(res.msg);
            reset();
            fetchtodayproduct()
        } catch (err) {
            console.log(err);
            alert("Error while saving product details. Please retry")
        }
    }
    const reset = () => {
        setOrder({
            'Date ordered': '',
            'Retailer': 'Belk',
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
            'pdf': '',
            'entryby': '',
            'uploadedby': '',
            'Original Row #': '',
            'Condition': '',
            'Return Received date': '',
            'Return tracking id': '',
            'AZ id': '',
            'Old SKUs': '',
            'Product': '',
            'Return reason': '',
            'Returned QTy': '',
            'V Cost': '',
            'Assigned to new AZ id': '',
            'Vendor Return Tracking ids': ''
        })
    }
    const upload = async () => {
        if (!file || !id) {
            alert("Please select a file first or refresh the page.");
            return;
        }
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("pdf", file);
            formData.append("id", id);
            formData.append("uploadedby", profile.name)
            const response = await fetch(`${localhost}/product/upload`, {
                method: "POST",
                body: formData,
                headers: {
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            alert("File uploaded successfully.");
            setLoading(false);
            setShow(false)
        } catch (err) {
            setLoading(false);
            console.log(err);
            alert("Error while uploading file");
        }
    };

    const uploadforlink = async () => {
        if (!file) {
            alert("Please select a file first or refresh the page.");
            return;
        }
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("pdf", file);
            const response = await fetch(`${localhost}/product/uploadlink`, {
                method: "POST",
                body: formData,
                headers: {
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setLoading(false);
            setOrder({ ...order, 'pdf': result.pdflink });
            setUploaded(true)
        } catch (err) {
            setLoading(false);
            console.log(err);
            alert("Error while uploading file");
        }
    };
    const edit = (id) => {
        let editItem = realData.filter((t) => t._id === id);
        setOrder(editItem[0]);
        setEditid(id);
        new Promise((resolve) => setTimeout(resolve, 3000))
        document.getElementById('form_container').style.display = 'block'
    }
    const handleDownload = (url) => {
        let [a, b, c, d, e, f, g, h] = url.split('/');
        alert(`https://admin-gy1z.onrender.com/uploads/${g}/${h}`)
        window.open(`https://admin-gy1z.onrender.com/uploads/${g}/${h}`, "_blank");
    };
    const hideform = () => {
        document.getElementById('form_container').style.display = 'none';
    }
    const deletefile = async () => {
        let path = '/opt/render/project/src/uploads/December-2024/123.pdf'
        let res = await fetch(`${localhost}/product/deletefile`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ path })
        })
        res = await res.json();
    }

    const deleteentry = async (objid) => {
        const name = profile.name
        let pr = realData.filter((d) => d._id === objid);
        pr = pr[0]
        let res = await fetch(`${localhost}/product/deleteentry`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ objid, pr, name })
        })
        res = await res.json();
        alert(res.msg);

    }

    const downloadexcel = async () => {
        let dt = realData.map(({ _id, createdAt, updatedAt, __v, entryby, uploadedby, pdf, ...r }) => r)
        const workbook = XLSX.utils.book_new()
        const worksheet = XLSX.utils.json_to_sheet(dt);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1")
        XLSX.writeFile(workbook, "Today_data.xlsx");
    }
    return (
        <div className="ps-4 pe-4">
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
            <Button className="nobackgr ms-4"><Link to='/superadmin/uploadpdf' style={{ textDecoration: 'none' }}>Upload PDF</Link></Button>
            <Button className="nobackgr ms-4"><Link to='/superadmin/bydate' style={{ textDecoration: 'none' }} >Entry By Date</Link></Button>
            <Button className="ms-4 nobackgr"><Link to="/superadmin/products" style={{ textDecoration: 'none' }} >All Entry</Link> </Button>
            <Button className="ms-4 nobackgr"><Link to="/superadmin/return" style={{ textDecoration: 'none' }} >Return orders</Link> </Button>
            <Button className="ms-4 nobackgr"><Link to="/superadmin/deletedproduct" style={{ textDecoration: 'none' }} >Deleted orders</Link> </Button>
            <Button className="ms-4 nobackgr"><Link to="/superadmin/backup" style={{ textDecoration: 'none' }} >Backup files</Link> </Button>
            <hr style={{ margin: 0 }} />

            {/* --------------------card view------------ */}
            <div className="container mt-4">
                <div className="row w-100">
                    <div className="col-lg-2 col-md-4 col-sm-12">
                        <Link to='/superadmin'>
                            <div className="card">
                                <h4 className="text-center">Today's Entry</h4>
                                <div className="d-flex justify-content-evenly">
                                    <div>
                                        <img src="/static/new.jpg" alt="" height='50px' />
                                    </div>
                                    <div>
                                        <h3 className="text-center">{realData.length}</h3>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-lg-2 col-md-4 col-sm-12">
                        <Link to="/superadmin/uploadpdf">
                            <div className="card">
                                <h4 className="text-center">Not Uploaded</h4>
                                <div className="d-flex justify-content-evenly">
                                    <div>
                                        <img src="/static/nopdf.jpg" alt="" height='50px' />
                                    </div>
                                    <div>
                                        <h3 className="text-center">{card.nopdf}</h3>
                                    </div>
                                </div>
                            </div>
                        </Link>

                    </div>

                    <div className="col-lg-2 col-md-4 col-sm-12">
                        <Link to='/superadmin/return'>
                            <div className="card">
                                <h4 className="text-center">Returned</h4>
                                <div className="d-flex justify-content-evenly">
                                    <div>
                                        <img src="/static/return.jpg" alt="" height='50px' />
                                    </div>
                                    <div>
                                        <h3 className="text-center">{card.returnorder}</h3>
                                    </div>
                                </div>
                            </div>
                        </Link>

                    </div>

                    <div className="col-lg-2 col-md-4 col-sm-12">
                        <Link to='/superadmin/notshipped'>
                            <div className="card">
                                <h4 className="text-center">Not Shipped</h4>
                                <div className="d-flex justify-content-evenly">
                                    <div>
                                        <img src="/static/files.jpg" alt="" height='50px' />
                                    </div>
                                    <div>
                                        <h3 className="text-center">{card.notshipped}</h3>
                                    </div>
                                </div>
                            </div>
                        </Link>

                    </div>
                    <div className="col-lg-2 col-md-4 col-sm-12">
                        <Link to='/superadmin/adminlist'>
                            <div className="card">
                                <h4 className="text-center">Total Admin </h4>
                                <div className="d-flex justify-content-evenly">
                                    <div>
                                        <img src="/static/admin.jpg" alt="" height='50px' />
                                    </div>
                                    <div>
                                        <h3 className="text-center">{card.admin}</h3>
                                    </div>
                                </div>
                            </div>
                        </Link>

                    </div>

                    <div className="col-lg-2 col-md-4 col-sm-12">
                        <Link to='/superadmin/employeelist'>
                            <div className="card">
                                <h4 className="text-center">Total Employee</h4>
                                <div className="d-flex justify-content-evenly">
                                    <div>
                                        <img src="/static/employee.jpg" alt="" height='50px' />
                                    </div>
                                    <div>
                                        <h3 className="text-center">{card.employee}</h3>
                                    </div>
                                </div>
                            </div>
                        </Link>

                    </div>
                </div>
            </div>
            {/* ---------------add employee, admin, viewer----- */}
            <div className="container">
                <div className="row mt-4 mb-4" style={{width:'75%'}}>
                <div className="col-lg-3 col-md-4 col-sm-12">
                        <button className="nobackgr" onClick={showForm}>
                            <div className="add_btn d-flex justify-content-center">
                                <div className="btn_icon d-flex justify-content-center align-items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-person-add" viewBox="0 0 16 16">
                                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                                        <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
                                    </svg>
                                </div>
                                <div className="align-content-center btn_text fs-5 fw-bold">Add Product</div>
                            </div>
                        </button>
                    </div>

                    <div className="col-lg-3 col-md-4 col-sm-12">
                        <Link to="/admin/signup">
                            <div className="add_btn d-flex justify-content-center">
                                <div className="btn_icon d-flex justify-content-center align-items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-person-add" viewBox="0 0 16 16">
                                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                                        <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
                                    </svg>
                                </div>
                                <div className="align-content-center btn_text fs-5 fw-bold">Add Admin</div>
                            </div>
                        </Link>
                    </div>

                    <div className="col-lg-3 col-md-4 col-sm-12">
                        <Link to="/employee/signup">
                            <div className="add_btn d-flex justify-content-center">
                                <div className="btn_icon d-flex justify-content-center align-items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-person-add" viewBox="0 0 16 16">
                                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                                        <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
                                    </svg>
                                </div>
                                <div className="align-content-center btn_text fs-5 fw-bold">Add Employee</div>
                            </div>
                        </Link>
                    </div>

                    <div className="col-lg-3 col-md-4 col-sm-12">
                        <Link to="/viewer/signup">
                            <div className="add_btn d-flex justify-content-center">
                                <div className="btn_icon d-flex justify-content-center align-items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-person-add" viewBox="0 0 16 16">
                                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                                        <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
                                    </svg>
                                </div>
                                <div className="align-content-center btn_text fs-5 fw-bold">Add Viewer</div>
                            </div>
                        </Link>
                    </div>

                   
                </div>
            </div>

            {/* ------add product form------------ */}
                <div className="container mt-4" id="form_container" style={{ display: 'none' }} >
                    <div className="row">
                        <h1 className="mb-4">Add New Order Details</h1>
                        <hr />
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className="form-group">
                                <label htmlFor="dateOrdered">Date Ordered</label>
                                <input type="date" id="dateOrdered" name="dateOrdered" onChange={(e) => setOrder({ ...order, 'Date ordered': e.target.value })} value={order['Date ordered']} required />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className="form-group">
                                <label htmlFor="retailer">Retailer</label>
                                <input type="text" id="retailer" name="retailer" onChange={(e) => setOrder({ ...order, 'Retailer': e.target.value })} value={order['Retailer'] || 'Belk'} required />
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
                                <label htmlFor="description">Description</label>
                                <textarea id="description" name="description" rows="1" onChange={(e) => setOrder({ ...order, 'Description': e.target.value })} value={order['Description']} required ></textarea>
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
                                <div className="d-flex mt-4">
                                    <input type="file" accept=".pdf" onChange={handleFileChange} />
                                    {uploaded &&
                                        <h2 className="ms-4"> <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="green" className="bi bi-check2-all" viewBox="0 0 16 16">
                                            <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0" />
                                            <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708" />
                                        </svg>  </h2>
                                    }
                                    <Button className="btn ms-4" onClick={uploadforlink}>Upload </Button>
                                </div>
                            </div>
                        </div>

                        {/* ----------for prep center use----------- */}

                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                    <h3>For prep center use</h3>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <div className="container">
                                        <div className="row">
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
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header> <h3>Return order</h3>  </Accordion.Header>
                                <Accordion.Body>
                                    <div className="container">
                                        <div className="row w-100">
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
                                                    <label htmlFor="OriginalRow">Original Row #</label>
                                                    <input type="date" id="OriginalRow" name="OriginalRow" onChange={(e) => setOrder({ ...order, 'Original Row #': e.target.value })} value={order['Original Row #']} required />
                                                </div>
                                            </div>

                                            <div className="col-lg-4 col-md-6 col-sm-12">
                                                <div className="form-group">
                                                    <label htmlFor="Condition">Condition</label>
                                                    <input type="text" id="Condition" name="Condition" onChange={(e) => setOrder({ ...order, 'Condition': e.target.value })} value={order['Condition']} required />
                                                </div>
                                            </div>

                                            <div className="col-lg-4 col-md-6 col-sm-12">
                                                <div className="form-group">
                                                    <label htmlFor="ReturnReceiveddate">Return Received date</label>
                                                    <input type="text" id="ReturnReceiveddate" name="ReturnReceiveddate" onChange={(e) => setOrder({ ...order, 'Return Received date': e.target.value })} value={order['Return Received date']} required />
                                                </div>
                                            </div>

                                            <div className="col-lg-4 col-md-6 col-sm-12">
                                                <div className="form-group">
                                                    <label htmlFor="Returntrackingid">Return tracking id</label>
                                                    <input type="text" id="Returntrackingid" name="Returntrackingid" onChange={(e) => setOrder({ ...order, 'Return tracking id': e.target.value })} value={order['Return tracking id']} required />
                                                </div>
                                            </div>

                                            <div className="col-lg-4 col-md-6 col-sm-12">
                                                <div className="form-group">
                                                    <label htmlFor="AZid">AZ id</label>
                                                    <input type="text" id="AZid" name="AZid" onChange={(e) => setOrder({ ...order, 'AZ id': e.target.value })} value={order['AZ id']} required />
                                                </div>
                                            </div>

                                            <div className="col-lg-4 col-md-6 col-sm-12">
                                                <div className="form-group">
                                                    <label htmlFor="OldSKUs">Old SKUs</label>
                                                    <input type="text" id="OldSKUs" name="OldSKUs" onChange={(e) => setOrder({ ...order, 'Old SKUs': e.target.value })} value={order['Old SKUs']} required />
                                                </div>
                                            </div>

                                            <div className="col-lg-4 col-md-6 col-sm-12">
                                                <div className="form-group">
                                                    <label htmlFor="NewStockSKUs">New Stock SKUs</label>
                                                    <input type="text" id="NewStockSKUs" name="NewStockSKUs" onChange={(e) => setOrder({ ...order, 'New Stock SKUs': e.target.value })} value={order['New Stock SKUs']} required />
                                                </div>
                                            </div>

                                            <div className="col-lg-4 col-md-6 col-sm-12">
                                                <div className="form-group">
                                                    <label htmlFor="Product">Product</label>
                                                    <input type="text" id="Product" name="Product" onChange={(e) => setOrder({ ...order, 'Product': e.target.value })} value={order['Product']} required />
                                                </div>
                                            </div>

                                            <div className="col-lg-4 col-md-6 col-sm-12">
                                                <div className="form-group">
                                                    <label htmlFor="Returnreason">Return reason</label>
                                                    <input type="text" id="Returnreason" name="Returnreason" onChange={(e) => setOrder({ ...order, 'Return reason': e.target.value })} value={order['Return reason']} required />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-sm-12">
                                                <div className="form-group">
                                                    <label htmlFor="ReturnedQTy">Returned QTy</label>
                                                    <input type="text" id="ReturnedQTy" name="ReturnedQTy" onChange={(e) => setOrder({ ...order, 'Returned QTy': e.target.value })} value={order['Returned QTy']} required />
                                                </div>
                                            </div> <div className="col-lg-4 col-md-6 col-sm-12">
                                                <div className="form-group">
                                                    <label htmlFor="VCost">V Cost</label>
                                                    <input type="text" id="VCost" name="VCost" onChange={(e) => setOrder({ ...order, 'V Cost': e.target.value })} value={order['V Cost']} required />
                                                </div>
                                            </div>

                                            <div className="col-lg-4 col-md-6 col-sm-12">
                                                <div className="form-group">
                                                    <label htmlFor="AssignedtonewAZid">Assigned to new AZ id</label>
                                                    <input type="text" id="AssignedtonewAZid" name="AssignedtonewAZid" onChange={(e) => setOrder({ ...order, 'Assigned to new AZ id': e.target.value })} value={order['Assigned to new AZ id']} required />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-sm-12">
                                                <div className="form-group">
                                                    <label htmlFor="VendorReturnTrackingids">Vendor Return Tracking ids</label>
                                                    <input type="text" id="VendorReturnTrackingids" name="VendorReturnTrackingids" onChange={(e) => setOrder({ ...order, 'Vendor Return Tracking ids': e.target.value })} value={order['Vendor Return Tracking ids']} required />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
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
                                <Button className="mt-4 btn btn-danger" onClick={hideform}>Cancel</Button>
                            </div>
                        </div>
                    </div>
                </div>
            {/* --------------show data--------------- */}
            <Accordion className="mb-4 mt-4" defaultActiveKey={'0'}>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        <h3>Total Number of Updated Products : &nbsp;&nbsp; <span style={{ color: 'blue' }} className="fs-4">{data.length > 1 ? data.length : 0}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span> </h3>
                        <div className="d-flex ms-4">
                            <div className="me-4 fs-4">Has been shipped : <span className="text-danger fs-4">Red</span> <span className="fs-4" style={{ backgroundColor: 'red' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> </div>
                            <div className="me-4 fs-4">Not shipped : <span className="text-danger fs-4">Black</span> <span className="fs-4" style={{ backgroundColor: 'black' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> </div>
                            <div className="me-4 fs-4">Return order: <span style={{ color: '#00d7ff' }} className="fs-4">Sky blue</span> <span className="fs-4" style={{ backgroundColor: '#00d7ff' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> </div>
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>

                        <div className="d-flex mb-4  p-2 bg-primary text-white">

                            <div>
                                <input type="text" value={search} style={{ width: '20vw' }} className="search_box" placeholder="Search Products by ASIN" onChange={(e) => { setSearch((e.target.value).trim()), searchproduct() }} onKeyDown={searchproduct} on />
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
                                                            <button onClick={() => handleShow(p._id)} className="nobackgr me-2"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="green" className="bi bi-upload" viewBox="0 0 16 16">
                                                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
                                                            </svg> </button>

                                                            {p.pdf && <button onClick={() => handleDownload(p.pdf)} className=" nobackgr me-2"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                                                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                                            </svg></button>}

                                                            <button onClick={() => edit(p._id)} className="nobackgr">
                                                                <a href="#form_container2"> <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                                </svg></a>
                                                            </button>

                                                            <button className="nobackgr" onClick={() => deleteentry(p._id)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                                                </svg>
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
                                    <tr className="products" key={i} style={{ borderColor: p['Vendor Return'] !== '' ? '#00d7ff' : p['Qty Shipped'] !== '' ? 'red' : 'black' }}>
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
                                                <button onClick={() => handleShow(p._id)} className="nobackgr me-2"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="green" className="bi bi-upload" viewBox="0 0 16 16">
                                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
                                                </svg> </button>

                                                {p.pdf && <button onClick={() => handleDownload(p.pdf)} className=" nobackgr me-2"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                                </svg></button>}

                                                <button onClick={() => edit(p._id)} className="nobackgr">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                    </svg>
                                                </button>

                                                <button className="nobackgr" onClick={() => deleteentry(p._id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                                    </svg>
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
            <h1 className="text-end"> <Button onClick={downloadexcel}>Download Sheet</Button> </h1>
            <Outlet />
        </div>
    )
}