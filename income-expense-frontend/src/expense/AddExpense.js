import axios from 'axios';
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";



function AddExpense() {
    //navigate is used to route to a different page
    let navigate = useNavigate();

    //takes the id number in this pages URL and assigns it the the id variable
    const { id } = useParams()

    //creates a state variable and set funciton, is able to use the current state
    const [name1, setName] = useState("");
    const [cost1, setCost] = useState("");
    const [type1, setType] = useState("");

    //called after an input and assigns the input to a variable, name
    const handlename = (event) => {
        const name = event.target.value;
        setName(name);
    };

    //called after an input and assigns the input to a variable, cost
    const handlecost = (event) => {
        const cost = event.target.value;
        setCost(cost);
    };

    //called after an input and assigns the input to a variable, type
    const handletype = (event) => {
        const type = event.target.value;
        setType(type);
    };

    //called after sumbit and assigns all inputs to userdata
    const submitUser = async (e) => {
        e.preventDefault();
        const userdata = {
            name: name1,
            cost: cost1,
            type: type1,
        };

        //axios makes a post call to the API and passes userdata
        await axios.post(`http://localhost:8080/exp/new/${id}`, userdata)
            .then((result) => {

                console.log(result.data);

            });
        navigate(-1);
    };


    return (

        //Creates container w/ formatting, that holds the text boxes for user input
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Add Expense</h2>

                    {/* When submit button is clicked submitUser is called */}
                    <form onSubmit={submitUser}>

                        {/* Text box for user input w/ formatting, inputs name variable */}
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter name of expense"
                                name="name"
                                onChange={(e) => handlename(e)}
                            />
                        </div>

                        {/* Text box for user input w/ formatting, inputs cost variable */}
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Cost
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter cost of expense"
                                name="cost"
                                onChange={(e) => handlecost(e)}
                            />
                        </div>

                        {/* Text box for user input w/ formatting, inputs type variable */}
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Write:  'daily'  'weekly'  'monthly'  'yearly'  or 'onetime'
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter how often the expense occurs"
                                name="type"
                                onChange={(e) => handletype(e)}
                            />
                        </div>

                        <div>
                            {/* Button that submits inputs */}
                            <button type="submit" className="btn btn-outline-primary my-2">
                                Submit
                            </button>

                            {/* Button that goes back a page without submitting */}
                            <Link className="btn btn-outline-danger mx-2" to={`/profile/${id}`}>
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default AddExpense;