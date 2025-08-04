import { useState, useEffect } from "react";
import CommonPanelMini from "../components/CommonPanelMini";
import styles from "./DoctorRequest.module.scss";
import { ChevronLeft, SquarePen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import DoctorNewRequest from "./DoctorNewRequest";
import { useDispatch, useSelector } from "react-redux";
import { getDoctorRequests } from "../../../components/State/Doctor/Action.js";

const DoctorRequest = () => {
  const now = dayjs();
  const yesterday = now.subtract(1, "day");
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

  const doctor = useSelector((store) => store.doctor.doctorRequests);

  // console.log("Doc: ",doctor)

  const formattedRequests =
    doctor?.map((item, index) => ({
      id: item._id || index,
      message: item.description || item.purpose || "No message provided",
      requester: item.requestBy?.name || "Unknown Doctor",
      role: item.requestBy?.specialization || "Unknown Role",
      requestedOn: item.createdAt,
      avatarUrl: "https://i.pravatar.cc/30?img=33",
      active: item.status?.toLowerCase() === "active",
      background: item.status?.toLowerCase() === "active" ? "blue" : "gray",
      target: item.status?.toLowerCase() === "active", // customize if needed
    })) || [];

  const requests = formattedRequests;

  const navigate = useNavigate();
  const handleBackButton = () => {
    navigate("/doctor");
  };

  const handleRequestDetail = () => {
    navigate("/doctor/doctor-request/request-details");
  };
  // Filter requests based on selected tab
  const filteredRequests = requests.filter((req) =>
    selectedTab === "active" ? req.active : !req.active
  );

  // Group filtered requests by day
  const groupedRequests = groupRequestsByDay(filteredRequests);

  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    document.body.style.overflow = activeModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeModal]);

  const openNewRequest = () => setActiveModal("NewRequest");

  const closeModal = () => setActiveModal(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDoctorRequests("active"));
  }, [dispatch]);

  const handleActive = () => {
    setSelectedTab("active");
    dispatch(getDoctorRequests("active"));
  };

  const handleInactive = () => {
    setSelectedTab("inactive");
    dispatch(getDoctorRequests("inactive"));
  };

  return (
    <div>
      <CommonPanelMini />
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.leftHeader}>
            <div className={styles.backBtn}>
              <ChevronLeft onClick={handleBackButton} />
            </div>
            <span>Request</span>
          </div>
          <div className={styles.rightHeader}>
            <button onClick={openNewRequest}>
              <SquarePen size={18} />
              <span>New Request</span>
            </button>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.selection}>
            <div
              onClick={() => handleActive()}
              className={selectedTab === "active" ? styles.selectedTab : ""}
            >
              <span>Active Request</span>
            </div>
            <div
              onClick={() => handleInactive()}
              className={selectedTab === "inactive" ? styles.selectedTab : ""}
              style={{ cursor: "pointer" }}
            >
              <span>Inactive Request</span>
            </div>
          </div>

          {activeModal === "NewRequest" && (
            <>
              <div
                className={styles["backdrop-overlay"]}
                onClick={closeModal}
              />
              <div className={styles["newRequest"]}>
                <DoctorNewRequest onClose={closeModal} />
              </div>
            </>
          )}

          {filteredRequests.length === 0 ? (
            <div className={styles.noData}>
              <p>No requests found.</p>
            </div>
          ) : (
            <div className={styles.activeReq}>
              {selectedTab === "active" &&
                Object.entries(groupedRequests).map(([dayLabel, reqs]) => (
                  <div key={dayLabel} className={styles.dateSection}>
                    <p>{dayLabel}</p>
                    {reqs.map((req) => (
                      <div
                        key={req.id}
                        onClick={handleRequestDetail}
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
                        onClick={handleRequestDetail}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorRequest;
