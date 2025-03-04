import React, { useState } from "react";
import * as XLSX from 'xlsx';

export default function Label() {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const binaryStr = e.target.result;
            const workbook = XLSX.read(binaryStr, { type: "binary" });

            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            const parsedData = XLSX.utils.sheet_to_json(sheet);
            setData(parsedData);
            console.log(parsedData)
        };
        reader.readAsBinaryString(file);
    };

    const downloadformat = () => {
        let jsondata = data.map((d) => {
            return {
                'Row No': '',
                'Date': '',
                'Vendor name': '',
                'AZ id': '',
                'Vendor ID': '',
                'Product': '',
                'SKU': '',
                'Tracking id': '',
                'ASIN': '',
                'Qty': ''
            };
        })
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(jsondata);
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const excelFile = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelFile], { type: 'application/octet-stream' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Generate_label_text.xlsx'; // Set the file name
        link.click();
    }
    return (
        <>
            <h3 className="text-center mb-4">
                Label Generation
            </h3>
            <div >
                <h5 className="mb-3">Upload for Generate Label Generation</h5>
                <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
                <button onClick={downloadformat}>Download Format</button>
            </div>

            <div>
                <p className="ps-4" style={{ textAlign: 'start' }}>Hello Sandy/Christie, <br />
                    Please ship the following orders, please remove all the vendor related evidence from the package before sending them to customers.
                </p>
                {
                    data.length > 0 &&
                    <>
                        <div className="p-4" style={{ textAlign: 'start' }}>
                            AZ id: {data[0]['AZ id']} <br />
                            Product: {data[0]['Product']} <br />
                            Tracking id: {data[0]['Tracking id']} <br />
                            Qty: {data[0]['Qty']} <br />
                            ASIN: {data[0]['ASIN']} <br />
                            Row No: {data[0]['Row No']} <br />
                            Vendor name: {data[0]['Vendor name']} <br />
                        </div>
                        {
                            data[1] &&
                            <div className="p-4" style={{ textAlign: 'start' }}>
                                AZ id: {data[1]['AZ id']} <br />
                                Product: {data[1]['Product']} <br />
                                Tracking id: {data[1]['Tracking id']} <br />
                                Qty: {data[1]['Qty']} <br />
                                ASIN: {data[1]['ASIN']} <br />
                                Row No: {data[1]['Row No']} <br />
                                Vendor name: {data[1]['Vendor name']} <br />
                            </div>
                        }
                        {
                            data[2] &&
                            <div className="p-4" style={{ textAlign: 'start' }}>
                                AZ id: {data[2]['AZ id']} <br />
                                Product: {data[2]['Product']} <br />
                                Tracking id: {data[2]['Tracking id']} <br />
                                Qty: {data[2]['Qty']} <br />
                                ASIN: {data[2]['ASIN']} <br />
                                Row No: {data[2]['Row No']} <br />
                                Vendor name: {data[2]['Vendor name']} <br />
                            </div>}

                        {
                            data[3] &&
                            <div className="p-4" style={{ textAlign: 'start' }}>
                                AZ id: {data[3]['AZ id']} <br />
                                Product: {data[3]['Product']} <br />
                                Tracking id: {data[3]['Tracking id']} <br />
                                Qty: {data[3]['Qty']} <br />
                                ASIN: {data[3]['ASIN']} <br />
                                Row No: {data[3]['Row No']} <br />
                                Vendor name: {data[3]['Vendor name']} <br />
                            </div>
                        }
                        {
                            data[4] &&
                            <div className="p-4" style={{ textAlign: 'start' }}>
                                AZ id: {data[4]['AZ id']} <br />
                                Product: {data[4]['Product']} <br />
                                Tracking id: {data[4]['Tracking id']} <br />
                                Qty: {data[4]['Qty']} <br />
                                ASIN: {data[4]['ASIN']} <br />
                                Row No: {data[4]['Row No']} <br />
                                Vendor name: {data[4]['Vendor name']} <br />
                            </div>
                        }
                        {
                            data[5] &&
                            <div className="p-4" style={{ textAlign: 'start' }}>
                                AZ id: {data[5]['AZ id']} <br />
                                Product: {data[5]['Product']} <br />
                                Tracking id: {data[5]['Tracking id']} <br />
                                Qty: {data[5]['Qty']} <br />
                                ASIN: {data[5]['ASIN']} <br />
                                Row No: {data[5]['Row No']} <br />
                                Vendor name: {data[5]['Vendor name']} <br />
                            </div>
                        }
                        {
                            data[6] &&
                            <div className="p-4" style={{ textAlign: 'start' }}>
                                AZ id: {data[6]['AZ id']} <br />
                                Product: {data[6]['Product']} <br />
                                Tracking id: {data[6]['Tracking id']} <br />
                                Qty: {data[6]['Qty']} <br />
                                ASIN: {data[6]['ASIN']} <br />
                                Row No: {data[6]['Row No']} <br />
                                Vendor name: {data[6]['Vendor name']} <br />
                            </div>
                        }
                        {
                            data[7] &&
                            <div className="p-4" style={{ textAlign: 'start' }}>
                                AZ id: {data[7]['AZ id']} <br />
                                Product: {data[7]['Product']} <br />
                                Tracking id: {data[7]['Tracking id']} <br />
                                Qty: {data[7]['Qty']} <br />
                                ASIN: {data[7]['ASIN']} <br />
                                Row No: {data[7]['Row No']} <br />
                                Vendor name: {data[7]['Vendor name']} <br />
                            </div>
                        }
                        {
                            data[8] &&
                            <div className="p-4" style={{ textAlign: 'start' }}>
                                AZ id: {data[8]['AZ id']} <br />
                                Product: {data[8]['Product']} <br />
                                Tracking id: {data[8]['Tracking id']} <br />
                                Qty: {data[8]['Qty']} <br />
                                ASIN: {data[8]['ASIN']} <br />
                                Row No: {data[8]['Row No']} <br />
                                Vendor name: {data[8]['Vendor name']} <br />
                            </div>
                        }
                        {
                            data[9] &&
                            <div className="p-4" style={{ textAlign: 'start' }}>
                                AZ id: {data[9]['AZ id']} <br />
                                Product: {data[9]['Product']} <br />
                                Tracking id: {data[9]['Tracking id']} <br />
                                Qty: {data[9]['Qty']} <br />
                                ASIN: {data[9]['ASIN']} <br />
                                Row No: {data[9]['Row No']} <br />
                                Vendor name: {data[9]['Vendor name']} <br />
                            </div>
                        }
                        {
                            data[10] &&
                            <div className="p-4" style={{ textAlign: 'start' }}>
                                AZ id: {data[10]['AZ id']} <br />
                                Product: {data[10]['Product']} <br />
                                Tracking id: {data[10]['Tracking id']} <br />
                                Qty: {data[10]['Qty']} <br />
                                ASIN: {data[10]['ASIN']} <br />
                                Row No: {data[10]['Row No']} <br />
                                Vendor name: {data[10]['Vendor name']} <br />
                            </div>
                        }
                        {
                            data[11] &&
                            <div className="p-4" style={{ textAlign: 'start' }}>
                                AZ id: {data[11]['AZ id']} <br />
                                Product: {data[11]['Product']} <br />
                                Tracking id: {data[11]['Tracking id']} <br />
                                Qty: {data[11]['Qty']} <br />
                                ASIN: {data[11]['ASIN']} <br />
                                Row No: {data[11]['Row No']} <br />
                                Vendor name: {data[11]['Vendor name']} <br />
                            </div>
                        }
                        {
                            data[12] &&
                            <div className="p-4" style={{ textAlign: 'start' }}>
                                AZ id: {data[12]['AZ id']} <br />
                                Product: {data[12]['Product']} <br />
                                Tracking id: {data[12]['Tracking id']} <br />
                                Qty: {data[12]['Qty']} <br />
                                ASIN: {data[12]['ASIN']} <br />
                                Row No: {data[12]['Row No']} <br />
                                Vendor name: {data[12]['Vendor name']} <br />
                            </div>
                        }
                        {
                            data[13] &&
                            <div className="p-4" style={{ textAlign: 'start' }}>
                                AZ id: {data[13]['AZ id']} <br />
                                Product: {data[13]['Product']} <br />
                                Tracking id: {data[13]['Tracking id']} <br />
                                Qty: {data[13]['Qty']} <br />
                                ASIN: {data[13]['ASIN']} <br />
                                Row No: {data[13]['Row No']} <br />
                                Vendor name: {data[13]['Vendor name']} <br />
                            </div>}
                        {
                            data[14] &&
                            <div className="p-4" style={{ textAlign: 'start' }}>
                                AZ id: {data[14]['AZ id']} <br />
                                Product: {data[14]['Product']} <br />
                                Tracking id: {data[14]['Tracking id']} <br />
                                Qty: {data[14]['Qty']} <br />
                                ASIN: {data[14]['ASIN']} <br />
                                Row No: {data[14]['Row No']} <br />
                                Vendor name: {data[14]['Vendor name']} <br />
                            </div>
                        }
                        {
                            data[15] &&
                            <div className="p-4" style={{ textAlign: 'start' }}>
                                AZ id: {data[15]['AZ id']} <br />
                                Product: {data[15]['Product']} <br />
                                Tracking id: {data[15]['Tracking id']} <br />
                                Qty: {data[15]['Qty']} <br />
                                ASIN: {data[15]['ASIN']} <br />
                                Row No: {data[15]['Row No']} <br />
                                Vendor name: {data[15]['Vendor name']} <br />
                            </div>
                        }
                        {
                            data[16] &&
                            <div className="p-4" style={{ textAlign: 'start' }}>
                                AZ id: {data[16]['AZ id']} <br />
                                Product: {data[16]['Product']} <br />
                                Tracking id: {data[16]['Tracking id']} <br />
                                Qty: {data[16]['Qty']} <br />
                                ASIN: {data[16]['ASIN']} <br />
                                Row No: {data[16]['Row No']} <br />
                                Vendor name: {data[16]['Vendor name']} <br />
                            </div>
                        }
                        {
                            data[17] &&
                            <div className="p-4" style={{ textAlign: 'start' }}>
                                AZ id: {data[17]['AZ id']} <br />
                                Product: {data[17]['Product']} <br />
                                Tracking id: {data[17]['Tracking id']} <br />
                                Qty: {data[17]['Qty']} <br />
                                ASIN: {data[17]['ASIN']} <br />
                                Row No: {data[17]['Row No']} <br />
                                Vendor name: {data[17]['Vendor name']} <br />
                            </div>
                        }
                        {
                            data[18] &&
                            <div className="p-4" style={{ textAlign: 'start' }}>
                                AZ id: {data[18]['AZ id']} <br />
                                Product: {data[18]['Product']} <br />
                                Tracking id: {data[18]['Tracking id']} <br />
                                Qty: {data[18]['Qty']} <br />
                                ASIN: {data[18]['ASIN']} <br />
                                Row No: {data[18]['Row No']} <br />
                                Vendor name: {data[18]['Vendor name']} <br />
                            </div>
                        }
                        {
                            data[19] &&
                            <div className="p-4" style={{ textAlign: 'start' }}>
                                AZ id: {data[19]['AZ id']} <br />
                                Product: {data[19]['Product']} <br />
                                Tracking id: {data[19]['Tracking id']} <br />
                                Qty: {data[19]['Qty']} <br />
                                ASIN: {data[19]['ASIN']} <br />
                                Row No: {data[19]['Row No']} <br />
                                Vendor name: {data[19]['Vendor name']} <br />
                            </div>
                        }
                        {
                            data[20] &&
                            <div className="p-4" style={{ textAlign: 'start' }}>
                                AZ id: {data[20]['AZ id']} <br />
                                Product: {data[20]['Product']} <br />
                                Tracking id: {data[20]['Tracking id']} <br />
                                Qty: {data[20]['Qty']} <br />
                                ASIN: {data[20]['ASIN']} <br />
                                Row No: {data[20]['Row No']} <br />
                                Vendor name: {data[20]['Vendor name']} <br />
                            </div>
                        }

                        {
                            data[21] &&
                            <div className="p-4" style={{ textAlign: 'start' }}>
                                AZ id: {data[21]['AZ id']} <br />
                                Product: {data[21]['Product']} <br />
                                Tracking id: {data[21]['Tracking id']} <br />
                                Qty: {data[21]['Qty']} <br />
                                ASIN: {data[21]['ASIN']} <br />
                                Row No: {data[21]['Row No']} <br />
                                Vendor name: {data[21]['Vendor name']} <br />
                            </div>
                        }

                        {
                            data[22] &&
                            <div className="p-4" style={{ textAlign: 'start' }}>
                                AZ id: {data[22]['AZ id']} <br />
                                Product: {data[22]['Product']} <br />
                                Tracking id: {data[22]['Tracking id']} <br />
                                Qty: {data[22]['Qty']} <br />
                                ASIN: {data[22]['ASIN']} <br />
                                Row No: {data[22]['Row No']} <br />
                                Vendor name: {data[22]['Vendor name']} <br />
                            </div>
                        }

                        {
                            data[23] &&
                            <div className="p-4" style={{ textAlign: 'start' }}>
                                AZ id: {data[23]['AZ id']} <br />
                                Product: {data[23]['Product']} <br />
                                Tracking id: {data[23]['Tracking id']} <br />
                                Qty: {data[23]['Qty']} <br />
                                ASIN: {data[23]['ASIN']} <br />
                                Row No: {data[23]['Row No']} <br />
                                Vendor name: {data[23]['Vendor name']} <br />
                            </div>
                        }

                        {
                            data[24] &&
                            <div className="p-4" style={{ textAlign: 'start' }}>
                                AZ id: {data[24]['AZ id']} <br />
                                Product: {data[24]['Product']} <br />
                                Tracking id: {data[24]['Tracking id']} <br />
                                Qty: {data[24]['Qty']} <br />
                                ASIN: {data[24]['ASIN']} <br />
                                Row No: {data[24]['Row No']} <br />
                                Vendor name: {data[24]['Vendor name']} <br />
                            </div>
                        }
                    </>
                }


            </div>



        </>
    )
}
