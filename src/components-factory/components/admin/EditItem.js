import React, { useState, useEffect } from 'react'
import { AdminHeader } from './AdminHeader'
import { AdminSideNav } from './AdminSideNav'
import { useLocation } from 'react-router-dom';
import axios from 'axios';


export const EditItem = () => {

    const { state } = useLocation()
    const cat = state.cat
    const id = state.id
    const formInputElements = state.obj.data

    // load loadsh for _.
    var _ = require('loadsh')
    // check if the state return is json object : require package loadsh, 
    const isJson = _.isPlainObject(formInputElements);

    // retrieve all keys of json object
    const allKeys = isJson === true ? Object.keys(formInputElements) : null;

    const [formElements, setFormElements] = useState(formInputElements)

    useEffect(() => {
        allKeys.forEach((key) => {
            setFormElements({
                ...formElements,
                key: formInputElements[key]

            })
        })
        console.log('initiating:::', allKeys)

    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log('name=', name, 'value=', value)
        setFormElements({
            ...formElements,
            [name]: value
        })
    }

    // generate input fields to be edited
    const formInputs = allKeys.map((keyname) => {
        // depending upon type of data, vary the input field
        function renderSwitch(keyname) {

            switch (keyname) {
                case 'id': return (
                    <>
                        <input type="hidden" className="invisible form-control" name={keyname} value={formElements[keyname]} />
                    </>
                )
                case 'password':
                    return (
                        <>
                            <label for="password" class="col-sm-2 col-form-label">Password</label>
                            <input type="password" className="col-sm-6 form-control" name={keyname} value={formElements[keyname]} />
                        </>
                    )
                case 'created_at':
                case 'updated_at': return (<></>)
                default:
                    return (
                        <>
                            <label for={keyname} class="col-sm-2 col-form-label">{keyname}</label>
                            <input type="text" className="col-sm-4 form-control" name={keyname} value={formElements[keyname]} onChange={handleChange} />
                        </>
                    )
            }

        }

        return (
            <> {renderSwitch(keyname)}</>
        )

    })

    const handleUpdate = () => {

        // console.log('Clicked', formElements)
        const formData = {
            'id':id,
            'cat': cat,
            ...formElements
        }
        const res = axios.post('http://127.0.0.1:8000/admin/edit',formData,{})
        .then((response) => {
            console.log(response);
        })
        .catch((err)=>{
            console.log('error updateing', err.response)
        })

        // console.log('new::', formElements)

    }
    return (
        <div>
            <AdminHeader />
            <div className="dashboard flex">
                <div className="dashboardNav">
                    <AdminSideNav />
                </div>
                <div className="dashboardContent">
                    <h1>Update your information </h1>
                    <form>
                        {formInputs}
                        <button className="btn btn-primary mt-5" onClick={(e) => {
                            e.preventDefault()
                            handleUpdate()
                        }}>Update </button>
                    </form>

                </div>
            </div>



        </div>
    )
}
