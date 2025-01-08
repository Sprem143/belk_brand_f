import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { useNavigate, Link, Outlet } from "react-router-dom";
import '../App.scss'

export default function S_signup() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('');
    const [email,setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('');
    const localhost= 'http://localhost:10000'
    const api='https://admin-gy1z.onrender.com'

    useEffect(()=>{
        // getprofile();
    },[])

    const getprofile=async()=>{
        let token= localStorage.getItem('gstar_superadmin');
        let superadmin= await fetch(`${localhost}/superadmin/getprofile`,{
            method:'GET',
            headers:{'Authorization':`Bearer ${token}`}
        });
        superadmin= await superadmin.json();
        if(superadmin.superadmin.mobile === undefined){
           navigate('/superadmin/login');
        }
    }
 
    const handleFormSubmit = async (e) => {
       if(name && mobile && password){
        setLoading(true)
        e.preventDefault();
        try {
            let result = await fetch(`${localhost}/superadmin/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, mobile, email, password })
            })
            result = await result.json();
            if (result.status) {
                alert('superadmin successfully signed up');
                navigate("/");
            }
            setLoading(false);
            return;
        } catch (err) {
            setLoading(false)
            console.log(err);
            alert("Error while signing up")
        }
       }else{
        alert("Please fill all details");
        return;
       }
    }
    return (
        <div style={{ opacity: loading ? 0.5 : 1, color: loading ? 'black' : null, minHeight: '100vh', backgroundColor: '#28b6f6' }} className="d-flex justify-content-center align-items-center">
            {loading && ( // Show spinner while loading is true
                <div className="loading-overlay">
                    <Spinner animation="border" variant="primary" /> {/* Spinner from Bootstrap */}
                </div>
            )}
            <div className="form-container mt-4">
                <Form className="register-form" onSubmit={handleFormSubmit}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Bhagat Singh" onChange={(e) => setName(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control type="number" placeholder="9999999999" onChange={(e) => setMobile(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="abc@gmail.com" onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="*******" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <button className="form-field" type="submit"> Register </button>
                </Form>
            </div>
            <Outlet />
        </div>

    );
}
