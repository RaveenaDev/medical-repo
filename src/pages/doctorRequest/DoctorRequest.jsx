import { useState } from "react";
import CommonPanel from "../doctor/components/CommonPanel";
import styles from "./DoctorRequest.module.scss";
import { ChevronLeft, SquarePen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const DoctorRequest = () => {
  const now = dayjs();
  const yesterday = now.subtract(1, "day");

  const requests = [
    {
      id: 1,
      message: "Order has been shipped from Chennai on Saturday, 28 Sept.",
      requester: "Dr. Shetty",
      role: "Head of Cardiology",
      requestedOn: now.toISOString(),
      avatarUrl: "https://i.pravatar.cc/30?img=22",
      active: true,
      background: "blue",
      target: true,
    },
    {
      id: 2,
      message: "Order has been shipped from Chennai on Saturday, 28 Sept.",
      requester: "Dr. Shetty",
      role: "Head of Cardiology",
      requestedOn: now.toISOString(),
      avatarUrl: "https://i.pravatar.cc/30?img=21",
      active: true,
      background: "blue",
      target: true,
    },
    {
      id: 3,
      message: "Order has been shipped from Chennai on Saturday, 28 Sept.",
      requester: "Dr. Shetty",
      role: "Head of Cardiology",
      requestedOn: yesterday.toISOString(),
      avatarUrl: "https://i.pravatar.cc/30?img=26",
      active: true,
      background: "gray",
    },
    {
      id: 4,
      message: "Order has been shipped from Chennai on Saturday, 28 Sept.",
      requester: "Dr. Shetty",
      role: "Head of Cardiology",
      requestedOn: now.toISOString(),
      avatarUrl: "https://i.pravatar.cc/30?img=33",
      active: true,
      background: "gray",
    },
    {
      id: 5,
      message: "Order has been shipped from Chennai on Saturday, 28 Sept.",
      requester: "Dr. Shetty",
      role: "Head of Cardiology",
      requestedOn: now.toISOString(),
      avatarUrl: "https://i.pravatar.cc/30?img=33",
      active: false,
      background: "gray",
      target: true,
    },
    {
      id: 6,
      message: "Order has been shipped from Chennai on Saturday, 28 Sept.",
      requester: "Dr. Shetty",
      role: "Head of Cardiology",
      requestedOn: now.toISOString(),
      avatarUrl: "https://i.pravatar.cc/30?img=33",
      active: false,
      background: "gray",
      target: true,
    },
    {
      id: 6,
      message: "Order has been shipped from Chennai on Saturday, 28 Sept.",
      requester: "Dr. Shetty",
      role: "Head of Cardiology",
      requestedOn: yesterday.toISOString(),
      avatarUrl: "https://i.pravatar.cc/30?img=33",
      active: false,
      background: "gray",
    },
    {
      id: 6,
      message: "Order has been shipped from Chennai on Saturday, 28 Sept.",
      requester: "Dr. Shetty",
      role: "Head of Cardiology",
      requestedOn: yesterday.toISOString(),
      avatarUrl: "https://i.pravatar.cc/30?img=33",
      active: false,
      background: "gray",
    },
    {
      id: 6,
      message: "Order has been shipped from Chennai on Saturday, 28 Sept.",
      requester: "Dr. Shetty",
      role: "Head of Cardiology",
      requestedOn: now.toISOString(),
      avatarUrl: "https://i.pravatar.cc/30?img=33",
      active: false,
      background: "gray",
    },
  ];

  function groupRequestsByDay(requests) {
    const groups = {};

    requests.forEach((req) => {
      const date = dayjs(req.requestedOn);

      let label;
      if (date.isSame(dayjs(), "day")) {
        label = "Today";
      } else if (date.isSame(dayjs().subtract(1, "day"), "day")) {
        label = "Yesterday";
      } else {
        label = date.format("DD MMM YYYY");
      }

      if (!groups[label]) {
        groups[label] = [];
      }
      groups[label].push(req);
    });

    return groups;
  }

  // State to track selected tab: "active" or "inactive"
  const [selectedTab, setSelectedTab] = useState("active");

  const navigate = useNavigate();
  const handleBackButton = () => {
    navigate("/doctor");
  };

  // Filter requests based on selected tab
  const filteredRequests = requests.filter((req) =>
    selectedTab === "active" ? req.active : !req.active
  );

  // Group filtered requests by day
  const groupedRequests = groupRequestsByDay(filteredRequests);

  return (
    <div>
      <CommonPanel />
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.leftHeader}>
            <div className={styles.backBtn}>
              <ChevronLeft onClick={handleBackButton} />
            </div>
            <span>Request</span>
          </div>
          <div className={styles.rightHeader}>
            <button>
              <SquarePen size={18} />
              <span>New Request</span>
            </button>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.selection}>
            <div
              onClick={() => setSelectedTab("active")}
              className={selectedTab === "active" ? styles.selectedTab : ""}
            >
              <span>Active Request</span>
            </div>
            <div
              onClick={() => setSelectedTab("inactive")}
              className={selectedTab === "inactive" ? styles.selectedTab : ""}
              style={{ cursor: "pointer" }}
            >
              <span>Inactive Request</span>
            </div>
          </div>

          <div className={styles.activeReq}>
            {selectedTab === "active" &&
              Object.entries(groupedRequests).map(([dayLabel, reqs]) => (
                <div key={dayLabel} className={styles.dateSection}>
                  <p>{dayLabel}</p>
                  {reqs.map((req) => (
                    <div
                      key={req.id}
                      className={`${styles.requestItem} ${
                        req.background === "blue"
                          ? styles.blueBackground
                          : styles.grayBackground
                      }`}
                    >
                      <img
                        src={req.avatarUrl}
                        alt="avatar"
                        className={styles.avatar}
                      />
                      <div className={styles.reqContent}>
                        <div
                          className={`styles.message ${
                            req.background === "blue"
                              ? styles.blueText
                              : styles.message
                          }`}
                        >
                          {req.message}
                        </div>
                        <div
                          className={`styles.subText ${
                            req.background === "blue"
                              ? styles.blueSubText
                              : styles.subText
                          }`}
                        >
                          {req.requester} ({req.role}) has requested on{" "}
                          {dayjs(req.requestedOn).format(
                            "dddd, D MMM at h:mm A"
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}

            {selectedTab === "inactive" &&
              Object.entries(groupedRequests).map(([dayLabel, reqs]) => (
                <div key={dayLabel} className={styles.dateSection}>
                  <p>{dayLabel}</p>
                  {reqs.map((req) => (
                    <div
                      key={req.id}
                      className={`${styles.requestItem} ${
                        req.background === "blue"
                          ? styles.blueBackground
                          : styles.grayBackground
                      }`}
                    >
                      <img
                        src={req.avatarUrl}
                        alt="avatar"
                        className={styles.avatar}
                      />
                      <div className={styles.reqContent}>
                        <div
                          className={`${
                            req.target === true
                              ? styles.TLMessage
                              : styles.message
                          }`}
                        >
                          {req.message}
                        </div>
                        <div className={styles.subText}>
                          {req.requester} ({req.role}) has requested on{" "}
                          {dayjs(req.requestedOn).format(
                            "dddd, D MMM at h:mm A"
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorRequest;
