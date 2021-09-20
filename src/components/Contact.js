import { useState } from "react/cjs/react.development";
import { NavigationBar } from "./NavigationBar";
import { SideMenu } from "./SideMenu";
import { MdAdd } from "react-icons/md";

const List = ({contacts, switchStatus}) => {
    return (
        <div className="content">
            <table className="contact-list">
                <tr className="contact-list-head">
                    <th>Name</th>
                    <th>Phone number</th>
                    <th>Email</th>
                </tr>
                {
                    contacts.length ? 
                    contacts.map((contact) => 
                    <tr className="contact-list-record" onClick={() => switchStatus(2, contact.id)}>
                        <td>{contact.fName + " " + contact.lName}</td>
                        <td>{contact.mNum}</td>
                        <td>{contact.email}</td>
                    </tr>
                    ) : <p>no contact</p>
                }

            </table>
        </div>
    )
}

const Detail = ({contact, switchStatus}) => {
    const [readContact, setContact] = useState(contact != null ? contact : [])

    return (
        <div className="content">
            <form className="contact-form">
                <button type="button" onClick={() => switchStatus(1, readContact.id)}>edit</button>
                <div class="form-avatar">
                    <MdAdd id="form-addPhoto" size={50}/>
                </div>
                <div class="form-keyInfo">
                    <div class="form-name">
                        <text type="text" name="fName" maxLength="20" placeholder="FirstName">{readContact.fName}</text>
                        <text type="text" name="lName" maxLength="20" placeholder="LastName">{readContact.lName}</text>
                    </div>
                    <button type="button">
                        <MdAdd size={15}/>
                    </button>
                    <div class="form-record">
                        <label>Home: </label>
                        <text type="tel" name="hNum">{readContact.hNum}</text>
                    </div>
                    <div class="form-record">
                        <label>Mobile: </label>
                        <text type="tel" name="mNum">{readContact.mNum}</text>
                    </div>
                </div>
                <div class="form-Info">
                    <div class="form-record">
                        <label>Email: </label>
                        <text type="email" name="email">{readContact.email}</text>
                    </div>

                    <div class="form-record">
                        <label>Job tittle: </label>
                        <text type="text" name="tittle">{readContact.tittle}</text>
                    </div>

                    <div class="form-record">
                        <label>Company: </label>
                        <text type="text" name="company">{readContact.company}</text>
                    </div>

                    <div class="form-record">
                        <label>DOB: </label>
                        <text type="date" name="DOB">{readContact.DOB}</text>
                    </div>

                    <div class="form-record">
                        <label>Relationship: </label>
                        <text type="text" name="relation">{readContact.relation}</text>
                    </div>
                </div>
                <div class="form-note">
                    <label>Notes: </label>
                    <textarea id="form-noteArea" placeholder="write something..." name="note">{readContact.note}</textarea>
                </div>
            </form>
        </div>
    )
}

const Edit = ({contact, switchStatus}) => {
    const [editContact, setContact] = useState(contact != null ? contact : [])

    const onChangeHandler = (e) => {
        setContact((prevContact) => ({...prevContact, [e.target.name] : e.target.value}))
    }

    return (
        <div className="content">
            <form className="contact-form">
                <button type="submit" onClick={() => switchStatus(0)}>save</button>
                <div class="form-avatar">
                    <MdAdd id="form-addPhoto" size={50}/>
                </div>
                <div class="form-keyInfo">
                    <div class="form-name">
                        <input type="text" name="fName" maxLength="20" placeholder="FirstName" onChange={e => onChangeHandler(e)} value={editContact.fName}/>
                        <input type="text" name="lName" maxLength="20" placeholder="LastName" onChange={e => onChangeHandler(e)} value={editContact.lName}/>
                    </div>
                    <button type="button">
                        <MdAdd size={15}/>
                    </button>
                    <div class="form-record">
                        <label>Home: </label>
                        <input type="tel" name="hNum" onChange={e => onChangeHandler(e)} value={editContact.hNum}/>
                    </div>
                    <div class="form-record">
                        <label>Mobile: </label>
                        <input type="tel" name="mNum" onChange={e => onChangeHandler(e)} value={editContact.mNum}/>
                    </div>
                </div>
                <div class="form-Info">
                    <div class="form-record">
                        <label>Email: </label>
                        <input type="email" name="email" onChange={e => onChangeHandler(e)} value={editContact.email}/>
                    </div>

                    <div class="form-record">
                        <label>Job tittle: </label>
                        <input type="text" name="tittle" onChange={e => onChangeHandler(e)} value={editContact.tittle}/>
                    </div>

                    <div class="form-record">
                        <label>Company: </label>
                        <input type="text" name="company" onChange={e => onChangeHandler(e)} value={editContact.company}/>
                    </div>

                    <div class="form-record">
                        <label>DOB: </label>
                        <input type="date" name="DOB" onChange={e => onChangeHandler(e)} value={editContact.DOB}/>
                    </div>

                    <div class="form-record">
                        <label>Relationship: </label>
                        <input type="text" name="relation" onChange={e => onChangeHandler(e)} value={editContact.relation}/>
                    </div>
                </div>
                <div class="form-note">
                    <label>Notes: </label>
                    <textarea id="form-noteArea" maxLength="140" placeholder="write something..." name="note" onChange={e => onChangeHandler(e)} value={editContact.note}></textarea>
                </div>
            </form>
        </div>
        
    )
}

export const Contact = () => {
    const [status, setStatus] = useState(0)
    const [selectedContact, setSelectedContact] = useState(null)

    const [contacts, setContacts] = useState(
        [
            {
                id: 1,
                fName: "Haiyao",
                lName: "Yan",
                mNum: "351465315",
                email: "sample@gmail.com"
            },
            {
                id: 2,
                fName: "Jane",
                lName: "Andy",
                mNum: "351465315",
                email: "sample@gmail.com"
            }
        ]
    )
    
    const [groups, setGroups] = useState(
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
    )

    const switchStatus = (statusId, contactId=null) => {
        setStatus(statusId);
        setSelectedContact(contactId);
        console.log(`contactId: ${contactId} statusId: ${statusId}`);
    }

    const display = () => {
        switch (status) {
            case 0:
                return (<List contacts={contacts} switchStatus={switchStatus}/>);
            case 1:
                return (<Edit contact={selectedContact != null ? contacts[selectedContact-1] : null} switchStatus={switchStatus}/>);
            case 2:
                return (<Detail contact={selectedContact != null ? contacts[selectedContact-1] : null} switchStatus={switchStatus}/>);
            default:
                return (<p>error!</p>);
        }
    }

    return (
        <div className="three-part-layout">
            <NavigationBar/>
            <SideMenu groups={groups} tab="contact" createNew={switchStatus}/>
            {display()}
        </div>
    )
}