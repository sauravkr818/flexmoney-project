import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
    const [details, setDetails] = useState({
        email: "",
        name: "",
        payment_done: false,
    });


    const [navDetails, setNavDetails] = useState({
        email: "",
        name: "",
        payment_done: false,
        title: "Dashboard",
    });

    const [adData, setadData] = useState({
        amount_paid: null,
        batch: null,
    });
    let navigate = useNavigate();
    let { state } = useLocation();

    const handlePayment = () => {
        axios
            .post(
                "https://stripe-scintillating-plutonium.glitch.me/api/users/payment",
                {
                    amount_paid: adData.amount_paid,
                    batch: adData.batch,
                    email: details.email,
                }
            )
            .then(function (response) {
                toast("Payment successfully done");
                setDetails({
                    ...details,
                    email: response.result.email,
                    name: response.result.name,
                    payment_done: true,
                });
            })
            .catch(function (error) {
                console.log(error);
                toast(error.err);
                console.log(error);
            });
    };

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (state !== null) {
            toast(state.message);
        }
        if (token !== undefined && token !== null) {
            token = token.substring(7, token.length);
            var decoded = jwt_decode(token);

            axios
                .post(
                    "https://stripe-scintillating-plutonium.glitch.me/api/users/dashboard",
                    {
                        email: decoded.email,
                    }
                )
                .then(function (response) {
                    setDetails({
                        ...details,
                        email: response.data.email,
                        name: response.data.name,
                        payment_done: response.data.payment_done,
                    });

                    setNavDetails({
                        ...navDetails,
                        email: response.data.email,
                        name: response.data.name,
                        payment_done: response.data.payment_done,
                        title: "Dashboard",
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });

            var exp = decoded.exp * 1000;

            var lastDate = new Date(exp);

            let today = Date.now();
            if (today < lastDate) {
                navigate("/dashboard");
            } else {
                navigate("/login");
            }
        } else if (token === null) {
            navigate("/login");
        }
    }, []);

    return (
        <>
            <Navbar data={navDetails} />
            <ToastContainer />
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-10 mx-auto">
                        <div className="card mt-5">
                            <div className="card-body">
                                <h2 class="card-title text-center fw-bold">
                                    Admission
                                </h2>
                                <div>
                                    <hr className="border border-dark border-2 w-75 mx-auto "></hr>
                                </div>
                                <div className="row">
                                    <div className="col-12 mt-3 text-center">
                                        <form className="row g-2">
                                            <div classname="col-md-10">
                                                <h4 className="blockquote">
                                                    <em>
                                                        Name : {details.name}
                                                    </em>
                                                </h4>
                                            </div>
                                            <div classname="col-md-10">
                                                <h4 className="blockquote">
                                                    <em>
                                                        Email : {details.email}
                                                    </em>
                                                </h4>
                                            </div>
                                            <div classname="col-md-10">
                                                {details.payment_done ===
                                                true ? (
                                                    <div>
                                                        <h6 className="fw-bold text-uppercase">
                                                            You have joined{" "}
                                                            {adData.batch} batch
                                                        </h6>
                                                        <h6 className="fw-bold text-uppercase">
                                                            Thank you for
                                                            joining our Yoga
                                                            class
                                                        </h6>
                                                    </div>
                                                ) : (
                                                    <h6 className="fw-bold text-uppercase">
                                                        Join our Yoga classes to
                                                        get fit and healthy
                                                    </h6>
                                                )}
                                            </div>
                                            <div classname="col-md-10">
                                                {details.payment_done ===
                                                true ? (
                                                    <button
                                                        className="btn btn-primary fw-bold"
                                                        disabled
                                                    >
                                                        Class joined
                                                    </button>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary w-50 mt-2 fw-bold"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#exampleModal"
                                                    >
                                                        Join Class
                                                    </button>
                                                )}
                                                <div
                                                    class="modal fade"
                                                    id="exampleModal"
                                                    tabindex="-1"
                                                    aria-labelledby="exampleModalLabel"
                                                    aria-hidden="true"
                                                >
                                                    <div class="modal-dialog modal-dialog-centered">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h1
                                                                    class="modal-title fs-5"
                                                                    id="exampleModalLabel"
                                                                >
                                                                    Join Class
                                                                </h1>
                                                                <button
                                                                    type="button"
                                                                    class="btn-close"
                                                                    data-bs-dismiss="modal"
                                                                    aria-label="Close"
                                                                ></button>
                                                            </div>
                                                            <div class="modal-body">
                                                                <div className="row">
                                                                    <div classname="col-12 mx-auto">
                                                                        <form className="row">
                                                                            <div className="col-md-6 text-start">
                                                                                <label
                                                                                    for="inputAmount"
                                                                                    className="form-label"
                                                                                >
                                                                                    Amount
                                                                                </label>
                                                                                <select
                                                                                    id="inputAmount"
                                                                                    name="amount_paid"
                                                                                    value={
                                                                                        adData.amount_paid
                                                                                    }
                                                                                    onChange={(
                                                                                        e
                                                                                    ) =>
                                                                                        setadData(
                                                                                            {
                                                                                                ...adData,
                                                                                                amount_paid:
                                                                                                    e
                                                                                                        .target
                                                                                                        .value,
                                                                                            }
                                                                                        )
                                                                                    }
                                                                                    className="form-select"
                                                                                >
                                                                                    <option
                                                                                        selected
                                                                                    >
                                                                                        Choose...
                                                                                    </option>
                                                                                    <option value="500">
                                                                                        Rs.
                                                                                        500
                                                                                    </option>
                                                                                </select>
                                                                            </div>
                                                                            <div className="col-md-6 text-start">
                                                                                <label
                                                                                    for="inputBatch"
                                                                                    className="form-label"
                                                                                >
                                                                                    Batch
                                                                                </label>
                                                                                <select
                                                                                    id="inputBatch"
                                                                                    name="batch"
                                                                                    value={
                                                                                        adData.batch
                                                                                    }
                                                                                    onChange={(
                                                                                        e
                                                                                    ) =>
                                                                                        setadData(
                                                                                            {
                                                                                                ...adData,
                                                                                                batch: e
                                                                                                    .target
                                                                                                    .value,
                                                                                            }
                                                                                        )
                                                                                    }
                                                                                    className="form-select"
                                                                                >
                                                                                    <option
                                                                                        selected
                                                                                    >
                                                                                        Choose...
                                                                                    </option>
                                                                                    <option value="6-7 AM">
                                                                                        6-7
                                                                                        AM
                                                                                    </option>
                                                                                    <option value="7-8 AM">
                                                                                        7-8
                                                                                        AM
                                                                                    </option>
                                                                                    <option value="8-9 AM">
                                                                                        8-9
                                                                                        AM
                                                                                    </option>
                                                                                    <option value="5-6 PM">
                                                                                        5-6
                                                                                        PM
                                                                                    </option>
                                                                                </select>
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="modal-footer">
                                                                <button
                                                                    type="button"
                                                                    onClick={
                                                                        handlePayment
                                                                    }
                                                                    className="btn btn-primary"
                                                                    data-bs-dismiss="modal"
                                                                >
                                                                    Payment
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
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
    );
}

export default Dashboard;
