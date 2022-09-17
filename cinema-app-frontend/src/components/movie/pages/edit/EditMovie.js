import MovieDataEditBox from "../../MovieDataEditBox";
import {useParams} from "react-router-dom";
import * as React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderUploadMovie from "../../HeaderUploadMovie";


export default function(params) {
    const {id} = useParams();

    return (
        <div className="container">
            <HeaderUploadMovie functionality="Edit movie"/>
            <MovieDataEditBox id={id}/>
        </div>
    );
}