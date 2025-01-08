import React, { useEffect, useState } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import '../employee/Employee.scss'
import '../index.scss'
import '../App.scss'
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import { Spinner } from "react-bootstrap";
import Pagination from 'react-bootstrap/Pagination';

export default function Backup() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const localhost = 'http://localhost:10000'
    const api = 'https://admin-gy1z.onrender.com'
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)
    const [profile, setProfile] = useState({})

    const [data, setData] = useState([]);
    const [folder, setFolder]=useState([]);
    const [currentFolder, setCurrentFolder]=useState('');

    useEffect(() => {
        getprofile()
    }, [])
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

    const getprofile = async () => {
        try {
            let superadminToken = localStorage.getItem('gstar_superadmin')
            let superadmin = await fetch(`${localhost}/superadmin/getprofile`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${superadminToken}` }
            });
            superadmin = await superadmin.json();
            if (superadmin.superadmin.mobile !== undefined) {
                setProfile(superadmin.superadmin);
                fetchfolders()
            } else {
                alert(superadmin.msg);
                navigate('/')
            }
        } catch (err) {
            navigate('/')
        }
    }
    const fetchfolders = async () => {
        let res = await fetch(`${localhost}/product/backupfolder`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        res = await res.json()
        if (res.status) {
            console.log(res.data)
      setFolder(res.data)
        }else{
            alert(res.msg)
        }
    }

    const fetchfiles = async (folderName) => {
        setCurrentFolder(folderName)
      try{
        let res = await fetch(`${localhost}/product/backupfile`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({folderName})
        })
        res = await res.json()
        if (res.status) {
            console.log(res.data)
            setData(res.data);
        }else{
            alert(res.msg)
        }
      }catch(err){
        console.log(err);
      }
    }

    const handleDownload = (url) => {
        window.open(`https://admin-gy1z.onrender.com/uploads/${currentFolder}/${url}`, "_blank");
    };

    async function deleteFolder(folderPath) {
        try {
         let res= await fetch(`${localhost}/product/deletefolder`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({folderPath})
         })
        } catch (error) {
          console.error(`Error while deleting folder: ${error.message}`);
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

            <h1 className="mt-4 mb-4">Month wise folder name of pdf</h1>
 <ul>
   { folder.map((b) =>(
    <li>{b} : <button className="nobackgr" onClick={()=>fetchfiles(b)}>Get all pdf list</button></li>
))}
 </ul>

            <Accordion className="mb-4 mt-4" defaultActiveKey={'0'}>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Total Number of Updated Products : &nbsp;&nbsp; <span style={{ color: 'blue' }}>{data.length > 1 ? data.length : 0} </span></Accordion.Header>
                    <Accordion.Body>

                        <Table striped bordered hover className="bg-dark">
                            <thead>
                                <tr>
                                    <th>S.N</th>
                                    <th>Date ordered</th>
                                    <th>Download</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.length > 0 && currentItems.map((p, i) => (
                                    <tr className="products" key={i}>
                                        <td>{i + 1}

                                        </td>
                                        <td>{p}</td>
                                        <td><button className="nobackgr" onClick={()=>handleDownload(p)}>Download</button></td>
                                        <td><button className="nobackgr" onClick={()=>deleteFolder("/opt/render/project/src/uploads/December-2024")}>Delete</button></td>
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