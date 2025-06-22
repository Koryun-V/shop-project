import React, {useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAddressCard,
    faAngleDown,
    faArrowRightFromBracket,
    faEnvelope,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import Button from "../mini/Button";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {getUser} from "../../store/actions/login";

const Profile = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.login.user)
    const [isProfile, setIsProfile] = useState(false)
    const userRef = useRef(null);
    const statusUser = useSelector(state => state.login.statusUser)


    useEffect(() => {
        dispatch(getUser())
    }, []);

    useEffect(() => {
        const handler = (e) => {
            if (userRef.current && !userRef.current.contains(e.target)) {
                setIsProfile(false);
            }
        };

        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler); // ճիշտ event անունը
        };
    }, []);


    const openProfile = () => {
        setIsProfile(prev => !prev);
    }

    const logOut = () => {
        localStorage.removeItem("token")
        window.location.reload(true)
    }

    return (
        <div ref={userRef} className="user-ref">
            <div className="user" onClick={openProfile}>
                <div className={isProfile ? "user-img-active" : "user-img"}
                     style={{
                         // border: isProfile ? "2px solid limegreen" : "2px solid #d1d1d1",
                     }}>
                    <FontAwesomeIcon icon={faUser} className={isProfile ? "user-icon-active" : "user-icon"}

                    />
                    <FontAwesomeIcon icon={faAngleDown} className={isProfile ? "user-arrow-active" : "user-arrow"}
                                     style={{
                                         transform: isProfile ? "rotate(180deg)" : "none"
                                     }}
                    />
                </div>
            </div>

            {isProfile ?
                <div className="user-func">
                    <ul className="user-func-item">
                        <ul className="user-func-item">
                            {statusUser === "ok" ?
                                <>
                                    <li className="user-modal-item">
                                        {user.avatar[0] ?
                                            <div className="user-avatar">
                                                <img src={user.avatar[0].path} alt="avatar"/>
                                            </div>
                                            :
                                            <div className="user-modal-icon">
                                                <FontAwesomeIcon icon={faUser} className="icon"/>
                                            </div>
                                        }
                                        <span>{user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)} {user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}</span>
                                    </li>
                                    <li>
                                        <div className="profile-modal-icon">
                                            <FontAwesomeIcon icon={faEnvelope} className="icon"/>
                                        </div>
                                        <span>{user.email.charAt(0).toUpperCase() + user.email.slice(1)}</span>
                                    </li>
                                    <li>
                                        <Link to="/user"
                                              className={window.location.pathname === "/user" ? "link-profile-active" : "link-profile"}
                                              onClick={() => setIsProfile(false)}>
                                            <div className="profile-modal-icon">
                                                <FontAwesomeIcon icon={faAddressCard} className="icon"/>
                                            </div>
                                            <span>Profile</span>
                                        </Link>

                                    </li>
                                </>
                                :
                                <>
                                    <li>
                                        <div className="loading-gradient">
                                        </div>
                                    </li>
                                    <li>
                                        <div className="loading-gradient">
                                        </div>
                                    </li>
                                    <li>
                                        <div className="loading-gradient">
                                        </div>
                                    </li>
                                </>}
                        </ul>

                    </ul>

                    <div className="log-out">
                        <div className="button-block">
                            <Button onClick={logOut}
                                    text={<>
                                        <FontAwesomeIcon icon={faArrowRightFromBracket}
                                                         style={{
                                                             marginRight: 7,
                                                         }}/>
                                        Log Out
                                    </>}
                                    type="button"
                                    className="active-button">
                            </Button>

                        </div>
                    </div>

                </div> : null}
        </div>
    );
};

export default Profile;
