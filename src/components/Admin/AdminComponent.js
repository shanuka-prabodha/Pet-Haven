import React from "react";
import Form from "./Form";
import ManagePets from "./ManagePets";
import "../../styles/admin.css"
import NavBar from "./NavBar";


export default function AdminComponent() {


    return (
        <div>
            <NavBar/>
            <div className="dialog-title" style={{marginBottom: "5%"}}>
                Pets In Our Care
                <hr/>
            </div>
            <div>
                <Form/>
                <ManagePets/>

            </div>
        </div>
    )
}