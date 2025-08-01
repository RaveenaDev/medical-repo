import React from "react";
import styles from "./Complete.module.scss";

const Complete = ({ onClose, onComplete, completeData }) => {
    const handleComplete = () => {
        onComplete();
    };

    const handlePrint = () => {
        const formattedContent = Object.entries(completeData)
            .map(([sectionTitle, sectionData]) => {
                if (!sectionData || (typeof sectionData === "object" && Object.keys(sectionData).length === 0)) return "";

                const renderEntry = (key, value) => {
                    if (!value) return "";

                    if (typeof value === "object" && value.value !== undefined && value.unit) {
                        // Handles weight, height, etc.
                        return `<p><strong>${capitalize(key)}:</strong> ${value.value} ${value.unit}</p>`;
                    }

                    if (Array.isArray(value)) {
                        if (value.length === 0) return "";
                        if (typeof value[0] === "object") {
                            return value
                                .map((item) => {
                                    if (item.question && item.answer)
                                        return `<p><strong>${item.question}:</strong> ${item.answer}</p>`;
                                    else
                                        return Object.entries(item)
                                            .map(([k, v]) => `<p><strong>${k}:</strong> ${v}</p>`)
                                            .join("");
                                })
                                .join("");
                        } else {
                            return value.map((v) => `<p>${v}</p>`).join("");
                        }
                    }

                    if (typeof value === "object") {
                        return Object.entries(value)
                            .map(([k, v]) => `<p><strong>${capitalize(k)}:</strong> ${v}</p>`)
                            .join("");
                    }

                    return `<p><strong>${capitalize(key)}:</strong> ${value}</p>`;
                };

                const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);


                const sectionBody =
                    typeof sectionData === "object"
                        ? Object.entries(sectionData)
                            .map(([key, value]) => renderEntry(key, value))
                            .join("")
                        : `<p>${sectionData}</p>`;

                return `
        <div style="margin-bottom: 20px;">
          <h2 style="border-bottom: 1px solid #ccc; color: #25307F;">${sectionTitle}</h2>
          ${sectionBody}
        </div>
      `;
            })
            .join("");

        const printWindow = window.open("", "", "height=700,width=900");
        printWindow.document.write(`
    <html>
      <head>
        <title>Prescription</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            line-height: 1.6;
          }
          h2 {
            margin-bottom: 10px;
          }
          p {
            margin: 2px 0;
          }
        </style>
      </head>
      <body>
        <h1 style="text-align:center; margin-bottom: 30px;">Prescription Summary</h1>
        ${formattedContent}
      </body>
    </html>
  `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };


    return (
        <div style={{ minWidth: "400px", backgroundColor: "#ffffff" }}>
            <div className={styles.container} style={{ height: "auto", padding: "1rem 0", gap: "12px" }}>
                <p style={{ fontSize: "1.16rem" }}>Prescription Delivery</p>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <p style={{ fontSize: "15px" }}>How would you like to receive the prescription?</p>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "1rem 1.5rem"
                    }}>
                        <div
                            onClick={handlePrint}
                            style={{
                                gap: "1rem",
                                padding: "8px 0",
                                cursor: "pointer",
                                backgroundColor: "#F2F5FF",
                                width: "100%",
                                display: "flex",
                                justifyContent: "center"
                            }}
                        >
                            <svg width="22" height="22" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M20 7.58333H7V3.25H20V7.58333ZM20 13.5417C20.3069 13.5417 20.5642 13.4378 20.7719 13.2302C20.9795 13.0226 21.0833 12.7653 21.0833 12.4583C21.0833 12.1514 20.9795 11.8941 20.7719 11.6865C20.5642 11.4788 20.3069 11.375 20 11.375C19.6931 11.375 19.4358 11.4788 19.2281 11.6865C19.0205 11.8941 18.9167 12.1514 18.9167 12.4583C18.9167 12.7653 19.0205 13.0226 19.2281 13.2302C19.4358 13.4378 19.6931 13.5417 20 13.5417ZM17.8333 20.5833V16.25H9.16667V20.5833H17.8333ZM20 22.75H7V18.4167H2.66667V11.9167C2.66667 10.9958 2.98264 10.224 3.61458 9.60104C4.24653 8.97813 5.01389 8.66667 5.91667 8.66667H21.0833C22.0042 8.66667 22.776 8.97813 23.399 9.60104C24.0219 10.224 24.3333 10.9958 24.3333 11.9167V18.4167H20V22.75Z"
                                    fill="#25307F"
                                />
                            </svg>
                            <p style={{ fontSize: "14px" }}>Print Prescription</p>
                        </div>
                        <div style={{
                            gap: "1rem",
                            padding: "8px 0",
                            cursor: "pointer",
                            backgroundColor: "#F2F5FF",
                            width: "100%",
                            display: "flex",
                            justifyContent: "center"
                        }}>
                            <svg width="20" height="20" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0H26V26H0V0Z" fill="#D9D9D9" fillOpacity="0.41" />
                                <path
                                    d="M4.33333 21.6667C3.7375 21.6667 3.22743 21.4545 2.80313 21.0302C2.37882 20.6059 2.16667 20.0958 2.16667 19.5V6.5C2.16667 5.90417 2.37882 5.3941 2.80313 4.96979C3.22743 4.54549 3.7375 4.33333 4.33333 4.33333H21.6667C22.2625 4.33333 22.7726 4.54549 23.1969 4.96979C23.6212 5.3941 23.8333 5.90417 23.8333 6.5V19.5C23.8333 20.0958 23.6212 20.6059 23.1969 21.0302C22.7726 21.4545 22.2625 21.6667 21.6667 21.6667H4.33333ZM13 14.0833L21.6667 8.66667V6.5L13 11.9167L4.33333 6.5V8.66667L13 14.0833Z"
                                    fill="#25307F"
                                />
                            </svg>
                            <p style={{ fontSize: "14px" }}>Email Prescription</p>
                        </div>
                    </div>
                </div>

                <div>
                    <button onClick={handleComplete} style={{ width: 'fit-content', padding: "8px 1.2rem" }}>
                        Confirm and Proceed
                    </button>
                    <button onClick={onClose} style={{
                        width: 'fit-content',
                        padding: "4px 1rem",
                        backgroundColor: '#ffffff',
                        border: '1px solid #25307f',
                        color: "#292929",
                        fontWeight: 600
                    }}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Complete;
