import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <div className="container text-center">
        <div className="row jsutify-content-center mb-2 ">
          {/* Company Info */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">
              Route360
            </h5>
            <p>
              Your trusted partner for comfortable and reliable bus travel
              across the country.
            </p>
            <div className="mt-3">
              <a href="#" className="text-white me-2">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-white me-2">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-white me-2">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-white">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">
              Quick Links
            </h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-white">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/bus-routes" className="text-white">
                  Bus Routes
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-4 text-start">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">
              Contact Us
            </h5>
            <ul className="list-unstyled">
              <li className="mb-3 d-flex align-items-center">
                <FaMapMarkerAlt className="me-2" />
                <span>Sunbeam Hinjewadi, Pune, 411057</span>
              </li>
              <li className="mb-3 d-flex align-items-center">
                <FaPhone className="me-2" />
                <span>+91 9865748263</span>
              </li>
              <li className="d-flex align-items-center">
                <FaEnvelope className="me-2" />
                <span>support@route360.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="row">
          <div className="col-md-12 text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Route360. All rights reserved.
              <span className="ms-2">Designed with ❤️ for travelers</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
