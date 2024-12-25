import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Profile.scss";
import newRequest from "../../utils/newRequest";

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMyProfile, setIsMyProfile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      console.log("Fetching user data for:", userId);
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));

      if (currentUser && currentUser._id === userId) {
        setUser(currentUser);
        setIsMyProfile(true);
      } else {
        try {
          const response = await newRequest.get(`/users/${userId}`);
          setUser(response.data);
        } catch (err) {
          console.error("Error retrieving user data:", err);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, [userId]);

  const handleContact = async () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      console.error("No current user found");
      return;
    }

    const sellerId = user.isSeller ? user._id : currentUser._id;
    const buyerId = user.isSeller ? currentUser._id : user._id;
    const conversationId = sellerId + buyerId;

    try {
      // Check if the conversation already exists
      const res = await newRequest.get(`/conversations/single/${conversationId}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response?.status === 404) {
        // If conversation doesn't exist, create a new one
        try {
          const res = await newRequest.post(`/conversations/`, {
            to: user._id,
          });
          navigate(`/message/${res.data.id}`);
        } catch (createError) {
          console.error("Error creating conversation:", createError);
        }
      } else {
        console.error("Error checking conversation:", err);
      }
    }
  };

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <div className="profile-card">
        <div className="profile-header">
          <img
            src={user.img || "/default-profile.png"}
            alt={`${user.username}'s profile`}
            className="profile-img"
          />
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
          {user.isSeller ? (
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
          ) : (
            <div className="profile-row">
              <span className="profile-label">Seller Status</span>
              <span className="profile-value">No Seller</span>
            </div>
          )}
          {isMyProfile ? (
            <div className="profile-row">
              <button
                className="btn-prof"
                onClick={() => navigate("/edit-profile")}
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <div className="profile-row">
              <button className="btn-prof" onClick={handleContact}>
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
