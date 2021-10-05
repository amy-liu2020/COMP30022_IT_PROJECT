import {
    Switch,
    Route,
    useRouteMatch,
    useHistory,
    useParams,
} from "react-router-dom";
import SideMenu from "../common/sideMenu";
import NavigationBar from "../common/nav";
import Table from "../common/table";
import { useForm } from "react-hook-form";
import { MdAdd } from "react-icons/md";
import Tag from "../common/tag";
import { useEffect, useState } from "react/cjs/react.development";

const List = () => {
    let history = useHistory();

    return (
        <div className="content">
            <table className="meeting-list">
                <thead className="meeting-list-head">
                    <th>Meeting Name</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Invitees</th>
                </thead>
                {
                    meetings.length ?
                    meetings.map((meeting) => 
                    <tr className="meeting-list-record" onClick={() => {history.push(`/meeting/${meeting.id}`)}}>
                        <td>{meeting.name}</td>
                        <td>{meeting.location}</td>
                        <td>{meeting.date}</td>
                        <td>{meeting.invitees}</td>
                    </tr>
                    ) : <p>no meeting</p>
                }

            </table>
        </div>
    )
}


const Detail = () => {
    let history = useHistory();
    let {meetingID} = useParams();
    const [meeting, setMeeting] = useState([]);

    // fetch meeting from data
    useEffect(() => {
        setMeeting(getOneMeeting(meetingID));
    }, [meetingID])


    return (
        <div className="meeting">
            <form className="meeting-form">
                <button className="detail-edit" type="button" onClick={() => history.push(`/meeting/edit/${meeting.id}`)}>edit meeting</button>

                <div class="meetingForm-keyInfo">
                    <div class="meetingForm-name">
                        <text type="text" name="name" maxLength="20" placeholder="name">{meeting.name}</text>
                    </div>
                    <button type="button">
                        <MdAdd size={15}/>
                    </button>
                    <div class="meetingForm-record">
                        <label>Location: </label>
                        <text type="text" name="location">{meeting.location}</text>
                    </div>
                </div>

                <div class="meetingForm-Info">
                    <div class="meetingForm-record">
                        <label>Date: </label>
                        <text type="date" name="date">{meeting.date}</text>
                    </div>

                    <div class="meetingForm-record">
                        <label>Time: </label>
                        <text type="time" name="time">{meeting.time}</text>
                    </div>

                    <div class="meetingForm-record">
                        <label>Repeat: </label>
                        <text type="frequency" name="frequency">{meeting.frequency}</text>
                    </div>

                    <div class="meetingForm-record">
                        <label>URL: </label>
                        <text type="url" name="url">{meeting.url}</text>
                        
                    </div>
                </div>

                <div class="meetingForm-attachment">
                    <label>Attachment: </label>
                    <file id="form-attachmentArea" placeholder="add files..." name="attachment">{meeting.attachment}</file>
                </div>

                <div class="meetingForm-notes">
                    <label>Notes: </label>
                    <textarea id="meetingForm-noteArea" placeholder="add notes..." name="notes">{meeting.notes}</textarea>
                </div>

                <div class="meetingForm-keyWords">
                    <label>Key words:</label>
                    <textarea id="meetingForm-keyWordsArea" placeholder="add key words..."name="keyWords"></textarea>
                </div>
            </form>
        </div>
    )
}


const Edit = () => {

    let history = useHistory();
    let { meetingID } = useParams();
    const [meeting, setMeeting] = useState([]);

    const onChangeHandler = (e) => {
        setMeeting((prevMeeting) => ({...prevMeeting, [e.target.name] : e.target.value}))
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        history.push('/meeting');
    }

    // fetch meeting from data
    useEffect(() => {
        getOneMeeting(meetingID) !== undefined && setMeeting(getOneMeeting(meetingID))
    }, [meetingID])

    return (
        <div className = "content">
            <form className="meeting-form">

                <button type="submit" onClick={onSubmitHandler}>save</button>

                <div class="meetingForm-keyInfo">
                    <div class="meetingForm-name">
                        <input type="text" placeholder="TITLE"/>
                    </div>
                    <Tag/>
                    <div class="meetingForm-record">
                        <label>Location: </label>
                        <input type="text" onChange={e => onChangeHandler(e)} value={meeting.location}/>
                    </div>
                </div>


                <div class="meetingForm-Info">
                
                    <div class="meetingForm-record">
                        <label>Date: </label>
                        <input type="date" onChange={e => onChangeHandler(e)} value={meeting.date}/>
                    </div>

                    <div class="meetingForm-record">
                        <label>Time: </label>
                        <input type="time" onChange={e => onChangeHandler(e)} value={meeting.time}/>
                    </div>

                    <div class="meetingForm-record">
                        <label>Repeat: </label>
                        <select name="frequency">
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
                        <input type="url" onChange={e => onChangeHandler(e)} value={meeting.url}/>
                    </div>

                </div>

                <div class="meetingForm-attachment">
                    <label>Attachment: </label>
                    <input class="attach" type="file" onChange={e => onChangeHandler(e)} value={meeting.attachment}/>
                </div>

                <div class="meetingForm-notes">
                    <label>Notes: </label>
                    <textarea id="meetingForm-noteArea" maxlength ="140" placeholder="add notes..." onChange={e => onChangeHandler(e)} value={meeting.notes}></textarea>
                </div>

                <div class="meetingForm-keyWords">
                    <label>Key words:</label>
                    <textarea id="meetingForm-keyWordsArea" maxlength ="60" placeholder="add key words..." onChange={e => onChangeHandler(e)} value={meeting.notes}></textarea>
                </div>

            </form>
        </div>
    )
}


// decide which subPage will be render based on path
const Meeting = () => {

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

// sample meetings data
const meetings = [
    {
        id: 1,
        name: "COMP30022 Lecture",
        location: "Zoom",
        date: "20-09-2021",
        invitees: "John Doe, Jane Doe",
    },
    {
        id: 2,
        name: "COMP30019 Lecture",
        location: "Sydney Myer G01",
        date: "22-09-2021",
        invitees: "Tony Gilbert, Ivy Wong, Chris Collins",
    }
]
    
// if meetingID is specified, return single meeting with requested id.
// Otherwise, return all meetings
const getOneMeeting = (meetingID) => {
    return meetings.find(({ id }) => id == meetingID);
}

const getAllMeeting = () => {
    return meetings;
}

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


// export default Meeting;