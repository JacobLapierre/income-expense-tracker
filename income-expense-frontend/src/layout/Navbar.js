import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div>
            {/* navbar is on top for use on every page */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">

                    {/* links to homepage */}
                    <Link className="navbar-brand" to="/">
                        Make Money Charts - Home Page
                    </Link>

                    {/* links to add user page */}
                    <Link className="btn btn-outline-light" to="/adduser">
                        Add User
                    </Link>
                </div>
            </nav>
        </div>
    );
}