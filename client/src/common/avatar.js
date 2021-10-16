const Avatar = () => {
    return <div className="nav-avatar">
        <img src={localStorage.getItem("avatar")} alt="profile photo"/>
    </div>;
};

export default Avatar;
