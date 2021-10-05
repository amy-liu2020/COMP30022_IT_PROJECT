// import {
//     Switch,
//     Route,
//     useRouteMatch,
//     useHistory,
//     useParams,
// } from "react-router-dom";
// //import { useEffect, useState } from "react/cjs/react.development";
// import { GetContacts, GetOneContact, CreateContact, EditContact, DeleteOneContact } from "../api";
// import SideMenu from "../common/sideMenu";
// import NavigationBar from "../common/nav";
// import Table from "../common/table";
// import { useForm } from "react-hook-form";
// import Tag from "../common/tag";

// // show all contact records
// const List = () => {
//     const { loading, contacts, error } = GetContacts();

//     if (loading) {
//         return <p>loading</p>;
//     }

//     if (error) {
//         return <p>{error}</p>;
//     }

//     return (
//         <div>
//             <Table tab="contact" data={contacts} option="delete" />
//         </div>
//     );
// };

// // show details of a single contact
// const Detail = ({
//     match: {
//         params: { id },
//     },
// }) => {
//     const { loading, contact, error } = GetOneContact(id);

//     if (loading) {
//         return <p>loading</p>;
//     }

//     if (error) {
//         return <p>{error}</p>;
//     }

//     return (
//         <div>
//             <form>
//                 <button>edit</button>
//                 <button>delete</button>
//                 {Object.keys(contact).map((key) => (
//                     <div>
//                         <label>{key}</label>
//                         <input>{contact[key]}</input>
//                     </div>
//                 ))}
//             </form>
//         </div>
//     );
// };

// // edit details of a single contact
// const Edit = ({
//     match: {
//         params: { id },
//     },
// }) => {
//     const { loading, contact, error } = GetOneContact(id);
//     const {
//         register,
//         handleSubmit,
//         formState: { errors, isDirty },
//     } = useForm({
//         defaultValues: contact,
//     });
//     let history = useHistory();

//     if (loading) {
//         return <p>loading</p>;
//     }

//     if (error) {
//         return <p>{error}</p>;
//     }

//     const onSubmitHandler = (data) => {
//         // If there is any change(s), update change(s)
//         if (isDirty) {
//             EditContact(data);
//         }

//         history.push(`contact/`);
//     };

//     return (
//         <form onSubmit={handleSubmit(onSubmitHandler)}>
//             {Object.keys(contact).map((key) => (
//                 <div>
//                     <label>{key}</label>
//                     <input>{contact[key]}</input>
//                 </div>
//             ))}
//         </form>
//     );
// };

// // create a new contact
// const Create = () => {
//     const { register, handleSubmit } = useForm();
//     let history = useHistory();

//     const contact = {
//         FirName: "",
//         LastName: "",
//         HNum: "",
//         MNum: "",
//         Email: "",
//         Company: "",
//         JobTittle: "",
//         Address: "",
//         Notes: "",
//         Tags: [],
//     };

//     const onSubmitHandler = (data) => {
//         // create contact
//         CreateContact(contact);

//         // if create success, redirect to contact list
//         history.push(`contact/`);
//     };

//     return (
//         <form onSubmit={handleSubmit(onSubmitHandler)}>
//             {Object.keys(contact).map((key) => (
//                 <div>
//                     <label>{key}</label>
//                     <input>{contact[key]}</input>
//                 </div>
//             ))}
//         </form>
//     );
// };

// const Contact = () => {
//     let { path } = useRouteMatch();

//     return (
//         <div className="three-part-layout">
//             <NavigationBar />
//             <SideMenu tab="contact"/>
//             <Switch>
//                 <Route path={`${path}/edit/:id`}>
//                     <p>edit</p>
//                 </Route>
//                 <Route path={`${path}/create`}>
//                     <p>create</p>
//                 </Route>
//                 <Route path={`${path}/:id`}>
//                     <p>detail</p>
//                 </Route>
//                 <Route exact path={path}>
//                     <p>list</p>
//                     <Tag/>
//                 </Route>
//             </Switch>
//         </div>
//     );
// };

import { GetContacts, GetOneContact, CreateContact, EditContact, DeleteOneContact } from "../api";
import { MdAdd } from "react-icons/md";
import { Switch, Route, useRouteMatch, useHistory, useParams} from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import { useForm } from "react-hook-form";
import contacts from "../json/ContactList.json"
import Table from "../common/table";
import SideMenu from "../common/sideMenu";
import NavigationBar from "../common/nav";
import Tag from "../common/tag"

const List = () => {
    
    return (
        <Table tab="contact" data={contacts} option="delete"/>
    )
}

const Detail = () => {
    let history = useHistory();
    let {contactId} = useParams();
    const [contact, setContact] = useState([]);

    // fetch contact from data
    useEffect(() => {
        setContact(contacts[contactId]);
        // console.log(contacts[contactId]);
    }, [contactId])

    return (
        <div className="content">
            <form className="contact-form">
                <button className="detail-edit" type="button" onClick={() => history.push(`/contact/edit/${contactId}`)}>edit</button>
                <div class="form-avatar">
                    <MdAdd id="form-addPhoto" size={50}/>
                </div>
                <div class="form-keyInfo">
                    <div class="form-name">
                        {/* <text type="text" name="fName" maxLength="20" placeholder="FirstName">{contact.FullName.split(' ')[0]}</text>
                        <text type="text" name="lName" maxLength="20" placeholder="LastName">{contact.FullName.split(' ')[1]}</text> */}
                        <text>{contact.FullName}</text>
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
                        <text type="tel" name="mNum">{contact.PhoneNumber}</text>
                    </div>
                </div>
                <div class="form-Info">
                    <div class="form-record">
                        <label>Email: </label>
                        <text type="email" name="email">{contact.Email}</text>
                    </div>

                    <div class="form-record">
                        <label>Job tittle: </label>
                        <text type="text" name="tittle">{contact.JobTitle}</text>
                    </div>

                    <div class="form-record">
                        <label>Company: </label>
                        <text type="text" name="company">{contact.Company}</text>
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
        defaultValues: contacts[contactId]
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
                        {/* <input type="text" placeholder="FirstName" {...register("fName", {pattern: {value: /^[A-Za-z]+$/i, message: "invalid name"}})}/>
                        <input type="text" placeholder="LastName" {...register("lName", {pattern: {value: /^[A-Za-z]+$/i, message: "invalid name"}})}/>
                        {(errors.lName || errors.fName) && <p className="input-error">invalid name</p>} */}
                        <input placeholder="FirstName" {...register("FullName")}/>
                    </div>
                    <Tag tab="contact"/>
                    <div class="form-record">
                        <label>Home: </label>
                        <input type="tel" {...register("hNum", {pattern: {value: /^((\+61\s?)?(\((0|02|03|04|07|08)\))?)?\s?\d{1,4}\s?\d{1,4}\s?\d{0,4}$/gm, message: "incorrect phone number format."}})}/>
                        {/* {errors.hNum && <p className="input-error">{errors.hNum.message}</p>} */}
                    </div>
                    <div class="form-record">
                        <label>Mobile: </label>
                        <input type="tel" {...register("PhoneNumber", {pattern: {value: /^((\+61\s?)?(\((0|02|03|04|07|08)\))?)?\s?\d{1,4}\s?\d{1,4}\s?\d{0,4}$/gm, message: "incorrect phone number format."}})}/>
                        {/* {errors.mNum && <p className="input-error">{errors.mNum.message}</p>} */}
                    </div>
                </div>
                <div class="form-Info">
                    <div class="form-record">
                        <label>Email: </label>
                        <input type="email" {...register("Email", {pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g})}/>
                        {/* {errors.email && <p className="input-error">invalid email format.</p>} */}
                    </div>

                    <div class="form-record">
                        <label>Job tittle: </label>
                        <input type="text" {...register("JobTitle")}/>
                    </div>

                    <div class="form-record">
                        <label>Company: </label>
                        <input type="text" {...register("Company")}/>
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
                    <textarea id="form-noteArea" placeholder="write something..." {...register("Notes")}></textarea>
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

export default Contact;