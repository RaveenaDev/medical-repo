import React from "react";
import doc1 from "../../../../assets/Doc1.png";
import doc2 from "../../../../assets/doc2.png";
import doc3 from "../../../../assets/doc3.png";
import doc4 from "../../../../assets/doc4.png";
const Solutions = () => {
  return (
    <div
      style={{
        background: "#E9EDF0",
        // width: "1599px",
        // height: "991px",
        borderTopRightRadius: "40px",
        borderBottomRightRadius: "40px",
        borderBottomLeftRadius: "40px",
        margin: "4rem 4rem",
        padding: "1rem 6.5rem",
      }}
    >
      <div
        style={{
          fontFamily: "Inter",
          fontWeight: "600",
          fontSize: "30px",
          lineHeight: "100%",
          letterSpacing: "0%",
          color: "#5663C2",
          display: "flex",
          justifyContent: "center",
        }}
      >
        Our Solution
      </div>
      <div
        style={{
          color: "#25307F",
          fontFamily: "Open Sans",
          fontWeight: "700",
          fontSize: "45px",
          lineHeight: "100%",
          letterSpacing: "0%",
          display: "flex",
          justifyContent: "center",
          marginTop: "1rem",
        }}
      >
        Hospital Software
      </div>
      <div
        style={{
          marginTop: "5rem",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "4rem",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundImage: `url(${doc1})`,
            backgroundSize: "cover", // Ensures the image covers the whole div
            backgroundPosition: "center", // Centers the image
            backgroundRepeat: "no-repeat", // Prevents repeating
            borderRadius: "20px",
          }}
        ></div>
        <div
          style={{
            backgroundColor: "#FFFFFF",

            padding: "4rem 1rem",
            borderRadius: "20px",
          }}
        >
          <div
            style={{
              color: "#000000",
              fontFamily: "Inter",
              fontWeight: "700",
              fontSize: "24px",
              lineHeight: "100%",
              letterSpacing: " 0%",
            }}
          >
            Tailored Access for Every Role
          </div>
          <div
            style={{
              color: "#555555B8",
              fontFamily: "Inter",
              fontWeight: "400",
              fontSize: "16px",
              lineHeight: "100%",
              letterSpacing: "0%",
              marginTop: "1rem",
            }}
          >
            Custom dashboards for Admins, Receptionists, and Doctors to manage
            operations effortlessly.
          </div>
        </div>

        <div
          style={{
            backgroundImage: `url(${doc2})`,
            backgroundSize: "cover", // Ensures the image covers the whole div
            backgroundPosition: "center", // Centers the image
            backgroundRepeat: "no-repeat", // Prevents repeating
            borderRadius: "20px",
          }}
        ></div>
        <div
          style={{
            backgroundColor: "#FFFFFF",
            //   width: "298px",

            padding: "4rem 1rem",
            borderRadius: "20px",
          }}
        >
          <div
            style={{
              color: "#000000",
              fontFamily: "Inter",
              fontWeight: "700",
              fontSize: "24px",
              lineHeight: "100%",
              letterSpacing: " 0%",
            }}
          >
            Smart Scheduling
          </div>
          <div
            style={{
              color: "#555555B8",
              fontFamily: "Inter",
              fontWeight: "400",
              fontSize: "16px",
              lineHeight: "100%",
              letterSpacing: "0%",
              marginTop: "1rem",
            }}
          >
            Book, reschedule, or manage appointments with ease and efficiency
          </div>
        </div>

        <div
          style={{
            backgroundImage: `url(${doc3})`,
            backgroundSize: "cover", // Ensures the image covers the whole div
            backgroundPosition: "center", // Centers the image
            backgroundRepeat: "no-repeat", // Prevents repeating
            borderRadius: "20px",
          }}
        ></div>
        <div
          style={{
            backgroundColor: "#FFFFFF",
            //   width: "298px",

            padding: "4rem 1rem",
            borderRadius: "20px",
          }}
        >
          <div
            style={{
              color: "#000000",
              fontFamily: "Inter",
              fontWeight: "700",
              fontSize: "24px",
              lineHeight: "100%",
              letterSpacing: " 0%",
            }}
          >
            Revenue Insights
          </div>
          <div
            style={{
              color: "#555555B8",
              fontFamily: "Inter",
              fontWeight: "400",
              fontSize: "16px",
              lineHeight: "100%",
              letterSpacing: "0%",
              marginTop: "1rem",
            }}
          >
            Track earnings across services, rooms, and consultations in
            real-time.
          </div>
        </div>

        <div
          style={{
            backgroundImage: `url(${doc4})`,
            backgroundSize: "cover", // Ensures the image covers the whole div
            backgroundPosition: "center", // Centers the image
            backgroundRepeat: "no-repeat", // Prevents repeating
            borderRadius: "20px",
          }}
        ></div>
        <div
          style={{
            backgroundColor: "#FFFFFF",
            //   width: "298px",

            padding: "4rem 1rem",
            borderRadius: "20px",
          }}
        >
          <div
            style={{
              color: "#000000",
              fontFamily: "Inter",
              fontWeight: "700",
              fontSize: "24px",
              lineHeight: "100%",
              letterSpacing: " 0%",
            }}
          >
            Patient Management
          </div>
          <div
            style={{
              color: "#555555B8",
              fontFamily: "Inter",
              fontWeight: "400",
              fontSize: "16px",
              lineHeight: "100%",
              letterSpacing: "0%",
              marginTop: "1rem",
            }}
          >
            Access consultation room, treatment progress, medical history, and
            prescriptions in one place.
          </div>
        </div>
      </div>
      <div
        style={{
          color: "#555555",
          fontFamily: "Inter",
          fontWeight: "400",
          fontSize: "1.5rem",
          lineHeight: "100%",
          letterSpacing: "0%",
          textAlign: "center",
          padding: "1rem",
          marginTop: "3rem",
        }}
      >
        HIMS is one of the best digital healthcare solutions for hospitals.
        Manage appointments, billing, lab, stock and inventory, pharmacy,
        In-patient department and more. Advanced EMR to manage patient health
        records and deliver improved patient care.
      </div>
    </div>
  );
};

export default Solutions;
