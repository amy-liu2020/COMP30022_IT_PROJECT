import { MdAdd } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { useState } from "react/cjs/react.development";
import { Link, useHistory } from "react-router-dom";
import { GetTags, AddTag, DeleteTag } from "../api";

// pop-up that allow user to enter tagName
const PopUp = ({ tagOf, turnOff }) => {
    const [tagName, setTagName] = useState(null);
    const [isPending, setPending] = useState(false);

    // handle the tag creation
    const onSubmitHandler = (e) => {
        e.preventDefault();

        // re-group data
        const tag = {
            tagName: tagName,
            tagOf: tagOf,
        };

        // send data to server
        setPending(true);
        AddTag(tag).then((data) => {
            setPending(false);
            if (data === undefined) {
                alert("error");
            } else {
                alert(data.msg);
            }
        });
    };

    // todo: add styling for pop-up
    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                <input
                    type="text"
                    placeholder="tagName"
                    onChange={(e) => setTagName(e.target.value)}
                />
                <button type="button" onClick={turnOff}>
                    cancel
                </button>
                <button type="submit">
                    {isPending ? "uploading..." : "create"}
                </button>
            </form>
        </div>
    );
};

// for contact, tagOf = 'C'; for meeting, tagOf = 'M'
const SideMenu = ({ tagOf }) => {
    const { tags, loading, error } = GetTags(tagOf);
    const [showPopup, setShowPopup] = useState(false);
    const [pending, setPending] = useState(false);
    const tab = tagOf === "C" ? "contact" : "meeting";
    let history = useHistory();

    // handle the removal of tag
    const onDeleteTagHandler = (tagName) => {

        // re-group data
        const tag = {
            tagName: tagName,
            tagOf: tagOf,
        };

        // send data to server
        setPending(true);
        DeleteTag(tag).then((data) => {
            setPending(false);
            if (data === undefined) {
                alert("error");
            } else {
                alert(data.msg);
            }
        });
    };

    // when tags is loading
    if (loading) {
        return <p>{loading}</p>;
    }

    // error when fail to fetch tags
    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="sideM">
            {showPopup && (
                <PopUp tagOf={tagOf} turnOff={() => setShowPopup(false)} />
            )}
            <button
                className="sideM-create"
                onClick={() => history.push(`/${tab}/create`)}
            >
                <MdAdd />
                create {tab}
            </button>
            {pending ? <p>updating...</p> : tags.map((tag) => (
                <Link className="sideM-group" to={`/${tab}/?tag=${tag.value}`}>
                    {tag.label}
                    <FaTimes onClick={() => onDeleteTagHandler(tag.label)} />
                </Link>
            ))}
            <button
                className="sideM-addGroup"
                onClick={() => setShowPopup(true)}
            >
                add new tag
            </button>
            <button className="sideM-import">import</button>
            <button
                className="sideM-export"
                onClick={() => history.push(`/${tab}/export`)}
            >
                export
            </button>
            <button className="sideM-bin">bin</button>
        </div>
    );
};

export default SideMenu;
