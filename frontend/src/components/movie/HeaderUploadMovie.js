import {Link} from "react-router-dom";
import * as React from "react";

export default function HeaderUploadMovie(props) {
    return (
        <div id={"top bar"} style={{paddingTop:"20px"}}>
            <span style={{display:"block", float:"left"}}>
                <Link className={"btn btn-primary"} to={"/movies"}>Home page</Link>
            </span>
            <h3 style={{textAlign: "center", paddingTop: "20px"}}>{props.functionality}</h3>
        </div>
    );
}