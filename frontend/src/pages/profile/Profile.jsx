import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Profile.scss";
import newRequest from "../../utils/newRequest";

const Profile = ({ currentUser }) => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isMyProf,setIsMyProf] = useState(false);
  useEffect(() => {
    const fetchUserData = async () => {
      console.log("Fetching user data for:", userId);
      let userData;

      if (userId) {
        userData = await getUserDataById(userId);
      } else {
        setIsMyProf(true);
        const storedUser = localStorage.getItem("currentUser");
        userData = storedUser ? JSON.parse(storedUser) : null;
      }

      console.log("Fetched user data:", userData);
      setUser(userData);
      setLoading(false);
    };

    fetchUserData();
  }, [userId]);

  const getUserDataById = async (userId) => {
    try {
      const response = await newRequest.get(`/users/${userId}`);
      return response.data;
    } catch (err) {
      console.error("Error retrieving user data:", err);
      throw err;
    }
  };

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <div className="profile-card">
        <div className="profile-header">
          <img src={user.img} alt={`${user.username}'s profile`} className="profile-img" />
          <h2 className="profile-name">{user.username}</h2>
        </div>
        <div className="profile-details">
          <div className="profile-row">
            <span className="profile-label">Username</span>
            <span className="profile-value">{user.username}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Email</span>
            <span className="profile-value">{user.email}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">City</span>
            <span className="profile-value">{user.country}</span>
          </div>
          {user.isSeller && (
            <>
              <div className="profile-row">
                <span className="profile-label">Seller Status</span>
                <span className="profile-value">Seller</span>
              </div>
              <div className="profile-row">
                <span className="profile-label">Description</span>
                <span className="profile-value">{user.desc || "No description"}</span>
              </div>
            </>
          )}
          {!user.isSeller && (
            <div className="profile-row">
              <span className="profile-label">Seller Status</span>
              <span className="profile-value">No Seller</span>
            </div>
          )}
          {isMyProf && (
            <div className="profile-row">
              <button className="btn-prof" onClick={() => navigate('/edit-profile')}>
                Edit Profile
              </button>
            </div>
          )}
          {!isMyProf && (
            <div className="profile-row">
              <button className="btn-prof" onClick={() => navigate('/messages')}>
                Message
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
