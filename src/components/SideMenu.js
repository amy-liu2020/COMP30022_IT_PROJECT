import { MdAdd } from "react-icons/md"

const groups = [
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

const ContactGroup = () => {
    return (
        <>
            {groups.map((group) => (
                <button type="button"><a href={`#${group.id}`}>{group.name}</a></button>
            ))}
            <br />
        </>
    )
}

export const SideMenu = () => {
    return (
        <div className="sideMenu">
            <button type="button" id="createContact"><MdAdd/>create contact</button>
            <ContactGroup />
            <button type="button">add new group</button>
            <div className="functions">
                <button type="button">import</button>
                <button type="button">export</button>
                <button type="button">bin</button>
            </div>
        </div>
    )
}