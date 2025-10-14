import React from "react";
import "./VisitCard.scss";

/**
 * Props:
 * - date: string
 * - description: string
 * - doctor: string
 * - typeofVisit: string ("Consultation" | "Admission" | etc.)
 * - department: string (can be "N/A" or empty)
 * - color: string (accent color bar at left; also used for default pill colors)
 * - onClick: () => void
 * - departmentbgColor?: string (override for department pill bg)
 * - departmentColor?: string (override for department pill text)
 * - status?: string (optional; e.g. "Admitted", "Pending")
 * - kind?: "consultation" | "admission" (optional; purely informational)
 */
const VisitCard = ({
                     date = "N/A",
                     description = "—",
                     doctor = "N/A",
                     typeofVisit = "",
                     department = "",
                     color = "#5461BE",
                     onClick,
                     departmentbgColor, // no default here; we compute final below
                     departmentColor,    // no default here; we compute final below
                     status,             // optional small chip in footer
                     kind,               // optional ("consultation" | "admission")
                   }) => {
  // Accent color map for quick theming
  const colorMap = {
    "#5461BE": { bg: "#DAE4FF", text: "#25307F" }, // Indigo
    "#2E823B": { bg: "#E9F0EC", text: "#2E823B" }, // Green
    "#EAA000": { bg: "#FFF6DD", text: "#8A5A00" }, // Amber
    "#F14400": { bg: "#FFEDE6", text: "#F14400" }, // Orange
  };

  // Resolve department pill colors with sensible fallbacks
  const mapped = colorMap[color] || { bg: "#F2F5FF", text: "#25307F" };
  const deptBg = departmentbgColor || mapped.bg;
  const deptText = departmentColor || mapped.text;

  const hasDepartment =
      department && department !== "N/A" && String(department).trim().length > 0;

  return (
      <div
          className="visit-card"
          onClick={onClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onClick && onClick();
            }
          }}
          aria-label={`Open ${typeofVisit || "record"} details`}
      >
        {/* Left accent bar */}
        <div className="visit-card-color" style={{ background: color }} />

        <div className="visit-card-content">
          {/* Top row: date + department pill */}
          <div className="visit-card-row">
            <p className="card-date" style={{ color }}>
              <svg
                  width="1vw"
                  height="18"
                  viewBox="0 0 16 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
              >
                <path
                    d="M1.33398 6.5V14.8333C1.33398 15.2754 1.50958 15.6993 1.82214 16.0118C2.1347 16.3244 2.55862 16.5 3.00065 16.5H13.0007C13.4427 16.5 13.8666 16.3244 14.1792 16.0118C14.4917 15.6993 14.6673 15.2754 14.6673 14.8333V6.5M1.33398 6.5V4.83333C1.33398 4.39131 1.50958 3.96738 1.82214 3.65482C2.1347 3.34226 2.55862 3.16667 3.00065 3.16667H4.66732M1.33398 6.5H14.6673M14.6673 6.5V4.83333C14.6673 4.39131 14.4917 3.96738 14.1792 3.65482C13.8666 3.34226 13.4427 3.16667 13.0007 3.16667H11.334M4.66732 3.16667H11.334M4.66732 3.16667V1.5M11.334 3.16667V1.5"
                    stroke="#25307F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
              </svg>
              {date}
            </p>

            {hasDepartment && (
                <p
                    className="visit-card-department"
                    style={{
                      backgroundColor: deptBg,
                      color: deptText,
                    }}
                    title={department}
                >
                  <svg
                      width="1.2vw"
                      height="20"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                  >
                    <path
                        d="M7.33268 9.33301C6.44863 9.33301 5.60078 8.98182 4.97566 8.3567C4.35054 7.73158 3.99935 6.88373 3.99935 5.99967V3.33301C3.99935 3.1562 4.06959 2.98663 4.19461 2.8616C4.31964 2.73658 4.4892 2.66634 4.66602 2.66634H5.33268C5.50949 2.66634 5.67906 2.5961 5.80409 2.47108C5.92911 2.34605 5.99935 2.17649 5.99935 1.99967C5.99935 1.82286 5.92911 1.65329 5.80409 1.52827C5.67906 1.40325 5.50949 1.33301 5.33268 1.33301H4.66602C4.13558 1.33301 3.62687 1.54372 3.2518 1.91879C2.87673 2.29387 2.66602 2.80257 2.66602 3.33301V5.99967C2.66687 6.75283 2.85053 7.49453 3.20122 8.16106C3.5519 8.8276 4.05913 9.39905 4.67935 9.82634C5.27583 10.3512 5.75949 10.9917 6.101 11.7091C6.4425 12.4265 6.63472 13.2058 6.66602 13.9997C6.66602 15.2374 7.15768 16.4243 8.03285 17.2995C8.90802 18.1747 10.095 18.6663 11.3327 18.6663C12.5704 18.6663 13.7573 18.1747 14.6325 17.2995C15.5077 16.4243 15.9993 15.2374 15.9993 13.9997V13.2397C16.6278 13.0774 17.1755 12.6915 17.5398 12.1543C17.904 11.6172 18.0599 10.9656 17.9781 10.3217C17.8963 9.6778 17.5825 9.08585 17.0955 8.65679C16.6085 8.22773 15.9817 7.99102 15.3327 7.99102C14.6836 7.99102 14.0569 8.22773 13.5699 8.65679C13.0829 9.08585 12.7691 9.6778 12.6873 10.3217C12.6055 10.9656 12.7613 11.6172 13.1256 12.1543C13.4899 12.6915 14.0376 13.0774 14.666 13.2397V13.9997C14.666 14.8837 14.3148 15.7316 13.6897 16.3567C13.0646 16.9818 12.2167 17.333 11.3327 17.333C10.4486 17.333 9.60078 16.9818 8.97566 16.3567C8.35054 15.7316 7.99935 14.8837 7.99935 13.9997C8.03233 13.2048 8.22663 12.4249 8.57046 11.7075C8.91428 10.99 9.40043 10.35 9.99935 9.82634C10.6171 9.39756 11.1217 8.82546 11.4701 8.15902C11.8184 7.49258 12 6.75165 11.9993 5.99967V3.33301C11.9993 2.80257 11.7886 2.29387 11.4136 1.91879C11.0385 1.54372 10.5298 1.33301 9.99935 1.33301H9.33268C9.15587 1.33301 8.9863 1.40325 8.86128 1.52827C8.73625 1.65329 8.66602 1.82286 8.66602 1.99967C8.66602 2.17649 8.73625 2.34605 8.86128 2.47108C8.9863 2.5961 9.15587 2.66634 9.33268 2.66634H9.99935C10.1762 2.66634 10.3457 2.73658 10.4708 2.8616C10.5958 2.98663 10.666 3.1562 10.666 3.33301V5.99967C10.666 6.43741 10.5798 6.87087 10.4123 7.27529C10.2448 7.6797 9.99923 8.04717 9.6897 8.3567C9.38018 8.66623 9.01271 8.91176 8.60829 9.07927C8.20388 9.24679 7.77042 9.33301 7.33268 9.33301Z"
                        fill={deptText}
                    />
                  </svg>
                  {department}
                </p>
            )}
          </div>

          {/* Description */}
          <div className="visit-card-description">
            <p>{description}</p>
          </div>

          {/* Footer: doctor • type • (optional) status */}
          <div className="visit-card-footer">
            {/*<p>{doctor}</p>*/}
            {doctor && typeofVisit ? <span className="bullet" /> : null}
            {typeofVisit ? <p>{typeofVisit}</p> : null}
            {status ? (
                <>
                  {(doctor || typeofVisit) ? <span className="bullet" /> : null}
                  <span
                      className="status-chip"
                      style={{
                        background: "#F5F6FB",
                        color: "#25307F",
                        borderRadius: 8,
                        padding: "2px 1px",
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                      title={status}
                  >
                {status}
              </span>
                </>
            ) : null}
          </div>
        </div>
      </div>
  );
};

export default VisitCard;
