import axios from "axios";
import { useEffect, useState } from "react/cjs/react.development";

// Axios interceptors are functions that Axios calls for every request
axios.interceptors.request.use(
    (config) => {
        config.headers.authorization = localStorage.getItem("token"); // we put our token in the header
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// component for handling user login
export async function loginUser(user) {
    // define the route which the FoodBuddy API is handling
    // login/authentication
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
    localStorage.setItem("token", data.token);

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

export function getGroups(tab) {
    // let data = await axios.get(`/api/doRegister`)
    //   .then(res => res.data)
    //   .catch(err => console.log(err))

    // return data;

    if (tab === "contact") {
        return [
            {
                value: 1,
                label: "all",
            },
            {
                value: 2,
                label: "family",
            },
            {
                value: 3,
                label: "friend",
            },
        ];
    } else {
        return [
            {
                value: 1,
                label: "all",
            },
            {
                value: 2,
                label: "party",
            },
            {
                value: 3,
                label: "business",
            },
            {
                value: 4,
                label: "date",
            },
        ];
    }
}

// // contact

// // function getOneContact(id) {
// //   return axios.get(`api/contact/${id}`, {withCredentials:true}).then(res => res.data);
// // }

// // export function useOneContact(id) {
// //   const [loading, setLoading] = useState(true);
// //   const [contact, setContact] = useState([]);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     getOneContact(id)
// //       .then(contact => {
// //         setContact(contact);
// //         setLoading(false);
// //       })
// //       .catch(e => {
// //         console.log(e);
// //         setError(e);
// //         setLoading(false);
// //       });
// //   }, [id]);

// //   return {
// //     loading,
// //     contact,
// //     error
// //   };
// // }

// // function getContacts() {
// //   return axios.get(`api/contact`, {withCredentials:true}).then(res => res.data);
// // }

// // export function useContacts() {
// //   const [loading, setLoading] = useState(true);
// //   const [contacts, setContacts] = useState([]);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     getContacts()
// //       .then(contacts => {
// //         setContacts(contacts);
// //         setLoading(false);
// //       })
// //       .catch(e => {
// //         console.log(e);
// //         setError(e);
// //         setLoading(false);
// //       });
// //   });

// //   return {
// //     loading,
// //     contacts,
// //     error
// //   };
// // }

// // export async function createContact(contact) {
// //   let data = await axios.post('/api/contact/create', contact)
// //   .then(res => res.data)
// //   .catch(err => console.log(err));

// //   return data;
// // }

export function GetOneContact(id) {
    const [contact, setContact] = useState([]);
    const [loading, setLoading] = useState("loading...");
    const [error, setError] = useState(null);

    useEffect(() => {
      const source = axios.CancelToken.source();
      axios
          .get(`/api/contact/${id}`, { cancelToken: source.token })
          .then((res) => {
              setLoading(false);
              res.data && setContact(res.data);
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

  return { contact, loading, error };
}

export function GetContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState("loading...");
  const [error, setError] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
        .get(`/api/contact`, { cancelToken: source.token })
        .then((res) => {
            setLoading(false);
            res.data && setContacts(res.data);
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

return { contacts, loading, error };
}

export function CreateContact(contact) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("loading...");
  const [error, setError] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
        .post(`/api/contact/create`, contact, { cancelToken: source.token })
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
}, [contact]);

return { data, loading, error };
}

export function EditContact(contact) {
  //const [data, setData] = useState([]);
  const [loading, setLoading] = useState("loading...");
  const [error, setError] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
        .put(`/api/contact/${contact.id}`, contact, { cancelToken: source.token })
        // .then((res) => {
        //     setLoading(false);
        //     res.data && setData(res.data);
        //     console.log(res);
        // })
        .catch((err) => {
            setLoading(false);
            errHandler(err);
            setError("An error occured.");
        });
    return () => {
        source.cancel();
    };
}, [contact]);

//return { data, loading, error };
return {loading, error};
}

export function DeleteOneContact(id) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("loading...");
  const [error, setError] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
        .delete(`/api/contact/${id}`, { cancelToken: source.token })
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
}, [id]);

return { data, loading, error };
}

// // export function useFetch(url) {
// //     const [data, setData] = useState([]);
// //     const [loading, setLoading] = useState("loading...");
// //     const [error, setError] = useState(null);

// //     useEffect(() => {
// //         const source = axios.CancelToken.source();
// //         axios
// //             .get(url, { cancelToken: source.token })
// //             .then((res) => {
// //                 setLoading(false);
// //                 res.data && setData(res.data);
// //                 console.log(res);
// //             })
// //             .catch((err) => {
// //                 setLoading(false);
// //                 errHandler(err);
// //                 setError("An error occured.");
// //             });
// //         return () => {
// //             source.cancel();
// //         };
// //     }, [url]);

// //     return { data, loading, error };
// // }

function errHandler(error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
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
export function getprofile(profile){
    aixios({
        method : 'get' ,
        url : '/api/profile'
    })
        .then (res => profile(res.data))
        .catch(err => console.err(err));
}

export function getRegister(register){
    aixios({
        method : 'get',
        url : '/api/register'
    })
        .then (reg => register(res.data))
        .catch(err => console(err));
}

export function getprofile(profile) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState("loading...");
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const source = axios.CancelToken.source();
      axios
          .get(`/api/profile${id}`, { cancelToken: source.token })
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
  }, [id]);
  
  return { data, loading, error };
  }

  export function getRegister(register) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState("loading...");
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const source = axios.CancelToken.source();
      axios
          .get(`/api/register${id}`, { cancelToken: source.token })
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
  }, [id]);
  
  return { data, loading, error };
  }
