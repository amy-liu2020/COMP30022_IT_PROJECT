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
import NavigationBar from "../common/nav";
import { useForm } from "react-hook-form";
import { MdAdd } from "react-icons/md";
import { MultipleSelectChip } from "../common/tag";
import { useState, useEffect, useMemo} from "react";

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
        backgroundColor: "--content-bg-color",
        fontSize: 14,
    }
}));

const Div = styled("div")(({ theme }) => ({
    ...theme.typography.h4,
    backgroundColor: "--content-bg-color",
    padding: theme.spacing(1),
    margin: "auto",
}));

export function BasicTable({ meetings }) {
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
                        <Table sx={{ minWidth: 400 }} aria-label="simple table">
                            <colgroup>
                                <col width="40%" />
                                <col width="30%" />
                                <col width="30%" />
                            </colgroup>
                            <TableHead id="tableHead">
                                <TableRow>
                                    <StyledTableCell>Meeting Name</StyledTableCell>
                                    <StyledTableCell>Location</StyledTableCell>
                                    <StyledTableCell>Date</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody id="tableBody">
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
                                                {row.Location}
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                {row.Date}
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
                        count={meetings.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                    />
                </div>
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
                data.TagIds = data.Tags.map(opt => opt.TagId);
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
    }

    const onCancelHandler = () => {

        // disable input
        setIsDisable(true);

        // reset value to defaultValue
        CustomReset(data);
    }

    const onDeleteHandler = () => {
        
        // send request to server
        DeleteMeeting(id).then((res) => {
            console.log(res);
        });

        // redirect to list page
        history.push("/meeting");

    }

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
        <div className="meeting">
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
                    <MultipleSelectChip control={control} tagOf="M" isDisabled={isDisabled}/>
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
                        id = "form-noteArea"
                        {...register("Notes")}
                        disabled={isDisabled}
                    />
                </div>

                <div class="meetingForm-keyWords">
                    <label>Key words:</label>
                    <input
                        type="text"
                        id = "form-noteArea"
                        {...register("NotesKeyWords")}
                        disabled={isDisabled}
                    />
                </div>
            </form>
        </div>
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
            data.TagIds = data.Tags.map(opt => opt.TagId);
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
        <div className="meeting">
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
                    <MultipleSelectChip id="meetingTag" control={control} tagOf="M"/>
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
                    <input type="text" id = "form-noteArea" {...register("Notes")} />
                </div>

                <div class="meetingForm-keyWords">
                    <label>Key words:</label>
                    <input type="text" id = "form-noteArea" {...register("NotesKeyWords")} />
                </div>
            </form>
        </div>
    );
};


// decide which subPage will be render based on path
export const Meeting = () => {
    let { path } = useRouteMatch();

    return (
        <div className="three-part-layout">
            <NavigationBar tagOf="M"/>
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
        </div>
    );
};

export default Meeting;
