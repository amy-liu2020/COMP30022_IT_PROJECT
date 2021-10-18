import {
    GetContacts,
    GetOneContact,
    DeleteContact,
    CreateContact,
    EditContact,
    GetContactsByTag,
    GetBinList,
    GetContactsBySearch,
    GetBinItem,
    RestoreBinItem
} from "../api";
import {
    Switch,
    Route,
    useRouteMatch,
    useHistory,
    useParams,
} from "react-router-dom";
import { useState, useEffect } from "react";
import SideMenu from "../common/sideMenu";
import { Nav } from "../common/nav";
import { Controller, useForm } from "react-hook-form";
import SelectTags from "../common/tag";
import Loading from "../common/loading";

import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    TableCell,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Divider, Input } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";

const InputField = ({
    name,
    control,
    type = "text",
    label,
    disabled = false,
}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "15px",
                    }}
                >
                    <Box minWidth="130px">{label}:</Box>
                    <Input
                        fullWidth
                        type={type}
                        disabled={disabled}
                        {...field}
                    />
                </Box>
            )}
        />
    );
};

const Div = styled("div")(({ theme }) => ({
    ...theme.typography.h4,
    gridArea: "main",
    padding: theme.spacing(1),
    margin: "auto",
}));

function BasicTable({ contacts }) {
    const [page, setPage] = useState(0);
    const rowsPerPage = 10;
    let history = useHistory();

    const emptyRows = Math.max(0, (1 + page) * rowsPerPage - contacts.length);

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
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        sx={{
                                            backgroundColor: "primary.light",
                                            fontSize: 18,
                                        }}
                                    >
                                        Name
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            backgroundColor: "primary.light",
                                            fontSize: 18,
                                        }}
                                    >
                                        Phone Number
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            backgroundColor: "primary.light",
                                            fontSize: 18,
                                        }}
                                    >
                                        Email
                                    </TableCell>
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
                                            <TableCell>
                                                {row.FirstName +
                                                    " " +
                                                    row.LastName}
                                            </TableCell>
                                            <TableCell>
                                                {row.MobileNo}
                                            </TableCell>
                                            <TableCell>{row.Email}</TableCell>
                                        </TableRow>
                                    ))}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: 53 * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={3} />
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
                                    <TableCell
                                        sx={{
                                            backgroundColor: "primary.light",
                                            fontSize: 18,
                                        }}
                                    >
                                        Name
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            backgroundColor: "primary.light",
                                            fontSize: 18,
                                        }}
                                    >
                                        Delete Date
                                    </TableCell>
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
                                                    `/contact/bin/${row._id}`
                                                )
                                            }
                                        >
                                            <TableCell>{row.Name}</TableCell>
                                            <TableCell>
                                                {row.DeleteDate.slice(0, 10)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: 53 * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={3} />
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

function RelatedMeetings({ meetings }) {
    let history = useHistory();

    return (
        <Paper>
            <Box padding="10px 15px 0px">
                <Typography variant="h6" gutterBottom>
                    Meetings
                </Typography>
            </Box>
            {meetings.length ? (
                <TableContainer sx={{ height: "180px", width: "400px" }}>
                    <Table size="small" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ bgcolor: "#77CFC3" }}>
                                    Title
                                </TableCell>
                                <TableCell sx={{ bgcolor: "#77CFC3" }}>
                                    Start Time
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {meetings.map((meeting) => (
                                <TableRow
                                    key={meeting._id}
                                    onClick={() =>
                                        history.push(`/meeting/${meeting._id}`)
                                    }
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {meeting.Title}
                                    </TableCell>
                                    <TableCell>{meeting.StartTime}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Box padding="10px 15px 0px">
                    <Typography variant="overline" gutterBottom>
                        No related meeting(s).
                    </Typography>
                </Box>
            )}
        </Paper>
    );
}

// show all active contacts
const ContactAll = () => {
    const { contacts, loading, error } = GetContacts();

    if (loading) {
        return <Loading />;
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
        return <Loading />;
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
        return <Loading />;
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
        return <Loading />;
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
        reset,
        control,
        handleSubmit,
        formState: { isDirty, isSubmitting },
    } = useForm();
    const [inputDisable, setInputDisable] = useState(true);

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

    const onSubmitHandler = (data) => {
        // check if there is any change
        if (isDirty) {
            if (data.Tags) {
                data.TagIds = data.Tags.map((opt) => opt.TagId);
            }

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

    const onDeleteHandler = () => {
        // send request to server
        DeleteContact(contactId).then((res) => {
            console.log(res);
        });

        // redirect to list page
        history.push("/contact");
    };

    const onChangeMode = () => {
        customReset(contact);
        setInputDisable(!inputDisable);
    };

    useEffect(() => {
        customReset(contact);
    }, [contact]);

    if (loading || isSubmitting) {
        return <Loading />;
    }

    if (error) {
        return <p>{error}</p>;
    }

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
                                <Controller
                                    name="FirstName"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({
                                        field,
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            placeholder="Firstname"
                                            {...field}
                                            error={error}
                                            variant="standard"
                                            disabled={inputDisable}
                                            inputProps={{
                                                style: {
                                                    fontSize: 30,
                                                    width: "180px",
                                                },
                                            }}
                                        />
                                    )}
                                />
                                <Controller
                                    name="LastName"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({
                                        field,
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            placeholder="Lastname"
                                            {...field}
                                            error={error}
                                            variant="standard"
                                            disabled={inputDisable}
                                            inputProps={{
                                                style: {
                                                    fontSize: 30,
                                                    width: "180px",
                                                },
                                            }}
                                            sx={{ float: "right" }}
                                        />
                                    )}
                                />
                            </Box>
                            <SelectTags
                                control={control}
                                tagOf="C"
                                isDisabled={inputDisable}
                            />
                            <InputField
                                name="MobileNo"
                                label="Mobile Number"
                                control={control}
                                disabled={inputDisable}
                                type="tel"
                            />
                            <InputField
                                name="HomeNo"
                                label="Home Number"
                                control={control}
                                disabled={inputDisable}
                                type="tel"
                            />
                        </Box>
                    </Grid>
                    <Grid item xs="auto">
                        <Button type="button" onClick={onChangeMode}>
                            {inputDisable ? "edit" : "cancel"}
                        </Button>
                        {inputDisable ? (
                            <Button type="button" onClick={onDeleteHandler}>
                                delete
                            </Button>
                        ) : (
                            <Button type="submit">save</Button>
                        )}
                    </Grid>
                </Grid>
                <Divider />
                <Grid container direction="row">
                    <Grid item xs={4}>
                        <InputField
                            name="Email"
                            label="Email"
                            control={control}
                            disabled={inputDisable}
                            type="email"
                        />
                        <InputField
                            name="JobTitle"
                            label="Job title"
                            disabled={inputDisable}
                            control={control}
                        />
                        <InputField
                            name="Company"
                            label="Company"
                            disabled={inputDisable}
                            control={control}
                        />
                        <InputField
                            name="DOB"
                            label="Date of birth"
                            disabled={inputDisable}
                            control={control}
                            type="date"
                        />
                        <InputField
                            name="Relationship"
                            label="Relationship"
                            disabled={inputDisable}
                            control={control}
                        />
                        <Controller
                            name="Notes"
                            control={control}
                            render={({ field }) => (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginTop: "15px",
                                    }}
                                >
                                    <TextField
                                        {...field}
                                        label="Notes"
                                        multiline
                                        maxRows={3}
                                        placeholder="Write something..."
                                        fullWidth
                                        margin="normal"
                                        variant="filled"
                                        disabled={inputDisable}
                                    />
                                </Box>
                            )}
                        />
                    </Grid>
                    <Grid item xs="auto" marginLeft="300px" marginTop="20px">
                        <RelatedMeetings meetings={meetings} />
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

// create a new contact
const ContactCreate = () => {
    let history = useHistory();

    const {
        handleSubmit,
        control,
        formState: { isDirty },
    } = useForm({
        defaultValues: {
            FirstName: "",
            LastName: "",
            MobileNo: "",
            HomeNo: "",
            Email: "",
            Company: "",
            JobTitle: "",
            DOB: "",
            Relationship: "",
            Address: "",
            Notes: "",
            Tags: [],
        },
    });

    const onSubmitHandler = (data) => {
        // check if there any input
        if (isDirty) {
            // add tags to contact
            if (data.Tags) {
                data.TagIds = data.Tags.map((opt) => opt.TagId);
            }

            // send data to server
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
                                <Controller
                                    name="FirstName"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({
                                        field,
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            placeholder="Firstname"
                                            {...field}
                                            error={error}
                                            variant="standard"
                                            inputProps={{
                                                style: {
                                                    fontSize: 30,
                                                    width: "180px",
                                                },
                                            }}
                                        />
                                    )}
                                />
                                <Controller
                                    name="LastName"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({
                                        field,
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            placeholder="Lastname"
                                            {...field}
                                            error={error}
                                            variant="standard"
                                            inputProps={{
                                                style: {
                                                    fontSize: 30,
                                                    width: "180px",
                                                },
                                            }}
                                            sx={{ float: "right" }}
                                        />
                                    )}
                                />
                            </Box>
                            <SelectTags control={control} tagOf="C" />
                            <InputField
                                name="MobileNo"
                                label="Mobile Number"
                                control={control}
                                type="tel"
                            />
                            <InputField
                                name="HomeNo"
                                label="Home Number"
                                control={control}
                                type="tel"
                            />
                        </Box>
                    </Grid>
                    <Grid item xs="auto">
                        <Button type="button" onClick={() => history.goBack()}>
                            cancel
                        </Button>
                        <Button type="submit">create</Button>
                    </Grid>
                </Grid>
                <Divider />
                <Grid container direction="row">
                    <Grid item xs={4}>
                        <InputField
                            name="Email"
                            label="Email"
                            control={control}
                            type="email"
                        />
                        <InputField
                            name="JobTitle"
                            label="Job title"
                            control={control}
                        />
                        <InputField
                            name="Company"
                            label="Company"
                            control={control}
                        />
                        <InputField
                            name="DOB"
                            label="Date of birth"
                            control={control}
                            type="date"
                        />
                        <InputField
                            name="Relationship"
                            label="Relationship"
                            control={control}
                        />
                        <Controller
                            name="Notes"
                            control={control}
                            render={({ field }) => (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginTop: "15px",
                                    }}
                                >
                                    <TextField
                                        {...field}
                                        label="Notes"
                                        multiline
                                        maxRows={3}
                                        placeholder="Write something..."
                                        fullWidth
                                        margin="normal"
                                        variant="filled"
                                    />
                                </Box>
                            )}
                        />
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

// restore deleted Contact
const ContactRestore = () => {
    let { BinId } = useParams();
    let history = useHistory();
    const { data, loading, error } = GetBinItem(BinId);
    const {
        reset,
        control
    } = useForm();
    const inputDisable = true;

    const onRestoreHandler = () => {
        RestoreBinItem(BinId).then(res => console.log(res));
    }

    const customReset = (data) => {
        let defa = JSON.parse(JSON.stringify(data)); // clone tags

        if (defa.Tags) {
            defa.Tags.map((opt) => {
                opt.value = opt.TagId;
                opt.label = opt.TagName;
            });
        }

        reset(defa);
    };

    useEffect(() => {
        customReset(data);
    }, [data]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <Box
            sx={{
                gridArea: "main",
                bgcolor: "#EBF8F6",
                padding: "10px 25px",
            }}
        >
            <form>
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
                                <Controller
                                    name="FirstName"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({
                                        field,
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            placeholder="Firstname"
                                            {...field}
                                            error={error}
                                            variant="standard"
                                            disabled={inputDisable}
                                            inputProps={{
                                                style: {
                                                    fontSize: 30,
                                                    width: "180px",
                                                },
                                            }}
                                        />
                                    )}
                                />
                                <Controller
                                    name="LastName"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({
                                        field,
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            placeholder="Lastname"
                                            {...field}
                                            error={error}
                                            variant="standard"
                                            disabled={inputDisable}
                                            inputProps={{
                                                style: {
                                                    fontSize: 30,
                                                    width: "180px",
                                                },
                                            }}
                                            sx={{ float: "right" }}
                                        />
                                    )}
                                />
                            </Box>
                            <SelectTags
                                control={control}
                                tagOf="C"
                                isDisabled={inputDisable}
                            />
                            <InputField
                                name="MobileNo"
                                label="Mobile Number"
                                control={control}
                                disabled={inputDisable}
                                type="tel"
                            />
                            <InputField
                                name="HomeNo"
                                label="Home Number"
                                control={control}
                                disabled={inputDisable}
                                type="tel"
                            />
                        </Box>
                    </Grid>
                    <Grid item xs="auto">
                        <Button type="button" onClick={onRestoreHandler}>
                            restore
                        </Button>
                    </Grid>
                </Grid>
                <Divider />
                <Grid container direction="row">
                    <Grid item xs={4}>
                        <InputField
                            name="Email"
                            label="Email"
                            control={control}
                            disabled={inputDisable}
                            type="email"
                        />
                        <InputField
                            name="JobTitle"
                            label="Job title"
                            disabled={inputDisable}
                            control={control}
                        />
                        <InputField
                            name="Company"
                            label="Company"
                            disabled={inputDisable}
                            control={control}
                        />
                        <InputField
                            name="DOB"
                            label="Date of birth"
                            disabled={inputDisable}
                            control={control}
                            type="date"
                        />
                        <InputField
                            name="Relationship"
                            label="Relationship"
                            disabled={inputDisable}
                            control={control}
                        />
                        <Controller
                            name="Notes"
                            control={control}
                            render={({ field }) => (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginTop: "15px",
                                    }}
                                >
                                    <TextField
                                        {...field}
                                        label="Notes"
                                        multiline
                                        maxRows={3}
                                        placeholder="Write something..."
                                        fullWidth
                                        margin="normal"
                                        variant="filled"
                                        disabled={inputDisable}
                                    />
                                </Box>
                            )}
                        />
                    </Grid>
                </Grid>
            </form>
        </Box>
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
            <Switch>
                <Route path={`${path}/create`}>
                    <ContactCreate />
                </Route>
                <Route path={`${path}/bin/:BinId`}>
                    <ContactRestore />
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
