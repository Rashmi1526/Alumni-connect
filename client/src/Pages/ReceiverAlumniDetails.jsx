import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
//import { getStudentByRegName } from '../redux/action/studentAction'
import {getAlumniByRegName} from '../redux/action/alumniAction'
import AlumniHomeHelper from '../Components/AlumniHomeHelper'

const RecieverAlumniDetails = (props) => {
    const store = useSelector((store) => store)
    const history = useHistory()
    const dispatch = useDispatch()

    const [registrationNumber, setRegistrationNumber] = useState("")
  
    console.log('1',store.alumni.regNumAlumni)
    

    useEffect(() => {
        setRegistrationNumber(props.match.params.registrationNumber)
        dispatch(getAlumniByRegName(registrationNumber))
        
    }, [registrationNumber]) 


    return (
        <div>
            {store.alumni.isAuthenticated ? <>
                <AlumniHomeHelper />
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-md-2">

                        </div>
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-5">
                                    <div className="card" style={{ width: "18rem" }}>
                                        <img className="card-img-top" src={store.alumni.regNumAlumni.avatar} alt="Card image cap" />
                                        <div className="card-body">
                                            <h5 className="card-title">{store.alumni.regNumAlumni.name}</h5>
                                            <h5 className="card-title">{}</h5>
                                            <Link to={`/Alumnichat/${store.alumni.regNumAlumni.registrationNumber}.${store.alumni.alumni.alumni.registrationNumber}`}>CHAT</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <table className="table border">
                                        <tbody>
                                            <tr>
                                                <td>Name</td>
                                                <td>{store.alumni.regNumAlumni.name}</td>
                                            </tr>
                                            <tr>
                                                <td>Email</td>
                                                <td>{store.alumni.regNumAlumni.email}</td>
                                            </tr>
                                            <tr>
                                                <td>Registration Number</td>
                                                <td>{store.alumni.regNumAlumni.registrationNumber}</td>
                                            </tr>
                                            <tr>
                                                <td>Year</td>
                                                <td>{store.alumni.regNumAlumni.year}</td>
                                            </tr>
                                            <tr>
                                                <td>Department</td>
                                                <td>{store.alumni.regNumAlumni.department}</td>
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

export default RecieverAlumniDetails
