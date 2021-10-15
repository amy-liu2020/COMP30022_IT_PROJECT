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

// component for handling user login
export async function loginUser(user) {
    const endpoint = `/api/login`;

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
            {
                userId: user.userId,
                password: user.password,
            },
            { withCredentials: true } // IMPORTANT
        ),
    })
        .then((res) => res.data)
        .catch((err) => console.log(err));

    // put token ourselves in the local storage, we will
    // send the token in the request header to the API server

    if (data !== undefined) {
        console.log(data);

        // set token
        localStorage.setItem("token", "Bearer " + data.token);

        // create url for profile image
        if (data.Photo) {
            console.log(data.Photo);
            localStorage.setItem("avatar", URL.createObjectURL(new Blob(data.Photo.data)));
        }
        
    }

    return data;
    // return data;
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
                console.log(res);
                if (res.data) {
                    // re-group tags
                    setTags(
                        res.data.tags.map((tag) => ({
                            value: tag.TagName,
                            label: tag.TagName,
                        }))
                    );
                }
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

export async function DeleteBinItem(id) {
    let data = await axios
        .post(`/api/bin/delete/:id`, [])
        .then((res) => res.data)
        .catch((err) => errHandler(err));

    return data;
}

export async function RestoreBinItem(id) {
    let data = await axios
        .post(`/api/bin/restore/:id`, [])
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

export function GetOneContact(id) {
    const [contact, setContact] = useState([]);
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
                res.data && setContact(res.data.contact);
                console.log(res.data.contact);
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

    return { contact, loading, error };
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

export function GetContactsByTag(tagName) {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState("loading...");
    const [error, setError] = useState(null);

    useEffect(() => {
        const source = axios.CancelToken.source();
        axios
            .get(`/api/contact/getByTag/${tagName}`, {
                cancelToken: source.token,
            })
            .then((res) => {
                setLoading(false);
                res.data && setContacts(res.data.contacts);
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
    const [meeting, setMeeting] = useState([]);
    const [loading, setLoading] = useState("loading...");
    const [error, setError] = useState(null);

    useEffect(() => {
        const source = axios.CancelToken.source();
        axios
            .get(`/api/meeting/${id}`, { cancelToken: source.token })
            .then((res) => {
                setLoading(false);
                res.data && setMeeting(res.data);
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
    }, [id]);

    return { meeting, loading, error };
}

export function GetMeetings() {
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState("loading...");
    const [error, setError] = useState(null);

    useEffect(() => {
        const source = axios.CancelToken.source();
        axios
            .get(`/api/meeting`, {
                cancelToken: source.token,
                params: { _limit: 5 }
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
    }, []);

    return { meetings, loading, error };
}

export function CreateMeeting(meeting) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState("loading...");
    const [error, setError] = useState(null);

    useEffect(() => {
        const source = axios.CancelToken.source();
        axios
            .post(`/api/meeting/create`, meeting, { cancelToken: source.token })
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
    }, [meeting]);

    return { data, loading, error };
}

export function EditMeeting(meeting) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState("loading...");
    const [error, setError] = useState(null);

    useEffect(() => {
        const source = axios.CancelToken.source();
        axios
            .patch(`/api/meeting/${meeting.id}`, meeting, {
                cancelToken: source.token,
            })
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
    }, [meeting]);

    //return { data, loading, error };
    return { loading, error };
}

// export function DeleteOneMeeting(id) {
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState("loading...");
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const source = axios.CancelToken.source();
//         axios
//             .delete(`/api/meeting/${id}`, { cancelToken: source.token })
//             .then((res) => {
//                 setLoading(false);
//                 res.data && setData(res.data);
//                 console.log(res);
//             })
//             .catch((err) => {
//                 setLoading(false);
//                 errHandler(err);
//                 setError("An error occured.");
//             });
//         return () => {
//             source.cancel();
//         };
//     }, [id]);

//     return { data, loading, error };
// }

export async function DeleteMeeting(id) {
    const data = await axios
        .delete(`/api/meeting/delete/${id}`)
        .then((res) => res.data)
        .catch((err) => errHandler(err));
    return data;
}


export function GetMeetingsByTag(tagName) {
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


function errHandler(error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
    }
}

//zhengtian lu

export function Getprofile(profile) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState("loading...");
    const [error, setError] = useState(null);

    useEffect(() => {
        const source = axios.CancelToken.source();
        axios
            .get(`/api/profile`, { cancelToken: source.token })
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


// setting
export function ChangeColor(color) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState("loading...");
    const [error, setError] = useState(null);

    useEffect(() => {
        const source = axios.CancelToken.source();
        axios
            .patch(`/api/setting`, color, { cancelToken: source.token })
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