import styles from "./DoctorNewRequest.module.scss";
import { X } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createDoctorRequests } from "../../../components/State/Doctor/Action.js";
const DoctorNewRequest = ({ onClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    quantity: "",
    timeline: "",
    purpose: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRequest = () => {
    const payload = {
      ...formData,
      createdAt: new Date().toISOString(),
    };

    // console.log("Payload: ", payload);
    dispatch(createDoctorRequests(payload));
    onClose();
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.row1}>
          <div>
            {" "}
            <h3>New Request Thread</h3>
          </div>
          <div className={styles.crossContainer}>
            <X
              size={20}
              className={styles.cross}
              onClick={() => {
                onClose();
              }}
            />
          </div>
        </div>

        {/* To Whom */}
        <div className={styles.toWhom}>
          <div className={styles.toBox}>TO</div>
          <div className={styles.adminBox}>Admin</div>
        </div>

        <div className={styles.content}>
          <div>
            <h4>Order</h4>
            <input
              name="title"
              placeholder="Place an Order"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <h4>Quantity</h4>
            <input
              name="quantity"
              type="text"
              placeholder="Net Quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>
          <div>
            <h4>Timeline</h4>
            <input
              name="timeline"
              type="text"
              placeholder="Duration of the Order"
              value={formData.timeline}
              onChange={handleChange}
            />
          </div>
          <div>
            <h4>Purpose</h4>
            <input
              name="purpose"
              type="text"
              placeholder="Purpose of Order"
              value={formData.purpose}
              onChange={handleChange}
            />
          </div>
        </div>
        <button className={styles.reqBtn} onClick={handleRequest}>
          Request
        </button>
      </div>
    </div>
  );
};

export default DoctorNewRequest;
