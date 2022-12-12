import React from 'react'
import Navbar from './navbar'
import { useNavigate} from "react-router-dom";

function YogaClass() {
    const navDetails = {
        title: "Yoga Class"
    }
    let navigate = useNavigate();
    const handleSignup=()=>{
        navigate('/signup')

    }
    const handleLogin=()=>{
        navigate('/login')

    }
    return (
        <>
            <Navbar data={navDetails} />
            <div classname="container">
                
                <div className="card text-bg-light">

                    <img src="https://media.istockphoto.com/id/1324181858/photo/asian-yoga-students-observing-and-practicing-during-class.jpg?b=1&s=170667a&w=0&k=20&c=xY9OIrvUopxgJy5hJeK7n78Tk-ci09KY6dF6tEN1z4g=" class="card-img img-fluid vh-100 vw-100" alt="..." />
                    <div class="card-img-overlay text-white d-flex flex-column justify-content-center align-items-center ">

                        <h2 class="card-title fw-bolder text-uppercase">Yoga class</h2>
                        <h4 class="card-text fw-bold">Join our yoga class and get fit and healthy</h4>
                        <div class="d-grid gap-3 d-md-flex">
                            <button class="btn btn-primary fw-bold" onClick={handleSignup} type="button">Signup</button>
                            <button class="btn btn-primary fw-bold" onClick={handleLogin} type="button">Login</button>
                        </div>
                    </div>

                </div>
            </div>
        </>


    )
}

export default YogaClass