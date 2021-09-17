import { useState } from "react/cjs/react.development";
import { NavigationBar } from "./NavigationBar";
import { SideMenu } from "./SideMenu";

const List = ({contacts}) => {
    return (
        <div className="content">
            <table className="contact-list">
                <tr className="contact-list-head">
                    <th>Name</th>
                    <th>Phone number</th>
                    <th>Email</th>
                </tr>
                {
                    contacts.length === 0 ? <p>no contact</p> :
                    contacts.map((contact) => 
                    <tr className="contact-list-record">
                        <td>{contact.fName + " " + contact.lName}</td>
                        <td>{contact.mNum}</td>
                        <td>{contact.email}</td>
                    </tr>
                    )
                }

            </table>
        </div>
    )
}

const Edit = ({contact}) => {


    return (
        <form className="contact-form">
            <button type="submit">save</button>

            <div class="avatar">
            <button type="button">+</button>
            </div>

            <div class="keyInfo">
            <div class="name">
                <input type="text" placeholder="FirstName"/>
                <input type="text" placeholder="LastName"/>
            </div>
            <button type="button">add tag</button>
            <div class="record">
                <label>Home: </label>
                <input type="tel"/>
            </div>
            <div class="record">
                <label>Mobile: </label>
                <input type="tel"/>
            </div>
            </div>

            <div class="Info">
            <div class="record">
                <label>Email: </label>
                <input type="email"/>
            </div>

            <div class="record">
                <label>Job tittle: </label>
                <input type="text"/>
            </div>

            <div class="record">
                <label>Company: </label>
                <input type="text"/>
            </div>

            <div class="record">
                <label>DOB: </label>
                <input type="date"/>
            </div>

            <div class="record">
                <label>Relationship: </label>
                <input type="text"/>
            </div>

            </div>

            <div class="note">
            <label>Notes: </label>
            <textarea id="note" maxlength ="140" placeholder="write something..."></textarea>
            </div>
        </form>
    )
}

export const Contact = () => {
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

    return (
        <div className="three-part-layout">
            <NavigationBar/>
            <SideMenu groups={groups} tab="contact"/>
            <List contacts={contacts}/>
        </div>
    )
}