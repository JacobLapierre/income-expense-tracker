import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
    PieChart,
    Pie,
    Tooltip,
    BarChart,
    XAxis,
    YAxis,
    Legend,
    CartesianGrid,
    Bar,
} from "recharts";

const Graph = () => {

    //takes the id number in this pages URL and assigns it the the id variable
    const { id } = useParams();

    //creates a state array and set funciton, is able to use the current state
    const [data, setData] = useState([]);

    //runs getData
    useEffect(() => {
        getData()
    }, []);

    //axios makes a get call to the API, gets expense data for a fk
    const getData = async () => {
        const result = await axios.get(`http://localhost:8080/exp/getAll/fk/${id}`)
        setData(result.data)
        console.log(result.data)
    }
    return (
        <div className="Container">

            {/* Pie chart useing recharts w/ formatting, uses cost data */}
            <PieChart width={400} height={400}>
                <Pie

                    dataKey="cost"
                    isAnimationActive={false}
                    data={data}
                    cx={200}
                    cy={200}
                    outerRadius={80}
                    fill="#50a22a"
                    label />
                <Tooltip />
            </PieChart>

            {/* Bar chart useing recharts w/ formatting, uses cost data */}
            <BarChart
                width={700}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 80,
                    bottom: 5,
                }}
                barSize={20}
            >
                <XAxis
                    dataKey="name"
                    padding={{ left: 10, right: 10 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="cost" fill="#50a22a" background={{ fill: "#eee" }} />
            </BarChart>

            {/* Button that goes back a page */}
            <Link className="btn btn-outline-danger mx-2" to={`/profile/${id}`}>
                Go Back
            </Link>
        </div>
    );
};
export default Graph;