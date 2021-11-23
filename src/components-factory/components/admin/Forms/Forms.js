import React, { useState } from 'react'
import axios from 'axios';
import {
    Button,
    TextField,
    Grid,
    Paper,
    AppBar,
    Typography,
    Toolbar,
    Link,
} from "@material-ui/core";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Forms() {
    // set initial values for form elements
    const formElementsDefaults = {
        religion: "",
        city: "",
        caste: "",
        profession: ""
    }

    // useState hook to set values of form elements
    const [formElements, setFormElements] = useState(formElementsDefaults)
    const forms = ["Religion", "City", "Caste", "Profession", "Product Category", "Product Brand", "Manufacturer"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormElements({
            ...formElements,
            [name]: value
        })
    }

    function handleFormSubmit(formId, e) {
        e.preventDefault();
        const data = {
            'cat': formId,
            'data': formElements[formId]
        }


        let result = axios.post("http://127.0.0.1:8000/admin/add/", data, {
            headers: {
                "Content-type": "application/json",
            }
        })
            .then((res) => {
                console.log('result', res, "target=", e.target, "value=", formElements[formId])
                e.target.reset();
                //  <ToastContainer/>
                toast.success(`${formId} added successfully `, {
                    position: "top-right",
                    autoClose: 15000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,

                });


            })
            .catch((error) => {
                console.log(error.response)
                toast.error(`${formId} Could not be Added.`, {
                    position: "top-right",
                    autoClose: 15000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,

                });

            })

    }
    
    const singleForm = forms.map((formElement) => {
        return (
            <div className="dashboardContent__formContainer">
                <form id={formElement} onSubmit={e => {
                    e.preventDefault()
                    handleFormSubmit(formElement, e)

                }}>
                    <Typography variant="h6">Add {formElement}</Typography>
                    <Grid>
                        <Grid item>
                            <TextField
                                id={formElement}
                                name={formElement}
                                label={formElement}
                                type="text"
                                value={formElements.formElement}
                                onChange={handleChange}
                                sx={{ input: { color: 'white' } }} />
                            <Button variant="contained" color="primary" type="submit" >
                                Add
                            </Button>

                        </Grid>
                    </Grid>

                </form>
            </div>

        )
    }
    )


    return (
        <>
            <div className="forms">

                {singleForm}
                <ToastContainer />

            </div>

        </>


    )
}
