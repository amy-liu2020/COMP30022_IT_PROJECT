import { useState } from "react/cjs/react.development"
import { NavigationBar } from "./NavigationBar"
import { SideMenu } from "./SideMenu"

const List = ({meetings}) => {
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
                    meetings.length === 0 ? <p>no meeting</p> :
                    meetings.map((meeting) => 
                    <tr className="meeting-list-record">
                        <td>{meeting.name}</td>
                        <td>{meeting.location}</td>
                        <td>{meeting.date}</td>
                        <td>{meeting.invitees}</td>
                    </tr>
                    )
                }

            </table>
        </div>
    )
}

const Edit = ({meeting}) => {


    return (
        <form className="meeting-form">
            <button type="submit">save</button>

            <div class="keyInfo">
            <div class="meetingName">
                <input type="text" placeholder="name"/>
            </div>
            <button type="button">add tag</button>
            </div>


            <div class="Info">
            <div class="record">
                <label>Location: </label>
                <input type="text"/>
            </div>

            <div class="record">
                <label>Date: </label>
                <input type="date"/>
            </div>

            <div class="record">
                <label>Time: </label>
                <input type="time"/>
            </div>

            <div class="record">
                <label>Repeat: </label>
                <input list="frequency" name="frequency" id="frequency"/>
                <datalist id="frequency">
                    <option value="every day"/>
                    <option value="every week"/>
                    <option value="every month"/>
                    <option value="every year"/>
                    <option value="never"/>
                </datalist>
            </div>

            <div class="record">
                <label>URL: </label>
                <input type="text"/>
            </div>

            </div>

            <div class="attachment">
            <label>Attachment: </label>
            <textarea id="attachment" maxlength ="140" placeholder="add files..."></textarea>
            </div>

            <div class="notes">
            <label>Notes: </label>
            <textarea id="notes" maxlength ="140" placeholder="add notes..."></textarea>
            </div>
        </form>
    )
}

export const Meeting = () => {
    const [meetings, setMeetings] = useState(
        [
            {
                id: 1,
                fName: "Haiyao",
                lName: "Yan",
                mNum: "351465315",
                email: "sample@gmail.com"
            },
            {
                id: 2,
                fName: "Jane",
                lName: "Andy",
                mNum: "351465315",
                email: "sample@gmail.com"
            }
        ]
    )
    
    const [groups, setGroups] = useState(
        [
            {
                id: 1,
                name: "all"
            },
            {
                id: 2,
                name: "family"
            },
            {
                id: 3,
                name: "friend"
            }
        ]
    )

    return (
        <div className="three-part-layout">
            <NavigationBar/>
            <SideMenu groups={groups} tab="meeting"/>
            <List meetings={meetings}/>
        </div>
    )
}