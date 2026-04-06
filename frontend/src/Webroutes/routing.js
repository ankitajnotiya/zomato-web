import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../pages/layout";
import Home from "../pages/home";
import Login from "../authentication/login";
import Signup from "../authentication/signup";
import TermsPolicy from "../pages/termspolicy";
import Contact from "../pages/contact";
import AboutUs from "../pages/aboutus";
import Support from "../pages/support";
import FAQ from "../pages/faq";
import PrivacyPolicy from "../pages/privacypolicy";
import CookiePolicy from "../pages/cookie-policy";
import ForgotPassword from "../authentication/forgotpassword";
import Verify from "../authentication/verify";
import CreatePassword from "../authentication/createpasswrod";
import MyOrder from "../pages/myorder";
import CollectionDetails from "../pages/collectionDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="support" element={<Support />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="privacypolicy" element={<PrivacyPolicy />} />
          <Route path="termspolicy" element={<TermsPolicy />} />
          <Route path="cookie-policy" element={<CookiePolicy />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
          <Route path="createpasswrod" element={<CreatePassword />} />
          <Route path="verify" element={<Verify />} />
          <Route path="myorder" element={<MyOrder />} />
          <Route path="collection/:collectionId" element={<CollectionDetails />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
