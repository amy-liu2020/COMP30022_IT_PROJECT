import { NavigationBar } from "./NavigationBar";
import { SideMenu } from "./SideMenu";
import { MdAdd } from "react-icons/md";
import { Tag } from "./Tag"
import { Switch, Route, useRouteMatch, useHistory, useParams} from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";

const List = () => {
    let history = useHistory();

    return (
        <div className="content">
            <table className="meeting-list">
                <tr className="meeting-list-head">
                    <th>Meeting Name</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Invitees</th>
                </tr>
                {
                    meetings.length ?
                    meetings.map((meeting) => 
                    <tr className="meeting-list-record">
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

                <div class="form-keyInfo">
                    <div class="form-name">
                        <text type="text" name="name" maxLength="20" placeholder="name">{meeting.name}</text>
                    </div>
                    <button type="button">
                        <MdAdd size={15}/>
                    </button>
                    <div class="form-record">
                        <label>Location: </label>
                        <text type="text" name="location">{meeting.location}</text>
                    </div>
                </div>

                <div class="form-Info">
                    <div class="form-record">
                        <label>Date: </label>
                        <text type="date" name="date">{meeting.date}</text>
                    </div>

                    <div class="form-record">
                        <label>Time: </label>
                        <text type="time" name="time">{meeting.time}</text>
                    </div>

                    <div class="form-record">
                        <label>Repeat: </label>
                        <text type="frequency" name="frequency">{meeting.frequency}</text>
                    </div>

                    <div class="form-record">
                        <label>URL: </label>
                        <text type="text" name="url">{meeting.url}</text>
                    </div>
                </div>

                <div class="form-attachment">
                    <label>Attachment: </label>
                    <textarea id="form-attachmentArea" placeholder="add files..." name="attachment">{meeting.attachment}</textarea>
                </div>

                <div class="form-attachment">
                    <label>Notes: </label>
                    <textarea id="form-notesArea" placeholder="add notes..." name="notes">{meeting.notes}</textarea>
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

    // fetch meeting from data
    useEffect(() => {
        getOneMeeting(meetingID) !== undefined && setMeeting(getOneMeeting(meetingID))
    }, [meetingID])

    return (
        <div className = "content">
            <form className="meeting-form">

                <button type="submit" onClick={() => history.goBack()}>save</button>

                <div class="form-keyInfo">
                    <div class="meetingName">
                        <input type="text" placeholder="name"/>
                    </div>
                    <Tag/>
                    <div class="form-record">
                        <label>Location: </label>
                        <input type="text" onChange={e => onChangeHandler(e)} value={meeting.location}/>
                    </div>
                </div>


                <div class="form-Info">
                
                    <div class="form-record">
                        <label>Date: </label>
                        <input type="date" onChange={e => onChangeHandler(e)} value={meeting.date}/>
                    </div>

                    <div class="form-record">
                        <label>Time: </label>
                        <input type="time" onChange={e => onChangeHandler(e)} value={meeting.time}/>
                    </div>

                    <div class="form-record">
                        <label>Repeat: </label>
                        <input list="frequency" name="frequency" id="frequencyList"/>
                            <datalist id="frequency">
                                <option value="every day"/>
                                <option value="every week"/>
                                <option value="every month"/>
                                <option value="every year"/>
                                <option value="never"/>
                            </datalist>
                    </div>

                    <div class="form-record">
                        <label>URL: </label>
                        <input type="text" onChange={e => onChangeHandler(e)} value={meeting.url}/>
                    </div>

                </div>

                <div class="form-attachment">
                <label>Attachment: </label>
                <textarea id="attachment" maxlength ="140" placeholder="add files..." onChange={e => onChangeHandler(e)} value={meeting.attachment}></textarea>
                </div>

                <div class="form-notes">
                <label>Notes: </label>
                <textarea id="notes" maxlength ="140" placeholder="add notes..." onChange={e => onChangeHandler(e)} value={meeting.notes}></textarea>
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


// sample meetings data
const meetings = [
    {
        id: 1,
        Name: "COMP30022 Lecture",
        Location: "Zoom",
        Date: "20-09-2021",
        Invitees: "John Doe, Jane Doe",
    },
    {
        id: 2,
        Name: "COMP30019 Lecture",
        Location: "Sydney Myer G01",
        Date: "22-09-2021",
        Invitees: "Tony Gilbert, Ivy Wong, Chris Collins",
    }
]
    
    
const groups= [
    {
            id: 1,
        name: "all"
    },
    {
        id: 2,
        name: "party"
    },
    {
        id: 3,
        name: "business"
    },
    {
        id: 4,
        name: "date"
    }
        
]
    

    // return (
    //     <div className="three-part-layout">
    //         <NavigationBar/>
    //         <SideMenu groups={groups} tab="meeting"/>
    //         <List meetings={meetings}/>
    //     </div>
    // )




// if meetingID is specified, return single meeting with requested id.
// Otherwise, return all meetings
const getOneMeeting = (meetingID) => {
    return meetings.find(({ id }) => id === meetingID);
}

const getAllMeeting = () => {
    return meetings;
}
