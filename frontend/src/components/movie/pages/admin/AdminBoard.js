import React, { useState, useEffect } from "react";
import userService from "../../../../services/userService";
import authService from "../../../../services/authService";

const AdminBoard = () => {
    const [usersData, setUsersData] = useState([]);

    const [deletingUserState, setDeletingUserState] = useState(false);

    useEffect(() => {
        userService.getAllUsersSafeData()
            .then(response => {
                setUsersData(response.data);
                console.log("USERS: ", response.data);
            })
            .catch(error => {
                console.log("An error occurred while getting all users' data.", error);
            })
    }, [])

    return (
        <div className={"container"}>
            <table className="table table-striped table-hover">
                <thead className={"thead-dark"}>
                    <tr style={{textAlign: "center"}}>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Roles</th>
                        <th>Delete account</th>
                        <th>Ban user</th>
                    </tr>
                </thead>
                <tbody>
                {
                    usersData.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                {
                                    (user.roles).map(role => (
                                        <p>{role.name}</p>
                                    ))
                                }
                            </td>
                            <td>
                                <button className={"btn btn-danger"} disabled={deletingUserState} onClick={() => {
                                    setDeletingUserState(true);
                                    userService.deleteUser(user.id).then(response => {
                                        window.location.reload();
                                    }).catch(error => {
                                        console.log("An error occurred while deleting user.", error);
                                        setDeletingUserState(false);
                                        alert("Could not delete the user");
                                    });
                                }}>Delete</button>
                            </td>
                            <td>
                                <button className={"btn btn-warning"} onClick={() => {
                                    //implement
                                }}>Ban</button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}

export default AdminBoard;