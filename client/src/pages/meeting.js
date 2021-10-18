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
} from "../api";
import SideMenu from "../common/sideMenu";
import { Nav } from "../common/nav";
import { useForm } from "react-hook-form";
import SelectTags from "../common/tag";
import { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import CircularProgress from "@mui/material/CircularProgress";

const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "--sideM-bg-color",
        fontSize: 18,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const Div = styled("div")(({ theme }) => ({
    ...theme.typography.h4,
    backgroundColor: "--content-bg-color",
    padding: theme.spacing(1),
    margin: "auto",
}));

function BasicTable({ meetings }) {
    const [page, setPage] = useState(0);
    const rowsPerPage = 10;
    let history = useHistory();

    const emptyRows = Math.max(0, (1 + page) * rowsPerPage - meetings.length);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <>
            {meetings.length ? (
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
                                        Title
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            backgroundColor: "primary.light",
                                            fontSize: 18,
                                        }}
                                    >
                                        Location
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            backgroundColor: "primary.light",
                                            fontSize: 18,
                                        }}
                                    >
                                        Date
                                    </TableCell>
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
                                            <TableCell>{row.Title}</TableCell>
                                            <TableCell>
                                                {row.Location}
                                            </TableCell>
                                            <TableCell>{row.Date}</TableCell>
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
                        count={meetings.length}
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

// show all active meetings
const MeetingAll = () => {
    const { meetings, loading, error } = GetMeetings();

    if (loading) {
        return <CircularProgress size={100} />;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return <BasicTable meetings={meetings} />;
};

// show meeting with specific tag
const MeetingWithTag = () => {
    let { tagName } = useParams();
    const { meetings, loading, error } = GetMeetingsWithTag(tagName);

    if (loading) {
        return <p>{loading}</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return <BasicTable meetings={meetings} />;
};

// show all deleted meetings
const MeetingBin = () => {
    const { data, loading, error } = GetBinList("M");

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
const MeetingSearch = () => {
    let { keyword } = useParams();
    const { meetings, loading, error } = GetMeetingsBySearch(keyword);

    if (loading) {
        return <p>{loading}</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }
    return <BasicTable meetings={meetings} />;
};

const MeetingDetail = () => {
    let history = useHistory();
    let { id } = useParams();
    const { data, loading, error } = GetOneMeeting(id);
    const [isDisabled, setIsDisable] = useState(true);
    const {
        register,
        reset,
        handleSubmit,
        control,
        formState: { isDirty, isSubmitting, dirtyFields },
    } = useForm({
        defaultValues: [],
    });

    const onSubmitHandler = (data) => {
        // check if there is any change
        if (isDirty) {
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

            // send data to server
            data.Attachment = ""; // need to be update later
            data.InviteeIds = ["6132267b43c1ad80f1bd58a7"];
            EditMeeting(data, id).then((res) => console.log(res));

            // redirect to list page
            // history.push("/meeting");
            console.log(data); // test only
        }
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
        // reset defaultValue
        reset(defaultValue);
    };

    const onCancelHandler = () => {
        // disable input
        setIsDisable(true);

        // reset value to defaultValue
        CustomReset(data);
    };

    const onDeleteHandler = () => {
        // send request to server
        DeleteMeeting(id).then((res) => {
            console.log(res);
        });

        // redirect to list page
        history.push("/meeting");
    };

    useEffect(() => {
        CustomReset(data);
    }, [data]);

    if (loading || isSubmitting) {
        return <p>loading</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <Box
            sx={{
                gridArea: "main",
            }}
        >
            <form
                className="meeting-form"
                onSubmit={handleSubmit(onSubmitHandler)}
            >
                <button
                    className="detail-edit"
                    type="button"
                    hidden={isDisabled}
                    onClick={onCancelHandler}
                >
                    cancel
                </button>
                <button
                    className="detail-edit"
                    type="submit"
                    hidden={isDisabled}
                >
                    save
                </button>

                <button
                    className="detail-edit"
                    type="button"
                    hidden={!isDisabled}
                    onClick={() => setIsDisable(false)}
                >
                    edit
                </button>
                <button
                    className="detail-edit"
                    type="button"
                    hidden={!isDisabled}
                    onClick={onDeleteHandler}
                >
                    delete
                </button>

                <div class="meetingForm-keyInfo">
                    <div class="meetingForm-name">
                        <input
                            type="text"
                            placeholder="TITLE"
                            {...register("Title")}
                            required
                            disabled={isDisabled}
                        />
                    </div>
                    <SelectTags
                        control={control}
                        tagOf="M"
                        isDisabled={isDisabled}
                    />
                    <div class="meetingForm-record">
                        <label>Location: </label>
                        <input
                            type="text"
                            {...register("Location")}
                            disabled={isDisabled}
                        />
                    </div>
                </div>

                <div class="meetingForm-Info">
                    <div class="meetingForm-record">
                        <label>Date: </label>
                        <input
                            type="date"
                            {...register("Date")}
                            disabled={isDisabled}
                        />
                    </div>

                    <div class="meetingForm-record">
                        <label>Start Time: </label>
                        <input
                            type="time"
                            {...register("StartTime")}
                            disabled={isDisabled}
                        />
                    </div>

                    <div class="meetingForm-record">
                        <label>End Time: </label>
                        <input
                            type="time"
                            {...register("EndTime")}
                            disabled={isDisabled}
                        />
                    </div>

                    <div class="meetingForm-record">
                        <label>URL: </label>
                        <input
                            type="url"
                            {...register("URL")}
                            disabled={isDisabled}
                        />
                    </div>
                </div>

                {/* <div class="meetingForm-attachment">
                    <label>Attachment: </label>
                    <input
                        type="file"
                        {...register("Attachment")}
                        disabled={isDisabled}
                    />
                </div> */}

                <div className="meetingForm-notes">
                    <label>Notes: </label>
                    <input
                        type="textarea"
                        id="form-noteArea"
                        {...register("Notes")}
                        disabled={isDisabled}
                    />
                </div>

                <div class="meetingForm-keyWords">
                    <label>Key words:</label>
                    <input
                        type="text"
                        id="form-noteArea"
                        {...register("NotesKeyWords")}
                        disabled={isDisabled}
                    />
                </div>
            </form>
        </Box>
    );
};

const MeetingCreate = () => {
    let history = useHistory();
    const {
        register,
        control,
        handleSubmit,
        formState: { dirtyFields },
    } = useForm();

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

        // send data to server
        data.Attachment = ""; // need to be update later
        data.InviteeIds = [];
        console.log(data);
        CreateMeeting(data).then((res) => console.log(res));

        // redirect to list page
        history.push("/meeting");
    };

    return (
        <Box
            sx={{
                gridArea: "main",
            }}
        >
            <form
                className="meeting-form"
                onSubmit={handleSubmit(onSubmitHandler)}
            >
                <button type="submit">save</button>

                <div class="meetingForm-keyInfo">
                    <div class="meetingForm-name">
                        <input
                            type="text"
                            placeholder="TITLE"
                            {...register("Title")}
                            required
                        />
                    </div>
                    <SelectTags id="meetingTag" control={control} tagOf="M" />
                    <div class="meetingForm-record">
                        <label>Location: </label>
                        <input type="text" {...register("Location")} />
                    </div>
                </div>

                <div class="meetingForm-Info">
                    <div class="meetingForm-record">
                        <label>Date: </label>
                        <input type="date" {...register("Date")} />
                    </div>

                    <div class="meetingForm-record">
                        <label>Start Time: </label>
                        <input type="time" {...register("StartTime")} />
                    </div>

                    <div class="meetingForm-record">
                        <label>End Time: </label>
                        <input type="time" {...register("EndTime")} />
                    </div>

                    <div class="meetingForm-record">
                        <label>URL: </label>
                        <input type="url" {...register("URL")} />
                    </div>
                </div>

                <div class="meetingForm-attachment">
                    <label>Attachment: </label>
                    <input type="file" {...register("Attachment")} />
                </div>

                <div class="meetingForm-notes">
                    <label>Notes: </label>
                    <input
                        type="text"
                        id="form-noteArea"
                        {...register("Notes")}
                    />
                </div>

                <div class="meetingForm-keyWords">
                    <label>Key words:</label>
                    <input
                        type="text"
                        id="form-noteArea"
                        {...register("NotesKeyWords")}
                    />
                </div>
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
                <Route path={`${path}/bin`}>
                    <MeetingBin />
                </Route>
                <Route path={`${path}/tag/:tagName`}>
                    <MeetingWithTag />
                </Route>
                <Route path={`${path}/:id`}>
                    <MeetingDetail />
                </Route>
                <Route exact path={path}>
                    <MeetingAll />
                </Route>
                <Route path={`${path}/search/:keyword`}>
                    <MeetingSearch />
                </Route>
            </Switch>
        </Box>
    );
};

export default Meeting;

{
    /* <Box
sx={{
    gridArea: "main",
    bgcolor: "#EBF8F6",
    padding: "10px 25px",
}}
>
<Grid container direction="row" marginBottom="25px">
    <Grid item xs={4}>
        <Stack spacing={2} maxWidth="300px">
            <Input
                placeholder="Title"
                sx={{
                    fontSize: "40px",
                    width: "180px",
                }}
            />
            <Select />
            <FormField>
                <Box>Location:</Box>
                <Input />
            </FormField>
        </Stack>
    </Grid>
    <Grid item xs={4} marginRight="50px">
        <Select />
    </Grid>
    <Grid item xs={1} marginRight="50px">
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
            <Box>Date:</Box>
            <Input type="date" />
        </FormField>
        <FormField>
            <Box>Start Time:</Box>
            <Input type="time" />
        </FormField>
        <FormField>
            <Box>End Time:</Box>
            <Input type="time" />
        </FormField>
        <FormField>
            <Box>URL:</Box>
            <Input type="url" />
        </FormField>
        <FormField>
            <Box>Attachment:</Box>
            <Input type="file" />
        </FormField>
    </Grid>

    <Grid item xs={4} marginLeft="400px" marginTop="25px">
        <Box component={Paper} padding="10px">
            <Box>Notes</Box>
            <Input placeholder="keywords" fullWidth />
            <TextField
                multiline
                rows={5}
                placeholder="Write something..."
                fullWidth
                margin="normal"
                variant="outlined"
            />
        </Box>
    </Grid>
</Grid>
</Box> */
}
