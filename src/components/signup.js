import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useLocation, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Navbar from './navbar';

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function Signup() {
    let navigate = useNavigate();
    const [details, setDetails] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
        dob: null,
        phone: null,
        gender: "",

    });

    const navDetails = {
        title: "Sign up"
    }

    

    const handleSubmit = (e) => {
        
        axios.post('https://stripe-scintillating-plutonium.glitch.me/api/users/register', {
            name: details.name,
            email: details.email,
            password: details.password,
            password2: details.password2,
            dob: details.dob,
            phone: details.phone,
            gender: details.gender,
        })
            .then(function (response) {
                
                navigate("/login", {state: {message: "Successfully Signed Up"}});
            })
            .catch(function (error) {
                toast(error.response.data.err)
                console.log(error);
            });
    }

    return (
        <>
        <Navbar data={navDetails}/>
        <ToastContainer />
        <div className="container">
            <div className="row">
                <div className="col-md-6 col-10 mx-auto">
                    <div className="card mt-2">
                        <div className="card-body">
                            <h4 class="card-title text-center">Sign Up</h4>
                            <div><hr className="border border-dark border-2 w-75 mx-auto "></hr></div>
                            <div class="row">
                                <div class="col-12 mx-auto mt-2">
                                    <form class="row g-2">
                                        <div class="col-md-6">
                                            <label for="inputName4" class="form-label">Name</label>
                                            <input type="text" class="form-control" name="name" value={details.name}
                                                onChange={(e) => setDetails({ ...details, name: e.target.value })}
                                                id="inputName4" />
                                        </div>
                                        <div class="col-md-6">
                                            <label for="inputEmail4" class="form-label">Email</label>
                                            <input type="email" class="form-control" name="email" value={details.email}
                                                onChange={(e) => setDetails({ ...details, email: e.target.value })}
                                                id="inputEmail4" />
                                        </div>

                                        <div class="col-md-6">
                                            <label for="inputPassword4" class="form-label">Password</label>
                                            <input type="password" class="form-control" name="password" value={details.password}
                                                onChange={(e) => setDetails({ ...details, password: e.target.value })}
                                                id="inputPassword4" />
                                        </div>
                                        <div class="col-md-6">
                                            <label for="inputPassword4" class="form-label">Confirm Password</label>
                                            <input type="password" class="form-control" name="password2" value={details.password2}
                                                onChange={(e) => setDetails({ ...details, password2: e.target.value })}
                                                id="inputPassword4" />
                                        </div>
                                        <div class="col-md-6">
                                            <label for="inputNumber4" class="form-label">Phone Number</label>
                                            <input type="number" class="form-control" name="phone" value={details.phone}
                                                onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                                                id="inputNumber4" />
                                        </div>
                                        <div class="col-md-6">
                                            <label for="inputGender" class="form-label">Gender</label>
                                            <select id="inputGender" name="gender" value={details.gender}
                                                onChange={(e) => setDetails({ ...details, gender: e.target.value })}
                                                class="form-select">
                                                <option selected>Choose...</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="others">Others</option>
                                            </select>
                                        </div>
                                        <div class="col-md-6">
                                            <label for="inputDate4" class="form-label">D.O.B</label>
                                            <input type="date" class="form-control"
                                                value={details.dob}
                                                name="dob"
                                                onChange={(e) => setDetails({ ...details, dob: e.target.value })}
                                                id="inputDater4" />
                                        </div>
                                        <div class="d-md-flex justify-content-md-center">
                                            <button type="button" onClick={handleSubmit} class="btn btn-outline-primary w-75 mt-1">Sign Up</button>
                                        </div>
                                        <div class="d-md-flex justify-content-md-center">
                                            <span>Already have an account? <Link to="/login">Login now</Link></span>
                                        </div>



                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Signup