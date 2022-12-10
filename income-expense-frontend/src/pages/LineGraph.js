import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import { subDays } from "date-fns";
import {
    XAxis,
    YAxis,
    ResponsiveContainer,
    AreaChart,
    Area,
    Tooltip,
} from "recharts";

export default function LineGraph() {

    //takes the id number in this pages URL and assigns it the the id variable
    const { id } = useParams();

    //creates a state obj and set funciton, is able to use the current state
    const [user, setUser] = useState({
        username: "",
        income: "",
        savings: "",
        savingGoal: "",
    });

    //creates a state array and set funciton, is able to use the current state
    const [data, setData] = useState([])

    //runs loadUser
    useEffect(() => {
        loadUser();
    }, [])

    //runs loadData
    useEffect(() => {
        loadData();
    }, [])

    //axios makes a get call to the API and gets user data by id
    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/user/getById/${id}`);
        setUser(result.data);
    };

    //axios makes a get call to the API and gets expense data by fk
    const loadData = async () => {
        const resultt = await axios.get(`http://localhost:8080/exp/getAll/fk/${id}`)
        setData(resultt.data);
    };

    //variables used in math
    var incomeDaily = user.income / 365
    var savings = user.savings
    var expenseDaily = 0;
    var onetime = 0;

    //loop that divides cost by its occurrance that adds it to expenseDaily
    for (let i = data.length - 1; i >= 0; i--) {
        let tmp = data.at(i);
        if (tmp.type === "onetime") {
            onetime += parseFloat(tmp.cost);
        }
        if (tmp.type === "daily") {
            expenseDaily += parseFloat(tmp.cost);
        }
        if (tmp.type === "weekly") {
            expenseDaily += parseFloat(tmp.cost / 7);
        }
        if (tmp.type === "monthly") {
            expenseDaily += parseFloat(tmp.cost / 30);
        }
        if (tmp.type === "yearly") {
            expenseDaily += parseFloat(tmp.cost / 365);
        }
    }

    //array for data used by graph
    const updata = [];

    //pushes data for first day incuding: savings, onetime expenses, daily expense, and daily income
    updata.push({
        date: subDays(new Date(), 0).toISOString().substr(0, 10),
        amount: Math.round((incomeDaily + savings) - (expenseDaily + onetime))
    })

    //variable that holds the prior days savings
    var tmpAmount = (incomeDaily + savings) - (expenseDaily + onetime)

    //loop pushes the rest of the days data which is determined by: daily income, daily expense, and prior days savings
    for (let i = 1; i < 364; i++) {
        updata.push({
            date: subDays(new Date(), -i).toISOString().substr(0, 10),
            amount: Math.round((incomeDaily - expenseDaily) + tmpAmount)
        })
        tmpAmount += (incomeDaily - expenseDaily)
    }

    return (

        //Creates container w/ formatting, that holds the area graph
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2> Savings Over Time</h2>

                    {/* Area graph from recharts using data from updata */}
                    <div className='py-4'>
                        <ResponsiveContainer width="100%" height={400}>
                            <AreaChart data={updata}>
                                <Area dataKey="amount" />
                                <YAxis dataKey="amount" />
                                <XAxis dataKey="date" />
                                <Tooltip />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Button that goes back a page */}
                    <Link className="btn btn-outline-danger mx-2" to={`/profile/${id}`}>
                        Go Back
                    </Link>
                </div>
            </div>
        </div>
    )
}
