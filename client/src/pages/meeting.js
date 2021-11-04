import {
    Switch,
    Route,
    useRouteMatch,
    useHistory,
    useParams,
} from "react-router-dom";
import {
    GetMeetings,
    GetMeetingsWithTag,
    GetOneMeeting,
    CreateMeeting,
    EditMeeting,
    DeleteMeeting,
    GetBinList,
    GetMeetingsBySearch,
    GetBinItem,
    RestoreBinItem,
    GetMeetingsByUrl,
} from "../api";
import SideMenu from "../common/sideMenu";
import { Nav } from "../common/nav";
import { Controller, useForm } from "react-hook-form";
import SelectTags from "../common/tag";
import { useState, useEffect, useMemo } from "react";

import { tableCellClasses } from "@mui/material/TableCell";
import Loading from "../common/loading";

import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    TableCell,
    Button,
    TextField,
    Divider,
    Paper,
    Stack,
    Grid,
    Input,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import InputField from "../common/inputField";
import { InviteesTable } from "../common/inviteesTable";
import { BaseTable } from "../common/table";
import { ErrorModal } from "../common/errorModal";


const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        fontSize: 18,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const Div = styled("div")(({ theme }) => ({
    ...theme.typography.h4,
    padding: theme.spacing(1),
    margin: "auto",
    gridArea: "main",
}));

/**
 * Display active meetings in table.
 */
 export const MeetingTable = () => {
    let { tagName, keyword } = useParams(); // use to filter contacts
    const { meetings, loading, error } = GetMeetingsByUrl(tagName, keyword);

    const columns = useMemo(
        () => [
            {
                Header: "Title",
                accessor: "Title",
            },
            {
                Header: "Location",
                accessor: "Location",
            },
            {
                Header: "Time",
                accessor: "Time",
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

    return <BaseTable columns={columns} data={meetings} path="/meeting/" />;
};


/**
 * Display deleted meetings in table.
 */
 export const MeetingBin = () => {
    const { data, loading, error } = GetBinList("M");

    const columns = useMemo(
        () => [
            {
                Header: "Title",
                accessor: "Title",
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

    return <BaseTable columns={columns} data={data} path="/meeting/bin/" />;
};




const MeetingDetail = () => {
    let history = useHistory();
    let { id } = useParams();
    const { data, loading, error } = GetOneMeeting(id);
    const [isDisabled, setIsDisable] = useState(true);
    const [invitees, setInvitees] = useState([]);
    const [attachments, setAttachments] = useState([]);
    const {
        reset,
        handleSubmit,
        control,
        formState: { isDirty, isSubmitting },
    } = useForm({
        defaultValues: [],
    });

    const onSubmitHandler = (data) => {
        // check if there is any change
        // re-format data
        if (data.Tags) {
            data.TagIds = data.Tags.map((opt) => opt.TagId);
        }
        if (data.Date) {
            if (data.StartTime) {
                data.StartTime = new Date(
                    data.Date + "T" + data.StartTime + ":00Z"
                ).toISOString();
            } else {
                data.StartTime = new Date(data.Date).toISOString();
            }

            if (data.EndTime) {
                data.EndTime = new Date(
                    data.Date + "T" + data.EndTime + ":00Z"
                ).toISOString();
            } else {
                data.EndTime = new Date(data.Date).toISOString();
            }
        }
        if (invitees) {
            data.InviteeIds = invitees;
        }
        if (attachments) {
            data.Attachment = attachments;
        }

        // send data to server
        EditMeeting(data, id).then((res) => alert(res.msg));

        // switch to view mode
        setIsDisable(true);
    };

    const CustomReset = (data) => {
        let defaultValue = JSON.parse(JSON.stringify(data));
        // re-format data
        defaultValue.Attachment = undefined;
        if (defaultValue.StartTime) {
            defaultValue.Date = defaultValue.StartTime.slice(0, 10);
            defaultValue.StartTime = defaultValue.StartTime.slice(11, 16);
        }
        if (defaultValue.EndTime) {
            defaultValue.EndTime = defaultValue.EndTime.slice(11, 16);
        }

        if (defaultValue.Tags) {
            defaultValue.Tags.map((opt) => {
                opt.value = opt.TagId;
                opt.label = opt.TagName;
            });
        }

        if (defaultValue.Invitees) {
            setInvitees(
                defaultValue.Invitees.map(
                    (invitee) => (invitee._id = invitee.InviteeId)
                )
            );
        }

        if (defaultValue.Attachment) {
            setAttachments(
                defaultValue.Attachment
            );
        }
        // reset defaultValue
        reset(defaultValue);
    };

    const onDeleteHandler = () => {
        // send request to server
        DeleteMeeting(id).then((res) => {
            alert(res.msg);
        });

        // redirect to list page
        history.push("/meeting");
    };

    const onChangeMode = () => {
        CustomReset(data);
        setIsDisable(!isDisabled);
    };

    useEffect(() => {
        CustomReset(data);
    }, [data]);

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
            <form
                className="meeting-form"
                onSubmit={handleSubmit(onSubmitHandler)}
            >
                <Grid container direction="row" marginBottom="25px" spacing={4}>
                    <Grid item xs>
                        <Stack spacing={2} maxWidth="360px" minWidth="300px">
                            <Controller
                                name="Title"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        placeholder="Title"
                                        variant="standard"
                                        {...field}
                                        disabled={isDisabled}
                                        inputProps={{
                                            style: {
                                                fontSize: 40,
                                            },
                                        }}
                                    />
                                )}
                            />

                            <SelectTags tagOf="M" control={control} />
                            <InputField
                                name="Location"
                                control={control}
                                disabled={isDisabled}
                                label="Location"
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs>
                        <InviteesTable
                            invitees={invitees}
                            onChange={setInvitees}
                            isDisabled={isDisabled}
                        />
                    </Grid>
                    <Grid item xs="auto">
                        <Button type="button" onClick={onChangeMode}>
                            {isDisabled ? "edit" : "cancel"}
                        </Button>
                        {isDisabled ? (
                            <Button type="button" onClick={onDeleteHandler}>
                                delete
                            </Button>
                        ) : (
                            <Button type="submit">save</Button>
                        )}
                    </Grid>
                </Grid>
                <Divider />
                <Grid container direction="row" spacing={6}>
                    <Grid item xs maxWidth="480px">
                        <InputField
                            name="Date"
                            control={control}
                            disabled={isDisabled}
                            label="Date"
                            type="date"
                        />
                        <InputField
                            name="StartTime"
                            control={control}
                            disabled={isDisabled}
                            label="Start Time"
                            type="time"
                        />
                        <InputField
                            name="EndTime"
                            control={control}
                            disabled={isDisabled}
                            label="End Time"
                            type="time"
                        />
                        <InputField
                            name="URL"
                            control={control}
                            disabled={isDisabled}
                            label="URL"
                            type="url"
                        />
                        <InputField
                            name="Attachment"
                            control={control}
                            disabled={isDisabled}
                            onChange={setAttachments}
                            label="Attachment"
                            type="file"
                        />
                    </Grid>
                    <Grid item xs="auto" marginTop="25px" maxWidth="300px">
                        <Box component={Paper} padding="10px">
                            <Box>Notes</Box>
                            <Controller
                                name="NotesKeyWords"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        placeholder="keywords"
                                        disabled={isDisabled}
                                        fullWidth
                                        {...field}
                                    />
                                )}
                            />
                            <Controller
                                name="Notes"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        multiline
                                        rows={5}
                                        disabled={isDisabled}
                                        placeholder="Write something..."
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                    />
                                )}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};



// restore deleted meeting
const MeetingRestore = () => {
    let { BinId } = useParams();
    let history = useHistory();
    const { data, loading, error } = GetBinItem(BinId);
    const { reset, control } = useForm();
    const inputDisable = true;
    const [invitees, setInvitees] = useState([]);

    const onRestoreHandler = () => {
        RestoreBinItem(BinId).then((res) => console.log(res));
    };

    const CustomReset = (data) => {
        let defaultValue = JSON.parse(JSON.stringify(data));
        // re-format data
        defaultValue.Attachment = undefined;
        if (defaultValue.StartTime) {
            defaultValue.Date = defaultValue.StartTime.slice(0, 10);
            defaultValue.StartTime = defaultValue.StartTime.slice(11, 16);
        }
        if (defaultValue.EndTime) {
            defaultValue.EndTime = defaultValue.EndTime.slice(11, 16);
        }

        if (defaultValue.Tags) {
            defaultValue.Tags.map((opt) => {
                opt.value = opt.TagId;
                opt.label = opt.TagName;
            });
        }

        if (defaultValue.Invitees) {
            setInvitees(
                defaultValue.Invitees.map(
                    (invitee) => (invitee._id = invitee.InviteeId)
                )
            );
        }
        // reset defaultValue
        reset(defaultValue);
    };

    useEffect(() => {
        CustomReset(data);
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
                <Grid container direction="row" marginBottom="25px" spacing={4}>
                    <Grid item xs>
                        <Stack spacing={2} maxWidth="360px" minWidth="300px">
                            <Controller
                                name="Title"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        placeholder="Title"
                                        variant="standard"
                                        {...field}
                                        disabled={inputDisable}
                                        inputProps={{
                                            style: {
                                                fontSize: 40,
                                            },
                                        }}
                                    />
                                )}
                            />
                            <SelectTags
                                tagOf="M"
                                control={control}
                                isDisabled="ture"
                            />
                            <InputField
                                name="Location"
                                control={control}
                                disabled={inputDisable}
                                label="Location"
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs>
                        <InviteesTable
                            invitees={invitees}
                            onChange={setInvitees}
                            isDisabled={true}
                        />
                    </Grid>
                    <Grid item xs="auto">
                        <Button type="button" onClick={onRestoreHandler}>
                            restore
                        </Button>
                    </Grid>
                </Grid>
                <Divider />
                <Grid container direction="row" spacing={6}>
                    <Grid item xs maxWidth="480px">
                        <InputField
                            name="Date"
                            control={control}
                            disabled={inputDisable}
                            label="Date"
                            type="date"
                        />
                        <InputField
                            name="StartTime"
                            control={control}
                            disabled={inputDisable}
                            label="Start Time"
                            type="time"
                        />
                        <InputField
                            name="EndTime"
                            control={control}
                            disabled={inputDisable}
                            label="End Time"
                            type="time"
                        />
                        <InputField
                            name="URL"
                            control={control}
                            disabled={inputDisable}
                            label="URL"
                            type="url"
                        />
                        <InputField
                            name="Attachment"
                            control={control}
                            disabled={inputDisable}
                            label="Attachment"
                            type="file"
                        />
                    </Grid>
                    <Grid item xs="auto" marginTop="25px" maxWidth="300px">
                        <Box component={Paper} padding="10px">
                            <Box>Notes</Box>
                            <Controller
                                name="NotesKeyWords"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        placeholder="keywords"
                                        disabled={inputDisable}
                                        fullWidth
                                        {...field}
                                    />
                                )}
                            />
                            <Controller
                                name="Notes"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        multiline
                                        rows={5}
                                        disabled={inputDisable}
                                        placeholder="Write something..."
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                    />
                                )}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

// create a new meeting
const MeetingCreate = () => {
    let history = useHistory();
    const {
        control,
        handleSubmit,
        formState: { dirtyFields },
    } = useForm({
        defaultValues: {
            Title: "",
            Location: "",
            StartTime: "",
            EndTime: "",
            URL: "",
            NotesKeyWords: "",
            Notes: "",
            Tags: [],
            Invitees: [],
            OtherInvitees: "",
            Attachment: [],
        },
    });

    const [invitees, setInvitees] = useState([]);

    // handle user input data
    const onSubmitHandler = (data) => {
        // re-group data
        if (data.Tags) {
            data.TagIds = data.Tags.map((opt) => opt.TagId);
        }
        if (dirtyFields.Date) {
            if (dirtyFields.StartTime) {
                data.StartTime = new Date(
                    data.Date + "T" + data.StartTime + ":00Z"
                ).toISOString();
            } else {
                data.StartTime = new Date(data.Date).toISOString();
            }

            if (dirtyFields.EndTime) {
                data.EndTime = new Date(
                    data.Date + "T" + data.EndTime + ":00Z"
                ).toISOString();
            } else {
                data.EndTime = new Date(data.Date).toISOString();
            }
        }
        if (invitees) {
            data.InviteeIds = invitees;
        }

        // send data to server
        data.Attachment = []; // need to be update later

        CreateMeeting(data).then((res) => {
            alert(res.msg);
            history.push("/meeting"); // redirect to list page
        });
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
                <Grid container direction="row" marginBottom="25px" spacing={4}>
                    <Grid item xs>
                        <Stack spacing={2} maxWidth="360px" minWidth="300px">
                            <Controller
                                name="Title"
                                control={control}
                                rules={{ required: true }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        placeholder="Title"
                                        variant="standard"
                                        {...field}
                                        error={error}
                                        inputProps={{
                                            style: {
                                                fontSize: 40,
                                            },
                                        }}
                                    />
                                )}
                            />

                            <SelectTags tagOf="M" control={control} />
                            <Controller
                                name="Location"
                                control={control}
                                rules={{ required: true }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        placeholder="Location"
                                        variant="standard"
                                        {...field}
                                        error={error}
                                    />
                                )}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs>
                        <InviteesTable
                            placeholder="Invitees"
                            onChange={setInvitees}
                        />
                    </Grid>
                    <Grid item xs="auto">
                        <Button type="submit">create</Button>
                    </Grid>
                </Grid>
                <Divider />
                <Grid container direction="row" marginTop="10px" spacing={6}>
                    <Grid item xs maxWidth="460px">
                        <Controller
                            name="Date"
                            control={control}
                            rules={{ required: true }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    placeholder="Date"
                                    variant="standard"
                                    type="date"
                                    {...field}
                                    error={error}
                                    inputProps={{
                                        style: {
                                            fontSize: 25,
                                            width: 415,
                                        },
                                    }}
                                />
                            )}
                        />
                        <InputField
                            name="StartTime"
                            control={control}
                            label="Start Time"
                            type="time"
                        />
                        <InputField
                            name="EndTime"
                            control={control}
                            label="End Time"
                            type="time"
                        />
                        <InputField
                            name="URL"
                            control={control}
                            label="URL"
                            type="url"
                        />
                        <InputField
                            name="Attachment"
                            control={control}
                            label="Attachment"
                            type="file"
                        />
                    </Grid>
                    <Grid item xs="auto" marginTop="25px" maxWidth="300px">
                        <Box component={Paper} padding="10px">
                            <Box>Notes</Box>
                            <Controller
                                name="NotesKeyWords"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        placeholder="keywords"
                                        fullWidth
                                        {...field}
                                    />
                                )}
                            />
                            <Controller
                                name="Notes"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        multiline
                                        rows={5}
                                        placeholder="Write something..."
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                    />
                                )}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

// decide which subPage will be render based on path
export const Meeting = () => {
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
            <Nav tab="meeting" />
            <SideMenu tagOf="M" />
            <Switch>
                <Route path={`${path}/create`}>
                    <MeetingCreate />
                </Route>
                <Route path={`${path}/bin/:BinId`}>
                    <MeetingRestore />
                </Route>
                <Route path={`${path}/bin`}>
                    <MeetingBin />
                </Route>
                <Route
                    exact
                    path={[
                        "/meeting/search/:keyword",
                        "/meeting/tag/:tagName",
                        "/meeting/",
                    ]}
                >
                    <MeetingTable />
                </Route>
                <Route path={`${path}/:id`}>
                    <MeetingDetail />
                </Route>
                
            </Switch>
        </Box>
    );
};

export default Meeting;
