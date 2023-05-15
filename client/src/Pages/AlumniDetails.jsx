import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import {newerChats, previousChats} from '../redux/action/studentAction'
import axios from 'axios'
import AlumniHomeHelper from '../Components/AlumniHomeHelper'
import {Link, useHistory } from 'react-router-dom'

const AlumniDetails = () => {
    const store = useSelector((store) => store)
    const history = useHistory()
    const [name, setName] = useState('')
    const [department, setDepartment] = useState("")
    const [year, setYear] = useState("")
    const [section, setSection] = useState("")
    const [result, setResult] = useState([])



    


    const filterAlumniHelper = async () => {
        try {
            const { data } = await axios({
                method: 'Post',
                url: 'http://localhost:5000/api/alumni/getAllAlumni',
                data: {
                    department,
                    year
                    }
            })
            setResult(data.result)
        }
        catch (err) {
            console.log("Error in alumni register action", err.message)
        }
    }
   
    const filterByNameHelper = async () => {
        try {
            const { data } = await axios({
                method: 'Post',
                url: 'http://localhost:5000/api/alumni/getAlumniByName',
                data: {
                    name
                }
            })
            setResult(data.result)
        }
        catch (err) {
            console.log("Error in alumni register action", err)
        }
    }
    

    const formHandler = (e) => {
        e.preventDefault()
        if (name) {
            filterByNameHelper()
        }
        else {
            filterAlumniHelper()
        }
    }
  
    return (
        <div>
            {store.alumni.isAuthenticated ? <>
                <AlumniHomeHelper />
                <div className="container">
                    {result.length === 0 && <div className="row">
                        <div className="col-md-3 border mt-4">
                            <div className="row mt-3">
                                <div className="col mb-2">
                                    <form className="form-inline" onSubmit={formHandler}>
                                        <div className="form-group ">
                                            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Search by name" type="text" className="form-control" />
                                        </div>
                                        <button type="submit" className="btn btn-block btn-info mt-1 ">Search</button>
                                    </form>
                                </div>
                            </div>
                            <div className="row justify-content-center mt-4 mb-4 ">
                                <div className="col">
                                    <form noValidate onSubmit={formHandler}>
                                        <div className="form-group">
                                            <label htmlFor="branchId">Branch</label>
                                            <select onChange={(e) => setDepartment(e.target.value)} className="form-control" id="bramchId">
                                                <option>Select</option>
                                                <option value="E.C.E">E.C.E</option>
                                                <option value="E.E.E" >E.E.E</option>
                                                <option value="Mechanical">Mechanical</option>
                                                <option value="Civil">Civil</option>
                                                <option value="I.T">I.T</option>
                                                <option value="C.S.E">C.S.E</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="yearId">Year</label>
                                            <select onChange={(e) => setYear(e.target.value)} className="form-control" id="yearId">
                                                <option>Select</option>
                                                <option value="1">2017</option>
                                                <option value="2">2018</option>
                                                <option value="3">2019</option>
                                                <option value="4">2020</option>
                                            </select>
                                        </div>
                                        
                                        <button type="submit" className="btn btn-info btn-block">Search</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9 border mt-4">
                            <div className="row justify-content-center ">
                                <div className="col">
                                    <div className="row">
                                        <div className="col-md-6 border">
                                            <h4 className="text-center">New Chats</h4>
                                            <table className="table">
                                                <tbody>
                                                    {
                                                        store.alumni.newerChats.map((res, index) =>
                                                            <tr key={index}>
                                                                <th scope="row">{index + 1}</th>
                                                                <td>{res.senderName}</td>
                                                                <td><Link to={`/alumni/${res.senderRegistrationNumber}`}>Explore</Link></td>
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="col-md-6 border">
                                            <h4 className="text-center">Older Chats</h4>
                                            <table className="table">
                                                <tbody>
                                                    {
                                                        store.alumni.previousChats.map((res, index) =>
                                                            <tr key={index}>
                                                                <th scope="row">{index + 1}</th>
                                                                <td>{res.receiverName}</td>
                                                                <td><Link to={`/alumni/${res.receiverRegistrationNumber}`}>Explore</Link></td>
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </table>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}

                    {result.length !== 0 && <div className="row">
                        <div className="col-md-6 m-auto">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">S.No</th>
                                        <th scope="col">Registration Number</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Chat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.map((obj, index) =>
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{obj.registrationNumber}</td>
                                            <td>{obj.name}</td>
                                            <td><Link to={`/alumni/${obj.registrationNumber}`}>Explore</Link></td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>}

                </div></> : (history.push('/'))}
            
        </div>
    )
}

export default AlumniDetails
