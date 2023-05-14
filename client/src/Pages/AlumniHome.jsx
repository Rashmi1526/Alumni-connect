import React,{useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import HomeHelper from '../Components/HomeHelper'

const Alumni = () => {
    const store = useSelector((store) => store)
    const history = useHistory()

    return (
        <div>
            {store.student.isAuthenticated ? <>
                <HomeHelper />
                <div className="container">
                    <div className="row">
                        <div className="col-md-2">

                        </div>
                        <div className="col-md-8 mt-5">
                            <div className="row">
                                <div className="col-md-5">
                                    <div className="card" style={{ width: "18rem" }}>
                                        <img className="card-img-top" src={store.alumni.alumni.alumni.avatar} alt="Card image cap" />
                                        <div className="card-body">
                                            <h5 className="card-title">{store.alumni.alumni.alumni.name}</h5>
                                            <h5 className="card-title">{store.alumni.alumni.alumni.registrationNumber}</h5>
                                            <Link to='/student/updateProfile'>UPDATE PROFILE</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-7 bg-dark  text-white">
                                    <table className="table ">
                                        <tbody className="text-white">
                                            <tr>
                                                <td>Name</td>
                                                <td>{store.alumni.alumni.alumni.name}</td>
                                            </tr>
                                            <tr>
                                                <td>Email</td>
                                                <td>{store.alumni.alumni.alumni.email}</td>
                                            </tr>
                                            <tr>
                                                <td>Registration Number</td>
                                                <td>{store.alumni.alumni.alumni.registrationNumber}</td>
                                            </tr>
                                            <tr>
                                                <td>Date Of Birth</td>
                                                <td>{store.alumni.alumni.alumni.dob}</td>
                                            </tr>
                                            <tr>
                                                <td>Year</td>
                                                <td>{store.alumni.alumni.alumni.year}</td>
                                            </tr>
                                            <tr>
                                                <td>Department</td>
                                                <td>{store.alumni.alumni.alumni.department}</td>
                                            </tr>
                                            
                                            
                                            <tr>
                                                <td>Gender</td>
                                                <td>{store.alumni.alumni.alumni.gender ? store.alumni.alumni.alumni.gender : 
                                                
                                                   "NA"
                                                }</td>
                                            </tr>
                                            <tr>
                                                <td>Contact Number</td>
                                                <td>{store.alumni.alumni.alumni.alumniMobileNumber ?
                                                    store.alumni.alumni.alumni.alumniMobileNumber : "NA"}</td>
                                            </tr>
                                            
                                            
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">

                        </div>

                    </div>
                </div>

            </> : (history.push('/'))}
        </div>

    )
}

export default Alumni
