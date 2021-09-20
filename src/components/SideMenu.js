import { MdAdd } from "react-icons/md"

export const SideMenu = ({groups, tab, createNew}) => {

    return (
        <div className="sideM">
            <div className="sideM-elements">
                <button type="button" id="sideM-create" onClick={() => createNew(1)}><MdAdd/>create {tab}</button>
                {
                    groups.map((group) => <button>{group.name}</button>)
                }
                <button id="sideM-addGroup" type="button">add new group</button>
                <button id="sideM-import" type="button">import</button>
                <button type="button">export</button>
                <button id="sideM-bin" type="button">bin</button>
            </div>
        </div>
    )
}