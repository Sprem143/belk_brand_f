import React, { useEffect, useState } from "react";
import * as XLSX from 'xlsx';

export default function Label() {
    const [data, setData] = useState([]);
    const [copied, setCopied]= useState(false)

    useEffect(() => {
        settext()
    }, [data])

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const binaryStr = e.target.result;
            const workbook = XLSX.read(binaryStr, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            let parsedData = XLSX.utils.sheet_to_json(sheet);
            parsedData = parsedData.slice(0, 25);
            setData(parsedData);
        };
        reader.readAsArrayBuffer(file);
    };

    const downloadformat = () => {
        let jsondata =
            [{
                'Row No': '',
                'Date': '',
                'Vendor name': '',
                'AZ id': ' ',
                'Vendor ID': '',
                'Product': '',
                'SKU': '',
                'Tracking id': '',
                'ASIN': '',
                'Qty': ''
            }];
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(jsondata);
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const excelFile = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelFile], { type: 'application/octet-stream' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Generate_label_text.xlsx';
        link.click();
    }

    const settext = () => {
        
        const msg = `Hello Sandy/Christie,\nPlease ship the following orders. Please remove all the vendor-related evidence from the package before sending them to customers. \n \n`
        const msg1 = `AZ id: ${data[0] && data[0]['AZ id']}\nProduct: ${data[0] && data[0]['Product']}\nTracking id: ${data[0] && data[0]['Tracking id'] || "Will update soon"}\nQty: ${data[0] && data[0]['Qty']}\nASIN: ${data[0] && data[0]['ASIN']}\nRow No: ${data[0] && data[0]['Row No']}\nVendor name: ${data[0] && data[0]['Vendor name']}\n\n`

        const msg2 = `AZ id: ${data[1] && data[1]['AZ id']}\nProduct: ${data[1] && data[1]['Product']}\nTracking id: ${data[1] && data[1]['Tracking id'] || "Will update soon"}\nQty: ${data[1] && data[1]['Qty']}\nASIN: ${data[1] && data[1]['ASIN']}\nRow No: ${data[1] && data[1]['Row No']}\nVendor name: ${data[1] && data[1]['Vendor name']}\n\n`

        const msg3 = `AZ id: ${data[2] && data[2]['AZ id']}\nProduct: ${data[2] && data[2]['Product']}\nTracking id: ${data[2] && data[2]['Tracking id'] || "Will update soon"}\nQty: ${data[2] && data[2]['Qty']}\nASIN: ${data[2] && data[2]['ASIN']}\nRow No: ${data[2] && data[2]['Row No']}\nVendor name: ${data[2] && data[2]['Vendor name']}\n\n`

        const msg4 = `AZ id: ${data[3] && data[3]['AZ id']}\nProduct: ${data[3] && data[3]['Product']}\nTracking id: ${data[3] && data[3]['Tracking id'] || "Will update soon"}\nQty: ${data[3] && data[3]['Qty']}\nASIN: ${data[3] && data[3]['ASIN']}\nRow No: ${data[3] && data[3]['Row No']}\nVendor name: ${data[3] && data[3]['Vendor name']}\n\n`

        const msg5 = `AZ id: ${data[4] && data[4]['AZ id']}\nProduct: ${data[4] && data[4]['Product']}\nTracking id: ${data[4] && data[4]['Tracking id'] || "Will update soon"}\nQty: ${data[4] && data[4]['Qty']}\nASIN: ${data[4] && data[4]['ASIN']}\nRow No: ${data[4] && data[4]['Row No']}\nVendor name: ${data[4] && data[4]['Vendor name']}\n\n`

        const msg6 = `AZ id: ${data[5] && data[5]['AZ id']}\nProduct: ${data[5] && data[5]['Product']}\nTracking id: ${data[5] && data[5]['Tracking id'] || "Will update soon"}\nQty: ${data[5] && data[5]['Qty']}\nASIN: ${data[5] && data[5]['ASIN']}\nRow No: ${data[5] && data[5]['Row No']}\nVendor name: ${data[5] && data[5]['Vendor name']}\n\n`

        const msg7 = `AZ id: ${data[6] && data[6]['AZ id']}\nProduct: ${data[6] && data[6]['Product']}\nTracking id: ${data[6] && data[6]['Tracking id'] || "Will update soon"}\nQty: ${data[6] && data[6]['Qty']}\nASIN: ${data[6] && data[6]['ASIN']}\nRow No: ${data[6] && data[6]['Row No']}\nVendor name: ${data[6] && data[6]['Vendor name']}\n\n`

        const msg8 = `AZ id: ${data[7] && data[7]['AZ id']}\nProduct: ${data[7] && data[7]['Product']}\nTracking id: ${data[7] && data[7]['Tracking id'] || "Will update soon"}\nQty: ${data[7] && data[7]['Qty']}\nASIN: ${data[7] && data[7]['ASIN']}\nRow No: ${data[7] && data[7]['Row No']}\nVendor name: ${data[7] && data[7]['Vendor name']}\n\n`

        const msg9 = `AZ id: ${data[8] && data[8]['AZ id']}\nProduct: ${data[8] && data[8]['Product']}\nTracking id: ${data[8] && data[8]['Tracking id'] || "Will update soon"}\nQty: ${data[8] && data[8]['Qty']}\nASIN: ${data[8] && data[8]['ASIN']}\nRow No: ${data[8] && data[8]['Row No']}\nVendor name: ${data[8] && data[8]['Vendor name']}\n\n`

        const msg10 = `AZ id: ${data[9] && data[9]['AZ id']}\nProduct: ${data[9] && data[9]['Product']}\nTracking id: ${data[9] && data[9]['Tracking id'] || "Will update soon"}\nQty: ${data[9] && data[9]['Qty']}\nASIN: ${data[9] && data[9]['ASIN']}\nRow No: ${data[9] && data[9]['Row No']}\nVendor name: ${data[9] && data[9]['Vendor name']}\n\n`

        const msg11 = `AZ id: ${data[10] && data[10]['AZ id']}\nProduct: ${data[10] && data[10]['Product']}\nTracking id: ${data[10] && data[10]['Tracking id'] || "Will update soon"}\nQty: ${data[10] && data[10]['Qty']}\nASIN: ${data[10] && data[10]['ASIN']}\nRow No: ${data[10] && data[10]['Row No']}\nVendor name: ${data[10] && data[10]['Vendor name']}\n\n`

        const msg12 = `AZ id: ${data[11] && data[11]['AZ id']}\nProduct: ${data[11] && data[11]['Product']}\nTracking id: ${data[11] && data[11]['Tracking id'] || "Will update soon"}\nQty: ${data[11] && data[11]['Qty']}\nASIN: ${data[11] && data[11]['ASIN']}\nRow No: ${data[11] && data[11]['Row No']}\nVendor name: ${data[11] && data[11]['Vendor name']}\n\n`

        const msg13 = `AZ id: ${data[12] && data[12]['AZ id']}\nProduct: ${data[12] && data[12]['Product']}\nTracking id: ${data[12] && data[12]['Tracking id'] || "Will update soon"}\nQty: ${data[12] && data[12]['Qty']}\nASIN: ${data[12] && data[12]['ASIN']}\nRow No: ${data[12] && data[12]['Row No']}\nVendor name: ${data[12] && data[12]['Vendor name']}\n\n`

        const msg14 = `AZ id: ${data[13] && data[13]['AZ id']}\nProduct: ${data[13] && data[13]['Product']}\nTracking id: ${data[13] && data[13]['Tracking id'] || "Will update soon"}\nQty: ${data[13] && data[13]['Qty']}\nASIN: ${data[13] && data[13]['ASIN']}\nRow No: ${data[13] && data[13]['Row No']}\nVendor name: ${data[13] && data[13]['Vendor name']}\n\n`

        const msg15 = `AZ id: ${data[14] && data[14]['AZ id']}\nProduct: ${data[14] && data[14]['Product']}\nTracking id: ${data[14] && data[14]['Tracking id'] || "Will update soon"}\nQty: ${data[14] && data[14]['Qty']}\nASIN: ${data[14] && data[14]['ASIN']}\nRow No: ${data[14] && data[14]['Row No']}\nVendor name: ${data[14] && data[14]['Vendor name']}\n\n`

        const msg16 = `AZ id: ${data[15] && data[15]['AZ id']}\nProduct: ${data[15] && data[15]['Product']}\nTracking id: ${data[15] && data[15]['Tracking id'] || "Will update soon"}\nQty: ${data[15] && data[15]['Qty']}\nASIN: ${data[15] && data[15]['ASIN']}\nRow No: ${data[15] && data[15]['Row No']}\nVendor name: ${data[15] && data[15]['Vendor name']}\n\n`

        const msg17 = `AZ id: ${data[16] && data[16]['AZ id']}\nProduct: ${data[16] && data[16]['Product']}\nTracking id: ${data[16] && data[16]['Tracking id'] || "Will update soon"}\nQty: ${data[16] && data[16]['Qty']}\nASIN: ${data[16] && data[16]['ASIN']}\nRow No: ${data[16] && data[16]['Row No']}\nVendor name: ${data[16] && data[16]['Vendor name']}\n\n`

        const msg18 = `AZ id: ${data[17] && data[17]['AZ id']}\nProduct: ${data[17] && data[17]['Product']}\nTracking id: ${data[17] && data[17]['Tracking id'] || "Will update soon"}\nQty: ${data[17] && data[17]['Qty']}\nASIN: ${data[17] && data[17]['ASIN']}\nRow No: ${data[17] && data[17]['Row No']}\nVendor name: ${data[17] && data[17]['Vendor name']}\n\n`


        const msg19 = `AZ id: ${data[18] && data[18]['AZ id']}\nProduct: ${data[18] && data[18]['Product']}\nTracking id: ${data[18] && data[18]['Tracking id'] || "Will update soon"}\nQty: ${data[18] && data[18]['Qty']}\nASIN: ${data[18] && data[18]['ASIN']}\nRow No: ${data[18] && data[18]['Row No']}\nVendor name: ${data[18] && data[18]['Vendor name']}\n\n`

        const msg20 = `AZ id: ${data[19] && data[19]['AZ id']}\nProduct: ${data[19] && data[19]['Product']}\nTracking id: ${data[19] && data[19]['Tracking id'] || "Will update soon"}\nQty: ${data[19] && data[19]['Qty']}\nASIN: ${data[19] && data[19]['ASIN']}\nRow No: ${data[19] && data[19]['Row No']}\nVendor name: ${data[19] && data[19]['Vendor name']}\n\n`

        const msg21 = `AZ id: ${data[20] && data[20]['AZ id']}\nProduct: ${data[20] && data[20]['Product']}\nTracking id: ${data[20] && data[20]['Tracking id'] || "Will update soon"}\nQty: ${data[20] && data[20]['Qty']}\nASIN: ${data[20] && data[20]['ASIN']}\nRow No: ${data[20] && data[20]['Row No']}\nVendor name: ${data[20] && data[20]['Vendor name']}\n\n`

        const msg22 = `AZ id: ${data[21] && data[21]['AZ id']}\nProduct: ${data[21] && data[21]['Product']}\nTracking id: ${data[21] && data[21]['Tracking id'] || "Will update soon"}\nQty: ${data[21] && data[21]['Qty']}\nASIN: ${data[21] && data[21]['ASIN']}\nRow No: ${data[21] && data[21]['Row No']}\nVendor name: ${data[21] && data[21]['Vendor name']}\n\n`

        const msg23 = `AZ id: ${data[22] && data[22]['AZ id']}\nProduct: ${data[22] && data[22]['Product']}\nTracking id: ${data[22] && data[22]['Tracking id'] || "Will update soon"}\nQty: ${data[22] && data[22]['Qty']}\nASIN: ${data[22] && data[22]['ASIN']}\nRow No: ${data[22] && data[22]['Row No']}\nVendor name: ${data[22] && data[22]['Vendor name']}\n\n`


        const msg24 = `AZ id: ${data[23] && data[23]['AZ id']}\nProduct: ${data[23] && data[23]['Product']}\nTracking id: ${data[23] && data[23]['Tracking id'] || "Will update soon"}\nQty: ${data[23] && data[23]['Qty']}\nASIN: ${data[23] && data[23]['ASIN']}\nRow No: ${data[23] && data[23]['Row No']}\nVendor name: ${data[23] && data[23]['Vendor name']}\n\n`

        const msg25 = `AZ id: ${data[24] && data[24]['AZ id']}\nProduct: ${data[24] && data[24]['Product']}\nTracking id: ${data[24] && data[24]['Tracking id'] || "Will update soon"}\nQty: ${data[24] && data[24]['Qty']}\nASIN: ${data[24] && data[24]['ASIN']}\nRow No: ${data[24] && data[24]['Row No']}\nVendor name: ${data[24] && data[24]['Vendor name']}\n\n`

        const message = msg + (msg1.length < 140 ? '' : msg1) + (msg2.length < 140 ? '' : msg2) + (msg3.length < 140 ? '' : msg3) + (msg4.length < 140 ? '' : msg4) + (msg5.length < 140 ? '' : msg5) + (msg6.length < 140 ? '' : msg6) + (msg7.length < 140 ? '' : msg7) + (msg8.length < 140 ? '' : msg8) + (msg9.length < 140 ? '' : msg9) + (msg10.length < 140 ? '' : msg10) + (msg11.length < 140 ? '' : msg11) + (msg12.length < 140 ? '' : msg12) + (msg13.length < 140 ? '' : msg13) + (msg14.length < 140 ? '' : msg14) + (msg15.length < 140 ? '' : msg15) + (msg16.length < 140 ? '' : msg16) + (msg17.length < 140 ? '' : msg17) + (msg18.length < 140 ? '' : msg18) + (msg19.length < 140 ? '' : msg19) + (msg20.length < 140 ? '' : msg20) + (msg21.length < 140 ? '' : msg21) + (msg22.length < 140 ? '' : msg22) + (msg23.length < 140 ? '' : msg23) + (msg24.length < 140 ? '' : msg24) + (msg25.length < 140 ? '' : msg25)

       if(data.length>0){
         document.getElementById('txtarea').style.display='block'
       }

        document.getElementById("myTextarea").value = message;
    }

    function copyText() {
        const textarea = document.getElementById("myTextarea");
        navigator.clipboard.writeText(textarea.value)
            .then(() => {
                setCopied(true)
            })
            .catch(err => {
                console.error("Failed to copy: ", err);
            });
    }

    return (
        <>
            <h3 className="text-center mb-4">
                Label Generation
            </h3>
            <div className="container-fluid border p-4 mt-4 mb-4">
                <div className="row">
                    <div className="col-md-4 border">
                        <h5 className="mb-2">Download Format </h5>
                        <button onClick={downloadformat}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                            </svg>
                        </button>
                    </div>
                    <div className="col-md-4 border p-2">
                        <h5 className="mb-3">Upload for Generate Label Generation</h5>
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="me-4 bi bi-upload" viewBox="0 0 16 16">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
                        </svg> <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
                    </div>
                    <div className="col-md-4 border p-2">
                        <h5 className="mb-3">Send Email</h5>
                        <a href="https://mail.google.com/mail/u/0/#sent/QgrcJHrhwLQrSfJnHkLpDVvlzwsKHgCxjTG?compose=DmwnWrRlQXqfzNxBSBWjgsFNQswGxQsrnKMVxzcVWvThsqglwhBsPBfsTHpKNSFCDkJwPGMVWmvB" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" className="ms-4 me-4 bi bi-envelope-plus-fill" viewBox="0 0 16 16">
                                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 4.697v4.974A4.5 4.5 0 0 0 12.5 8a4.5 4.5 0 0 0-1.965.45l-.338-.207z" />
                                <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5" />
                            </svg>
                        </a>
                    </div>

                </div>


            </div>


            <div style={{ position: 'relative' , display: 'none' }} className="container-fluid p-4 bg-dark" id="txtarea">
                <button className="mb-2 text-white border-white" style={{ position: 'absolute', right: '18%', top: '1%', background: 'transparent' }} onClick={copyText}> 
                    {
                        copied ?<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="me-2 bi bi-clipboard2-check-fill" viewBox="0 0 16 16">
                        <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5"/>
                        <path d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585q.084.236.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5q.001-.264.085-.5m6.769 6.854-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
                      </svg>:<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-copy me-2" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z" />
                    </svg>
                    }
                     Copy  </button>

                <textarea id="myTextarea" rows="210" cols="150" className="bg-dark text-white border-0">
                </textarea>
            </div>


        </>
    )
}
