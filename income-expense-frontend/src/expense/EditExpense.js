import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditExpense() {
    //navigate is used to route to a different page
    let navigate = useNavigate();

    //takes the id number in this pages URL and assigns it the the id variable
    const { id } = useParams();

    //creates a state obj and set funciton, is able to use the current state
    const [user, setUser] = useState({
        name: "",
        cost: "",
        type: "",
    });

    //assings user data name, cost, type
    const { name, cost, type } = user;

    //called after an input and sets the input to user obj
    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    //runs loadUser
    useEffect(() => {
        loadUser();
    }, []);

    //on submit makes an axios put call to the API, passing updated user data
    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/exp/update/${id}`, user);
        navigate(-1);
    };

    //makes a axios get call to the API, set the data to user obj
    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/exp/getById/${id}`);
        setUser(result.data);
    };

    return (
        //Creates container w/ formatting, that holds the text boxes for user input
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Edit User</h2>

                    {/* When submit button is clicked onSubmit is called */}
                    <form onSubmit={(e) => onSubmit(e)}>

                        {/* Text box for user input w/ formatting, inputs name variable */}
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                Name
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter name of your expense"
                                name="name"
                                value={name}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        {/* Text box for user input w/ formatting, inputs cost variable */}
                        <div className="mb-3">
                            <label htmlFor="cost" className="form-label">
                                Cost
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter cost of your expense"
                                name="cost"
                                value={cost}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        {/* Text box for user input w/ formatting, inputs type variable */}
                        <div className="mb-3">
                            <label htmlFor="type" className="form-label">
                                Occurrence
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter how often the expense occurs"
                                name="type"
                                value={type}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        {/* Button that submits inputs */}
                        <button type="submit" className="btn btn-outline-primary">
                            Submit
                        </button>

                        {/* Button that goes back a page without submitting */}
                        <Link className="btn btn-outline-danger mx-2" to={"/"}>
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}