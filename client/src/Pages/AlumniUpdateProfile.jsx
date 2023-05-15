import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'


import { alumniUpdate, alumniLogout,newerChats, previousChats } from '../redux/action/alumniAction'
import AlumniHomeHelper from '../Components/AlumniHomeHelper'

import { useHistory, withRouter } from 'react-router-dom'

const AlumniUpdateProfile = () => {
    const store = useSelector((store) => store)
    const dispatch = useDispatch()
    const history = useHistory()
    const [gender, setGender] = useState('')
    const [alumniMobileNumber, setContactNumber] = useState('')
    const [company, setCompanyName] = useState('')
    const [designation, setDesignationName] = useState('')
    const [error, setError] = useState({})
    const [avatar, setAvatar] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const imagehandler = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0]
            setAvatar(img)
        }
    }

    useEffect(() => {
        if (store.error) {
            setError(store.error)
        }
    }, [store.error])

    const formHandler = async(e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("gender", gender)
        formData.append("alumniMobileNumber", alumniMobileNumber)
        formData.append("avatar", avatar)
        formData.append("email", store.alumni.alumni.alumni.email)
        formData.append("company", store.alumni.alumni.alumni.company)
        formData.append("designation", store.alumni.alumni.alumni.designation)
        dispatch(alumniUpdate(formData, history))
        setModal(true)
        alert("Kindly login again to see updates")
        dispatch(alumniLogout())
        history.push('/')
    }
        return (
            <div>
                {store.alumni.isAuthenticated ? <>
                    <AlumniHomeHelper />
                    <div className="container mt-5">
                        <div className="row ">
                            <div className="col-md-5 w-100 m-auto">
                                <form onSubmit={formHandler}>
                                    <div className="form-group">
                                        <label htmlFor="inputId">Profile Picture</label>
                                        <input required className="form-control" type="file" accept=".jpg,.png,.jpeg" id="inputId" onChange={imagehandler}></input>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="genderId">Gender</label>
                                        <select onChange={(e) => setGender(e.target.value)} className="form-control" id="genderId">
                                            <option>Select</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="companyId">Company</label>
                                        <input onChange={(e) => setCompanyName(e.target.value)} type="text" className="form-control" id="companyId" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="designationId">Designation</label>
                                        <input onChange={(e) => setDesignationName(e.target.value)} type="text" className="form-control" id="designationId" />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Update</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </> : (history.push('/'))}
                
            </div>
        )
    }

export default withRouter(AlumniUpdateProfile)
