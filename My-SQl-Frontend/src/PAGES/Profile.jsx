import { useEffect, useState } from "react";
import { getUserInfo } from "../API/api";
import Male from '../assets/Male2.png';

const Profile = () => {
    const [loggedUser, setLoggedUser] = useState();

    const fetchUser = async () => {
        try {
            const response = await getUserInfo();
            setLoggedUser(response.loggedUser);
        } catch (error) {
            console.error("Failed to fetch user info:", error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f5f5f5",
        }}>
            <div style={{
                display: "flex",
                backgroundColor: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
                width: "700px",
                maxWidth: "90%",
            }}>
                
                <div style={{
                    flex: 1,
                    backgroundColor: "#eaeaea",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px"
                }}>
                    <img
                        src={Male}
                        alt="Profile"
                        style={{
                            width: "100%",
                            maxWidth: "250px",
                            height: "auto",
                            borderRadius: "10px",
                            objectFit: "cover",
                        }}
                    />
                </div>

                {/* Right: User Info */}
                <div style={{
                    flex: 2,
                    padding: "30px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}>
                    <h2 style={{ marginBottom: "20px" }}>Profile Info</h2>
                    {loggedUser ? (
                        <>
                            <p><strong>Name:</strong> {loggedUser.name}</p>
                            <p><strong>Email:</strong> {loggedUser.email}</p>
                            <p><strong>Admin:</strong> {loggedUser.isAdmin ? 'Yes' : 'No'}</p>
                        </>
                    ) : (
                        <p>Loading user data...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
