import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function Home() {

    //creates a state array and set funciton, is able to use the current state
    const [users, setUsers] = useState([])

    //takes the id number in this pages URL and assigns it the the id variable
    const { id } = useParams()

    //runs loadUsers
    useEffect(() => {
        loadUsers();
    }, [])

    //axios makes a get call to the API and gets all user data
    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/user/all")
        setUsers(result.data);
    }

    //axios makes a delete call to the API and deletes a user by id
    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:8080/user/delete/${id}`)
        loadUsers()
    }

    return (

        //Creates container w/ formatting, that holds the buttons and table
        <div className='container'>

            {/* table */}
            <div className='py-4'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Username</th>
                            <th scope="col">Yearly Income</th>
                            <th scope="col">Savings</th>
                            <th scope="col">Savings Goal</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* maps user data to table */}
                        {
                            users.map((user, index) => (
                                <tr>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    {/* <td>{user.id}</td> */}
                                    <td>{user.username}</td>
                                    <td>{user.income}</td>
                                    <td>{user.savings}</td>
                                    <td>{user.savingGoal}</td>
                                    <td>

                                        {/* button that goes to user profile page */}
                                        <Link
                                            className="btn btn-primary mx-2"
                                            to={`/profile/${user.id}`}
                                        >
                                            Profile
                                        </Link>

                                        {/* button that goes to edit user page */}
                                        <Link className="btn btn-outline-primary mx-2"
                                            to={`/edituser/${user.id}`}>Edit</Link>

                                        {/* button that calls deleteUser */}
                                        <button className="btn btn-danger mx-2"
                                            onClick={() => deleteUser(user.id)}
                                        >Delete</button>
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
