import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {TailSpin} from "react-loader-spinner";
import {resendActivateUser} from "../../store/actions/registration";

const Timer = ({email}) => {
    const dispatch = useDispatch()
    const [start, setStart] = useState(true);
    const status = useSelector(state => state.registration.statusKey);
    const [time, setTime] = useState(60);

    useEffect(() => {
        if (start) {
            let timer = setInterval(() => {
                setTime((time) => {
                    if (time === 0) {
                        clearInterval(timer);
                        setStart(false);
                        return 0;
                    } else return time - 1;
                });
            }, 100);
        }

    }, [start]);

    const timer = () => {
        let minutes = Math.floor(time / 60)
        let seconds = time % 60
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        return `${minutes}:${seconds}`
    }


    return (
        <div className="code-again">
            {status === "ok" ? null : status === "pending" ?
                <TailSpin
                    visible={true}
                    height="70"
                    width="70"
                    color="limegreen"
                    ariaLabel="tail-spin-loading"
                    radius="0"
                    wrapperStyle={{}}
                    wrapperClass="loading"
                />
                :
                time === 0 ?
                    <span className="span-again" onClick={() => {
                        setStart(true)
                        setTime(60)
                        dispatch(resendActivateUser({email}))

                    }}>Wll send the code again.</span> :
                    <span className="span-timer">{timer()}</span>}
        </div>
    );
};

export default Timer;
