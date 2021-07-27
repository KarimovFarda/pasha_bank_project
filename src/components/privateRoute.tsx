import React, { FunctionComponent } from "react";
import { Redirect, Route } from "react-router-dom";

export const PrivateRoute: FunctionComponent<any> = ({
  component: Component,
  ...rest
}) => {

  const accessToken = localStorage.getItem("token");

  return (
    <Route
      {...rest}
      render={(props) => {
        return accessToken ? (
          <Component {...props} />
        ) : (
          <Redirect to={"/"} />
        );
      }}
    />
  );
};
