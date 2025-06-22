import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {activateUser, setStatusKey} from "../../store/actions/registration";


const PinInput = () => {
    const dispatch = useDispatch();
    const [code, setCode] = useState(new Array(6).fill(""));
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const inputRef = Array.from({length: code.length}, (_, i) => useRef())
    const [id, setId] = useState(0)
    const [isFormat, setIsFormat] = useState(false);
    const status = useSelector(state => state.registration.statusKey)


    useEffect(() => {
        if (code[0] && code[1] && code[2] && code[3] && code[4] && code[5]) {
            dispatch(activateUser({key: code.join("")}))
        }
    }, [code]);

    useEffect(() => {
        if (status === "error") {
            inputRef[5].current.focus();
        }
    }, [status]);

    const onChange = (e, i) => {
        if (status === "error") {
            dispatch(setStatusKey(""))
        }
        setIsFormat(false)
        setId(i)
        // if (isNaN(e.target.value)) return false
        setCode([...code.map((data, index) => (index === i ? e.target.value : data))])
        if (e.target.value && i !== 5) {
            inputRef[i + 1].current.focus()
        }
    }


    const onKeyDown = (e, i) => {
        if (e.keyCode === 8 && i !== 0 && code[i] === "") {
            inputRef[code[5] === "" || code[i] === "" ? i - 1 : i].current.focus()
        }
    }

    const formatNumber = (e, i) => {
        if (isNaN(e.key)) return false

        if (code[i] !== "" && isFormat || i === 5) {
            setCode([...code.slice(0, i), e.key, ...code.slice(i + 1)])
            inputRef[i !== 5 ? i + 1 : i].current.focus()
        }
    }
    return (

        <div className="pin-input">
            {code.map((data, i) => (
                <input key={i}
                    onKeyPress={(e) => formatNumber(e, i)}
                    onBlur={() => setId("")}
                    onClick={() => setIsFormat(true)}
                    onFocus={() => setId(i)}
                    disabled={status === "pending" || status === "ok"}
                    maxLength={1}
                    ref={inputRef[i]}
                    onChange={(e) => onChange(e, i)}
                    value={data}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    autoFocus={i === 0 || status === "error"}
                    style={{
                        transition: status === "error" || status === "ok" ? "0.5s" : "0s",

                        border: status === "ok" ? "2px solid #00d143" :
                            id === i && status !== "error"
                            || code[i] !== "" && status !== "error"
                                ? "2px solid black" :
                                status === "error" ? "2px solid red" :
                                    id ?
                                    "1px solid #d1d1d1" : "none",
                    }}
                />
            ))}
        </div>
    );
};

export default PinInput;
