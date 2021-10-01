import axios from 'axios'

// Axios interceptors are functions that Axios calls for every request
axios.interceptors.request.use(
    config => {
        config.headers.authorization = localStorage.getItem("token"); // we put our token in the header
        return config;
    }
    ,
    error => {
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
      url:endpoint,
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        userId: user.userId,
        password: user.password
      },
      {withCredentials: true} // IMPORTANT
      )    
    })
      .then(res => res.data)
      .catch(err => console.log(err))
  
    // put token ourselves in the local storage, we will
    // send the token in the request header to the API server 
    localStorage.setItem('token', data.token);

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
      url:endpoint,
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify(user,
      {withCredentials: true} // IMPORTANT
      )    
    })
      .then(res => res.data)
      .catch(err => console.log(err))

    return data;
}
