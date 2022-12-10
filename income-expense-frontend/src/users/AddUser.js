import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddUser() {

    //navigate is used to route to a different page
    let navigate = useNavigate();

    //creates a state obj and set funciton, is able to use the current state
    const [user, setUser] = useState({
        username: "",
        income: "",
        savings: "",
        savingGoal: "",
    });

    //assings user data username, income, savings, savingGoal
    const { username, income, savings, savingGoal } = user;

    //called after an input and sets the input to user obj
    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    //on submit axios makes a post call to the API and passes user data
    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/user/new", user);
        navigate("/");
    };

    return (
        //Creates container w/ formatting, that holds the text boxes for user input
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Register User</h2>

                    {/* When submit button is clicked onSubmit is called */}
                    <form onSubmit={(e) => onSubmit(e)}>

                        {/* Text box for user input w/ formatting, inputs username variable */}
                        <div className="mb-3">
                            <label htmlFor="Username" className="form-label">
                                Username
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your username"
                                name="username"
                                value={username}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        {/* Text box for user input w/ formatting, inputs income variable */}
                        <div className="mb-3">
                            <label htmlFor="income" className="form-label">
                                Yearly Income
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your yearly income"
                                name="income"
                                value={income}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        {/* Text box for user input w/ formatting, inputs savings variable */}
                        <div className="mb-3">
                            <label htmlFor="Savings" className="form-label">
                                Savings
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your savings"
                                name="savings"
                                value={savings}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        {/* Text box for user input w/ formatting, inputs savingGoal variable */}
                        <div className="mb-3">
                            <label htmlFor="SavingGoal" className="form-label">
                                Savings Goal
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your saving goal"
                                name="savingGoal"
                                value={savingGoal}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        {/* Button that submits inputs */}
                        <button type="submit" className="btn btn-outline-primary">
                            Submit
                        </button>

                        {/* Button that goes back to home */}
                        <Link className="btn btn-outline-danger mx-2" to="/">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}