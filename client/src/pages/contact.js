import {
    GetContacts,
    GetOneContact,
    DeleteContact,
    CreateContact,
    EditContact,
} from "../api";
import { MdAdd } from "react-icons/md";
import {
    Switch,
    Route,
    useRouteMatch,
    useHistory,
    useParams,
} from "react-router-dom";
import { useState, useMemo, useEffect } from "react/cjs/react.development";
import Table from "../common/table";
import SideMenu from "../common/sideMenu";
import NavigationBar from "../common/nav";
import Tag from "../common/tag";
import Select from "react-select";
import { useForm } from "react-hook-form";

const List = ({ mode }) => {
    const { contacts, loading, error } = GetContacts();

    if (loading) {
        return <p>{loading}</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return <Table tab="contact" data={contacts} option={mode} />;
};

const Detail = () => {
    let { contactId } = useParams();
    let history = useHistory();
    const { contact, loading, error } = GetOneContact(contactId);
    //const [tags, setTags] = useState([]);
    const {
        register,
        reset,
        handleSubmit,
        formState: { isDirty, isSubmitting },
    } = useForm({
        defaultValues: useMemo(() => contact, [contact]),
    });
    const [inputDisable, setInputDisable] = useState(true);

    const onSubmitHandler = (data) => {
        // check if there is any change
        if (isDirty) {
            // send data to server
            EditContact(data, contactId).then((data) => {
                if (data === undefined) {
                    alert("error");
                } else {
                    alert(data.msg);
                    window.location.reload(); // refresh page
                }
            });
        }

        // switch to view mode
        setInputDisable(true);
    };

    const onCancelHandler = () => {
        reset(contact);
        setInputDisable(true);
    };

    const onDeleteHandler = () => {
        // send request to server
        DeleteContact(contactId).then((res) => {
            console.log(res);
        });

        // redirect to list page
        history.push("/contact");
    };

    useEffect(() => {
        reset(contact);
    }, [contact, reset]);

    if (loading || isSubmitting) {
        return <p>loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="content">
            <form
                className="contact-form"
                onSubmit={handleSubmit(onSubmitHandler)}
            >
                <button
                    className="detail-edit"
                    type="button"
                    onClick={() => setInputDisable(false)}
                    hidden={!inputDisable}
                >
                    edit
                </button>
                <button
                    className="detail-edit"
                    type="button"
                    onClick={onCancelHandler}
                    hidden={inputDisable}
                >
                    cancel
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
                            {...register("FirstName")}
                            disabled={inputDisable}
                            required
                        />
                        <input
                            type="text"
                            placeholder="LastName"
                            {...register("LastName")}
                            disabled={inputDisable}
                            required
                        />
                    </div>
                    {/* <Tag tagOf='C' setSelectedOption={setTags} /> */}
                    <div class="form-record">
                        <label>Home: </label>
                        <input
                            type="tel"
                            {...register("HomeNo")}
                            disabled={inputDisable}
                        />
                    </div>
                    <div class="form-record">
                        <label>Mobile: </label>
                        <input
                            type="tel"
                            {...register("MobileNo")}
                            disabled={inputDisable}
                        />
                    </div>
                </div>
                <div class="form-Info">
                    <div class="form-record">
                        <label>Email: </label>
                        <input
                            type="email"
                            {...register("Email")}
                            disabled={inputDisable}
                        />
                    </div>

                    <div class="form-record">
                        <label>Job tittle: </label>
                        <input
                            type="text"
                            {...register("JobTitle")}
                            disabled={inputDisable}
                        />
                    </div>

                    <div class="form-record">
                        <label>Company: </label>
                        <input
                            type="text"
                            {...register("Company")}
                            disabled={inputDisable}
                        />
                    </div>

                    <div class="form-record">
                        <label>DOB: </label>
                        <input
                            type="date"
                            {...register("DOB")}
                            disabled={inputDisable}
                        />
                    </div>

                    <div class="form-record">
                        <label>Relationship: </label>
                        <input
                            type="text"
                            {...register("Relationship")}
                            disabled={inputDisable}
                        />
                    </div>

                    <div class="form-record">
                        <label>Address: </label>
                        <input
                            type="text"
                            {...register("Address")}
                            disabled={inputDisable}
                        />
                    </div>
                </div>
                <div class="form-note">
                    <label>Notes: </label>
                    <textarea
                        id="form-noteArea"
                        placeholder="write something..."
                        {...register("Notes")}
                        disabled={inputDisable}
                    ></textarea>
                </div>
            </form>
        </div>
    );
};

const Create = () => {
    let history = useHistory();

    const {
        register,
        handleSubmit,
        formState: { isDirty },
    } = useForm();

    const onSubmitHandler = (data) => {
        // check if there any input
        if (isDirty) {
            // send data to server
            CreateContact(data).then((res) => alert(res.msg));
        }

        // redirect to list page
        history.push("/contact");
    };

    return (
        <div className="content">
            <form
                className="contact-form"
                onSubmit={handleSubmit(onSubmitHandler)}
            >
                <button type="submit">save</button>
                <div class="form-avatar">
                    <MdAdd id="form-addPhoto" size={50} />
                </div>
                <div class="form-keyInfo">
                    <div class="form-name">
                        <input
                            type="text"
                            placeholder="FirstName"
                            {...register("FirstName")}
                            required
                        />
                        <input
                            type="text"
                            placeholder="LastName"
                            {...register("LastName")}
                            required
                        />
                    </div>
                    {/* <Tag tagOf='C' setSelectedOption={setTags} /> */}
                    <div class="form-record">
                        <label>Home: </label>
                        <input type="tel" {...register("HomeNo")} />
                    </div>
                    <div class="form-record">
                        <label>Mobile: </label>
                        <input type="tel" {...register("MobileNo")} />
                    </div>
                </div>
                <div class="form-Info">
                    <div class="form-record">
                        <label>Email: </label>
                        <input type="email" {...register("Email")} />
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
                        <input type="date" {...register("DOB")} />
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
            <SideMenu tagOf="C" />
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
