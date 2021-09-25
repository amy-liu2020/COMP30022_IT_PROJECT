import { FaTimes } from "react-icons/fa";
import { MdAdd } from "react-icons/md"
import { useState } from "react/cjs/react.development"


export const Tag = () => {
    const [status, setStatus] = useState(0);
    const [text, setText] = useState("");

    return (
        <div className="tag">            
            {status !== 0 ? <input autoFocus type="text" onBlur={() => setStatus(0)} maxLength={20} onChange={e => setText(e.target.value)}/> : 
            (text.length ? <text>{text}<FaTimes onClick={() => setText("")}/></text> : <MdAdd onClick={() => setStatus(1)}/>)}
        </div>
    )
}