const AutoFetchData = require('../model/autofetchdata')
const InvProduct = require('../model/invProduct');
require('dotenv').config();
const axios = require('axios');
const cheerio = require('cheerio');
const apikey = process.env.API_KEY
const { ZenRows } = require("zenrows");

async function fetchAndExtractVariable(html, variableName) {
    const $ = cheerio.load(html);
    let variableValue;
    $('script').each((index, script) => {
        const scriptContent = $(script).html();
        const regex = new RegExp(`${variableName}\\s*=\\s*({[^]*?});`);
        const match = regex.exec(scriptContent);

        if (match) {
            try {
                variableValue = JSON.parse(match[1]);
            } catch (error) {
                console.error("Failed to parse JSON:", error);
            }
        }
    });
    return variableValue;
}
// -----------first option---------

// exports.autofetchdata = async(req, res) => {
//     try {
//         console.log("autofetch");
//         var datas = await InvProduct.find();
//         const url = req.body.link;
//         let response = await axios({
//             url: 'https://api.zenrows.com/v1/',
//             method: 'GET',
//             timeout: 70000,

//             params: {
//                 'url': url,
//                 'apikey': apikey,
//                 'js_render': true,
//                 'premium_proxy': true,
//                 'outputs': 'utag_data',
//             },
//         });
//         const html = response.data;
//         console.log(html)
//             // const utagData = await fetchAndExtractVariable(html, 'utag_data');
//             // if (utagData.sku_inventory.length == 1 && utagData.sku_inventory[0] === '0') {
//             //     return res.status(200).send(true);
//             // }
//             // const price = utagData.sku_price;
//             // const upc = utagData.sku_upc;
//             // const quantity = utagData.sku_inventory;
//             // const imgurl = utagData.sku_image_url;
//             // const onsale = utagData.sku_on_sale;
//             // const coupon = utagData.product_promotedCoupon[0].cpnDiscount !== undefined ? utagData.product_promotedCoupon[0].cpnDiscount : null;
//             // var urlProduct = upc.map((u, index) => {
//             //     return {
//             //         upc: u,
//             //         price: price[index],
//             //         quantity: quantity[index],
//             //         imgurl: imgurl[index],
//             //         onsale: onsale[index]
//             //     }
//             // })

//         // let filterData = datas.map((data) => {
//         //     const matchedProduct = urlProduct.find((p) => p.upc === data['Input UPC'].replace('UPC', ''));
//         //     if (matchedProduct) {
//         //         return {
//         //             'Product link': data['Product link'],
//         //             'Current Quantity': matchedProduct.quantity,
//         //             'Product price': data['Product price'],
//         //             'Current Price': Number(coupon) > 0 && Boolean(matchedProduct.onsale) === false ? matchedProduct.price * (1 - (coupon / 100)) : matchedProduct.price,
//         //             'Image link': matchedProduct.imgurl,
//         //             'Input UPC': data['Input UPC'],
//         //             'Fulfillment': data['Fulfillment'],
//         //             'Amazon Fees%': data['Amazon Fees%'],
//         //             'Amazon link': data['Amazon link'],
//         //             'Shipping Template': data['Shipping Template'],
//         //             'Min Profit': data['Min Profit'],
//         //             ASIN: data.ASIN,
//         //             SKU: data.SKU
//         //         };
//         //     }
//         //     return null;
//         // }).filter(item => item !== null);
//         // console.log(filterData.length)
//         // let r = await AutoFetchData.insertMany(filterData)

//         // if (r) {
//         //     console.timeEnd();
//         //     res.status(200).send(true);
//         // }
//     } catch (error) {
//         console.error(error.message);
//         if (error.response) {
//             console.error(error.response.data);
//         }
//         res.status(500).send(error.message);
//     }
// }

exports.autofetchdata = async(req, res) => {
    const client = new ZenRows(apikey);
    const url = req.body.link
    var datas = await InvProduct.find();
    try {
        const request = await client.get(url, {
            premium_proxy: true,
            js_render: true,

        });
        const html = await request.text();
        const utagData = await fetchAndExtractVariable(html, 'utag_data');
        if (utagData.sku_inventory.length == 1 && utagData.sku_inventory[0] === '0') {
            return res.status(200).send(true);
        }
        const price = utagData.sku_price;
        const upc = utagData.sku_upc;
        const quantity = utagData.sku_inventory;
        const imgurl = utagData.sku_image_url;
        const onsale = utagData.sku_on_sale;
        const coupon = utagData.product_promotedCoupon[0].cpnDiscount !== undefined ? utagData.product_promotedCoupon[0].cpnDiscount : null;
        var urlProduct = upc.map((u, index) => {
            return {
                upc: u,
                price: price[index],
                quantity: quantity[index],
                imgurl: imgurl[index],
                onsale: onsale[index]
            }
        })

        let filterData = datas.map((data) => {
            const matchedProduct = urlProduct.find((p) => p.upc === data['Input UPC'].replace('UPC', ''));
            if (matchedProduct) {
                return {
                    'Product link': data['Product link'],
                    'Current Quantity': matchedProduct.quantity,
                    'Product price': data['Product price'],
                    'Current Price': Number(coupon) > 0 && Boolean(matchedProduct.onsale) === false ? matchedProduct.price * (1 - (coupon / 100)) : matchedProduct.price,
                    'Image link': matchedProduct.imgurl,
                    'Input UPC': data['Input UPC'],
                    'Fulfillment': data['Fulfillment'],
                    'Amazon Fees%': data['Amazon Fees%'],
                    'Amazon link': data['Amazon link'],
                    'Shipping Template': data['Shipping Template'],
                    'Min Profit': data['Min Profit'],
                    ASIN: data.ASIN,
                    SKU: data.SKU
                };
            }
            return null;
        }).filter(item => item !== null);
        console.log(filterData.length)
        let r = await AutoFetchData.insertMany(filterData)
        if (r) {
            res.status(200).send(true);
        }
    } catch (error) {
        console.error(error.message);
        if (error.response) {
            console.error(error.response.data);
        }
    }
}