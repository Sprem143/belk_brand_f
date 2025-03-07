import { useState, useEffect, useRef } from "react"
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import * as XLSX from 'xlsx';
import Spinner from 'react-bootstrap/Spinner';
import './App.css'
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
export default function Mastersheet() {
     const navigate= useNavigate()
    const [currentPage, setCurrentPage] = useState(localStorage.getItem('gstarpage'));
    useEffect(() => {
        let pagenumber = localStorage.getItem('gstarpage');
        let password = localStorage.getItem('Password')
        if(password !== 'Prem@7367'){
            navigate('/')
        }
        getdata();
        setCurrentPage(pagenumber)
    }, [])

    useEffect(() => {
        localStorage.setItem('gstarpage', currentPage)
    }, [currentPage])
    const [data, setData] = useState([{}])
    const [realdata, setRealData] = useState([{}])
    const [loading, setLoading] = useState(false)


    const itemsPerPage = 50;
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

    const setcurrentpage = async (n) => {
        await new Promise(resolve => setTimeout(resolve, 1000))
        n > 0 ? setCurrentPage(n) : setCurrentPage(1)
        setLoading(false)
    }

    // ----------get data ---------
    const [bj, setBj] = useState([{}])
    const [rc, setRc] = useState([{}])
    const [om, setOm] = useState([{}])
    const [zl, setZl] = useState([{}])

    const getdata = async () => {
        setLoading(true);
        let res = await fetch(`${api}/inv/mastersheet`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        res = await res.json();
        setLoading(false)
        if (res.status) {
            setData(res.rc);
            setBj(res.bj)
            setRc(res.rc)
            setOm(res.om)
            setZl(res.zl)
        } else {
            setLoading(false)
            alert('Error while fetching data')
        }
    }

    const downloadfinalexcel = () => {
        let jsondata = data.map((d) => {
            return {
                'Date': d.Date,
                'SKU': d.SKU,
                'upc': "'" + d.UPC,
                'ASIN': d.ASIN,
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



    const all = () => {
        setData(realdata)
    }
    const refresh = () => {
        window.location.reload()
    }
    function showdata(ac) {
        setData(ac)
    }

    const filterdata = (inp) => {
        if (inp.length == 5) {
            setLoading(true)
            let [s1, s2] = inp.split(',');
            if (s1 == s2) {
                alert('Give two different dataset name from - rc, zl, bj, om');
                return;
            }
            let d1 = s1 === "rc" ? rc : s1 === "bj" ? bj : s1 === "zl" ? zl : s1 === "om" ? om : null;
            let d2 = s2 === "rc" ? rc : s2 === "bj" ? bj : s2 === "zl" ? zl : s2 === "om" ? om : null;
            if (d1.length > 0 && d2.length > 0) {
                let commondata = []
                d1.forEach((df) => {
                    d2.forEach((ds) => {
                        if (df.UPC == ds.UPC) {
                            commondata.push(df)
                        }
                    })
                })
                console.log(commondata.length)
                setData(commondata);
            } else {
                Alert('Please give right query as no data found.')
            }
            setLoading(false)
        }
    }

    // async function cleardata() {
    //     let res = await fetch(`${api}/inv/cleardata`, {
    //         method: 'DELETE',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({})
    //     })
    // }

    return (
        <div className="d-flex flex-column align-items-center" style={{ opacity: loading ? 0.5 : 1, color: loading ? 'black' : null, paddingLeft: '3vw', paddingRight: '3vw' }}>
            {loading && ( // Show spinner while loading is true
                <div className="loading-overlay">
                    <Spinner animation="border" variant="primary" /> {/* Spinner from Bootstrap */}
                </div>
            )}
            <div className="w-100 dfjcac p-4">
                <button className="ms-2 me-2" onClick={() => showdata(rc)}>Rcube</button>
                <button className="ms-2 me-2" onClick={() => showdata(bj)}>Bijak</button>
                <button className="ms-2 me-2" onClick={() => showdata(zl)}>Zenith</button>
                <button className="ms-2 me-2" onClick={() => showdata(om)}>Om</button>
            </div>

            <div className="container d-flex justify-content-center align-items-center flex-column">
                <div className="tableheader row">
                    <div className="col-md-2"> <button className="nobtn p-2 text-white" onClick={all}><h5>Total Products : {data.length}</h5></button></div>
                    <div className="col-md-2"> <button onClick={refresh} className="nobtn p-2 text-white"><h5> Refresh <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="ms-2 mb-1 bi bi-arrow-clockwise" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                    </svg></h5></button></div>
                    <div className="col-md-2"> <h5 className="text-white">Current Page {currentPage}</h5></div>
                    <div className="col-md-6 d-flex">
                        <h5 className="text-white">Find Common Data  <input type="text" className="w-50 ms-4 p-1 ps-2" onChange={(e) => filterdata(e.target.value)} /></h5> 
                        <h5 className="text-white">Page  <input type="text" className="w-25 ms-4 p-1" onChange={(e) => setcurrentpage(e.target.value)} /></h5>
                    </div>
                </div>

                <Table striped bordered hover className="bg-dark">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Input UPC</th>
                            <th>ASIN</th>
                            <th>SKU</th>
                            <th>Product URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 && currentItems.map((d, i) => (
                            <tr key={i}>
                                <td>{indexOfFirstItem + i + 1}</td>
                                <td>{d['UPC']}</td>
                                <td>{d['ASIN']}</td>
                                <td>{d['SKU']}</td>
                                <td><a href={`https://www.belk.com/search/?lang=default&q=${d['UPC']}`} target="_blank">Belk Link</a></td>

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
                {/* <button onClick={cleardata}>Clear Data</button> */}
            </h1>


        </div>
    )
}
