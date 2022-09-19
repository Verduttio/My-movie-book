import movieService from "../../services/movieService";

export default function UploadImage(props) {
    const {posterFileName, changedImage, chooseImage, changePoster} = props;


    if (changePoster) {
        return (
            <div className={"mb-3"}>
                <input
                    type={"file"}
                    className={"form-control"}
                    id={"file"}
                    onChange={(e) => {
                        chooseImage(e.target.files[0].name, e.target.files[0]);
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
                                        changedImage(!changePoster, null);
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