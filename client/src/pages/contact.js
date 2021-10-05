import {
    GetContacts,
    GetOneContact,
    CreateContact,
    EditContact,
    DeleteOneContact,
} from "../api";
import { MdAdd } from "react-icons/md";
import {
    Switch,
    Route,
    useRouteMatch,
    useHistory,
    useParams,
} from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import { useForm } from "react-hook-form";
import contacts from "../json/ContactList.json";
import Table from "../common/table";
import SideMenu from "../common/sideMenu";
import NavigationBar from "../common/nav";
import Tag from "../common/tag";

const List = () => {
    const {contacts, loading, error} = GetContacts();

    if (loading) {
        <p>{loading}</p>
    }

    if (error) {
        <p>{error}</p>
    }

    return <Table tab="contact" data={contacts} option="delete" />;
};

const Detail = () => {
    let history = useHistory();
    let { contactId } = useParams();
    const [contact, setContact] = useState([]);

    // fetch contact from data
    useEffect(() => {
        setContact(contacts[contactId]);
        // console.log(contacts[contactId]);
    }, [contactId]);

    return (
        <div className="content">
            <form className="contact-form">
                <button
                    className="detail-edit"
                    type="button"
                    onClick={() => history.push(`/contact/edit/${contactId}`)}
                >
                    edit
                </button>
                <div class="form-avatar">
                    <MdAdd id="form-addPhoto" size={50} />
                </div>
                <div class="form-keyInfo">
                    <div class="form-name">
                        <text
                            type="text"
                            name="fName"
                            maxLength="20"
                            placeholder="FirstName"
                        >
                            {contact.FirstName}
                        </text>
                        <text
                            type="text"
                            name="lName"
                            maxLength="20"
                            placeholder="LastName"
                        >
                            {contact.LastName}
                        </text>
                    </div>
                    <button type="button">
                        <MdAdd size={15} />
                    </button>
                    <div class="form-record">
                        <label>Home: </label>
                        <text type="tel" name="hNum">
                            {contact.HomeNo}
                        </text>
                    </div>
                    <div class="form-record">
                        <label>Mobile: </label>
                        <text type="tel" name="mNum">
                            {contact.MobileNo}
                        </text>
                    </div>
                </div>
                <div class="form-Info">
                    <div class="form-record">
                        <label>Email: </label>
                        <text type="email" name="email">
                            {contact.Email}
                        </text>
                    </div>

                    <div class="form-record">
                        <label>Job tittle: </label>
                        <text type="text" name="tittle">
                            {contact.JobTitle}
                        </text>
                    </div>

                    <div class="form-record">
                        <label>Company: </label>
                        <text type="text" name="company">
                            {contact.Company}
                        </text>
                    </div>

                    <div class="form-record">
                        <label>DOB: </label>
                        <text name="DOB">
                            {new Date(Date(contact.DOB)).toLocaleDateString()}
                        </text>
                    </div>
                    <div class="form-record">
                        <label>Relationship: </label>
                        <text type="text" name="relation">
                            {contact.Relationship}
                        </text>
                    </div>
                    <div class="form-record">
                        <label>Address: </label>
                        <text type="text" name="address">
                            {contact.Address}
                        </text>
                    </div>
                </div>
                <div class="form-note">
                    <label>Notes: </label>
                    <textarea
                        id="form-noteArea"
                        name="note"
                        value={contact.Notes}
                    ></textarea>
                </div>
            </form>
        </div>
    );
};

const Edit = () => {
    let history = useHistory();
    let { contactId } = useParams();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        criteriaMode: "all",
        defaultValues: contacts[contactId],
    });

    const onSubmit = (data) => {
        console.log(data);
        history.push("/contact");
    };

    return (
        <div className="content">
            <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
                <button type="submit">save</button>
                <div class="form-avatar">
                    <MdAdd id="form-addPhoto" size={50} />
                </div>
                <div class="form-keyInfo">
                    <div class="form-name">
                        <input
                            type="text"
                            placeholder="FirstName"
                            {...register("FirstName", {
                                pattern: {
                                    value: /^[A-Za-z]+$/i,
                                    message: "invalid name",
                                },
                            })}
                        />
                        <input
                            type="text"
                            placeholder="LastName"
                            {...register("LastName", {
                                pattern: {
                                    value: /^[A-Za-z]+$/i,
                                    message: "invalid name",
                                },
                            })}
                        />
                        {/* {(errors.lName || errors.fName) && (
                            <p className="input-error">invalid name</p>
                        )} */}
                    </div>
                    <Tag tab="contact" />
                    <div class="form-record">
                        <label>Home: </label>
                        <input
                            type="tel"
                            {...register("HomeNo", {
                                pattern: {
                                    value: /^((\+61\s?)?(\((0|02|03|04|07|08)\))?)?\s?\d{1,4}\s?\d{1,4}\s?\d{0,4}$/gm,
                                    message: "incorrect phone number format.",
                                },
                            })}
                        />
                        {/* {errors.hNum && <p className="input-error">{errors.hNum.message}</p>} */}
                    </div>
                    <div class="form-record">
                        <label>Mobile: </label>
                        <input
                            type="tel"
                            {...register("MobileNo", {
                                pattern: {
                                    value: /^((\+61\s?)?(\((0|02|03|04|07|08)\))?)?\s?\d{1,4}\s?\d{1,4}\s?\d{0,4}$/gm,
                                    message: "incorrect phone number format.",
                                },
                            })}
                        />
                        {/* {errors.mNum && <p className="input-error">{errors.mNum.message}</p>} */}
                    </div>
                </div>
                <div class="form-Info">
                    <div class="form-record">
                        <label>Email: </label>
                        <input
                            type="email"
                            {...register("Email", {
                                pattern:
                                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                            })}
                        />
                        {/* {errors.email && <p className="input-error">invalid email format.</p>} */}
                    </div>

                    <div class="form-record">
                        <label>Job tittle: </label>
                        <input type="text" {...register("JobTitle")} />
                    </div>

                    <div class="form-record">
                        <label>Company: </label>
                        <input type="text" {...register("Company")} />
                    </div>

                    <div class="form-record">
                        <label>DOB: </label>
                        <input
                            type="date"
                            defaultValue={(new Date(
                                Date(contacts[contactId].DOB)
                            )).toISOString()}
                        />
                    </div>

                    <div class="form-record">
                        <label>Relationship: </label>
                        <input type="text" {...register("Relationship")} />
                    </div>

                    <div class="form-record">
                        <label>Address: </label>
                        <input type="text" {...register("Address")} />
                    </div>
                </div>
                <div class="form-note">
                    <label>Notes: </label>
                    <textarea
                        id="form-noteArea"
                        placeholder="write something..."
                        {...register("Notes")}
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
            <SideMenu tab={"contact"} />
            <Switch>
                <Route path={[`${path}/edit/:contactId`, `${path}/edit`]}>
                    <Edit />
                </Route>
                <Route path={`${path}/:contactId`}>
                    <Detail />
                </Route>
                <Route path={`${path}/export`}>
                    <Table tab="contact" data={contacts} option="export" />
                </Route>
                <Route exact path={path}>
                    <List />
                </Route>
            </Switch>
        </div>
    );
};

export default Contact;
