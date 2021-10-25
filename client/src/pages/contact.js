import {
    GetOneContact,
    DeleteContact,
    CreateContact,
    EditContact,
    GetContactsByUrl,
    GetBinList,
    GetBinItem,
    RestoreBinItem,
    UploadContactPhoto,
} from "../api";
import { Switch, Route, useHistory, useParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
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
    TableCell,
    Button,
    TextField,
    Typography,
    Divider,
    Paper,
    Avatar,
    Grid,
} from "@mui/material";
import { Box } from "@mui/system";
import InputField from "../common/inputField";
import { ContactPhoto } from "../common/avatar";

import { BaseTable } from "../common/table";

// related meetings
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
                                <TableCell sx={{ bgcolor: "primary.light" }}>
                                    Title
                                </TableCell>
                                <TableCell sx={{ bgcolor: "primary.light" }}>
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

/**
 * Display active contacts in table.
 */
export const ContactTable = () => {
    let { tagName, keyword } = useParams(); // use to filter contacts
    const { contacts, loading, error } = GetContactsByUrl(tagName, keyword);

    const columns = useMemo(
        () => [
            {
                Header: "Name",
                accessor: (row) => row.FirstName + " " + row.LastName,
            },
            {
                Header: "Phone Number",
                accessor: "MobileNo",
            },
            {
                Header: "Email",
                accessor: "Email",
            },
        ],
        []
    );

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p>error</p>;
    }

    return <BaseTable columns={columns} data={contacts} path="/contact/" />;
};

/**
 * Display deleted contacts in table.
 */
export const ContactBin = () => {
    const { data, loading, error } = GetBinList("C");

    const columns = useMemo(
        () => [
            {
                Header: "Name",
                accessor: "Name",
            },
            {
                Header: "Delete Date",
                accessor: (row) => row.DeleteDate.slice(0, 10),
            },
        ],
        []
    );

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p>error</p>;
    }

    return <BaseTable columns={columns} data={data} path="/contact/bin/" />;
};

// detail
const ContactDetail = () => {
    let { id } = useParams();
    let history = useHistory();
    const { contact, meetings, loading, error } = GetOneContact(id);
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
                return opt;
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
            EditContact(data, id).then((data) => {
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
        DeleteContact(id).then((res) => {
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
                bgcolor: "primary.light",
                padding: "10px 25px",
            }}
        >
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="start"
                    spacing={4}
                    marginBottom="35px"
                >
                    <Grid item xs="auto">
                        <ContactPhoto size="200px" id={id} />
                    </Grid>
                    <Grid item xs>
                        <Box
                            height="170px"
                            width="360px"
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
                                                    width: "170px",
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
                                                    width: "170px",
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
                <Grid container direction="row" spacing={12}>
                    <Grid item xs={8} maxWidth="500px">
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
                    <Grid item xs={4} marginTop="20px">
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
        formState: { isDirty},
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
                bgcolor: "primary.light",
                padding: "10px 25px",
            }}
        >
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="start"
                    spacing={4}
                    marginBottom="35px"
                >
                    <Grid item xs="auto">
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
                            width="360px"
                            sx={{
                                paddingTop: "30px",
                                display: "flex",
                                justifyContent: "space-evenly",
                                flexDirection: "column",
                            }}
                        >
                            <Box marginBottom="10px">
                                <Controller
                                    name="FirstName"
                                    control={control}
                                    rules={{ required: "This field is required." }}
                                    render={({
                                        field,
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            placeholder="Firstname"
                                            {...field}
                                            error={error}
                                            variant="standard"
                                            helperText={error ? error.message : " "}
                                            inputProps={{
                                                style: {
                                                    fontSize: 30,
                                                    width: "170px",
                                                },
                                            }}
                                        />
                                    )}
                                />
                                <Controller
                                    name="LastName"
                                    control={control}
                                    rules={{ required: "This field is required." }}
                                    render={({
                                        field,
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            placeholder="Lastname"
                                            {...field}
                                            error={error}
                                            variant="standard"
                                            helperText={error ? error.message : " "}
                                            inputProps={{
                                                style: {
                                                    fontSize: 30,
                                                    width: "170px",
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
                    <Grid item xs maxWidth="400px">
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

// bin item
const ContactRestore = () => {
    let { id } = useParams();
    let history = useHistory();
    const { data, loading, error } = GetBinItem(id);
    const { reset, control } = useForm();
    const inputDisable = true;

    const onRestoreHandler = () => {
        RestoreBinItem(id).then((res) => console.log(res));
    };

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
                bgcolor: "primary.light",
                padding: "10px 25px",
            }}
        >
            <form>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="start"
                    spacing={4}
                    marginBottom="35px"
                >
                    <Grid item xs="auto">
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
                <Grid container direction="row" spacing={12}>
                    <Grid item xs={8} maxWidth="500px">
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

// router
const Contact = () => {
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
                <Route exact path={"/contact/bin"}>
                    <ContactBin />
                </Route>
                <Route exact path={"/contact/bin/:id"}>
                    <ContactRestore />
                </Route>
                <Route
                    exact
                    path={[
                        "/contact/search/:keyword",
                        "/contact/tag/:tagName",
                        "/contact/",
                    ]}
                >
                    <ContactTable />
                </Route>
                <Route exact path={"/contact/create"}>
                    <ContactCreate />
                </Route>
                <Route exact path={"/contact/:id"}>
                    <ContactDetail />
                </Route>
            </Switch>
        </Box>
    );
};

export default Contact;
