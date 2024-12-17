import React, { useState } from "react";
import Swal from "sweetalert2";

function App() {
  const [formData, setFormData] = useState({
    employee_id: "",
    name: "",
    email: "",
    phone_number: "",
    department: "",
    date_of_joining: "",
    role: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate employee_id (1 to 5 digits)
  const validateEmployeeId = (value) => {
    if (!/^\d{1,5}$/.test(value)) {
      return "Employee ID must be less than 5 digits.";
    }
    return "";
  };

  // Validate phone_number (exactly 10 digits)
  const validatePhoneNumber = (value) => {
    if (!/^\d{10}$/.test(value)) {
      return "Phone number must be exactly 10 digits.";
    }
    return "";
  };

  // Validate email (valid email format)
  const validateEmail = (value) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email address.";
    }
    return "";
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    const employeeIdError = validateEmployeeId(formData.employee_id);
    const phoneNumberError = validatePhoneNumber(formData.phone_number);
    const emailError = validateEmail(formData.email);

    // If there are validation errors, show SweetAlert and return without submitting
    if (employeeIdError || phoneNumberError || emailError) {
      if (employeeIdError) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: employeeIdError,
          showConfirmButton: true,
          width: '300px', // Set custom width
          heightAuto: true, // Disable auto-height calculation
          padding: '20px',
        });
      }
      if (phoneNumberError) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: phoneNumberError,
          showConfirmButton: true,
          width: '300px', // Set custom width
          heightAuto: true, // Disable auto-height calculation
          padding: '20px',
        });
      }
      if (emailError) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: emailError,
          showConfirmButton: true,
          width: '300px', // Set custom width
          heightAuto: true, // Disable auto-height calculation
          padding: '20px',
        });
      }
      return; // Don't submit if there are errors
    }

    try {
      // Submit the form (assuming backend handling)
      const response = await fetch("http://localhost:5000/addEmployee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Show success alert
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Registration Successful!",
          showConfirmButton: false,
          timer: 2000,
        });

        // Reset form data after successful submission
        setFormData({
          employee_id: "",
          name: "",
          email: "",
          phone_number: "",
          department: "",
          date_of_joining: "",
          role: "",
        });
      } else {
        // Handle errors if the submission fails
        Swal.fire({
          position: "center",
          icon: "error",
          title: data.message || "Error in submission.",
          showConfirmButton: true,
       });
     }
    } catch (error) {
      console.error("Error submitting form:", error.message);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "An error occurred. Please try again.",
        showConfirmButton: true,
      });
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#f4f4f4",
        minHeight: "96vh",
      }}
    >
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "30px",
          backgroundColor: "white",
          width: "400px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px", marginTop:"10px" }}>
          Employee Details
        </h2>
        <form onSubmit={handleSubmit}>
          {[ 
            { name: "employee_id", label: "Employee ID", placeholder: "Enter Employee ID" },
            { name: "name", label: "Name", placeholder: "Enter your Name" },
            { name: "email", label: "Email", placeholder: "Enter your Email" },
            { name: "phone_number", label: "Phone Number", placeholder: "Enter your Phone Number" },
            { name: "department", label: "Department", placeholder: "Enter Department" },
            { name: "date_of_joining", label: "Date of Joining", type: "date", placeholder: "" },
            { name: "role", label: "Role", placeholder: "Enter Role" },
          ].map(({ name, label, placeholder, type = "text" }) => (
            <div key={name} className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px", display: "block" }}>{label}:</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="field"
                placeholder={placeholder}
                required
                style={{
                  width: "94%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              />
            </div>
          ))}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
