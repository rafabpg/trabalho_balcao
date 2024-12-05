import React, { useEffect } from 'react';
import {RouteProps,} from 'react-router-dom';
import axios from "axios";
import LoginPage from "@/pages/LoginPage";
import { useState } from 'react';
import { access } from 'fs';





const ProtectedRoute: React.FC<RouteProps> = ({element}:RouteProps) => {
  const [auth,SetAuth] = useState(false)
  const [loading, setLoading] = useState(true);
  const Auth = () => {
    const url = 'https://dynamic-herring-cosmic.ngrok-free.app/api/v1/auth/validate_token';
    var authData = {accessToken: "" , uid: "", client: "" };
    if (document.cookie != "") {
      const cookieData = document.cookie.match(/auth=([^;]*)/)![1];
      authData = JSON.parse(cookieData);
  }

    axios.get(url, {
      headers: {
        'access-token': authData.accessToken,
        'uid' : authData.uid,
        'client' : authData.client,
        'ngrok-skip-browser-warning': '69420',
      },
          }).then((response) => {
                  if(response.status == 200){
                    SetAuth(true);
                    setLoading(false);            
                  }
                  }).catch((error) => {
                    SetAuth(false);
                    setLoading(false);
                  }) ;
  }
   
  useEffect(() => {(async () => {await Auth()})();},[]); 
  
  if(loading){
    return (<></>)
  }
  else if (!auth) {
    return (<LoginPage/>)
  } 
  return (element)

};

export default ProtectedRoute;