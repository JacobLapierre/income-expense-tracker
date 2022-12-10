import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewExpenses() {

    //takes the id number in this pages URL and assigns it the the id variable
    const { id } = useParams()

    //creates a state array and set funciton, is able to use the current state
    const [users, setUsers] = useState([])

    //runs loadExpense
    useEffect(() => {
        loadExpense();
    }, [])

    //makes a axios get call to the API, set the data to users array
    const loadExpense = async () => {
        const result = await axios.get(`http://localhost:8080/exp/getAll/fk/${id}`)
        setUsers(result.data);
    };

    //makes a axios delete call to the API, delete expense by id
    const deleteExpense = async (id) => {
        await axios.delete(`http://localhost:8080/exp/delete/${id}`)
        loadExpense()
    };

    return (

        //Creates container w/ formatting, that holds the buttons and table
        <div className='container'>
            <div className="row">
                <div className="col-md-6 offset-md-3 rounded p-4 mt-2">

                    {/* Button that goes back a page */}
                    <Link
                        className="btn btn-primary mx-2" to={`/profile/${id}`}>
                        Go Back
                    </Link>

                    {/* Button that goes to the add expense page */}
                    <Link className="btn btn-outline-dark mx-2" to={`/addexpense/${id}`}>
                        Add Expense
                    </Link>
                </div>
            </div>

            {/* table */}
            <div className='py-4'>
                <table className="table">

                    {/* column titles */}
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Expense</th>
                            <th scope="col">Cost</th>
                            <th scope="col">Occurrence</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* map user data to columns */}
                        {
                            users.map((user, index) => (
                                <tr>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    {/* <td>{user.id}</td> */}
                                    <td>{user.name}</td>
                                    <td>{user.cost}</td>
                                    <td>{user.type}</td>
                                    <td>

                                        {/* button that links to edit expense page */}
                                        <Link className="btn btn-outline-primary mx-2"
                                            to={`/editexpense/${user.id}`}>Edit</Link>

                                        {/* button that calls deleteExpense */}
                                        <button className="btn btn-danger mx-2"
                                            onClick={() => deleteExpense(user.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )

}

