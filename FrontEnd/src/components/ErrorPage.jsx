import React from 'react'
import { useRouteError } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar"
import Footer from "./footer"
const ErrorPage = () => {
    const error = useRouteError();
    let navigate = useNavigate();

    function handleClick() {
        navigate(-1)
    }

    console.error(error);
    return (
        <>
            <Navbar />
            <div id="error-page" class="mb-auto">
                <center>
                    <div class="py-40">
                        <h1 class="text-6xl my-5">Oops!</h1>
                        <p class="my-5">
                            <i>{error.statusText || error.message}</i>
                        </p>
                        <p class="my-5">Sorry, an unexpected error has occurred.</p>
                        <button class="bg-red-600 hover:bg-red-800 text-white rounded-3xl p-4 text-2xl" onClick={() => handleClick()}>Go Back</button>
                    </div>
                </center>
            </div>
            <Footer />
        </>
    );
}

export default ErrorPage
