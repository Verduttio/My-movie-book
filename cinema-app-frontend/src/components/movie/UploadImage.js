import movieService from "../../services/movieService";
import {useEffect} from "react";

export default function UploadImage(props) {
    const {
        posterFileName,
        setPosterFileName,
        changePoster,
        setChangePoster,
        posterImage,
        setPosterImage
    } = props;

    console.log("changePoster: ", changePoster);

    useEffect(() => {
        if(posterImage != null) {
            movieService.uploadPosterImage(posterImage)
                .then(response => {
                    console.log("Poster image uploaded successfully.", response.data);
                    setChangePoster(!changePoster);
                })
                .catch(error => {
                    console.log('An error occurred while uploading the image.', error);
                })
        }
    }, [posterImage]);


    if (changePoster) {
        return (
            <div className={"mb-3"}>
                <input
                    type={"file"}
                    className={"form-control"}
                    id={"file"}
                    onChange={(e) => {
                        setPosterFileName(e.target.files[0].name);
                        setPosterImage(e.target.files[0]);
                    }
                    }
                />
            </div>
        );
    } else {
        return (
            <div className="card mb-3">
                <div>
                    <div className="row">
                        <div className="col-6">
                            <div className="row">
                                <div className="col-3">
                                    <img src={'http://localhost:8080/files/images/temp/' + posterFileName}
                                        // className="img-fluid rounded-start"
                                         alt={posterFileName}
                                         style={{
                                             height: "120px",
                                             width: "auto",
                                             borderRadius: "10px",
                                             paddingRight: "20px"
                                         }}
                                    />
                                </div>
                                <div className="col-9">
                                    <p>Poster: {posterFileName}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <button className={"btn btn-warning"}
                                    style={{
                                        float: "right",
                                        position: "relative",
                                        top: "50%",
                                        transform: "translateY(-50%)"
                                    }}
                                    onClick={(e) => {
                                            setChangePoster(!changePoster);
                                            setPosterImage(null);
                                    }}
                            >Change
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}