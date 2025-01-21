import { useState, useEffect } from "react"
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import * as XLSX from 'xlsx';
import Spinner from 'react-bootstrap/Spinner';
import './App.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'

export default function Checkproduct() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [edititem, setEdititem] = useState({})
    const [newSku, setNewsku] = useState('')
    const handleShow = (obj) => {
        setEdititem(obj)
        setShow(true)
    };

    const [data, setData] = useState([{}])
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
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
          const response = await axios.post(`${api}/uploadforcheck`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          setLoading(false);
          alert("Sheet Uploaded successfully");
          window.location.reload()
        } catch (error) {
          console.error('Error uploading file:', error);
          alert('Failed to upload file');
        }
      };
      const handleFileChange = (e) => {
        setFile(e.target.files[0]);
      };


    const getdata = async () => {
        setLoading(true);
        let res = await fetch(`${api}/downloadfinalSheet`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        res = await res.json();
        setLoading(false)
        if (res.status) {
            setData(res.data);
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
        let res = await fetch(`${api}/deleteproduct`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        })
        res = await res.json();
        if (res.status) {
            window.location.reload();
        } else {
            alert('Error while deleting product')
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
            window.location.reload()
        }
        else {
            alert('Error, plz retry')
        }
    }

   const downloadfinalexcel=()=>{
    let jsondata= data.map((d)=>{
        return {
            'Input EAN':d['Input EAN'],
            'SKU':d.SKU ,
            'ASIN': d.ASIN,
            'Amazon link': d['Amazon link'],
            'Belk link':d['Belk link'],
            'EAN List': d['EAN List'],
            'MPN': d.MPN,
            'ISBN': d.ISBN,
            'Title': d.Title,
            'Brand': d.Brand,
            'Dimensions (in)': d['Dimensions (in)'],
            'Weight (lb)': d['Weight (lb)'],
            'Image link': d['Image link'],
            'Lowest Price (USD)': d['Lowest Price (USD)'],
            'Number of Sellers': d['Number of Sellers'],
            'BSR': d.BSR,
            'Product Category': d['Product Category'],
            'Buy Box Price (USD)': d['Buy Box Price (USD)'],
            'FBA Fees': d['FBA Fees'],
            'Fees Breakdown': d['Fees Breakdown'],
            'Product id': d['Product id'],
            'UPC':d.UPC,
            'Available Quantity': d['Available Quantity'],
            'Product name': d['Product name'],
            'Belk link':d['Belk link'],
            'Img link': d['Img link'],
            'Product Currency':d['Product Currency'],
            'Product price': d['Product price'],
            'Category': d['Category'],
            'Soldby':d['Soldby'],
            'Size':d['Size'],
            'Color':d['Color'],
            'Any other variations': d['Any other variations'],
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
    return (
        <div style={{ opacity: loading ? 0.5 : 1, color: loading ? 'black' : null, paddingLeft: '3vw', paddingRight: '3vw' }}>
            {loading && ( // Show spinner while loading is true
                <div className="loading-overlay">
                    <Spinner animation="border" variant="primary" /> {/* Spinner from Bootstrap */}
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
            <Accordion className="mb-4" defaultActiveKey={'0'}>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Total Number of Product in &nbsp; <span style={{ fontWeight: 'bolder' }}> {name} </span> &nbsp;: &nbsp;&nbsp; <span style={{ color: 'blue' }}>{data.length > 1 ? data.length : 0} </span></Accordion.Header>
                    <Accordion.Body>

                      


                        <Table striped bordered hover className="bg-dark">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Image</th>
                                    <th>UPC</th>
                                    <th>ASIN</th>
                                    <th>SKU</th>
                                    <th>SKU len.</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Open Link</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.length > 0 && currentItems.map((detailArray, i) => (
                                    <tr key={i}>
                                        <td>{indexOfFirstItem + i + 1}</td>
                                        <td className="p-0"><img src={detailArray['Img link']} alt="img" height='50px' className="brand_img" /></td>
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
                                        <td>{detailArray['Product price']}</td>
                                        <td>{detailArray['Available Quantity']}</td>
                                        <td><button onClick={() => openlink(detailArray['Amazon link'], detailArray['Belk link'])}>Check links</button></td>
                                        <td><button onClick={() => deleteproduct(detailArray._id)}>Delete</button></td>
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
                {/* Repeat similar structure for other Accordions */}
            </Accordion>

            <h1>
                <Button className="btn btn-primary mb-4" onClick={downloadfinalexcel}>Download Final Sheet</Button>
            </h1>
        </div>
    )
}
