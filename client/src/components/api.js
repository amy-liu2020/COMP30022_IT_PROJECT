import axios from 'axios'
import React, { useState } from "react";

// Axios interceptors are functions that Axios calls for every request
axios.interceptors.request.use(
    config => {
        config.headers.authorization = localStorage.getItem("token"); // we put our token in the header
        return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

// handle user login
// export function loginUser(user) {

//     // send post request
//     axios.post(`/api/login`, user)
//     .then(res => {
//         console.log(res);
        
//         console.log(token);
//     })
//     .catch(err => {
//         console.log(err);
//     });

//     return token;
// }


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
      .then(res => res.data);

    // check if login success
    console.log(data);
  
    // put token ourselves in the local storage, we will
    // send the token in the request header to the API server 
    localStorage.setItem('token', data.token);
    console.log(localStorage);
  
    // redirect to homepage -- another way to redirect
    //window.location.href = "/contact";
}