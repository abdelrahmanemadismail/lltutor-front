import { createContext, useEffect, useState } from "react";

// Correct usage of createContext
export const authContext = createContext();

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      setIsRegistered(await checkIfSessionEnd(token));
    };

    checkSession();
  }, [token]);

  return (
    <authContext.Provider
      value={{
        token,
        setToken,
        isRegistered,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

//==============Authorization Functions=============
export function startANewSession() {
  const currentDate = new Date();
  localStorage.setItem("startDateSession", currentDate);
  currentDate.setMinutes(currentDate.getMinutes() + 60);
  localStorage.setItem("endDateSession", currentDate);
  localStorage.setItem("sessionFlag", "true");
}

export function endACurrentSession() {
  localStorage.setItem("sessionFlag", "false");
  localStorage.removeItem("user");
  localStorage.removeItem("endDateSession");
}

async function isUserSession(token) {
  if (token) {
    const resToken = await checkUser(token);
    if (resToken.status) {
      localStorage.setItem("token", resToken.token);
      startANewSession();
      return true;
    } else {
      endACurrentSession();
      return false;
    }
  } else {
    return false;
  }
}

async function checkIfSessionEnd(token) {
  const now = new Date();
  const endDateSessionFromLocalStorage = localStorage.getItem("endDateSession");

  if (token && endDateSessionFromLocalStorage) {
    const endDateSession = new Date(endDateSessionFromLocalStorage);

    if (now <= endDateSession) {
      localStorage.setItem("sessionFlag", "true");
      return true;
    } else {
      return await isUserSession(token);
    }
  } else {
    return await isUserSession(token);
  }
}

async function checkUser(token) {
  
  const url = `https://lltutor.runasp.net/accounts/validateToken?token=${token}`;
  console.log('Validating token with URL:', url);
  
  try {
    const response = await fetch(url);
    const result = await response.json();

    console.log('Response from validation:', result);

    if (response.ok) {
      if (!result.code) {
        return {
          status: true,
          token: result.token,
        };
      } else {
        return { status: false };
      }
    } else {
      console.error('Error:', result);
      return { status: false };
    }
  } catch (error) {
    console.error('Error validating token:', error);
    return { status: false };
  }
}
