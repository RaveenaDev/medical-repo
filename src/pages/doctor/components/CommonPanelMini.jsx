import { useEffect, useState } from "react";
import ayu from "./CommonPanel.module.scss";
import Searchbar from "../../../components/Searchbar/index.jsx";
import Notifications from "../../../components/NotificationFunc/Notification.jsx";
import {useDispatch, useSelector} from "react-redux";
import dayjs from "dayjs";
import {getAppointmentsOfToday} from "../../../components/State/Doctor/Action.js";

const CommonPanelMini = () => {
  const [selectedDate, setSelectedDate] = useState(
      dayjs().format("YYYY-MM-DD")
  );


  const dispatch = useDispatch();

  useEffect(() => {
    const startDate = dayjs(selectedDate).startOf("day").toISOString();
    const endDate = dayjs(selectedDate).endOf("day").toISOString();

    if (selectedDate) {
      dispatch(getAppointmentsOfToday(startDate, endDate));
    }

  }, [dispatch, selectedDate]);

  const appointments = useSelector((store) => store.doctor.appointmentsOfToday);
  const todayAppointments = appointments ? appointments.length : 0;
  const doctorName = useSelector((store) => store.authentication.userName);
  return (
    <>
      <div className={ayu.patients}>
        <div className={ayu.patientHeader}>
          <Searchbar />
          <Notifications />
        </div>

        <div className={ayu.cardhandling} style={{ marginTop: "-4rem" }}>
          <h4 className={ayu.heading}>Good Morning, Dr. {doctorName}</h4>
          <p>
            I hope you are in good mood because there are {todayAppointments} patients waiting
            for you.
          </p>
        </div>
      </div>
    </>
  );
};
export default CommonPanelMini;
