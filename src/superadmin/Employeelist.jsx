

import React, { useEffect, useState } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import '../employee/Employee.scss'
import '../index.scss'
import '../App.scss'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import { Spinner } from "react-bootstrap";
import Pagination from 'react-bootstrap/Pagination';
import * as XLSX from "xlsx";

export default function Adminlist() {
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
    const [id, setId] = useState('');
 
    useEffect(() => {
        getprofile()
        fetchproduct()
    }, [])

    const searchproduct = () => {
        setResult([{}])
        if (search !== null) {
            new Promise(resolve => setTimeout(resolve, 1000))
            const sr = realData.filter((d) => d['name'].toLowerCase().includes(search.toLowerCase()) || d['mobile'].toString().toLowerCase().includes(search.toLowerCase()) || d['email'].toLowerCase().includes(search.toLowerCase()) || d['addedby'].toLowerCase().includes(search.toLowerCase()));
            setResult(sr);
            console.log(sr)

        }
    }

    const cancelsearch = () => {
        setResult([{}]);
        setSearch('')
    }
    const all = () => {
        setData(realData)
    }

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



    const getprofile = async () => {
        try {
            let adminToken = localStorage.getItem('gstar_superadmin')
            let superadmin = await fetch(`${localhost}/superadmin/getprofile`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${adminToken}` }
            });
            superadmin = await superadmin.json();
            if (superadmin.superadmin.mobile !== undefined) {
                setProfile(superadmin.superadmin);
            } else {
                alert(superadmin.msg);
                navigate('/')
            }
        } catch (err) {
            navigate('/')
        }
    }

    const deleteentry = async (employeeid) => {
        if (confirm('Are you sure? You want to permanently delete this employee')) {
            let res = await fetch(`${localhost}/superadmin/deleteemployee`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ employeeid })
            })
            res = await res.json();
            if (res.status) {
                window.location.reload()
            } else {
                alert('Unexpected error while deleting, Please retry')
            }
        }
    }

    const fetchproduct = async () => {
        let res = await fetch(`${localhost}/superadmin/employeelist`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        res = await res.json()
        if (res.status) {
            setData(res.employee);
            setRealData(res.employee)
        }
        if (res.msg) {
            alert(res.msg)
        }
    }

    const downloadexcel = async () => {
        let dt = realData.map(({ _id, createdAt, updatedAt, __v, addedby,  ...r }) => r)
        const workbook = XLSX.utils.book_new()
        const worksheet = XLSX.utils.json_to_sheet(dt);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1")
        XLSX.writeFile(workbook, "Today_data.xlsx");
    }

    const blockadmin = async (employeeid, status) => {
        let res = await fetch(`${localhost}/superadmin/blockemployee`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ employeeid, status })
        })
        res = await res.json();
        if (res.status) {
            window.location.reload();
        } else {
            alert('Error while blocking, Please retry.')
        }
    }
    return (
        <div className="ps-4 pe-4" style={{ opacity: loading ? 0.5 : 1, color: loading ? 'black' : null }}>
            {loading && (
                <div className="spinner">
                    <Spinner animation="border" variant="primary" />
                </div>
            )}

            <Button className="nobackgr"><Link style={{ textDecoration: 'none' }} to='/superadmin'>Home</Link></Button>
            <Button className="nobackgr ms-4"><Link to='/superadmin/uploadpdf' style={{ textDecoration: 'none' }}>Upload PDF</Link></Button>
            <Button className="nobackgr ms-4"><Link to='/superadmin/bydate' style={{ textDecoration: 'none' }} >Entry By Date</Link></Button>
            <Button className="ms-4 nobackgr"><Link to="/superadmin/products" style={{ textDecoration: 'none' }} >All Entry</Link> </Button>
            <Button className="ms-4 nobackgr"><Link to="/superadmin/return" style={{ textDecoration: 'none' }} >Return orders</Link> </Button>
            <Button className="ms-4 nobackgr"><Link to="/superadmin/deletedproduct" style={{ textDecoration: 'none' }} >Deleted orders</Link> </Button>
            <Button className="ms-4 nobackgr"><Link to="/superadmin/backup" style={{ textDecoration: 'none' }} >Backup files</Link> </Button>
            <hr style={{ margin: 0 }} />
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
                                result.length > 0 && result[0].mobile !== undefined &&
                                <div className="result">
                                    <Table striped bordered hover className="bg-dark">
                                        <thead>
                                            <tr>
                                                <th>S.N</th>
                                                <th>Name</th>
                                                <th>Mobile</th>
                                                <th>Email</th>
                                                <th>Status</th>
                                                <th>Added By</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {result.length > 0 && result.map((p, i) => (
                                                <tr className="products" key={i} style={{ minHeight: '350px !important' }}>

                                                    <td>{i + 1}</td>

                                                    <td>{p['name']}</td>
                                                    <td>{p['mobile']}</td>
                                                    <td>{p['email']}

                                                    </td>
                                                    <td>{p['status']}</td>
                                                    <td>{p['addedby']}</td>
                                                    <td><button className="nobackgr" onClick={() => blockadmin(p._id, p.status)}> {p.status?"Block" : "Unblock"} </button>
                                                    </td>
                                                    <td>  <button onClick={() => edit(p._id)} className="nobackgr">
                                                        <a href="#form_container2"> <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                        </svg></a>
                                                    </button>
                                                    </td>
                                                    <td>
                                                        <button className="nobackgr" onClick={() => deleteentry(p._id)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                                            </svg>
                                                        </button>
                                                    </td>
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
                                    <th>Name</th>
                                    <th>Mobile</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Added By</th>
                                    <th>Action</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.length > 0 && currentItems.map((p, i) => (

                                    <tr className="products" key={i} style={{ minHeight: '350px !important' }}>

                                        <td>{i + 1}</td>
                                        <td>{p['name']}</td>
                                        <td>{p['mobile']}</td>
                                        <td>{p['email']}

                                        </td>
                                        <td>{p['status'] ? "Active" : "Deactive"}</td>
                                        <td>{p['addedby']}</td>
                                        <td>  <button className="nobackgr" onClick={() => blockadmin(p._id, p.status)}> {p.status?"Block" : "Unblock"} </button>
                                        </td>
                                        <td>  <button onClick={() => edit(p._id)} className="nobackgr">
                                            <a href="#form_container2"> <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                            </svg></a>
                                        </button>
                                        </td>
                                        <td>
                                            <button className="nobackgr" onClick={() => deleteentry(p._id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                                </svg>
                                            </button>
                                        </td>
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
        </div >
    )
}