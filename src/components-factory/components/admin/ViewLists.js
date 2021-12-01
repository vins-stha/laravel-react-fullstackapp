import React from 'react'
import { AdminHeader } from './AdminHeader'
import { AdminSideNav } from './AdminSideNav'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'



export default function ViewLists() {

    // save in state the data passed to this url
    const { state } = useLocation()
    const { cat, objects } = state
    const navigate = useNavigate()


    console.log('cat==', cat)
    const tableData = objects !== undefined ?
        objects.map((object, id) => {
            return (
                <tr>
                    <td key={object.id}>{object.id}</td>
                    {
                        cat === "Users" &&
                        (
                            <>
                                <td>{object.fname}</td>
                                <td>{object.lname}</td>
                                <td>{object.email}</td>
                            </>
                        )
                    }
                    {
                        cat === "Admins" &&
                        (
                            <>
                                <td>{object.email}</td>
                            </>
                        )
                    }
                    {
                        cat !== "Users" && cat !== "Admins" &&
                        (
                            <td>{object.name}</td>
                        )
                    }


                    <td>
                        <td>
                            <div name="edit" className="btn btn-primary" onClick={(e) => {
                                e.preventDefault();
                                console.log('name', e.target.name)
                                handleEdit(object.id, cat);
                           
                            }}>Edit
                            </div>
                        </td>
                        <td>
                            <div className="btn btn-danger" onClick={(e) => {
                                e.preventDefault();
                            }}>Delete
                            </div>
                        </td>
                        {
                        cat === "Users" &&
                        (
                            <>
                                <td>
                                <div name="edit" className="btn btn-primary" onClick={(e) => {
                                e.preventDefault();
                            }}>View
                            </div>
                                </td>
                                
                            </>
                        )
                    }

                    </td>
                </tr>

            )
        })
        : "";

    console.log('items ==', objects)

    const handleEdit = (id,cat) => {
        console.log(id, cat)
        let result = axios.get(`http://127.0.0.1:8000/admin/edit/?id=${id}&cat=${cat}`)
        .then((res)=>{
            console.log(res)
            navigate('/admin/edit', {state : {
                id:id,
                cat : cat, 
                obj : res.data  
            }                                         
            });

        })
        .catch((error)=>{
            console.log('error', error.response)
        })

    }
    const handleDelete = () => {

    }
    const handleView = () => {

    }
    return (
        <div>
            <AdminHeader />
            <div className="dashboard flex">
                <div className="dashboardNav">
                    <AdminSideNav />
                </div>
                <div className="dashboardContent">

                    <h1>Contents</h1>

                    <div className="tableView">
                        <table className="table table-dark">
                            <thead>
                                <tr>
                                <th>Id</th>

                                {cat === "Users" && (
                                    <>
                                        <th>FName</th>
                                        <th>LName</th>
                                        <th>Email</th>
                                    </>
                                )
                                }
                                {cat === "Admins" &&
                                    (
                                        <th>Email</th>
                                    )
                                }
                                {
                                    cat !== "Users" && cat !== "Admins" &&
                                    (
                                        <th>Name</th>
                                    )
                                }
                                {cat === "Users" ? ( <th colSpan="3">Actions</th>):( <th colSpan="2">Actions</th>)}
                               
                                </tr>
                            </thead>
                            {tableData}

                        </table>

                    </div>

                </div>
            </div>
        </div>
    )
}
