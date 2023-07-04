import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <h2 className="not-found-page__title">404</h2>
      <p className="not-found-page__message">
        Unfortunately, the page you searched for is not found
      </p>
      <p className="not-found-page__home-page-direction">
        <Link to="/">Back to Home Page</Link>
      </p>
    </div>
  );
}

export default NotFoundPage;
