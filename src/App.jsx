import React, { useEffect, useState } from "react";

import axios from "axios";

import "./App.css"

const App = () => {
    const [advice, setAdvice] = useState("")//usestate for advice state
    const [load, setLoad] = useState(false)//usestate for loading state

    //useEffect to trigger getAdvice function
    useEffect(() => {
        getAdvice()
    }, [])

    //function to advice
    const getAdvice = async () => {
        setLoad(true)
        try {
            const url = "https://api.adviceslip.com/advice"
            const response = await axios.request(url)
            setLoad(false)
            const advice = await response.data.slip.advice
            setAdvice(advice)
        } catch (err) {
            if (err) {
                setAdvice("Network error ☹️!")
                setLoad(false)
            }
        }
    }

    //another advice function
    const anotherAdvice = () => {
        getAdvice()
    }

    return (
        <>
            <div id="main">
                <div className="card">
                    <p>{load===true? "loading..." : advice}</p>
                </div>
                <button onClick={anotherAdvice}>{load === true ?
                    <>
                        <div class="spinner-border text-light" role="status">
                            <span class="sr-only"></span>
                        </div>
                    </>
                : "New Advice"}</button>
            </div>
        </>
    )
}

export default App;