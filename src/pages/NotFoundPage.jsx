import React from "react";
import { Link } from "react-router-dom";
import { LocaleConsumer } from "../contexts/LocaleContext";

function NotFoundPage() {
  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <div className="not-found-page">
            <h2 className="not-found-page__title">404</h2>
            <p className="not-found-page__message">
              {locale === "id"
                ? "Sayangnya, halaman yang Anda cari tidak dapat ditemukan"
                : "Unfortunately, the page you searched for is not found"}
            </p>
            <p className="not-found-page__home-page-direction">
              <Link to="/">
                {locale === "id"
                  ? "Kembali ke Halaman Utama"
                  : "Back to Home Page"}
              </Link>
            </p>
          </div>
        );
      }}
    </LocaleConsumer>
  );
}

export default NotFoundPage;
