import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import Header from './Navbar.jsx';
import Brand from './Brand.jsx';
import Analysis from './Analysis.jsx';
import Rowdata from './Rowdata.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Backup from './Backup.jsx';
import Calculation from './Calculation.jsx';
import Boscos from './Boscos.jsx';
import Checkproduct from './Checkproduct.jsx';
import Label from './Label.jsx';
import Outofstock from './Outofstock.jsx';
import Mastersheet from './Mastersheet.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
   
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/brand' element={<Brand />} />
        <Route path='/boscos' element={<Boscos />} />
        <Route path='/analysis' element={<Analysis/>} />
        <Route path='/rowdata' element={<Rowdata/>} />
        <Route path='/backup1456' element={<Backup/>} />
        <Route path='/calculation' element={<Calculation/>} />
        <Route path='/checkproduct' element={<Checkproduct/>} />
        <Route path='/label' element={<Label/>} />
        <Route path='/outofstock' element={<Outofstock/>} />
        <Route path='/mastersheet' element={<Mastersheet/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
