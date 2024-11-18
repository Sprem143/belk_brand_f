const AvailableProduct = require('../model/AvailableProduct');
const FinalProduct = require('../model/finalProduct')
const Product = require('../model/products');
const Serial = require('../model/serial')
const InvUpc = require('../model/invUpc');
const InvUrl1 = require('../model/invUrl1');
const InvUrl2 = require('../model/invUrl2');
const InvUrl3 = require('../model/invUrl3');
const InvUrl4 = require('../model/invUrl4');
const InvUrl5 = require('../model/invUrl5');
const InvUrl6 = require('../model/invUrl6');
const InvUrl7 = require('../model/invUrl7');
const InvUrl8 = require('../model/invUrl8');
const InvProduct = require('../model/invProduct');
const AutoFetchData = require('../model/autofetchdata')
const Upc = require('../model/upc');
const xlsx = require('xlsx')
const fs = require('fs');
const path = require('path');

exports.getrowdata = async(req, res) => {
    try {
        let rowData = await InvProduct.find();
        res.status(200).send(rowData)
    } catch (err) {
        console.log(err);
        res.send(err)
    }
}
exports.getdata = async(req, res) => {
    try {
        let resultData = await AutoFetchData.find();
        res.status(200).send(resultData)
    } catch (err) {
        console.log(err);
        res.send(err)
    }
}