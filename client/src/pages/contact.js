import {
    GetContacts,
    GetOneContact,
    DeleteContact,
    CreateContact,
    EditContact,
    GetContactsByTag,
    GetBinList,
    GetContactsBySearch,
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
import { Nav } from "../common/nav";
import Tag from "../common/tag";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { MultipleSelectChip } from "../common/tag";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { Divider, Input } from "@mui/material";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";

import Paper from "@mui/material/Paper";
import { Stack } from "@mui/material";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.light,
        fontSize: 18,
    },
    [`&.${tableCellClasses.body}`]: {
        backgroundColor: "--content-bg-color",
        fontSize: 14,
    },
}));

const Div = styled("div")(({ theme }) => ({
    ...theme.typography.h4,
    backgroundColor: "--content-bg-color",
    padding: theme.spacing(1),
    margin: "auto",
}));

const FormField = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "15px",
}));

function BasicTable({ contacts }) {
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
            {contacts.length ? (
                <Box
                    sx={{
                        gridArea: "main",
                    }}
                >
                    <TableContainer>
                        <Table sx={{ minWidth: 400 }} aria-label="simple table">
                            <colgroup>
                                <col width="40%" />
                                <col width="30%" />
                                <col width="30%" />
                            </colgroup>
                            <TableHead id="tableHead">
                                <TableRow>
                                    <StyledTableCell>Name</StyledTableCell>
                                    <StyledTableCell>
                                        Phone number
                                    </StyledTableCell>
                                    <StyledTableCell>Email</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody id="tableBody">
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
                                                history.push(
                                                    `/contact/${row._id}`
                                                )
                                            }
                                        >
                                            <StyledTableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {row.FirstName +
                                                    " " +
                                                    row.LastName}
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
                        id="tableBody"
                        rowsPerPageOptions={[]}
                        component="div"
                        count={contacts.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                    />
                </Box>
            ) : (
                <Div>no record found.</Div>
            )}
        </>
    );
}

function BinTable({ contacts }) {
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
            {contacts.length ? (
                <Box
                    sx={{
                        gridArea: "main",
                    }}
                >
                    <TableContainer>
                        <Table sx={{ minWidth: 400 }}>
                            <colgroup>
                                <col width="50%" />
                                <col width="50%" />
                            </colgroup>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Name</StyledTableCell>
                                    <StyledTableCell>
                                        Delete Time
                                    </StyledTableCell>
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
                                                history.push(
                                                    `/contact/${row._id}`
                                                )
                                            }
                                        >
                                            <StyledTableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {row.Name}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {row.DeleteDate.slice(0, 10)}
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
                </Box>
            ) : (
                <Div>no record found.</Div>
            )}
        </>
    );
}

function MeetingTable({ meetings }) {
    const [page, setPage] = useState(0);
    const rowsPerPage = 10;
    let history = useHistory();

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - meetings.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <>
            {meetings.length ? (
                <div>
                    <TableContainer>
                        <Table sx={{ maxWidth: 200 }} aria-label="simple table">
                            <colgroup>
                                <col width="60%" />
                                <col width="40%" />
                            </colgroup>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Title</StyledTableCell>
                                    <StyledTableCell>
                                        Start Time
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {meetings
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
                                                history.push(
                                                    `/meeting/${row._id}`
                                                )
                                            }
                                        >
                                            <StyledTableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {row.Title}
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                {row.StartTime}
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
                    {/* <TablePagination
                        rowsPerPageOptions={[]}
                        component="div"
                        count={meetings.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                    /> */}
                </div>
            ) : (
                <Div>no record found.</Div>
            )}
        </>
    );
}

// handle related meetings
const RelatedMeeting = ({ meetings }) => {
    const meetingsTest = [
        { value: "hbibhbki", label: "hbibhbki" },
        { value: "hbibhb", label: "hbibhb" },
        { value: "cat", label: "cat" },
    ];

    return <p>meetings</p>;
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
    return <BinTable contacts={data} />;
};

// show all from search keyword
const ContactSearch = () => {
    let { keyword } = useParams();
    const { contacts, loading, error } = GetContactsBySearch(keyword);

    if (loading) {
        return <p>{loading}</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }
    return <BasicTable contacts={contacts} />;
};

// show details of specific contact
const ContactDetail = () => {
    let { contactId } = useParams();
    let history = useHistory();
    const { contact, meetings, loading, error } = GetOneContact(contactId);
    const {
        register,
        reset,
        control,
        handleSubmit,
        formState: { isDirty, isSubmitting },
    } = useForm();
    const [inputDisable, setInputDisable] = useState(true);

    const onSubmitHandler = (data) => {
        // check if there is any change
        if (isDirty) {
            if (data.Tags) {
                data.TagIds = data.Tags.map((opt) => opt.TagId);
            }
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

    const customReset = (contact) => {
        let defa = JSON.parse(JSON.stringify(contact)); // clone tags

        if (defa.Tags) {
            defa.Tags.map((opt) => {
                opt.value = opt.TagId;
                opt.label = opt.TagName;
            });
        }

        reset(defa);
    };

    useEffect(() => {
        customReset(contact);
        console.log(meetings);
    }, [contact]);

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
                {/* <MeetingTable meetings={meetings}/> */}
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
                    <MultipleSelectChip
                        tagOf="C"
                        control={control}
                        isDisabled={inputDisable}
                    />
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

    const {
        register,
        handleSubmit,
        control,
        formState: { isDirty },
    } = useForm();

    const onSubmitHandler = (data) => {
        // check if there any input
        if (isDirty) {
            // add tags to contact
            if (data.Tags) {
                data.TagIds = data.Tags.map((opt) => opt.TagId);
            }
            data.Invitees = [];

            // send data to server
            console.log(data);
            CreateContact(data).then((res) => console.log(res));
        }

        // redirect to list page
        history.push("/contact");
    };

    return (
        <Box
            sx={{
                gridArea: "main",
                bgcolor: "#EBF8F6",
                padding: "10px 25px",
            }}
        >
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="start"
                    spacing={12}
                    marginBottom="35px"
                >
                    <Grid item xs={2}>
                        <Avatar
                            sx={{
                                width: "200px",
                                height: "200px",
                                cursor: "pointer",
                            }}
                        />
                    </Grid>
                    <Grid item xs>
                        <Box
                            height="170px"
                            width="380px"
                            sx={{
                                paddingTop: "30px",
                                display: "flex",
                                justifyContent: "space-evenly",
                                flexDirection: "column",
                            }}
                        >
                            <Box marginBottom="20px">
                                <Input
                                    placeholder="Firstname"
                                    sx={{
                                        fontSize: "30px",
                                        width: "180px",
                                    }}
                                />
                                <Input
                                    placeholder="Lastname"
                                    sx={{
                                        fontSize: "30px",
                                        float: "right",
                                        width: "180px",
                                    }}
                                />
                            </Box>
                            <Select autoWidth multiple />
                            <FormField>
                                <Box minWidth="130px">Mobile Number:</Box>
                                <Input fullWidth />
                            </FormField>
                            <FormField>
                                <Box minWidth="130px">Home Number:</Box>
                                <Input fullWidth />
                            </FormField>
                        </Box>
                    </Grid>
                    <Grid item xs="auto">
                        <Chip
                            label="delete"
                            variant="outlined"
                            clickable={true}
                        />
                        <Chip
                            label="edit"
                            variant="outlined"
                            clickable={true}
                        />
                    </Grid>
                </Grid>
                <Divider />
                <Grid container direction="row">
                    <Grid item xs={4}>
                        <FormField>
                            <Box minWidth="130px">Email:</Box>
                            <Input fullWidth type="email" />
                        </FormField>
                        <FormField>
                            <Box minWidth="130px">Job title:</Box>
                            <Input fullWidth />
                        </FormField>
                        <FormField>
                            <Box minWidth="130px">Company:</Box>
                            <Input fullWidth />
                        </FormField>
                        <FormField>
                            <Box minWidth="130px">DOB:</Box>
                            <Input fullWidth type="date" />
                        </FormField>
                        <FormField>
                            <Box minWidth="130px">Relationship:</Box>
                            <Input fullWidth />
                        </FormField>
                        <FormField>
                            <TextField
                                label="Notes"
                                multiline
                                maxRows={3}
                                placeholder="Write something..."
                                fullWidth
                                margin="normal"
                                variant="filled"
                            />
                        </FormField>
                    </Grid>
                    <Grid item xs="auto" marginLeft="300px" marginTop="20px">
                        <Paper>
                            <Box padding="10px 15px 0px">
                                <Typography variant="h6" gutterBottom>
                                    Meetings
                                </Typography>
                            </Box>
                            <TableContainer
                                sx={{ height: "180px", width: "400px" }}
                            >
                                <Table size="small" stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell
                                                sx={{ bgcolor: "#77CFC3" }}
                                            >
                                                Title
                                            </TableCell>
                                            <TableCell
                                                sx={{ bgcolor: "#77CFC3" }}
                                            >
                                                Time
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow
                                                key={row.name}
                                                sx={{
                                                    "&:last-child td, &:last-child th":
                                                        { border: 0 },
                                                }}
                                            >
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                >
                                                    {row.name}
                                                </TableCell>
                                                <TableCell>
                                                    {row.calories}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                </Grid>
            </form>
        </Box>

        // <div className="content">
        //     <form
        //         className="contact-form"
        //         onSubmit={handleSubmit(onSubmitHandler)}
        //     >
        //         <button type="submit">save</button>
        //         <div className="form-avatar">
        //             <MdAdd id="form-addPhoto" size={50} />
        //         </div>
        //         <div className="form-keyInfo">
        //             <div className="form-name">
        //                 <input
        //                     type="text"
        //                     placeholder="FirstName"
        //                     {...register("FirstName")}
        //                     required
        //                 />
        //                 <input
        //                     type="text"
        //                     placeholder="LastName"
        //                     {...register("LastName")}
        //                     required
        //                 />
        //             </div>
        //             {/* <Tag tagOf="C" setSelectedTags={selectedTagsHandler} /> */}
        //             <MultipleSelectChip control={control} tagOf="C" />
        //             <div className="form-record">
        //                 <label>Home: </label>
        //                 <input type="tel" {...register("HomeNo")} />
        //             </div>
        //             <div className="form-record">
        //                 <label>Mobile: </label>
        //                 <input type="tel" {...register("MobileNo")} />
        //             </div>
        //         </div>
        //         <div className="form-Info">
        //             <div className="form-record">
        //                 <label>Email: </label>
        //                 <input type="email" {...register("Email")} />
        //             </div>

        //             <div className="form-record">
        //                 <label>Job tittle: </label>
        //                 <input type="text" {...register("JobTitle")} />
        //             </div>

        //             <div className="form-record">
        //                 <label>Company: </label>
        //                 <input type="text" {...register("Company")} />
        //             </div>

        //             <div className="form-record">
        //                 <label>DOB: </label>
        //                 <input type="date" {...register("DOB")} />
        //             </div>

        //             <div className="form-record">
        //                 <label>Relationship: </label>
        //                 <input type="text" {...register("Relationship")} />
        //             </div>

        //             <div className="form-record">
        //                 <label>Address: </label>
        //                 <input type="text" {...register("Address")} />
        //             </div>
        //         </div>
        //         <div className="form-note">
        //             <label>Notes: </label>
        //             <textarea
        //                 id="form-noteArea"
        //                 placeholder="write something..."
        //                 {...register("Notes")}
        //             ></textarea>
        //         </div>
        //     </form>
        // </div>
    );
};

// decide which subPage will be render based on path
export const Contact = () => {
    let { path } = useRouteMatch();

    return (
        <Box
            sx={{
                height: "100vh",
                display: "grid",
                gridTemplateColumns: "240px auto",
                gap: 0,
                gridTemplateRows: "60px auto",
                gridTemplateAreas: `"header header header header""sidebar main main main "`,
            }}
        >
            <Nav tab="contact" />
            <SideMenu tagOf="C" />
            {/* <Box
                sx={{
                    gridArea: "main",
                    bgcolor: "#EBF8F6",
                    padding: "10px 25px",
                }}
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="start"
                    spacing={12}
                    marginBottom="35px"
                >
                    <Grid item xs={2}>
                        <Avatar
                            sx={{
                                width: "200px",
                                height: "200px",
                                cursor: "pointer",
                            }}
                        />
                    </Grid>
                    <Grid item xs>
                        <Box
                            height="170px"
                            width="380px"
                            sx={{
                                paddingTop: "30px",
                                display: "flex",
                                justifyContent: "space-evenly",
                                flexDirection: "column",
                            }}
                        >
                            <Box marginBottom="20px">
                                <Input
                                    placeholder="Firstname"
                                    sx={{
                                        fontSize: "30px",
                                        width: "180px",
                                    }}
                                />
                                <Input
                                    placeholder="Lastname"
                                    sx={{
                                        fontSize: "30px",
                                        float: "right",
                                        width: "180px",
                                    }}
                                />
                            </Box>
                            <Select autoWidth multiple />
                            <FormField>
                                <Box minWidth="130px">Mobile Number:</Box>
                                <Input fullWidth />
                            </FormField>
                            <FormField>
                                <Box minWidth="130px">Home Number:</Box>
                                <Input fullWidth />
                            </FormField>
                        </Box>
                    </Grid>
                    <Grid item xs="auto">
                        <Chip
                            label="delete"
                            variant="outlined"
                            clickable={true}
                        />
                        <Chip
                            label="edit"
                            variant="outlined"
                            clickable={true}
                        />
                    </Grid>
                </Grid>
                <Divider />
                <Grid container direction="row">
                    <Grid item xs={4}>
                        <FormField>
                            <Box minWidth="130px">Email:</Box>
                            <Input fullWidth type="email" />
                        </FormField>
                        <FormField>
                            <Box minWidth="130px">Job title:</Box>
                            <Input fullWidth />
                        </FormField>
                        <FormField>
                            <Box minWidth="130px">Company:</Box>
                            <Input fullWidth />
                        </FormField>
                        <FormField>
                            <Box minWidth="130px">DOB:</Box>
                            <Input fullWidth type="date" />
                        </FormField>
                        <FormField>
                            <Box minWidth="130px">Relationship:</Box>
                            <Input fullWidth />
                        </FormField>
                        <FormField>
                            <TextField
                                label="Notes"
                                multiline
                                maxRows={3}
                                placeholder="Write something..."
                                fullWidth
                                margin="normal"
                                variant="filled"
                            />
                        </FormField>
                    </Grid>
                    <Grid item xs="auto" marginLeft="300px" marginTop="20px">
                        <Paper>
                            <Box padding="10px 15px 0px">
                                <Typography variant="h6" gutterBottom>
                                    Meetings
                                </Typography>
                            </Box>
                            <TableContainer
                                sx={{ height: "180px", width: "400px" }}
                            >
                                <Table size="small" stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell
                                                sx={{ bgcolor: "#77CFC3" }}
                                            >
                                                Title
                                            </TableCell>
                                            <TableCell
                                                sx={{ bgcolor: "#77CFC3" }}
                                            >
                                                Time
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow
                                                key={row.name}
                                                sx={{
                                                    "&:last-child td, &:last-child th":
                                                        { border: 0 },
                                                }}
                                            >
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                >
                                                    {row.name}
                                                </TableCell>
                                                <TableCell>
                                                    {row.calories}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                </Grid>
            </Box> */}
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
                    <ContactSearch />
                </Route>
                <Route path={`${path}/:contactId`}>
                    <ContactDetail />
                </Route>
                <Route exact path={path}>
                    <ContactAll />
                </Route>
            </Switch>
        </Box>
    );
};

export default Contact;

{
    /* <Box
sx={{
    gridArea: "main",
    bgcolor: "#EBF8F6",
    padding: "10px 25px",
}}
>
<Grid
    container
    direction="row"
    justifyContent="space-between"
    alignItems="start"
    spacing={12}
    marginBottom="35px"
>
    <Grid item xs={2}>
        <Avatar
            sx={{
                width: "200px",
                height: "200px",
                cursor: "pointer",
            }}
        />
    </Grid>
    <Grid item xs>
        <Box
            height="170px"
            width="380px"
            sx={{
                paddingTop: "30px",
                display: "flex",
                justifyContent: "space-evenly",
                flexDirection: "column",
            }}
        >
            <Box marginBottom="20px">
                <Input
                    placeholder="Firstname"
                    sx={{
                        fontSize: "30px",
                        width: "180px",
                    }}
                />
                <Input
                    placeholder="Lastname"
                    sx={{
                        fontSize: "30px",
                        float: "right",
                        width: "180px",
                    }}
                />
            </Box>
            <Select autoWidth multiple value={names}/>
            <FormField>
                <Box minWidth="130px">Mobile Number:</Box>
                <Input fullWidth />
            </FormField>
            <FormField>
                <Box minWidth="130px">Home Number:</Box>
                <Input fullWidth />
            </FormField>
        </Box>
    </Grid>
    <Grid item xs="auto">
        <Chip
            label="delete"
            variant="outlined"
            clickable={true}
        />
        <Chip
            label="edit"
            variant="outlined"
            clickable={true}
        />
    </Grid>
</Grid>
<Divider />
<Grid container direction="row">
    <Grid item xs={4}>
        <FormField>
            <Box minWidth="130px">Email:</Box>
            <Input fullWidth type="email" />
        </FormField>
        <FormField>
            <Box minWidth="130px">Job title:</Box>
            <Input fullWidth />
        </FormField>
        <FormField>
            <Box minWidth="130px">Company:</Box>
            <Input fullWidth />
        </FormField>
        <FormField>
            <Box minWidth="130px">DOB:</Box>
            <Input fullWidth type="date" />
        </FormField>
        <FormField>
            <Box minWidth="130px">Relationship:</Box>
            <Input fullWidth />
        </FormField>
        <FormField>
            <TextField
                label="Notes"
                multiline
                maxRows={3}
                placeholder="Write something..."
                fullWidth
                margin="normal"
                variant="filled"
            />
        </FormField>
    </Grid>
    <Grid
        item
        xs="auto"
        marginLeft="300px"
        marginTop="20px"
    >
        <Paper>
            <Box padding="10px 15px 0px">
                <Typography variant="h6" gutterBottom>
                    Meetings
                </Typography>
            </Box>
            <TableContainer
                sx={{ height: "180px", width: "400px" }}
            >
                <Table size="small" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{ bgcolor: "#77CFC3" }}
                            >
                                Title
                            </TableCell>
                            <TableCell
                                sx={{ bgcolor: "#77CFC3" }}
                            >
                                Time
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{
                                    "&:last-child td, &:last-child th":
                                        { border: 0 },
                                }}
                            >
                                <TableCell
                                    component="th"
                                    scope="row"
                                >
                                    {row.name}
                                </TableCell>
                                <TableCell>
                                    {row.calories}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    </Grid>
</Grid>
</Box> */
}
