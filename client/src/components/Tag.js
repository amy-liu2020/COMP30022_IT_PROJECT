import { FaTimes } from "react-icons/fa";
import { MdAdd } from "react-icons/md"
import { useState } from "react/cjs/react.development"

// single tag element
export const Tag = ({setTagText}) => {
    const [status, setStatus] = useState(0);
    const [text, setText] = useState("");

    const onChangeHandler = (e) => {
        setText(e.target.value);
        setTagText(e);
    }

    return (
        <div className="tag">            
            {status !== 0 ? <input autoFocus name="tag" type="text" onBlur={() => setStatus(0)} maxLength={20} onChange={onChangeHandler}/> : 
            (text.length ? <text>{text}<FaTimes onClick={() => setText("")}/></text> : <MdAdd onClick={() => setStatus(1)}/>)}
        </div>
    )
}