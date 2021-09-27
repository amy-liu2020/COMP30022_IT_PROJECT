import { NavigationBar } from "./NavigationBar";
import { SideMenu } from "./SideMenu";
import { MdAdd } from "react-icons/md";
import { Switch, Route, useRouteMatch, useHistory, useParams} from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import { useForm } from "react-hook-form";

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
    const { register, formState: { errors }, handleSubmit } = useForm({
        criteriaMode: 'all',
        defaultValues: getOneContact(contactId) !== undefined && getOneContact(contactId)
    });

    const onSubmit = data => {
        console.log(data);
        history.push("/contact");
    }

    return (
        <div className="content">
            <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
                <button type="submit">save</button>
                <div class="form-avatar">
                    <MdAdd id="form-addPhoto" size={50}/>
                </div>
                <div class="form-keyInfo">
                    <div class="form-name">
                        <input type="text" placeholder="FirstName" {...register("fName", {pattern: {value: /^[A-Za-z]+$/i, message: "invalid name"}})}/>
                        <input type="text" placeholder="LastName" {...register("lName", {pattern: {value: /^[A-Za-z]+$/i, message: "invalid name"}})}/>
                        {(errors.lName || errors.fName) && <p className="input-error">invalid name</p>}
                    </div>
                    {/*<Tag setTagText={onChangeHandler}/>*/}
                    <div class="form-record">
                        <label>Home: </label>
                        <input type="tel" {...register("hNum", {pattern: {value: /^((\+61\s?)?(\((0|02|03|04|07|08)\))?)?\s?\d{1,4}\s?\d{1,4}\s?\d{0,4}$/gm, message: "incorrect phone number format."}})}/>
                        {errors.hNum && <p className="input-error">{errors.hNum.message}</p>}
                    </div>
                    <div class="form-record">
                        <label>Mobile: </label>
                        <input type="tel" {...register("mNum", {pattern: {value: /^((\+61\s?)?(\((0|02|03|04|07|08)\))?)?\s?\d{1,4}\s?\d{1,4}\s?\d{0,4}$/gm, message: "incorrect phone number format."}})}/>
                        {errors.mNum && <p className="input-error">{errors.mNum.message}</p>}
                    </div>
                </div>
                <div class="form-Info">
                    <div class="form-record">
                        <label>Email: </label>
                        <input type="email" {...register("email", {pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g})}/>
                        {errors.email && <p className="input-error">invalid email format.</p>}
                    </div>

                    <div class="form-record">
                        <label>Job tittle: </label>
                        <input type="text" {...register("tittle")}/>
                    </div>

                    <div class="form-record">
                        <label>Company: </label>
                        <input type="text" {...register("company")}/>
                    </div>

                    <div class="form-record">
                        <label>DOB: </label>
                        <input type="date" {...register("DOB")}/>
                    </div>

                    <div class="form-record">
                        <label>Relationship: </label>
                        <input type="text" {...register("relation")}/>
                    </div>
                </div>
                <div class="form-note">
                    <label>Notes: </label>
                    <textarea id="form-noteArea" placeholder="write something..." {...register("note")}></textarea>
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
    return contacts.find(({ id }) => id == contactId);
}

// const getAllContact = () => {
//     return contacts;
// }