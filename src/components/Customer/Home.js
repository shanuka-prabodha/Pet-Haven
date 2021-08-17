import React from "react";
import ManagePets from "../Admin/ManagePets";
import "../../styles/customer.css"
import About from "./About";
import CustomerNav from "./CustomerNav";


export default function Home() {

    return (
        <div>
            <CustomerNav/>
            <div className='image-style'>

            </div>

            <div className="dialog-title" style={{marginBottom: "5%"}}>
                Pets In Our Care
                <hr/>
            </div>
            <div className='customer'>

                <ManagePets user={'cus'}/>
                <About/>
            </div>
        </div>
    )
}