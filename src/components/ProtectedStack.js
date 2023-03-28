import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { asyncStorageKeys, labels } from "../dictionary";
import { getAuthorizationStatus } from "../utils/getAuthorizationStatus";
import Loader from "./Loader";

export default function ProtectedStack() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [showLoginLink, setShowLoginLink] = useState(false);
  useEffect(() => {
    const expireTimeout = setTimeout(() => {
      setShowLoginLink(true);
    }, 3000);
    const status = getAuthorizationStatus();
    if (status) {
      clearTimeout(expireTimeout);
      setIsUserLoggedIn(true);
    }
  }, []);
  return isUserLoggedIn ? (
    <Outlet />
  ) : (
    <>
      <Loader />
      {showLoginLink && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <p>{labels.notAuthorized}</p>
          <Link to={"/"}>{labels.login}</Link>
        </div>
      )}
    </>
  );
}
