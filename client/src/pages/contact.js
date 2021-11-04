import {
    GetOneContact,
    DeleteContact,
    CreateContact,
    EditContact,
    GetContactsByUrl,
    GetBinList,
    GetBinItem,
    RestoreBinItem,
    DeleteBinItem,
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
    Paper,
    Avatar,
    Grid,
} from "@mui/material";
import { Box } from "@mui/system";
import { ContactPhoto } from "../common/avatar";

import { BaseTable } from "../common/table";
import { ErrorModal } from "../common/errorModal";

import { yupResolver } from "@hookform/resolvers/yup";
import { FormRecord } from "../common/inputField";
import * as yup from "yup";

// related meetings
function RelatedMeetings({ meetings }) {
    let history = useHistory();

    return (
        <Paper sx={{float: "right"}}>
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
        return <ErrorModal error={error} />;
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
        return <ErrorModal error={error} />;
    }

    return <BaseTable columns={columns} data={data} path="/contact/bin/" />;
};

const phoneReg =
    /^((\+61\s?)?(\((0|02|03|04|07|08)\))?)?\s?\d{1,4}\s?\d{1,4}\s?\d{0,4}$/;

const ContactSchema = yup.object().shape({
    FirstName: yup
        .string()
        .ensure()
        .required("Firstname is required")
        .max(20, "Firstname must not exceed 20 characters"),
    LastName: yup
        .string()
        .ensure()
        .required("Lastname is required")
        .max(40, "Lastname must not exceed 40 characters"),
    MobileNo: yup.string().ensure().matches(phoneReg, {
        message: "Invalid phone number format",
        excludeEmptyString: true,
    }),
    HomeNo: yup.string().ensure().matches(phoneReg, {
        message: "Invalid phone number format",
        excludeEmptyString: true,
    }),
    Email: yup.string().ensure().email("Invalid email format"),
    Company: yup.string().ensure(),
    JobTitle: yup.string().ensure(),
    DOB: yup.date().max(new Date()),
    Relationship: yup.string().ensure(),
    Address: yup.string().ensure(),
    Notes: yup
        .string()
        .ensure()
        .max(140, "Notes must not exceed 140 characters"),
    Tags: yup.array().ensure(),
});

const ContactDetail = () => {
    let { id } = useParams();
    let history = useHistory();
    const { contact, meetings, loading, error } = GetOneContact(id);
    const [viewOnly, setViewOnly] = useState(true);
    const { control, handleSubmit, reset } = useForm({
        resolver: yupResolver(ContactSchema),
    });

    const customReset = (contact) => {
        let defa = JSON.parse(JSON.stringify(contact)); // clone tags

        if (defa.Tags) {
            defa.Tags.map((opt) => {
                opt.value = opt.TagId;
                opt.label = opt.TagName;
                return opt;
            });
            defa.TagIds = defa.Tags.map((opt) => opt.TagId);
        }

        reset(defa);
    };

    const onEdit = () => {
        setViewOnly(false);
    };

    const onDelete = () => {
        // send request to server
        DeleteContact(id).then((res) => {
            console.log(res);
        });

        // redirect to list page
        history.push("/contact");
    };

    const onCancel = () => {
        customReset(contact);
        setViewOnly(true);
    };

    const onSubmit = (data) => {
        if (data.Tags) {
            data.TagIds = data.Tags.map((opt) => opt.TagId);
        }
        data.Photo = undefined;

        // send data to server
        EditContact(data, id).then((res) => {
            if (res) {
                alert(res.msg);
            } else {
                alert(res);
            }
        });

        // switch to view mode
        setViewOnly(true);
    };

    useEffect(() => {
        customReset(contact);
    }, [contact]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p>error</p>;
    }

    return (
        <ContactForm
            viewOnly={viewOnly}
            control={control}
            id={id}
            meetings={meetings}
            buttons={
                viewOnly ? (
                    <>
                        <Button type="button" onClick={onDelete} sx={{ float: "right" }}>
                            delete
                        </Button>
                        <Button type="button" onClick={onEdit} sx={{ float: "right" }}>
                            edit
                        </Button>
                    </>
                ) : (
                    <>
                        <Button type="button" onClick={onCancel} sx={{ float: "right" }}>
                            cancel
                        </Button>
                        <Button onClick={handleSubmit(onSubmit)} sx={{ float: "right" }}>save</Button>
                    </>
                )
            }
        />
    );
};

const ContactCreate = () => {
    let history = useHistory();
    const {
        control,
        handleSubmit,
        formState: { isDirty },
    } = useForm({
        resolver: yupResolver(ContactSchema),
        defaultValues: {
            FirstName: "",
            LastName: "",
            MobileNo: "",
            HomeNo: "",
            Email: "",
            Company: "",
            JobTitle: "",
            DOB: undefined,
            Relationship: "",
            Address: "",
            Notes: "",
            Tags: [],
        },
    });

    const onCreate = (data) => {
        console.log(data);

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
        <ContactForm
            viewOnly={false}
            control={control}
            buttons={<Button onClick={handleSubmit(onCreate)} sx={{ float: "right" }}>create</Button>}
        />
    );
};

const ContactRestore = () => {
    let { id } = useParams();
    let history = useHistory();
    const { data, loading, error } = GetBinItem(id);
    const { reset, control } = useForm({
        resolver: yupResolver(ContactSchema),
    });

    const onRestore = () => {
        RestoreBinItem(id).then((res) => {
            console.log(res);
            history.push("/contact");
        });
    };

    const onDelete = () => {
        DeleteBinItem(id).then((res) => {
            console.log(res);
            history.push("/contact/bin");
        });
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
        return <ErrorModal error={error} />;
    }

    return (
        <ContactForm
            viewOnly={true}
            control={control}
            buttons={
                <>
                    <Button onClick={onDelete} sx={{ float: "right" }}>delete</Button>
                    <Button onClick={onRestore} sx={{ float: "right" }}>restore</Button>
                </>
            }
        />
    );
};

const ContactForm = ({ viewOnly, control, buttons, id, meetings = [] }) => {
    return (
        <Box bgcolor="primary.light" gridArea="main" padding="10px 30px">
            <Grid container columnSpacing={3} >
                <Grid item xs={12} md={3} minWidth="220px" order={{ xs: 2, md: 1 }}>
                    {id ? (
                        <ContactPhoto id={id} size="200px" />
                    ) : (
                        <Box width="100%" height="100%">
                            <Avatar sx={{ width: "200px", height: "200px", alignSelf: "center" }} />
                        </Box>
                    )}
                </Grid>
                <Grid item xs={12} md={4} minWidth="390px" maxWidth="400px" order={{ xs: 3, md: 2 }}>
                    <Controller
                        name="FirstName"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                placeholder="Firstname"
                                {...field}
                                error={error}
                                helperText={error ? error.message : " "}
                                variant="standard"
                                inputProps={{
                                    readOnly: viewOnly,
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
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                placeholder="Lastname"
                                {...field}
                                error={error}
                                helperText={error ? error.message : " "}
                                variant="standard"
                                inputProps={{
                                    readOnly: viewOnly,
                                    style: {
                                        fontSize: 30,
                                        width: "180px",
                                    },
                                }}
                            />
                        )}
                    />
                    <SelectTags
                        control={control}
                        tagOf="C"
                        isDisabled={viewOnly}
                    />
                    <FormRecord
                        control={control}
                        name="MobileNo"
                        label="Mobile Number"
                        viewOnly={viewOnly}
                        labelWidth="280px"
                        type="tel"
                    />
                    <FormRecord
                        control={control}
                        name="HomeNo"
                        label="Home Number"
                        viewOnly={viewOnly}
                        labelWidth="280px"
                        type="tel"
                    />
                </Grid>
                <Grid item xs={12} md={4} order={{ xs: 1, md: 3 }}>
                    {buttons}
                </Grid>
                <Grid item xs={12} md={5} minWidth="38px" maxWidth="400px" order={4}>
                    <FormRecord
                        control={control}
                        name="Email"
                        viewOnly={viewOnly}
                    />
                    <FormRecord
                        control={control}
                        name="Company"
                        viewOnly={viewOnly}
                    />
                    <FormRecord
                        control={control}
                        name="JobTitle"
                        viewOnly={viewOnly}
                    />
                    <FormRecord
                        control={control}
                        name="DOB"
                        viewOnly={viewOnly}
                        type="date"
                    />
                    <FormRecord
                        control={control}
                        name="Relationship"
                        viewOnly={viewOnly}
                    />
                    <FormRecord
                        control={control}
                        name="Address"
                        viewOnly={viewOnly}
                    />
                    <Controller
                        name="Notes"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Notes"
                                multiline
                                maxRows={3}
                                placeholder="Write something..."
                                fullWidth
                                margin="normal"
                                variant="filled"
                                InputProps={{
                                    readOnly: viewOnly,
                                }}
                            />
                        )}
                    />
                </Grid>
                {id && (
                    <Grid item xs={12} md={6} order={5}>
                            <RelatedMeetings meetings={meetings} />
                    </Grid>
                )}
            </Grid>
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
