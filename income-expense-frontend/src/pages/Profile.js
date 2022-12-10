import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewUser() {

    //creates a state obj and set funciton, is able to use the current state
    const [user, setUser] = useState({
        username: "",
        income: "",
        savings: "",
        savingGoal: "",
    });

    //takes the id number in this pages URL and assigns it the the id variable
    const { id } = useParams();

    //runs loadUser
    useEffect(() => {
        loadUser();
    }, []);

    //axios makes a get call to the API and gets user data by id and sets it to user obj
    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/user/getById/${id}`);
        setUser(result.data);
    };

    return (
        //Creates container w/ formatting, that holds the text boxes for user input
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Profile</h2>

                    {/* displays data from user obj */}
                    <div className="card">
                        <div className="card-header">
                            <b>ID #: </b> {user.id}
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <b>Username: </b>
                                    {user.username}
                                </li>
                                <li className="list-group-item">
                                    <b>Yearly Income: </b>$
                                    {user.income}
                                </li>
                                <li className="list-group-item">
                                    <b>Savings: </b>$
                                    {user.savings}
                                </li>
                                <li className="list-group-item">
                                    <b>Savings Goal: </b>$
                                    {user.savingGoal}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="container">
                    </div>

                    {/* button that links to bargraph page */}
                    <Link className="btn btn-primary mx-1 my-2" to={`/bargraph/${id}`}>
                        Expense Charts
                    </Link>

                    {/* button that links to linegraph page */}
                    <Link className="btn btn-primary mx-1 my-2" to={`/linegraph/${id}`}>
                        Saving Over Time
                    </Link>

                    {/* button that links to expense page */}
                    <Link className="btn btn-outline-dark mx-1" to={`/viewexpense/${id}`}>
                        Expenses
                    </Link>
                </div>
            </div>
        </div>
    );
}