import { MdAdd } from "react-icons/md"
import { useEffect, useState } from "react/cjs/react.development";
import { Link, useHistory } from "react-router-dom";

// Side menu with allow user to view records within selected group (default is all),
// create a new group/contact/meeting, import/export/delete records.
export const SideMenu = ({tab}) => {
    let history = useHistory();
    const [groups, setGroups] = useState([]); // groups that shown in sideMenu

    // determine which tab is the sideMenu under
    useEffect(() => {
        tab === "contact" 
        ? setGroups(contactGroups)
        : setGroups(meetingGroups)
    }, [tab])

    return (
        <div className="sideM">
            <button className="sideM-create" onClick={() => history.push(`/${tab}/create`)}><MdAdd/>create {tab}</button>
            {groups.map((group) => <Link className="sideM-group" to={`/${tab}?group=${group.name}`}>{group.name}</Link>)}
            <button className="sideM-addGroup">add new group</button>
            <button className="sideM-import">import</button>
            <button className="sideM-export">export</button>
            <button className="sideM-bin">bin</button>
        </div>
    )
}


// sample groups for contacts
var contactGroups = 
[
    {
        id: 1,
        name: "all"
    },
    {
        id: 2,
        name: "family"
    },
    {
        id: 3,
        name: "friend"
    }
]

// sample groups for meetings
var meetingGroups = 
[
    {
        id: 1,
        name: "all"
    },
    {
        id: 2,
        name: "formal"
    },
    {
        id: 3,
        name: "casual"
    }
]