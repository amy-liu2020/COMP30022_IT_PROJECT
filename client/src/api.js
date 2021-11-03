import axios from "axios";
import { useState, useEffect } from "react";

// Axios interceptors are functions that Axios calls for every request
axios.interceptors.request.use(
    (config) => {
        config.headers.authorization = localStorage.getItem("token"); // we put our token in the header
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);

export async function LoginUser(user) {
    const data = await axios
        .post("/api/login", user)
        .then((res) => {
            localStorage.setItem("token", "Bearer " + res.data.token);
            return "login success"
        })
        .catch((err) => errHandler(err));
    return data;
}

export async function registerUser(user) {
    // define the route which the FoodBuddy API is handling
    // login/authentication
    const endpoint = `/api/doRegister`;

    // POST the email and password to FoodBuddy API to
    // authenticate user and receive the token explicitly
    // i.e. data = token
    user.withCredentials = true;
    let data = await axios({
        url: endpoint,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        data: JSON.stringify(
            user,
            { withCredentials: true } // IMPORTANT
        ),
    })
        .then((res) => res.data)
        .catch((err) => console.log(err));

    return data;
}

// tag section ----------------------------------

// for contact tag, group = 'C'; for meeting tag, group = 'M'
export function GetTags(tagOf) {
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState("loading...");
    const [error, setError] = useState(null);

    useEffect(() => {
        const source = axios.CancelToken.source();
        axios
            .get(`/api/tag/getTagList/${tagOf}`, {
                cancelToken: source.token,
            })
            .then((res) => {
                setLoading(false);
                res.data && setTags(res.data.tags);
            })
            .catch((err) => {
                setLoading(false);
                errHandler(err);
                setError("An error occured.");
            });
        return () => {
            source.cancel();
        };
    }, [tagOf]);

    return { tags, loading, error };
}

export async function AddTag(tag) {
    const data = await axios
        .post("/api/tag/addTag", tag)
        .then((res) => res.data)
        .catch((err) => errHandler(err));
    return data;
}

export async function DeleteTag(tag) {
    const data = await axios
        .post("/api/tag/deleteTag", tag)
        .then((res) => res.data)
        .catch((err) => errHandler(err));
    return data;
}

// bin section ----------------------------------

export function GetBinList(type) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState("loading...");
    const [error, setError] = useState(null);

    useEffect(() => {
        const source = axios.CancelToken.source();
        axios
            .get(`/api/bin/${type}`, {
                cancelToken: source.token,
            })
            .then((res) => {
                setLoading(false);
                console.log(res.data);
                res.data && setData(res.data.binList);
            })
            .catch((err) => {
                setLoading(false);
                errHandler(err);
                setError("An error occured.");
            });
        return () => {
            source.cancel();
        };
    }, [type]);

    return { data, loading, error };
}

export function GetBinItem(id) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState("loading...");
    const [error, setError] = useState(null);

    useEffect(() => {
        const source = axios.CancelToken.source();
        axios
            .get(`/api/bin/get/${id}`, {
                cancelToken: source.token,
            })
            .then((res) => {
                setLoading(false);
                console.log(res.data);
                res.data.deletedContact && setData(res.data.deletedContact);
                res.data.deletedMeeting && setData(res.data.deletedMeeting);
            })
            .catch((err) => {
                setLoading(false);
                errHandler(err);
                setError("An error occured.");
            });
        return () => {
            source.cancel();
        };
    }, [id]);

    return { data, loading, error };
}

export async function DeleteBinItem(id) {
    let data = await axios
        .post(`/api/bin/delete/${id}`, [])
        .then((res) => res.data)
        .catch((err) => errHandler(err));

    return data;
}

export async function RestoreBinItem(id) {
    let data = await axios
        .post(`/api/bin/restore/${id}`, [])
        .then((res) => res.data)
        .catch((err) => errHandler(err));

    return data;
}

export async function ClearBinItem() {
    let data = await axios
        .post(`/api/tag/clear`, [])
        .then((res) => res.data)
        .catch((err) => errHandler(err));

    return data;
}

// contact section ------------------------------

export function GetContactPhoto(id) {
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState("loading...");
    const [error, setError] = useState(null);

    const arrayBufferToBase64 = (buffer) => {
        var binary = "";
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => (binary += String.fromCharCode(b)));
        return window.btoa(binary);
    };

    useEffect(() => {
        const source = axios.CancelToken.source();
        axios
            .get(`/api/contact/getPhoto/${id}`, {
                cancelToken: source.token,
            })
            .then((res) => {
                setLoading(false);
                console.log(res.data);

                var base64Flag = "data:image/jpeg;base64,";
                var imageStr = arrayBufferToBase64(res.data.photo.data);
                res.data && setPhoto(base64Flag + imageStr);
            })
            .catch((err) => {
                setLoading(false);
                errHandler(err);
                setError("An error occured.");
            });
        return () => {
            source.cancel();
        };
    }, [id]);

    return { photo, loading, error };
}

export async function UploadContactPhoto(photo, id) {
    const data = await axios
        .post(`/api/contact/uploadPhoto/${id}`, photo)
        .then((res) => res.data)
        .catch((err) => errHandler(err));
    return data;
}

export function GetOneContact(id) {
    const [contact, setContact] = useState([]);
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState("loading...");
    const [error, setError] = useState(null);

    useEffect(() => {
        const source = axios.CancelToken.source();
        axios
            .get(`/api/contact/${id}`, {
                cancelToken: source.token,
            })
            .then((res) => {
                setLoading(false);
                console.log(res.data);
                res.data && setContact(res.data.contact);
                res.data && setMeetings(res.data.relatedMeeting);
                setContact((values) => ({
                    ...values,
                    DOB: values.DOB && values.DOB.slice(0, 10),
                }));
            })
            .catch((err) => {
                setLoading(false);
                errHandler(err);
                setError("An error occured.");
            });
        return () => {
            source.cancel();
        };
    }, [id]);

    return { contact, meetings, loading, error };
}

export function GetContacts() {
    const [contacts, setContacts] = useState([]);

    const [loading, setLoading] = useState("loading...");
    const [error, setError] = useState(null);

    useEffect(() => {
        const source = axios.CancelToken.source();
        axios
            .get("/api/contact", {
                cancelToken: source.token,
            })
            .then((res) => {
                setLoading(false);
                res.data && setContacts(res.data.contacts);
                console.log(res.data);
            })
            .catch((err) => {
                setLoading(false);
                errHandler(err);
                setError("An error occured.");
            });
        return () => {
            source.cancel();
        };
    }, []);

    return { contacts, loading, error };
}

export function GetContactsByUrl(tagName, keyword) {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState("loading...");
    const [error, setError] = useState(null);

    useEffect(() => {
        const source = axios.CancelToken.source();
        const url = tagName
            ? `/api/contact/getByTag/${tagName}`
            : keyword
            ? `/api/contact/fuzzySearch/${keyword}`
            : "/api/contact";
        axios
            .get(url, {
                cancelToken: source.token,
            })
            .then((res) => {
                setLoading(false);
                res.data && setContacts(res.data.contacts);
                console.log(res.data);
            })
            .catch((err) => {
                setLoading(false);
                errHandler(err);
                setError("An error occured. Please enter valid characters.");
            });
        return () => {
            source.cancel();
        };
    }, [tagName, keyword]);

    return { contacts, loading, error };
}

export async function CreateContact(contact) {
    let data = await axios
        .post(`/api/contact/create`, contact)
        .then((res) => res.data)
        .catch((err) => errHandler(err));

    return data;
}

export async function EditContact(contact, id) {
    let data = await axios
        .post(`/api/contact/edit/${id}`, contact)
        .then((res) => res.data)
        .catch((err) => errHandler(err));

    return data;
}

export async function DeleteContact(id) {
    const data = await axios
        .delete(`/api/contact/delete/${id}`)
        .then((res) => res.data)
        .catch((err) => errHandler(err));
    return data;
}

// meeting section -------------------------

export function GetOneMeeting(id) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState("loading...");
    const [error, setError] = useState(null);

    useEffect(() => {
        const source = axios.CancelToken.source();
        axios
            .get(`/api/meeting/${id}`, { cancelToken: source.token })
            .then((res) => {
                setLoading(false);
                setData(res.data.meeting);
                console.log(res.data.meeting);
            })
            .catch((err) => {
                setLoading(false);
                errHandler(err);
                setError("An error occured.");
            });
        return () => {
            source.cancel();
        };
    }, [id]);

    return { data, loading, error };
}

export function GetMeetings() {
    const [meetings, setData] = useState([]);
    const [loading, setLoading] = useState("loading...");
    const [error, setError] = useState(null);

    useEffect(() => {
        const source = axios.CancelToken.source();
        axios
            .get(`/api/meeting`, {
                cancelToken: source.token,
            })
            .then((res) => {
                setLoading(false);
                res.data && setData(res.data.meetings);
                console.log(res);
            })
            .catch((err) => {
                setLoading(false);
                errHandler(err);
                setError("An error occured.");
            });
        return () => {
            source.cancel();
        };
    }, []);

    return { meetings, loading, error };
}

export function GetMeetingsByUrl(tagName, keyword) {
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState("loading...");
    const [error, setError] = useState(null);

    useEffect(() => {
        const source = axios.CancelToken.source();
        const url = tagName
            ? `/api/meeting/getByTag/${tagName}`
            : keyword
            ? `/api/meeting/fuzzySearch/${keyword}`
            : "/api/meeting";
        axios
            .get(url, {
                cancelToken: source.token,
            })
            .then((res) => {
                setLoading(false);
                res.data && setMeetings(res.data.meetings);
                console.log(res.data);
            })
            .catch((err) => {
                setLoading(false);
                errHandler(err);
                setError("An error occured. Please enter valid characters.");
            });
        return () => {
            source.cancel();
        };
    }, [tagName, keyword]);

    return { meetings, loading, error };
}

export function GetMeetingsWithTag(tagName) {
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState("loading...");
    const [error, setError] = useState(null);

    useEffect(() => {
        const source = axios.CancelToken.source();
        axios
            .get(`/api/meeting/getByTag/${tagName}`, {
                cancelToken: source.token,
            })
            .then((res) => {
                setLoading(false);
                res.data && setMeetings(res.data.meetings);
                console.log(res);
            })
            .catch((err) => {
                setLoading(false);
                errHandler(err);
                setError("An error occured.");
            });
        return () => {
            source.cancel();
        };
    }, [tagName]);

    return { meetings, loading, error };
}

export function GetMeetingsBySearch(keyword) {
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState("loading...");
    const [error, setError] = useState(null);

    useEffect(() => {
        const source = axios.CancelToken.source();
        axios
            .get(`/api/meeting/fuzzySearch/${keyword}`, {
                cancelToken: source.token,
            })
            .then((res) => {
                setLoading(false);
                res.data && setMeetings(res.data.searchResult);
                console.log(res.data);
            })
            .catch((err) => {
                setLoading(false);
                errHandler(err);
                setError("An error occured. Please enter valid characters.");
            });
        return () => {
            source.cancel();
        };
    }, [keyword]);

    return { meetings, loading, error };
}

export async function CreateMeeting(meeting) {
    let data = await axios
        .post(`/api/meeting/create`, meeting)
        .then((res) => res.data)
        .catch((err) => errHandler(err));
    return data;
}

export async function EditMeeting(meeting, id) {
    let data = await axios
        .post(`/api/meeting/edit/${id}`, meeting)
        .then((res) => res.data)
        .catch((err) => errHandler(err));
    return data;
}

export async function DeleteMeeting(id) {
    const data = await axios
        .delete(`/api/meeting/delete/${id}`)
        .then((res) => res.data)
        .catch((err) => errHandler(err));
    return data;
}

function errHandler(error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.data.msg){
            return error.response.data.msg;
        }else{
            return error.response.data;
        }
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        // console.log(error.request);
        return "timeout";
    } else {
        // Something happened in setting up the request that triggered an Error
        return error.message;
    }
}

//zhengtian lu

export function Getprofile() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState("loading...");
    const [error, setError] = useState(null);

    useEffect(() => {
        const source = axios.CancelToken.source();
        axios
            .get(`/api/profile`, { cancelToken: source.token })
            .then((res) => {
                setLoading(false);
                res.data && setData(res.data.info);
                console.log(res);
            })
            .catch((err) => {
                setLoading(false);
                errHandler(err);
                setError("An error occured.");
            });
        return () => {
            source.cancel();
        };
    }, []);

    return { data, loading, error };
}

export function GetRegister(register) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState("loading...");
    const [error, setError] = useState(null);

    useEffect(() => {
        const source = axios.CancelToken.source();
        axios
            .get(`/api/register`, { cancelToken: source.token })
            .then((res) => {
                setLoading(false);
                res.data && setData(res.data);
                console.log(res);
            })
            .catch((err) => {
                setLoading(false);
                errHandler(err);
                setError("An error occured.");
            });
        return () => {
            source.cancel();
        };
    }, []);

    return { data, loading, error };
}

export function uploadPhoto(formdata) {
    const source = axios.CancelToken.source();
    axios
        .post(`/api/upload`, formdata, { cancelToken: source.token })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            errHandler(err);
        });
}

export function GetPhoto() {
    const [photo, setPhoto] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const source = axios.CancelToken.source();
        axios
            .get(`/api/getPhoto`, { cancelToken: source.token })
            .then((res) => {
                res.data && setPhoto(res.data.photo);
                console.log(res);
            })
            .catch((err) => {
                errHandler(err);
                setError("An error occured.");
            });
        return () => {
            source.cancel();
        };
    }, []);

    return { photo, error };
}

export async function changeDetails(details) {
    let data = await axios
        .post(`/api/changeDetails`, details)
        .then((res) => res.data)
        .catch((err) => errHandler(err));
    return data;
}

export function changePassword(data) {
    const source = axios.CancelToken.source();
    axios
        .post(`/api/changePassword`, data, { cancelToken: source.token })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            errHandler(err);
        });
}

// setting
export function GetTheme() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState("loading...");
    const [error, setError] = useState(null);

    useEffect(() => {
        const source = axios.CancelToken.source();
        axios
            .get(`/api/userPreferredColor`, { cancelToken: source.token })
            .then((res) => {
                setLoading(false);
                setData(res.data.palette);
                console.log(res.data.palette);
            })
            .catch((err) => {
                setLoading(false);
                errHandler(err);
                setError("An error occured.");
            });
        return () => {
            source.cancel();
        };
    });

    return { data, loading, error };
}

