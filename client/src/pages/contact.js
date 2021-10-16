import {
    GetContacts,
    GetOneContact,
    DeleteContact,
    CreateContact,
    EditContact,
    GetContactsByTag,
    GetBinList,
    GetContactsBySearch
} from "../api";
import { MdAdd } from "react-icons/md";
import {
    Switch,
    Route,
    useRouteMatch,
    useHistory,
    useParams,
} from "react-router-dom";
// import { useState, useMemo, useEffect } from "react/cjs/react.development";
import { useState, useMemo, useEffect } from "react";

import SideMenu from "../common/sideMenu";
import NavigationBar from "../common/nav";
import Tag from "../common/tag";
import { useForm } from "react-hook-form";
import Select from "react-select";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import CircularProgress from "@mui/material/CircularProgress";
import { Avatar } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.secondary.main,
        fontSize: 18,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const Div = styled('div')(({ theme }) => ({
    ...theme.typography.h4,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    margin: "auto"
}));

export function BasicTable({ contacts, columns, data}) {
    const [page, setPage] = useState(0);
    const rowsPerPage = 10;
    let history = useHistory();

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - contacts.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <>
        {contacts.length ? (        <div>
            <TableContainer>
                <Table sx={{ minWidth: 400 }} aria-label="simple table">
                    <colgroup>
                        <col width="40%" />
                        <col width="30%" />
                        <col width="30%" />
                    </colgroup>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Phone number</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contacts
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{
                                        "&:hover": {
                                            background: "#ddd",
                                            cursor: "pointer",
                                        },
                                    }}
                                    onClick={() =>
                                        history.push(`/contact/${row._id}`)
                                    }
                                >
                                    <StyledTableCell component="th" scope="row">
                                        {row.FirstName + " " + row.LastName}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {row.MobileNo}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {row.Email}
                                    </StyledTableCell>
                                </TableRow>
                            ))}
                        {emptyRows > 0 && (
                            <TableRow
                                style={{
                                    height: 53 * emptyRows,
                                }}
                            >
                                <StyledTableCell colSpan={3} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={contacts.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
            />
        </div>)
        : (<Div>no record found.</Div>)}
        </>

    );
}

// handle related meetings
const RelatedMeeting = ({ defaultValue }) => {
    const meetingsTest = [
        { value: "hbibhbki", label: "hbibhbki" },
        { value: "hbibhb", label: "hbibhb" },
        { value: "cat", label: "cat" },
    ];

    return (
        <div>
            <Select options={meetingsTest} isMulti={true} />
        </div>
    );
};

// show all active contacts
const ContactAll = () => {
    const { contacts, loading, error } = GetContacts();

    if (loading) {
        return <CircularProgress size={100} />;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return <BasicTable contacts={contacts} />;
};

// show contact with specific tag
const ContactWithTag = () => {
    let { tagName } = useParams();
    const { contacts, loading, error } = GetContactsByTag(tagName);

    if (loading) {
        return <p>{loading}</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return <BasicTable contacts={contacts} />;
};

// show all deleted contacts
const ContactBin = () => {
    const { data, loading, error } = GetBinList("C");

    if (loading) {
        return <p>{loading}</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }
    return (
        <>
            {data.length ? (
                <p>{data.length} record(s) found.</p>
            ) : (
                <p>no record found.</p>
            )}
        </>
    );
};

// show all from search keyword
const ContactSearch = () => {
    let {keyword} = useParams()
    const { contacts, loading, error } = GetContactsBySearch(keyword);

    if (loading) {
        return <p>{loading}</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }
    return (
        <>
            {contacts.length ? (
                <p>{contacts.length} record(s) found.</p>
            ) : (
                <p>no record found.</p>
            )}
        </>
    );
};

// show details of specific contact
const ContactDetail = () => {
    let { contactId } = useParams();
    let history = useHistory();
    const { contact, loading, error } = GetOneContact(contactId);
    const [tags, setTags] = useState(
        useMemo(
            () =>
                contact.Tags &&
                contact.Tags.map((tag) => ({ value: tag, label: tag })),
            [contact]
        )
    );
    const {
        register,
        reset,
        handleSubmit,
        formState: { isDirty, isSubmitting },
    } = useForm({
        defaultValues: useMemo(() => contact, [contact]),
    });
    const [inputDisable, setInputDisable] = useState(true);

    const selectedTagsHandler = (options) => {
        setTags(options.map((opt) => opt.label));
    };

    const onSubmitHandler = (data) => {
        // check if there is any change
        if (isDirty) {
            // update tags
            // data.Tags = tags;
            console.log(data);

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
                <div className="form-avatar">
                    <MdAdd id="form-addPhoto" size={50} />
                </div>
                {/* <Avatar sx={{ width: 150, height: 150 }}/> */}
                <div className="form-keyInfo">
                    <div className="form-name">
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
                    {/* <Tag
                        tagOf="C"
                        isDisabled={inputDisable}
                        defaultValue={tags}
                        setSelectedTags={selectedTagsHandler}
                    /> */}
                    <div className="form-record">
                        <label>Home: </label>
                        <input
                            type="tel"
                            {...register("HomeNo")}
                            disabled={inputDisable}
                        />
                    </div>
                    <div className="form-record">
                        <label>Mobile: </label>
                        <input
                            type="tel"
                            {...register("MobileNo")}
                            disabled={inputDisable}
                        />
                    </div>
                </div>
                <div className="form-Info">
                    <div className="form-record">
                        <label>Email: </label>
                        <input
                            type="email"
                            {...register("Email")}
                            disabled={inputDisable}
                        />
                    </div>

                    <div className="form-record">
                        <label>Job tittle: </label>
                        <input
                            type="text"
                            {...register("JobTitle")}
                            disabled={inputDisable}
                        />
                    </div>

                    <div className="form-record">
                        <label>Company: </label>
                        <input
                            type="text"
                            {...register("Company")}
                            disabled={inputDisable}
                        />
                    </div>

                    <div className="form-record">
                        <label>DOB: </label>
                        <input
                            type="date"
                            {...register("DOB")}
                            disabled={inputDisable}
                        />
                    </div>

                    <div className="form-record">
                        <label>Relationship: </label>
                        <input
                            type="text"
                            {...register("Relationship")}
                            disabled={inputDisable}
                        />
                    </div>

                    <div className="form-record">
                        <label>Address: </label>
                        <input
                            type="text"
                            {...register("Address")}
                            disabled={inputDisable}
                        />
                    </div>
                </div>
                <div className="form-note">
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

// create a new contact
const ContactCreate = () => {
    let history = useHistory();
    const [tags, setTags] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { isDirty },
    } = useForm();

    const selectedTagsHandler = (options) => {
        setTags(options.map((opt) => opt.label));
    };

    const onSubmitHandler = (data) => {
        // check if there any input
        if (isDirty) {
            // add tags to contact
            // data.Tags = tags;

            // send data to server
            console.log(tags);
            CreateContact(data).then((res) => console.log(res));
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
                <div className="form-avatar">
                    <MdAdd id="form-addPhoto" size={50} />
                </div>
                <div className="form-keyInfo">
                    <div className="form-name">
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
                    {/* <Tag tagOf="C" setSelectedTags={selectedTagsHandler} /> */}
                    <div className="form-record">
                        <label>Home: </label>
                        <input type="tel" {...register("HomeNo")} />
                    </div>
                    <div className="form-record">
                        <label>Mobile: </label>
                        <input type="tel" {...register("MobileNo")} />
                    </div>
                </div>
                <div className="form-Info">
                    <div className="form-record">
                        <label>Email: </label>
                        <input type="email" {...register("Email")} />
                    </div>

                    <div className="form-record">
                        <label>Job tittle: </label>
                        <input type="text" {...register("JobTitle")} />
                    </div>

                    <div className="form-record">
                        <label>Company: </label>
                        <input type="text" {...register("Company")} />
                    </div>

                    <div className="form-record">
                        <label>DOB: </label>
                        <input type="date" {...register("DOB")} />
                    </div>

                    <div className="form-record">
                        <label>Relationship: </label>
                        <input type="text" {...register("Relationship")} />
                    </div>

                    <div className="form-record">
                        <label>Address: </label>
                        <input type="text" {...register("Address")} />
                    </div>
                </div>
                <div className="form-note">
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
                    <ContactCreate />
                </Route>
                <Route path={`${path}/bin`}>
                    <ContactBin />
                </Route>
                <Route path={`${path}/tag/:tagName`}>
                    <ContactWithTag />
                </Route>
                <Route path={`${path}/search/:keyword`}>
                    <ContactSearch/>
                </Route>
                <Route path={`${path}/:contactId`}>
                    <ContactDetail />
                </Route>
                <Route exact path={path}>
                    <ContactAll />
                </Route>
            </Switch>
        </div>
    );
};

export default Contact;
