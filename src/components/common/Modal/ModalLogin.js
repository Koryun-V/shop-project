import React, {useCallback, useEffect, useState} from 'react';
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {
    forgotPasswordUser,
    loginUser,
    setEmail,
    setIsOpenLogin,
    setStatus, setStatusCode,
    setStatusForgot
} from "../../../store/actions/login";
import Input from "../../mini/Input";

import Button from "../../mini/Button";
import {ReactComponent as Close} from "../../../assets/icon/close-x.svg"
import _ from "lodash";
import {useNavigate} from "react-router-dom";
import bg from "../../../assets/background/login.jpg"
import ModalNewPassword from "./ModalNewPassword";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCommentDots, faMobileScreenButton} from "@fortawesome/free-solid-svg-icons";
import {setDeleteEmail} from "../../../store/actions/registration";
import {clearRedirectPath} from "../../../store/slices/authRedirect";


const fields = [
    {
        id: 1,
        name: "email",
        label: "E-mail",
        validation: /^[^\s@]+@[a-zA-Z]+\.[a-zA-Z]+$/,
        info: "Please enter correct e-mail.",
    },
    {
        id: 2,
        name: "password",
        label: "Password",
    },
]


function ModalLogin({open, onClose}) {
    const dispatch = useDispatch();
    const status = useSelector(state => state.login.status)
    const statusForgot = useSelector(state => state.login.statusForgot)
    const token = useSelector(state => state.login.token)
    const [isLogin, setIsLogin] = useState(false)
    const navigate = useNavigate()
    const [inputName, setInputName] = useState([]);
    const [isForgot, setIsForgot] = useState(false)
    const [isForgotPassword, setIsForgotPassword] = useState(false)
    const statusEmail = useSelector(state => state.login.emailError)
    const [isTest, setIsTest] = useState(true)
    const statusPassword = useSelector(state => state.login.statusNewPassword)
    const [userInfo, setUserInfo] = useState({
        value: "",
        title: ""
    })
    const {value, title} = userInfo

    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const redirectPath = useSelector(state => state.authRedirect.path); // ավելացրու


    const {email, password} = user

    const scrollModal = () => {
        document.body.style.removeProperty('overflow');
        document.body.style.removeProperty('width');
        document.body.ontouchmove = () => true;
        window.removeEventListener("keydown", handleEsc)
    }

    useEffect(() => {
        inputName.forEach((item) => {
            if (item === title && value.length) {
                test()
            }
        })
        if (email && password && !inputName.length && !isForgot) {
            setIsLogin(true)
        } else if (isForgot && email && !inputName.length) {
            setIsForgotPassword(true)
        } else {
            setIsLogin(false)
            setIsForgotPassword(false)

        }
    }, [user, inputName.length, isForgot]);

    const handleEsc = useCallback((event) => {
        if (event.keyCode === 27) {
            onClose();
        }
    }, []);


    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
            dispatch(setIsOpenLogin(false));
            if (redirectPath) {
                navigate(redirectPath);
                dispatch(clearRedirectPath());
                window.location.reload(true);
            }
            else{
                window.location.reload(true);
            }
        }
    }, [token]);

    useEffect(() => {
        if (statusPassword === "ok") {
            setIsForgot(false);
            dispatch(setStatusForgot(""))
            dispatch(setEmail(""))
        }
    }, [statusPassword]);

    useEffect(() => {
        if (open) {
            (async () => {
                try {
                    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
                    // document.body.style.width = `${document.body.getBoundingClientRect().width}px`;
                    document.body.style.overflowY = 'hidden';
                    document.body.ontouchmove = () => false;
                    window.addEventListener('keydown', handleEsc);
                    const header = document.querySelector('.nav-header');
                    const main = document.querySelector('.main');
                    const footer = document.querySelector('.footer');

                    if (header) {
                        header.style.paddingRight = `${scrollbarWidth}px`;
                    }
                    if (main) {
                        main.style.paddingRight = `${scrollbarWidth}px`;
                    }
                    if (footer) {
                        footer.style.paddingRight = `${scrollbarWidth}px`;
                    }
                } catch (err) {
                    console.log(err);
                }
            })();
        } else {
            scrollModal();
            setIsForgot(false);
            setUser({email: "", password: ""});
            setInputName([]);
            setUserInfo({title: "", value: ""});
            dispatch(setStatusCode(""));
            dispatch(setStatusForgot(""));
            dispatch(setEmail(""));
            dispatch(setDeleteEmail(false));
            setIsTest(true);

            const header = document.querySelector('.nav-header');
            const main = document.querySelector('.main');
            const footer = document.querySelector('.footer');
            if (header) {
                header.style.paddingRight = '';
            }
            if (main) {
                main.style.paddingRight = '';
            }
            if (footer) {
                footer.style.paddingRight = '';
            }
        }
    }, [open]);


    const onChange = (event) => {

        let v = event.target.value
        let n = event.target.name

        setUser((prevState) => (
            {...prevState, [event.target.name]: event.target.value}
        ))
        setUserInfo({value: v, title: n})
        if (status === "error") dispatch(setStatus(""))
        if (statusForgot === "error") dispatch(setStatusForgot(""))

    }
    const test = () => {
        if (isTest) {
            let newInputName = [...inputName];
            fields.forEach(({validation, name}) => {
                if (name === title) {
                    let isValid = true;
                    if (name === "email") {
                        isValid = validation ? validation.test(value) : true;
                    }
                    if (!isValid || !value.length) {
                        if (!newInputName.includes(name)) {
                            newInputName.push(name);
                        }
                    } else {
                        newInputName = newInputName.filter(item => item !== name);
                    }
                }
            });
            setInputName(_.uniq(newInputName));
            return newInputName.length > 0;
        }
    };


    const login = (e) => {
        e.preventDefault();
        const hasErrors = test();
        if (hasErrors) {
            return;
        }
        if (email && password) {
            dispatch(loginUser({email, password}))
        }
    }
    const getForgotPassword = (e) => {
        e.preventDefault();
        const hasErrors = test();
        if (hasErrors) {
            return;
        }
        if (isForgotPassword) {
            dispatch(setEmail(email))
            dispatch(forgotPasswordUser({email}))
        }
    }


    const forgotPassword = () => {
        setIsForgot(true);
        setUser({
            email: "",
            password: ""
        })
        setInputName([])
        setUserInfo({
            title: "",
            value: "",
        })
    }


    if (!open) return null
    return ReactDom.createPortal(
        <div id="modal">
            <div className="shadow">
            </div>
            <div id="modal_window">
                <div className="close">
                    <div className="title">
                        <span>{statusPassword === "error" ? "Notification" : isForgot ? "Reset password" : "LOGIN"}</span>
                    </div>
                    <div className="close-block" onClick={onClose}
                         onMouseEnter={() => setIsTest(false)}
                         onMouseLeave={() => setIsTest(true)}>
                        <Close className="icon"/>
                    </div>
                </div>
                <div className="modal-block">
                    <div className="container-modal">
                        {!isForgot ?
                            <>
                                <div className="background-login ">
                                    <img src={bg}/>
                                </div>
                                <div className="container-form">
                                    <form onSubmit={login}>
                                        {fields.map((field) => (
                                            <div key={field.id} className="login">
                                                <div style={{
                                                    height: "50px",
                                                }}>
                                                    <Input
                                                        name={field.name}
                                                        className="input"
                                                        {...field}
                                                        onBlur={test}
                                                        onChange={onChange}
                                                        value={user[field.name]}
                                                        // type={field.name === "password" && eye === faEyeSlash ? "password" : "text"}
                                                        id={field.id}
                                                        label={field.label}
                                                        classNameLabel={user[field.name].length ? "active" : "label"}
                                                        status={status}
                                                    />
                                                </div>

                                                <div className="validation-info-login">
                                                    {field.name === "email" ?
                                                        <>
                                                            {inputName.includes(field.name) ?
                                                                <span>{field.info}</span> : null}
                                                        </>
                                                        : status === "error" ?
                                                            <span>Wrong login or password.</span>
                                                            : null}
                                                </div>
                                            </div>
                                        ))}

                                        <div className="forgot-block">
                                            <span onClick={forgotPassword}>Forgot password ?</span>
                                        </div>
                                        <div className="form-button-block" style={{marginTop: 20}}>
                                            <Button status={status} text="LOGIN" type={isLogin ? "submit" : "button"}
                                                    className={isLogin && status !== "pending" ? "active-button"
                                                        : isLogin && status === "pending" ? "pending-button" : "disabled"}>Text</Button>
                                        </div>
                                        <div className="register-now">
                                            <div className="text">
                                                <div className="line"></div>
                                                <span>Don't have an account ?</span>
                                                <div className="line"></div>

                                            </div>

                                            <div className="form-button-block">
                                                <Button
                                                    onClick={() => {
                                                        dispatch(setIsOpenLogin(false))
                                                        navigate("/register")
                                                    }}
                                                    text="REGISTER-NOW" className="register-button"
                                                    type="button">
                                                </Button>
                                            </div>

                                        </div>
                                    </form>
                                </div>

                            </>
                            : statusForgot !== "ok" ?
                                <div className="container-form">
                                    <form onSubmit={getForgotPassword}>
                                        <div className="login">
                                            <div style={{
                                                height: "50px",
                                            }}>
                                                <Input
                                                    name={fields[0].name}
                                                    maxLength={fields[0].maxLength}
                                                    onBlur={test}
                                                    className="input"
                                                    onChange={onChange}
                                                    value={user[fields.name]}
                                                    id={fields[0].id}
                                                    autoComplete="off"
                                                    label={fields[0].label}
                                                    classNameLabel={user[fields[0].name].length ? "active" : "label"}
                                                    status={statusForgot}
                                                />
                                            </div>

                                            <div className="validation-info-login">
                                                {statusForgot === "error" ?
                                                    <span>{statusEmail}</span>
                                                    :
                                                    inputName[0] === "email" ?
                                                        <span>{!email.length ? "Field Required" : fields[0].info}</span> : null}
                                            </div>
                                        </div>

                                        <div className="form-button-block">
                                            <Button status={statusForgot} text="RECEIVE CODE"
                                                    className={isForgotPassword && statusForgot !== "pending" ? "active-button"
                                                        : isForgotPassword && statusForgot === "pending" ? "pending-button" : "disabled"}
                                                    type={isForgotPassword ? "submit" : "button"}>
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                                :
                                statusPassword !== "error" ?
                                    <ModalNewPassword/>
                                    :
                                    <div className="no-correct">
                                        <div className="message">
                                            <FontAwesomeIcon icon={faMobileScreenButton} className="icon"/>
                                            <FontAwesomeIcon icon={faCommentDots} className="icon-message"/>
                                        </div>

                                        <span>The six-digit code does not match!</span>

                                    </div>


                        }

                    </div>

                </div>
            </div>
        </div>,
        document.body
    )
        ;
}

ModalLogin.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    wrapperClassName: PropTypes.string,
    className: PropTypes.string,
    backdropBG: PropTypes.string,
    zIndex: PropTypes.number,
    overflowY: PropTypes.bool,
};

export default ModalLogin;
