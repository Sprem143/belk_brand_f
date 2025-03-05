import { useState, useEffect, useRef } from "react"
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import * as XLSX from 'xlsx';
import Spinner from 'react-bootstrap/Spinner';
import './App.css'
import Button from 'react-bootstrap/Button';
import axios from 'axios'
export default function Outofstock() {

    const [currentPage, setCurrentPage] = useState(localStorage.getItem('gstarpage'));
    const [show, setShow] = useState(false);


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
    const [uncheck, setUnCheck] = useState([{}]);
    const [check, setCheck] = useState(0)

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

    useEffect(() => {
        getdata();
    }, [])

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const setcurrentpage = async (n) => {
        await new Promise(resolve => setTimeout(resolve, 1000))
        n > 0 ? setCurrentPage(n) : setCurrentPage(1)
        setLoading(false)
    }
    const getdata = async () => {
        setLoading(true);
        let res = await fetch(`${api}/inv/getoutofstock`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        res = await res.json();
        setLoading(false)
        if (res.status) {
            setData(res.data);
            console.log(res.data[0])
          
        } else {
            setLoading(false)
            alert('Error while fetching data')
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


    const all = () => {
        setData(realdata)
    }
    const refresh = () => {
        window.location.reload()
    }

    return (
        <div className="d-flex flex-column align-items-center" style={{ opacity: loading ? 0.5 : 1, color: loading ? 'black' : null, paddingLeft: '3vw', paddingRight: '3vw' }}>
            {loading && ( // Show spinner while loading is true
                <div className="loading-overlay">
                    <Spinner animation="border" variant="primary" /> {/* Spinner from Bootstrap */}
                </div>
            )}
           
          
           

            <div className="container d-flex justify-content-center align-items-center flex-column">
                <div className="tableheader row">
                    <div className="col-md-2"> <button className="nobtn p-2 text-white" onClick={all}><h5>Total Products : {realdata.length}</h5></button></div>
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
                  <th>Image</th>
                  <th>Input UPC</th>
                  <th>ASIN</th>
                  <th>SKU</th>
                  <th>Price</th>
                  <th>Out of stk Date</th>
                  <th>Product URL</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 && currentItems.map((d, i) => (
                  <tr key={i}>
                    <td>{indexOfFirstItem + i + 1}</td>
                    <td className="p-0"><img src={d['Image link']} alt="img" height='50px' className="brand_img" /></td>
                    <td>{d['Input UPC']}</td>
                    <td>{d['ASIN']}</td>
                    <td>{d['SKU']}</td>
                    <td>{d['Product price']}</td>
                    <td>{d['Date']}</td>
                    <td><a href={d['Product link']}>Belk Link</a></td>
                   
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
            </h1>

           
        </div>
    )
}
