import { useState } from "react"
import * as XLSX from 'xlsx';


export default function Boscos() {
    const [loading, setLoading] = useState(false)
    const [html, setHtml] = useState('');
    const [brandurl, setBrandurl] = useState([])
    const [product, setProduct] = useState('')


    const local = 'http://localhost:10000'
    const api = 'https://brand-b-1.onrender.com'

    const fetchurl = async () => {
        let res = await fetch(`${local}/boscos/fetchurl`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ html })
        })
        res = await res.json();
        if (res.status) {
            setBrandurl(res.url)
            console.log(res.url)
        } else {
            alert(res.msg);
            console.log(res.msg)
        }
    }

    const cleardata = async () => {
        let res = await fetch(`${local}/cleardata`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
    }

    const filterdata = (event) => {

        const file = event.target.files[0]; // Get the uploaded file
        if (!file) {
            console.log("no data");
            return; // Stop execution if no file is uploaded
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            const exData = new Uint8Array(e.target.result); // Convert file to byte array
            const workbook = XLSX.read(exData, { type: "array" }); // Read the Excel file

            const sheetName = workbook.SheetNames[0]; // Get the first sheet name
            const sheet = workbook.Sheets[sheetName]; // Get the sheet
            const parsedData = XLSX.utils.sheet_to_json(sheet); // Convert sheet to array of objects

            let result = parsedData.filter((r) => r.Title)
            result = Array.from(result.reduce((map, item) => map.set(item.UPC, item), new Map()).values());

            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(result);
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
            const excelFile = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([excelFile], { type: 'application/octet-stream' });

            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'Final_Product_list.xlsx'; // Set the file name
            link.click(); // Trigger the download

        };

        reader.readAsArrayBuffer(file); // Read file as ArrayBuffer
    };
    return (
        <div className=" ps-4 pe-4" style={{ opacity: loading ? 0.5 : 1, color: loading ? 'black' : null, marginTop: '-17px', paddingTop: '17px', minHeight: '1200px' }}>
            {loading && (
                <div className="loading-overlay">
                    <Spinner animation="border" variant="primary" />
                </div>
            )}
            <button className="mb-4" onClick={cleardata}>Clear Previous Data</button>
            <input type="file" onChange={(e) => filterdata(e)} />
            {/* <button className="mb-4" onClick={filterdata}>filter Data</button><br /> */}
            <textarea type="text" rows={20} cols={180} onChange={(e) => setHtml(e.target.value)} />
            <button onClick={fetchurl}>Submit</button>

            <ol style={{ textDecoration: 'none' }}>
                {
                    brandurl.map((url, i) => {
                        return <li style={{ textDecoration: 'none' }} key={i}>{url}</li>
                    })
                }
            </ol>

        </div>
    )
}