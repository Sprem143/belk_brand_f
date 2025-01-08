import { useState, useEffect } from 'react'
import './App.scss'
import { useNavigate, Link, Outlet } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';

function Login() {
    const [loading, setLoading] = useState(false)
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [vmobile, setvMobile] = useState('');
    const [vpassword, setvPassword] = useState('');

    const [amobile, setaMobile] = useState('');
    const [apassword, setaPassword] = useState('');

    const [smobile, setsMobile] = useState('');
    const [spassword, setsPassword] = useState('');

    const navigate = useNavigate();
    const localhost = 'http://localhost:10000'
    const api = 'https://admin-gy1z.onrender.com'

    useEffect(() => {
        if (localStorage.getItem('gstar_superadmin')) {
            checksuperadminlogin(localStorage.getItem('gstar_superadmin'))
        }
        if (localStorage.getItem('gstar_admin')) {
            checkadminlogin(localStorage.getItem('gstar_admin'))
        }
        if (localStorage.getItem('gstar_employee')) {
            checkemployeelogin(localStorage.getItem('gstar_admin'))
        }
        if (localStorage.getItem('gstar_employee')) {
            checkviewerlogin(localStorage.getItem('gstar_viewer'))
        }
    }, [])

    const checkadminlogin = async (token) => {
        let result = await fetch(`${localhost}/admin/islogin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token })
        });
        result = await result.json();
        if (result.status) {
            navigate('/admin')
        }
    }

    const checksuperadminlogin = async (token) => {
        let result = await fetch(`${localhost}/admin/islogin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token })
        });
        result = await result.json();
        if (result.status) {
            navigate('/superadmin')
        }
    }
    const checkemployeelogin = async (token) => {
        let result = await fetch(`${localhost}/admin/islogin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token })
        });
        result = await result.json();
        if (result.status) {
            navigate('/employee')
        }
    }

    const checkviewerlogin = async (token) => {
        let result = await fetch(`${localhost}/admin/islogin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token })
        });
        result = await result.json();
        if (result.status) {
            navigate('/viewer')
        }
    }
    const handleadminLogin = async () => {
        if (amobile && apassword) {
            try {
                let result = await fetch(`${localhost}/admin/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ mobile: amobile, password: apassword })
                });
                result = await result.json();
                if (result.token) {
                    localStorage.setItem('gstar_admin', result.token)
                    navigate('/admin')
                }
            } catch (err) {
                console.log(err);
                alert(err)
            }
        }
    }

    //  ----------super admin login-----------
    const handleSuperadminLogin = async () => {
        if (smobile && spassword) {
            try {
                let result = await fetch(`${localhost}/superadmin/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ mobile: smobile, password: spassword })
                });
                result = await result.json();
                if (result.token) {
                    localStorage.setItem('gstar_superadmin', result.token)
                    navigate('/superadmin')
                }
            } catch (err) {
                console.log(err);
                alert(err)
            }
        } else {
            alert("Please username and password")
        }
    }

    const handleLogin = async () => {
        if (mobile && password) {
            setLoading(true)
            try {
                let result = await fetch(`${localhost}/employee/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ mobile, password })
                });
                result = await result.json();
                setLoading(false)
                if (result.token) {
                    localStorage.setItem('gstar_employee', result.token)
                    navigate('/employee')
                } else {
                    alert(result.msg)
                }
            } catch (err) {
                setLoading(false)
                console.log(err);
                alert(err)
            }
        }
    }

    // ---------viewer login----
    const handleviewerLogin = async () => {
        if (vmobile && vpassword) {
            setLoading(true)
            try {
                let result = await fetch(`${localhost}/viewer/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ vmobile, vpassword })
                });
                result = await result.json();
                setLoading(false)
                if (result.token) {
                    localStorage.setItem('gstar_viewer', result.token)
                    navigate('/viewer')
                } else {
                    alert(result.msg)
                }
            } catch (err) {
                setLoading(false)
                console.log(err);
                alert(err)
            }
        }
    }

    const showloginform = (role) => {
        if (role == 1) {
            document.getElementById('admin').style.display = 'none'
            document.getElementById('employee').style.display = 'none'
            document.getElementById('viewer').style.display = 'none'
            document.getElementById('superadmin').style.display = 'block'
        } else if (role == 2) {
            document.getElementById('admin').style.display = 'block'
            document.getElementById('employee').style.display = 'none'
            document.getElementById('viewer').style.display = 'none'
            document.getElementById('superadmin').style.display = 'none'
        } else if (role == 3) {
            document.getElementById('admin').style.display = 'none'
            document.getElementById('employee').style.display = 'block'
            document.getElementById('viewer').style.display = 'none'
            document.getElementById('superadmin').style.display = 'none'
        } else if (role == 4) {
            document.getElementById('admin').style.display = 'none'
            document.getElementById('employee').style.display = 'none'
            document.getElementById('viewer').style.display = 'block'
            document.getElementById('superadmin').style.display = 'none'
        }
    }
    return (
        <>
            <div className="d-flex justify-content-center p-4">
                <div className='w-50 select_btn p-4 d-flex flex-column align-items-center'>
                    <h1 className="text-center text-white">Welcome to Login page</h1>
                    <h4 className="text-center text-white">Login as </h4>

                    <Nav variant="tabs" defaultActiveKey='1' className='mt-4 bg-black'>
                        <Nav.Item>
                            <Nav.Link className='fs-5 fw-bold' eventKey="1" onClick={() => showloginform(1)}>Super Admin</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-2" className='fs-5 fw-bold' onClick={() => showloginform(2)}>Admin</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-3" className='fs-5 fw-bold' onClick={() => showloginform(3)}>Employee</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-4" className='fs-5 fw-bold' onClick={() => showloginform(4)} >Viewer</Nav.Link>
                        </Nav.Item>

                    </Nav>
                    {/* ------------super admin login------------ */}
                    <div className="form-box mt-4" style={{display:'block'}} id='superadmin'>
                        <div className="header-form">
                            <h4 className="text-center">
                                <img src='/static/gstar.png' alt="" height='100' />
                            </h4>
                            <h2 className="text-center text-white">Super Admin Login</h2>
                        </div>
                        <div className="body-form">
                            <form>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <svg style={{ border: '2px solid white', borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }} xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="white" className=" bi bi-person-fill" viewBox="0 0 16 16">
                                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                        </svg>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Username" onChange={(e) => setsMobile(e.target.value)} />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <svg style={{ border: '2px solid white', borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }} xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="white" className="ps-1 bi bi-key-fill" viewBox="0 0 16 16">
                                            <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                        </svg>
                                    </div>
                                    <input type="text" className="form-control" onChange={(e) => setsPassword(e.target.value)} placeholder="Password" />
                                </div>
                                <button type="button" className="btn w-100 bg-a text-white" style={{ background: '#0082bc' }} onClick={handleSuperadminLogin}>LOGIN</button>
                                <div className="message mt-4">
                                    <div className="text-white"><input type="checkbox" /> Remember ME</div>
                                    <div ><a href="#" className="text-white">Forgot your password</a></div>
                                </div>
                            </form>

                        </div>
                    </div>

                    {/* -----------admin login */}
                    <div className="form-box mt-4" id='admin'>
                        <div className="header-form">
                            <h4 className="text-center">
                                <img src='/static/gstar.png' alt="" height='100' />
                            </h4>
                            <h2 className="text-center text-white">Admin Login</h2>
                        </div>
                        <div className="body-form">
                            <form>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <svg style={{ border: '2px solid white', borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }} xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="white" className=" bi bi-person-fill" viewBox="0 0 16 16">
                                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                        </svg>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Username" onChange={(e) => setaMobile(e.target.value)} />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <svg style={{ border: '2px solid white', borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }} xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="white" className="ps-1 bi bi-key-fill" viewBox="0 0 16 16">
                                            <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                        </svg>
                                    </div>
                                    <input type="text" className="form-control" onChange={(e) => setaPassword(e.target.value)} placeholder="Password" />
                                </div>
                                <button type="button" className="btn w-100 bg-a text-white" style={{ background: '#0082bc' }} onClick={handleadminLogin}>LOGIN</button>
                                <div className="message mt-4">
                                    <div className="text-white"><input type="checkbox" /> Remember ME</div>
                                    <div ><a href="#" className="text-white">Forgot your password</a></div>
                                </div>
                            </form>

                        </div>
                    </div>

                    {/* -------employee login---------- */}
                    <div className="form-box mt-4" id='employee'>
                        <div className="header-form">
                            <h4 className="text-center">
                                <img src='/static/gstar.png' alt="" height='100' />
                            </h4>
                            <h2 className="text-center text-white">Employee Login</h2>
                        </div>
                        <div className="body-form">
                            <form>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <svg style={{ border: '2px solid white', borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }} xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#0082bc" className=" bi bi-person-fill" viewBox="0 0 16 16">
                                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                        </svg>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Username" onChange={(e) => setMobile(e.target.value)} />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <svg style={{ border: '2px solid white', borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }} xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#0082bc" className="ps-1 bi bi-key-fill" viewBox="0 0 16 16">
                                            <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                        </svg>
                                    </div>
                                    <input type="text" className="form-control" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                                </div>
                                <button type="button" className="btn w-100 bg-a text-white" style={{ background: '#0082bc' }} onClick={handleLogin}>LOGIN</button>
                                <div className="message mt-4">
                                    <div className="text-white"><input type="checkbox" /> Remember ME</div>
                                    <div ><a href="#" className="text-white">Forgot your password</a></div>
                                </div>
                            </form>

                        </div>
                    </div>
{/* ---------viewer login------- */}
                    <div className="form-box mt-4" id='viewer'>
                        <div className="header-form">
                            <h4 className="text-center">
                                <img src='/static/gstar.png' alt="" height='100' />
                            </h4>
                            <h2 className="text-center text-white">Viewer Login</h2>
                        </div>
                        <div className="body-form">
                            <form>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <svg style={{ border: '2px solid white', borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }} xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#0082bc" className=" bi bi-person-fill" viewBox="0 0 16 16">
                                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                        </svg>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Username" onChange={(e) => setvMobile(e.target.value)} />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <svg style={{ border: '2px solid white', borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }} xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#0082bc" className="ps-1 bi bi-key-fill" viewBox="0 0 16 16">
                                            <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                        </svg>
                                    </div>
                                    <input type="text" className="form-control" onChange={(e) => setvPassword(e.target.value)} placeholder="Password" />
                                </div>
                                <button type="button" className="btn w-100 bg-a text-white" style={{ background: '#0082bc' }} onClick={handleviewerLogin}>LOGIN</button>
                                <div className="message mt-4">
                                    <div className="text-white"><input type="checkbox" /> Remember ME</div>
                                    <div ><a href="#" className="text-white">Forgot your password</a></div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}

export default Login
