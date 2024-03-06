import React from 'react';
import setCookie from 'cookies-next'
import CookieConsent,{ Cookies } from 'react-cookie-consent';

const CookieConsentBanner = () => {
    const cookie = Cookies.get("CKLconsent");
    const handleAccept = () => {
        setCookie("CKLconsent", "myCookieValue", {
          maxAge: 60 * 60 * 24 * 7, // Set expiration (1 week)
          path: "/", // Cookie path (optional)
        });
      };
  return (
    <CookieConsent
      location="bottom"
      buttonText="接受"
      cookieName="CKLconsent"
      style={{ background: "#333", color: "#fff" }}
      //onAccept={handleAccept}
      expires={1}
    >
      為了最佳使用體驗，本網站將使用cookie。
    </CookieConsent>
  );
};

export default CookieConsentBanner;