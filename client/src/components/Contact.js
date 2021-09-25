import { NavigationBar } from "./NavigationBar";
import { SideMenu } from "./SideMenu";
import { MdAdd } from "react-icons/md";
import { Tag } from "./Tag"
import { Switch, Route, useRouteMatch, useHistory, useParams} from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";


const List = () => {
    let history = useHistory();
    
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
                    <tr className="contact-list-record" onClick={() => {history.push(`/contact/${contact.id}`) }}>
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


const Detail = () => {
    let history = useHistory();
    let {contactId} = useParams();
    const [contact, setContact] = useState([]);

    // fetch contact from data
    useEffect(() => {
        setContact(getOneContact(contactId));
    }, [contactId])


    //   <div>
    //         {contact == null
    //         ? <p>requested id is not exist</p>
    //         : <p>detail page, current contact name is: {contact.fName}</p>}
    //   </div>

    return (
        <div className="content">
            <form className="contact-form">
                <button className="detail-edit" type="button" onClick={() => history.push(`/contact/edit/${contact.id}`)}>edit</button>
                <div class="form-avatar">
                    <MdAdd id="form-addPhoto" size={50}/>
                </div>
                <div class="form-keyInfo">
                    <div class="form-name">
                        <text type="text" name="fName" maxLength="20" placeholder="FirstName">{contact.fName}</text>
                        <text type="text" name="lName" maxLength="20" placeholder="LastName">{contact.lName}</text>
                    </div>
                    <button type="button">
                        <MdAdd size={15}/>
                    </button>
                    <div class="form-record">
                        <label>Home: </label>
                        <text type="tel" name="hNum">{contact.hNum}</text>
                    </div>
                    <div class="form-record">
                        <label>Mobile: </label>
                        <text type="tel" name="mNum">{contact.mNum}</text>
                    </div>
                </div>
                <div class="form-Info">
                    <div class="form-record">
                        <label>Email: </label>
                        <text type="email" name="email">{contact.email}</text>
                    </div>

                    <div class="form-record">
                        <label>Job tittle: </label>
                        <text type="text" name="tittle">{contact.tittle}</text>
                    </div>

                    <div class="form-record">
                        <label>Company: </label>
                        <text type="text" name="company">{contact.company}</text>
                    </div>

                    <div class="form-record">
                        <label>DOB: </label>
                        <text type="date" name="DOB">{contact.DOB}</text>
                    </div>

                    <div class="form-record">
                        <label>Relationship: </label>
                        <text type="text" name="relation">{contact.relation}</text>
                    </div>
                </div>
                <div class="form-note">
                    <label>Notes: </label>
                    <textarea id="form-noteArea" placeholder="write something..." name="note">{contact.note}</textarea>
                </div>
            </form>
        </div>
    )
}


const Edit = () => {
    let history = useHistory();
    let { contactId } = useParams();
    const [contact, setContact] = useState([]);

    const onChangeHandler = (e) => {
        setContact((prevContact) => ({...prevContact, [e.target.name] : e.target.value}))
    }

    // fetch contact from data
    useEffect(() => {
        getOneContact(contactId) !== undefined && setContact(getOneContact(contactId))
    }, [contactId])

    return (
        <div className="content">
            <form className="contact-form">
                <button type="submit" onClick={() => history.goBack()}>save</button>
                <div class="form-avatar">
                    <MdAdd id="form-addPhoto" size={50}/>
                </div>
                <div class="form-keyInfo">
                    <div class="form-name">
                        <input type="text" name="fName" maxLength="20" placeholder="FirstName" onChange={e => onChangeHandler(e)} value={contact.fName}/>
                        <input type="text" name="lName" maxLength="20" placeholder="LastName" onChange={e => onChangeHandler(e)} value={contact.lName}/>
                    </div>
                    <Tag/>
                    <div class="form-record">
                        <label>Home: </label>
                        <input type="tel" name="hNum" onChange={e => onChangeHandler(e)} value={contact.hNum}/>
                    </div>
                    <div class="form-record">
                        <label>Mobile: </label>
                        <input type="tel" name="mNum" onChange={e => onChangeHandler(e)} value={contact.mNum}/>
                    </div>
                </div>
                <div class="form-Info">
                    <div class="form-record">
                        <label>Email: </label>
                        <input type="email" name="email" onChange={e => onChangeHandler(e)} value={contact.email}/>
                    </div>

                    <div class="form-record">
                        <label>Job tittle: </label>
                        <input type="text" name="tittle" onChange={e => onChangeHandler(e)} value={contact.tittle}/>
                    </div>

                    <div class="form-record">
                        <label>Company: </label>
                        <input type="text" name="company" onChange={e => onChangeHandler(e)} value={contact.company}/>
                    </div>

                    <div class="form-record">
                        <label>DOB: </label>
                        <input type="date" name="DOB" onChange={e => onChangeHandler(e)} value={contact.DOB}/>
                    </div>

                    <div class="form-record">
                        <label>Relationship: </label>
                        <input type="text" name="relation" onChange={e => onChangeHandler(e)} value={contact.relation}/>
                    </div>
                </div>
                <div class="form-note">
                    <label>Notes: </label>
                    <textarea id="form-noteArea" maxLength="140" placeholder="write something..." name="note" onChange={e => onChangeHandler(e)} value={contact.note}></textarea>
                </div>
            </form>
        </div>
        
    )
}

// decide which subPage will be render based on path
export const Contact = () => {

    let { path } = useRouteMatch();

    return (
        <div className="three-part-layout">
            <NavigationBar/>
            <SideMenu tab={"contact"}/>
            <Switch>
                <Route path={[`${path}/edit/:contactId`, `${path}/edit`]}>
                    <Edit/>
                </Route>
                <Route path={`${path}/:contactId`}>
                    <Detail/>
                </Route>
                <Route exact path={path}>
                    <List/>
                </Route>
            </Switch>
        </div>
    )
}


// sample contacts data
const contacts = [
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

// if contactId is specified, return single contact with requested id.
// Otherwise, return all contacts
const getOneContact = (contactId) => {
    return contacts.find(({ id }) => id === contactId);
}

// const getAllContact = () => {
//     return contacts;
// }