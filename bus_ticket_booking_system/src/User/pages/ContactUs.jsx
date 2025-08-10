import React, { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaUser,
  FaComment,
} from "react-icons/fa";
import { MdSubject } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Here you would typically send the data to your backend
      console.log("Form submitted:", formData);
      toast.success("Your message has been sent successfully!");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } else {
      toast.error("Please fill all the details");
    }
  };

  return (
    <div className="container py-5">
      <div className="row">
        {/* Page Header */}
        <div className="col-12 text-center mb-4">
          <h1 className="display-4 text-primary">Contact Us</h1>
          <p className="lead">Have questions? We're here to help!</p>
        </div>

        {/* Contact Information */}
        <div className="col-lg-4 mb-4">
          <div className="card h-80 shadow-sm border-0">
            <div className="card-body">
              <h3 className="h4 mb-4 text-primary">Contact Information</h3>

              <div className="d-flex mb-4">
                <div className="me-3 text-primary">
                  <FaPhone size={24} />
                </div>
                <div>
                  <h5 className="h6 mb-1">Phone</h5>
                  <p className="mb-0">+91 9865748263</p>
                  <p>24/7 Customer Support</p>
                </div>
              </div>

              <div className="d-flex mb-4">
                <div className="me-3 text-primary">
                  <FaEnvelope size={24} />
                </div>
                <div>
                  <h5 className="h6 mb-1">Email</h5>
                  <p className="mb-0">support@route360.com</p>
                  <p>Response within 24 hours</p>
                </div>
              </div>

              <div className="d-flex">
                <div className="me-3 text-primary">
                  <FaMapMarkerAlt size={24} />
                </div>
                <div>
                  <h5 className="h6 mb-1">Headquarters</h5>
                  <p className="mb-0">Sunbean Hinjewadi</p>
                  <p>Pune, 411057</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h4 className="h4 mb-4 text-primary">Send us a message</h4>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">
                        <FaUser className="me-2" /> Full Name
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.name ? "is-invalid" : ""
                        }`}
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                      />
                      {errors.name && (
                        <div className="invalid-feedback">{errors.name}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        <FaEnvelope className="me-2" /> Email Address
                      </label>
                      <input
                        type="email"
                        className={`form-control ${
                          errors.email ? "is-invalid" : ""
                        }`}
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">
                      <MdSubject className="me-2" /> Subject
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.subject ? "is-invalid" : ""
                      }`}
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                    />
                    {errors.subject && (
                      <div className="invalid-feedback">{errors.subject}</div>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      <FaComment className="me-2" /> Your Message
                    </label>
                    <textarea
                      className={`form-control ${
                        errors.message ? "is-invalid" : ""
                      }`}
                      id="message"
                      name="message"
                      rows="3"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                    ></textarea>
                    {errors.message && (
                      <div className="invalid-feedback">{errors.message}</div>
                    )}
                  </div>
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-primary btn-md">
                    <FaPaperPlane className="me-2" /> Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Map Embed */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="card shadow-sm border-0">
            <div className="card-body p-0">
              <iframe
                title="Route360 Headquarters"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242117.25010212502!2d73.5511010583121!3d18.525194747648126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bd1db1bc90fb%3A0x762a3a2860faa444!2sSunbeam%20Infratech!5e0!3m2!1sen!2sin!4v1754865075836!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
