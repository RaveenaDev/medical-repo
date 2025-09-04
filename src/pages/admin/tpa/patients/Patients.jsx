import { useEffect, useState } from "react";
import { Button, Box, TablePagination } from "@mui/material";
import styles from "./Patients.module.scss";
import ViewModal from "./modals/ViewModal";
import {useDispatch, useSelector} from "react-redux";
import {getInsuredPatients} from "../../../../components/State/Admin/Action.js";
const Patients = () => {
  const dummyBillingRecords = [
    {
      _id: "1",
      caseId: "C-1001",
      patient: {
        name: "John Doe",
        phone: "9876543210",
        email: "john.doe@example.com",
      },
      createdAt: "2025-08-10T10:00:00Z",
      totalAmount: "₹1,200",
      status: "Completed",
      company: "Apollo Hospitals",
    },
    {
      _id: "2",
      caseId: "C-1002",
      patient: {
        name: "Jane Smith",
        phone: "9123456780",
        email: "jane.smith@example.com",
      },
      createdAt: "2025-08-11T15:30:00Z",
      totalAmount: "₹800",
      status: "Pending",
      company: "Fortis Healthcare",
    },
    {
      _id: "3",
      caseId: "C-1003",
      patient: {
        name: "Raj Kumar",
        phone: "9012345678",
        email: "raj.kumar@example.com",
      },
      createdAt: "2025-08-12T08:45:00Z",
      totalAmount: "₹2,500",
      status: "Ongoing",
      company: "Max Healthcare",
    },
    {
      _id: "4",
      caseId: "C-1004",
      patient: {
        name: "Amit Sharma",
        phone: "9812345670",
        email: "amit.sharma@example.com",
      },
      createdAt: "2025-08-12T11:20:00Z",
      totalAmount: "₹3,200",
      status: "Completed",
      company: "Medanta Hospital",
    },
    {
      _id: "5",
      caseId: "C-1005",
      patient: {
        name: "Priya Verma",
        phone: "9123987654",
        email: "priya.verma@example.com",
      },
      createdAt: "2025-08-13T09:15:00Z",
      totalAmount: "₹950",
      status: "Pending",
      company: "AIIMS",
    },
    {
      _id: "6",
      caseId: "C-1006",
      patient: {
        name: "Ravi Singh",
        phone: "9012765432",
        email: "ravi.singh@example.com",
      },
      createdAt: "2025-08-13T14:50:00Z",
      totalAmount: "₹1,500",
      status: "Ongoing",
      company: "Manipal Hospitals",
    },
    {
      _id: "7",
      caseId: "C-1007",
      patient: {
        name: "Sneha Patel",
        phone: "9801234567",
        email: "sneha.patel@example.com",
      },
      createdAt: "2025-08-14T10:05:00Z",
      totalAmount: "₹2,100",
      status: "Completed",
      company: "Narayana Health",
    },
    {
      _id: "8",
      caseId: "C-1008",
      patient: {
        name: "Manoj Kumar",
        phone: "9123450987",
        email: "manoj.kumar@example.com",
      },
      createdAt: "2025-08-14T12:40:00Z",
      totalAmount: "₹700",
      status: "Pending",
      company: "Columbia Asia",
    },
    {
      _id: "9",
      caseId: "C-1009",
      patient: {
        name: "Kavita Joshi",
        phone: "9098765432",
        email: "kavita.joshi@example.com",
      },
      createdAt: "2025-08-15T08:25:00Z",
      totalAmount: "₹4,000",
      status: "Ongoing",
      company: "Cloudnine Hospitals",
    },
    {
      _id: "10",
      caseId: "C-1010",
      patient: {
        name: "Vikram Rao",
        phone: "9812456780",
        email: "vikram.rao@example.com",
      },
      createdAt: "2025-08-15T16:00:00Z",
      totalAmount: "₹3,750",
      status: "Completed",
      company: "Apollo Hospitals",
    },
    {
      _id: "11",
      caseId: "C-1011",
      patient: {
        name: "Rohit Mehra",
        phone: "9901234567",
        email: "rohit.mehra@example.com",
      },
      createdAt: "2025-08-16T09:45:00Z",
      totalAmount: "₹2,850",
      status: "Pending",
      company: "Fortis Healthcare",
    },
    {
      _id: "12",
      caseId: "C-1012",
      patient: {
        name: "Pooja Sharma",
        phone: "9012456789",
        email: "pooja.sharma@example.com",
      },
      createdAt: "2025-08-16T13:15:00Z",
      totalAmount: "₹1,200",
      status: "Ongoing",
      company: "Max Healthcare",
    },
    {
      _id: "13",
      caseId: "C-1013",
      patient: {
        name: "Anil Kapoor",
        phone: "9823456780",
        email: "anil.kapoor@example.com",
      },
      createdAt: "2025-08-17T10:50:00Z",
      totalAmount: "₹2,950",
      status: "Completed",
      company: "Medanta Hospital",
    },
    {
      _id: "14",
      caseId: "C-1014",
      patient: {
        name: "Neha Gupta",
        phone: "9812765432",
        email: "neha.gupta@example.com",
      },
      createdAt: "2025-08-17T15:05:00Z",
      totalAmount: "₹850",
      status: "Pending",
      company: "AIIMS",
    },
    {
      _id: "15",
      caseId: "C-1015",
      patient: {
        name: "Deepak Yadav",
        phone: "9908765432",
        email: "deepak.yadav@example.com",
      },
      createdAt: "2025-08-18T11:30:00Z",
      totalAmount: "₹1,650",
      status: "Ongoing",
      company: "Manipal Hospitals",
    },
    {
      _id: "16",
      caseId: "C-1016",
      patient: {
        name: "Shalini Nair",
        phone: "9012786543",
        email: "shalini.nair@example.com",
      },
      createdAt: "2025-08-18T14:00:00Z",
      totalAmount: "₹2,500",
      status: "Completed",
      company: "Narayana Health",
    },
    {
      _id: "17",
      caseId: "C-1017",
      patient: {
        name: "Arun Kumar",
        phone: "9123456709",
        email: "arun.kumar@example.com",
      },
      createdAt: "2025-08-19T09:10:00Z",
      totalAmount: "₹3,300",
      status: "Pending",
      company: "Columbia Asia",
    },
    {
      _id: "18",
      caseId: "C-1018",
      patient: {
        name: "Meera Iyer",
        phone: "9812345098",
        email: "meera.iyer@example.com",
      },
      createdAt: "2025-08-19T15:20:00Z",
      totalAmount: "₹1,900",
      status: "Ongoing",
      company: "Cloudnine Hospitals",
    },
    {
      _id: "19",
      caseId: "C-1019",
      patient: {
        name: "Sunil Joshi",
        phone: "9098123456",
        email: "sunil.joshi@example.com",
      },
      createdAt: "2025-08-20T10:45:00Z",
      totalAmount: "₹1,750",
      status: "Completed",
      company: "Apollo Hospitals",
    },
    {
      _id: "20",
      caseId: "C-1020",
      patient: {
        name: "Rita Singh",
        phone: "9901123456",
        email: "rita.singh@example.com",
      },
      createdAt: "2025-08-20T13:35:00Z",
      totalAmount: "₹900",
      status: "Pending",
      company: "Fortis Healthcare",
    },
  ];

  const [billingRecords, setBillingRecords] = useState(dummyBillingRecords);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const dispatch = useDispatch();

  const closeModal = () => {
    setActiveModal(null);
    setSelectedRecord(null);
  };

  const handleViewClick = (record) => {
    // console.log("View details for:", record);
    setSelectedRecord(record); // store full record data
    setActiveModal("view");
  };

  const billsCount = billingRecords.length;

  useEffect(() => {
    document.body.style.overflow = activeModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeModal]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(getInsuredPatients());
  }, [dispatch]);

  const insuredPatients = useSelector((store) => store.admin.insuredPatients)

  // console.log("Ins: ",insuredPatients)

  return (
    <div className={styles.billingsContainer}>
      <div className={styles.billingsTable} style={{ position: "relative" }}>
        {/* Table Header */}
        <div className={styles.tableHeader}>
          <span>PAT ID</span>
          <span>Name</span>
          <span>Phone No.</span>
          <span>Policy No.</span>
          <span>Company</span>

          <span>Status</span>
          <span></span>
        </div>

        {/* Table Body */}
        <div
          className={styles.tableBody}
          style={{
            paddingBottom: "1vh",
            display: "flex",
            flexDirection: "column",
            gap: "1.4vh",
            background: "#f1f1f1",

            height: "70vh",
            overflowY: "auto",
          }}
        >
          {insuredPatients.length > 0 ? (
            insuredPatients
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <div className={styles.tableRow} key={item._id}>
                  {/*<span className={styles.blue}>{item.patient?.insuranceDetails?.insuranceIdNumber}</span>*/}
                  <span className={styles.blue}>{item.patient?.patId}</span>
                  <span
                    className={styles.blue}
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <span>{item.patient?.name}</span>
                    <span
                      style={{
                        fontSize: "0.85rem",
                        color: "#555",
                        maxWidth: "150px", // Adjust as needed
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                      title={item.patient.email} // Show full email on hover
                    >
                      {item.patient.email}
                    </span>
                  </span>
                  <span className={styles.grey}>{item.patient.phone}</span>
                  <span className={styles.grey}>{item.admissionDetails.insurance?.policyNumber}</span>
                  <span className={styles.grey}>{item.admissionDetails.insurance?.insuranceCompany}</span>

                  <span
                    className={`${styles.status} ${
                        item.admissionDetails.insurance.insuranceApproved.toLowerCase() === "approved"
                        ? styles.ongoing
                        : item.admissionDetails.insurance.insuranceApproved.toLowerCase() === "pending"
                        ? styles.pending
                        : styles.rejected
                    }`}
                  >
                    {item.admissionDetails.insurance.insuranceApproved.charAt(0).toUpperCase() +
                        item.admissionDetails.insurance.insuranceApproved.slice(1)}
                  </span>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      //marginRight: "2vw",
                    }}
                  >
                    <button
                      onClick={() => handleViewClick(item)} // pass entire record
                      className={styles.viewBtn}
                    >
                      View
                    </button>
                  </div>
                </div>
              ))
          ) : (
            <div
              className={`${styles.tableRow} ${styles.blue}`}
              style={{
                gridTemplateColumns: "1fr",
                textAlign: "center",
                fontSize: "2.3vh",
                fontWeight: "500",
              }}
            >
              No Records Found
            </div>
          )}
        </div>

        {/* Pagination */}
        <Box
          sx={{
            width: "100%",
            position: "sticky",
            bottom: 0,
            backgroundColor: "#fff",
            borderTop: "2px solid #ddd",
            zIndex: 2,
          }}
        >
          <TablePagination
            component="div"
            count={billsCount}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[2, 5, 10, 20, 50, 100]}
          />
        </Box>
      </div>

      {/* Modal */}
      {activeModal === "view" && (
        <>
          <div className={styles.backdropOverlay} onClick={closeModal} />
          <div className={styles.viewModal}>
            <ViewModal onClose={closeModal} record={selectedRecord} />
          </div>
        </>
      )}
    </div>
  );
};

export default Patients;
