import {
    GetContacts,
    GetOneContact
} from "../api";
import { MdAdd } from "react-icons/md";
import {
    Switch,
    Route,
    useRouteMatch,
    useHistory,
    useParams,
} from "react-router-dom";
import {useState } from "react/cjs/react.development";
import Table from "../common/table";
import SideMenu from "../common/sideMenu";
import NavigationBar from "../common/nav";
import Tag from "../common/tag";

const List = ({ mode }) => {
    const { contacts, loading, error } = GetContacts();

    if (loading) {
        return <p>{loading}</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return <p>hello</p>
    // return <Table tab="contact" data={contacts} option={mode} />;
};

const Detail = () => {
    let { contactId } = useParams();
    const { contact, loading, error } = GetOneContact(contactId);
    const [data, setData] = useState([]);
    const [tags, setTags] = useState([]);
    const [inputDisable, setInputDisable] = useState(true);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(contact);
        setInputDisable(true);
    };

    const onDeleteHandler = () => {
        console.log("delete");
        setInputDisable(true);
    };

    if (loading) {
        return <p>{loading}</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="content">
            <form className="contact-form" onSubmit={onSubmitHandler}>
                <button
                    className="detail-edit"
                    type="button"
                    onClick={() => setInputDisable(!inputDisable)}
                >
                    {inputDisable ? "edit" : "cancel"}
                </button>
                <button
                    className="detail-edit"
                    type="submit"
                    hidden={inputDisable}
                >
                    save
                </button>
                <button
                    className="detail-edit"
                    type="button"
                    onClick={onDeleteHandler}
                    hidden={!inputDisable}
                >
                    delete
                </button>
                <div class="form-avatar">
                    <MdAdd id="form-addPhoto" size={50} />
                </div>
                <div class="form-keyInfo">
                    <div class="form-name">
                        <input
                            type="text"
                            placeholder="FirstName"
                            defaultValue={contact.FirstName}
                            disabled={inputDisable}
                        />
                        <input
                            type="text"
                            placeholder="LastName"
                            defaultValue={contact.LastName}
                            disabled={inputDisable}
                        />
                    </div>
                    {/* <Tag tagOf='C' setSelectedOption={setTags} /> */}
                    <div class="form-record">
                        <label>Home: </label>
                        <input
                            type="tel"
                            defaultValue={contact.HomeNo}
                            disabled={inputDisable}
                        />
                    </div>
                    <div class="form-record">
                        <label>Mobile: </label>
                        <input
                            type="tel"
                            defaultValue={contact.MobileNo}
                            disabled={inputDisable}
                        />
                    </div>
                </div>
                <div class="form-Info">
                    <div class="form-record">
                        <label>Email: </label>
                        <input
                            type="email"
                            defaultValue={contact.Email}
                            disabled={inputDisable}
                        />
                    </div>

                    <div class="form-record">
                        <label>Job tittle: </label>
                        <input
                            type="text"
                            defaultValue={contact.JobTitle}
                            disabled={inputDisable}
                        />
                    </div>

                    <div class="form-record">
                        <label>Company: </label>
                        <input
                            type="text"
                            defaultValue={contact.Company}
                            disabled={inputDisable}
                        />
                    </div>

                    <div class="form-record">
                        <label>DOB: </label>
                        <input
                            type="date"
                            defaultValue={
                                contact.DOB && contact.DOB.slice(0, 10)
                            }
                            disabled={inputDisable}
                        />
                    </div>

                    <div class="form-record">
                        <label>Relationship: </label>
                        <input
                            type="text"
                            defaultValue={contact.Relationship}
                            disabled={inputDisable}
                        />
                    </div>

                    <div class="form-record">
                        <label>Address: </label>
                        <input
                            type="text"
                            defaultValue={contact.Address}
                            disabled={inputDisable}
                        />
                    </div>
                </div>
                <div class="form-note">
                    <label>Notes: </label>
                    <textarea
                        id="form-noteArea"
                        placeholder="write something..."
                        defaultValue={contact.Notes}
                        disabled={inputDisable}
                    ></textarea>
                </div>
            </form>
        </div>
    );
};

const Create = () => {
    let history = useHistory();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        history.push("/contact");
    };

    return (
        <div className="content">
            <form className="contact-form" onSubmit={onSubmitHandler}>
                <button type="submit">save</button>
                <div class="form-avatar">
                    <MdAdd id="form-addPhoto" size={50} />
                </div>
                <div class="form-keyInfo">
                    <div class="form-name">
                        <input type="text" placeholder="FirstName" />
                        <input type="text" placeholder="LastName" />
                    </div>
                    <Tag tab="contact" />
                    <div class="form-record">
                        <label>Home: </label>
                        <input type="tel" />
                    </div>
                    <div class="form-record">
                        <label>Mobile: </label>
                        <input type="tel" />
                    </div>
                </div>
                <div class="form-Info">
                    <div class="form-record">
                        <label>Email: </label>
                        <input type="email" />
                    </div>

                    <div class="form-record">
                        <label>Job tittle: </label>
                        <input type="text" />
                    </div>

                    <div class="form-record">
                        <label>Company: </label>
                        <input type="text" />
                    </div>

                    <div class="form-record">
                        <label>DOB: </label>
                        <input type="date" />
                    </div>

                    <div class="form-record">
                        <label>Relationship: </label>
                        <input type="text" />
                    </div>

                    <div class="form-record">
                        <label>Address: </label>
                        <input type="text" />
                    </div>
                </div>
                <div class="form-note">
                    <label>Notes: </label>
                    <textarea
                        id="form-noteArea"
                        placeholder="write something..."
                    ></textarea>
                </div>
            </form>
        </div>
    );
};

// decide which subPage will be render based on path
export const Contact = () => {
    let { path } = useRouteMatch();

    return (
        <div className="three-part-layout">
            <NavigationBar />
            <SideMenu tagOf='C' />
            <Switch>
                <Route path={`${path}/create`}>
                    <Create />
                </Route>
                <Route path={`${path}/export`}>
                    <List mode="export" />
                </Route>
                <Route path={`${path}/:contactId`}>
                    <Detail />
                </Route>
                <Route exact path={path}>
                    <List mode="delete" />
                </Route>
            </Switch>
        </div>
    );
};

export default Contact;
