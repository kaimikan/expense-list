// HOC - a component that renders another component
// reuse code
// render hijacking
// abstract state
import React from "react";
import ReactDOM from "react-dom";

const Info = (props) => (
  <div>
    <h1>Info</h1>
    <p>The info is: {props.info}</p>
  </div>
);

const withAdminWarning = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAdmin && <p>This is private info. Please don't share!</p>}
      {/* spread operator to pass attributes to WrappedComponent */}
      <WrappedComponent {...props} />
    </div>
  );
};

const AdminInfo = withAdminWarning(Info);

const requireAuthentication = (WrappedComponent) => {
  return (props) => (
    <div>
      {/*{props.isAutheticated && <WrappedComponent {...props} />}*/}
      {props.isAutheticated ? (
        <WrappedComponent {...props} />
      ) : (
        <p>you can't see the info</p>
      )}
    </div>
  );
};

const AuthenticationInfo = requireAuthentication(Info);

/* ReactDOM.render(
  <AdminInfo isAdmin={true} info="some text" />,
  document.getElementById("app")
); */

ReactDOM.render(
  <AuthenticationInfo isAutheticated={false} info="some other text" />,
  document.getElementById("app")
);
