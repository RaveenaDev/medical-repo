import { useEffect, useState } from "react";
import ayu from "./CommonPanel.module.scss";
import Searchbar from "../../../components/Searchbar/index.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import Notifications from "../../../components/NotificationFunc/Notification.jsx";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDepartments,
  getBillingRecords,
  getDoctors,
  getPatients,
  getStaffs,
} from "../../../components/State/Admin/Action.js";
import { getRooms } from "../../../components/State/Doctor/Action.js";

const CommonPanelMini = ({
  setSelectedDate,
  selectedDate,
  setSelectedDepartment,
  selectedDepartment,
}) => {
  const navigate = useNavigate();

  const location = useLocation(); // Get the current route
  const dispatch = useDispatch();

  const [department, setDepartment] = useState("");

  // Default to today's date if props are not provided
  const [internalSelectedDate, setInternalSelectedDate] = useState(dayjs());

  const handleDateChange = (newValue) => {
    if (setSelectedDate) {
      setSelectedDate(newValue);
    } else {
      setInternalSelectedDate(newValue);
    }
  };

  useEffect(() => {
    dispatch(getPatients());
    dispatch(getDoctors());
    dispatch(getStaffs());
    dispatch(getRooms());
    dispatch(getAllDepartments());
    dispatch(getBillingRecords());
  }, [dispatch]);

  const doctor = useSelector((store) => store.admin);

  const noOfDoctors = doctor.totalDoctors;
  const doctors = doctor.doctors;

  const noOfStaffs = doctor.totalStaffs;
  const staffs = doctor.staffs;

  const noOfRooms = doctor.totalRooms;
  const rooms = doctor.rooms;

  const departments = useSelector((state) => state.admin.departments);

  return (
    <>
      <div className={ayu.patients}>
        <div className={ayu.patientHeader}>
          <Searchbar />
          <Notifications />
        </div>

        <div className={ayu.cardhandling}>
          <h4 className={ayu.heading}>Good Morning, Dr. Amit Patil</h4>
          <p>
            I hope you are in good mood because there are 45 patients waiting
            for you.
          </p>
        </div>
      </div>
    </>
  );
};
export default CommonPanelMini;
