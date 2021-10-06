import {
    Switch,
    Route,
    useRouteMatch,
    useHistory,
    useParams,
} from "react-router-dom";
import { GetMeetings, GetOneMeeting, CreateMeeting, EditMeeting, DeleteOneMeeting } from "../api";
import SideMenu from "../common/sideMenu";
import NavigationBar from "../common/nav";
import Table from "../common/table";
import meetings from "../json/MeetingList.json"
import { useForm } from "react-hook-form";
import { MdAdd } from "react-icons/md";
import Tag from "../common/tag";
import { useEffect, useState } from "react/cjs/react.development";

const List = () => {
    return (
        <Table tab="meeting" data={meetings} option="delete"/>
    )
}

// const Detail = () => {
//     let history = useHistory();
//     let {meetingID} = useParams();
//     const [meeting, setMeeting] = useState([]);

//     // fetch meeting from data
//     useEffect(() => {
//         setMeeting(meetings[meetingID]);
//         // console.log(meetings[meetingID]);
//     }, [meetingID])

//     return (
//         <div className="content">
//             <table className="meeting-list">
//                 <thead className="meeting-list-head">
//                     <th>Meeting Name</th>
//                     <th>Location</th>
//                     <th>Date</th>
//                     <th>Invitees</th>
//                 </thead>
//                 {
//                     meetings.length ?
//                     meetings.map((meeting) => 
//                     <tr className="meeting-list-record" onClick={() => {history.push(`/meeting/${meeting.id}`)}}>
//                         <td>{meeting.name}</td>
//                         <td>{meeting.location}</td>
//                         <td>{meeting.date}</td>
//                         <td>{meeting.invitees}</td>
//                     </tr>
//                     ) : <p>no meeting</p>
//                 }

//             </table>
//         </div>
//     )
// }


const Detail = () => {
    let history = useHistory();
    let {meetingID} = useParams();
    const [meeting, setMeeting] = useState([]);

    // fetch meeting from data
    useEffect(() => {
        setMeeting(meetings[meetingID]);
        // console.log(meetings[meetingID]);
    }, [meetingID])


    return (
        <div className="meeting">
            <form className="meeting-form">
                <button className="detail-edit" type="button" onClick={() => history.push(`/meeting/edit/${meeting.id}`)}>edit meeting</button>

                <div class="meetingForm-keyInfo">
                    <div class="meetingForm-name">
                        {/* <text type="text" name="name" maxLength="30" placeholder="name">{meeting.name}</text> */}
                        <text> {meeting.Title} </text>
                    </div>
                    <button type="button">
                        <MdAdd size={15}/>
                    </button>
                    <div class="meetingForm-record">
                        <label>Location: </label>
                        <text type="text" name="location">{meeting.Location}</text>
                    </div>
                </div>

                <div class="meetingForm-Info">
                    <div class="meetingForm-record">
                        <label>Date: </label>
                        <text name="Date">
                            {new Date(Date(meeting.StartTime)).toLocaleDateString()}
                        </text>
                    </div>

                    <div class="meetingForm-record">
                        <label>Start Time: </label>
                        <text name="Date">
                            {new Date(Date(meeting.StartTime)).toUTCString().slice(17,22)}
                        </text>
                    </div>

                    <div class="meetingForm-record">
                        <label>End Time: </label>
                        <text name="Date">
                            {new Date(Date(meeting.EndTime)).toUTCString().slice(17,22)}
                        </text>
                    </div>

                    <div class="meetingForm-record">
                        <label>Repeat: </label>
                        <text type="frequency" name="frequency">{meeting.Frequency}</text>
                    </div>

                    <div class="meetingForm-record">
                        <label>URL: </label>
                        <text type="url" name="url">{meeting.URL}</text>
                        
                    </div>
                </div>

                <div class="meetingForm-attachment">
                    <label>Attachment: </label>
                    <file id="form-attachmentArea" placeholder="add files..." name="attachment">{meeting.attachment}</file>
                </div>

                <div class="meetingForm-notes">
                    <label>Notes: </label>
                    <text id="meetingForm-noteArea" name="notes">{meeting.Notes}</text>
                </div>

                <div class="meetingForm-keyWords">
                    <label>Key words:</label>
                    <text id="meetingForm-keyWordsArea" name="keyWords">{meeting.NotesKeyWords}</text>
                </div>
            </form>
        </div>
    )
}


const Edit = () => {

    let history = useHistory();
    let { meetingID } = useParams();
    const { register, formState: { errors }, handleSubmit } = useForm({
        criteriaMode: 'all',
        defaultValues: meetings[meetingID]
    });

    const onSubmit = data => {
        console.log(data);
        history.push("/meeting");
    }

    return (
        <div className = "content">
            <form className="meeting-form" onClick={handleSubmit(onSubmit)}>

                <button type="submit">save</button>

                <div class="meetingForm-keyInfo">
                    <div class="meetingForm-name">
                        <input type="text" {...register("Title")}/>
                    </div>
                    <Tag tab="meeting"/>
                    <div class="meetingForm-record">
                        <label>Location: </label>
                        <input type="text" {...register("Location")}/>
                    </div>
                </div>


                <div class="meetingForm-Info">
                
                    <div class="meetingForm-record">
                        <label>Date: </label>
                        <input
                            type="date"
                            defaultValue={new Date(
                                Date(meetings[meetingID].Date)
                            ).toISOString()}
                        />
                    </div>

                    <div class="meetingForm-record">
                        <label>Start Time: </label>
                        <input
                            type="date"
                            defaultValue={new Date(
                                Date(meetings[meetingID].Date) + meetings[meetingID].StartTime.$date.slice(0, 10)
                            ).toISOString()}
                        />
                    </div>

                    <div class="meetingForm-record">
                        <label>End Time: </label>
                        <input
                            type="date"
                            defaultValue={new Date(
                                Date(meetings[meetingID].Date) + meetings[meetingID].EndTime.$date.slice(0, 10)
                            ).toISOString()}
                        />
                    </div>

                    <div class="meetingForm-record">
                        <label>Repeat: </label>
                        <select name="frequency" {...register("Frequency")}>
                            <option disabled selected>--select--</option>
                            <option>every day</option>
                            <option>every week</option>
                            <option>every month</option>
                            <option>every year</option>
                            <option>never</option>
                        </select>
                    </div>

                    <div class="meetingForm-record">
                        <label>URL: </label>
                        <input type="url" {...register("URL")}/>
                    </div>

                </div>

                <div class="meetingForm-attachment">
                    <label>Attachment: </label>
                    <input class="attach" type="file" {...register("Attachment")}/>
                </div>

                <div class="meetingForm-notes">
                    <label>Notes: </label>
                    <textarea id="meetingForm-noteArea" maxlength ="140" placeholder="add notes..." {...register("Notes")}></textarea>
                </div>

                <div class="meetingForm-keyWords">
                    <label>Key words:</label>
                    <textarea id="meetingForm-keyWordsArea" maxlength ="60" placeholder="add key words..." {...register("NotesKeyWords")}></textarea>
                </div>

            </form>
        </div>
    )
}


// decide which subPage will be render based on path
export const Meeting = () => {

    let { path } = useRouteMatch();

    return (
        <div className="three-part-layout">
            <NavigationBar/>
            <SideMenu tab={"meeting"}/>
            <Switch>
                <Route path={[`${path}/edit/:meetingID`, `${path}/edit`]}>
                    <Edit/>
                </Route>
                <Route path={`${path}/:meetingID`}>
                    <Detail/>
                </Route>
                <Route exact path={path}>
                    <List/>
                </Route>
            </Switch>
        </div>
    )
}

export default Meeting;

// // sample meetings data
// const meetings = [
//     {
//         id: 1,
//         name: "COMP30022 Lecture",
//         location: "Zoom",
//         date: "20-09-2021",
//         invitees: "John Doe, Jane Doe",
//     },
//     {
//         id: 2,
//         name: "COMP30019 Lecture",
//         location: "Sydney Myer G01",
//         date: "22-09-2021",
//         invitees: "Tony Gilbert, Ivy Wong, Chris Collins",
//     }
// ]
    
// // if meetingID is specified, return single meeting with requested id.
// // Otherwise, return all meetings
// const getOneMeeting = (meetingID) => {
//     return meetings.find(({ id }) => id == meetingID);
// }

// const getAllMeeting = () => {
//     return meetings;
// }

// const Meeting = () => {
//     let { path } = useRouteMatch();

//     return (
//         <div className="three-part-layout">
//             <NavigationBar />
//             <SideMenu tab="meeting"/>
//             <Switch>
//                 <Route path={`${path}/edit/:id`}>
//                     <p>edit</p>
//                 </Route>
//                 <Route path={`${path}/create`}>
//                     <p>create</p>
//                 </Route>
//                 <Route path={`${path}/:id`}>
//                     <p>detail</p>
//                 </Route>
//                 <Route exact path={path}>
//                     <p>list</p>
//                 </Route>
//             </Switch>
//         </div>
//     );
// };