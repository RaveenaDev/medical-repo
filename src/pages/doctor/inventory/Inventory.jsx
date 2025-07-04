import { useState, useRef } from "react";
import styles from "./Inventory.module.scss";
import CommonPanelMini from "../components/CommonPanelMini.jsx";
import AddItemModal from "./components/addItem/AddItemModal.jsx";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AddCategoryModal from "./components/addCategory/AddCategoryModal.jsx";

const categoryData = {
  "PPE Kits": [
    {
      name: "Coverall",
      quantity: 200,
      usage: "25%",
      status: "Low Stock",
      date: "20.06.2025",
    },
    {
      name: "Face Shield",
      quantity: 50000,
      usage: "63%",
      status: "Sufficient",
      date: "24.06.2025",
    },
    {
      name: "Shoe Covers",
      quantity: 100,
      usage: "83%",
      status: "Moderate",
      date: "12.06.2025",
    },
    {
      name: "Head Cover",
      quantity: 8000,
      usage: "35%",
      status: "Sufficient",
      date: "02.06.2025",
    },
    {
      name: "Gloves",
      quantity: 10000,
      usage: "42%",
      status: "Sufficient",
      date: "10.05.2025",
    },
    {
      name: "Alcohol Wipes",
      quantity: 4,
      usage: "60%",
      status: "Moderate",
      date: "30.05.2025",
    },
  ],

  Medicines: [
    {
      name: "Paracetamol",
      quantity: 500,
      usage: "50%",
      status: "Sufficient",
      date: "18.06.2025",
    },
    {
      name: "Ibuprofen",
      quantity: 100,
      usage: "80%",
      status: "Moderate",
      date: "14.06.2025",
    },
    {
      name: "Antibiotics",
      quantity: 80,
      usage: "90%",
      status: "Low Stock",
      date: "12.06.2025",
    },
    {
      name: "Vitamin D",
      quantity: 200,
      usage: "45%",
      status: "Sufficient",
      date: "15.06.2025",
    },
    {
      name: "Aspirin",
      quantity: 150,
      usage: "55%",
      status: "Moderate",
      date: "11.06.2025",
    },
  ],

  "Diagnostic Tools": [
    {
      name: "ECG Machine",
      quantity: 10,
      usage: "70%",
      status: "Low Stock",
      date: "15.06.2025",
    },
    {
      name: "Stethoscope",
      quantity: 100,
      usage: "65%",
      status: "Moderate",
      date: "10.06.2025",
    },
    {
      name: "BP Monitor",
      quantity: 30,
      usage: "40%",
      status: "Sufficient",
      date: "14.06.2025",
    },
    {
      name: "Thermometer",
      quantity: 200,
      usage: "30%",
      status: "Sufficient",
      date: "08.06.2025",
    },
  ],

  "Surgical Consumables": [
    {
      name: "Sutures",
      quantity: 300,
      usage: "60%",
      status: "Sufficient",
      date: "22.06.2025",
    },
    {
      name: "Blades",
      quantity: 150,
      usage: "85%",
      status: "Low Stock",
      date: "16.06.2025",
    },
    {
      name: "Surgical Tape",
      quantity: 400,
      usage: "50%",
      status: "Sufficient",
      date: "13.06.2025",
    },
    {
      name: "Surgical Gauze",
      quantity: 600,
      usage: "70%",
      status: "Moderate",
      date: "09.06.2025",
    },
  ],

  Emergency: [
    {
      name: "Oxygen Cylinders",
      quantity: 40,
      usage: "90%",
      status: "Moderate",
      date: "20.06.2025",
    },
    {
      name: "Defibrillators",
      quantity: 5,
      usage: "50%",
      status: "Sufficient",
      date: "18.06.2025",
    },
    {
      name: "Ambu Bags",
      quantity: 15,
      usage: "75%",
      status: "Moderate",
      date: "15.06.2025",
    },
    {
      name: "CPR Board",
      quantity: 7,
      usage: "60%",
      status: "Sufficient",
      date: "11.06.2025",
    },
  ],

  "Emergency Supplies": [
    {
      name: "Flashlights",
      quantity: 50,
      usage: "30%",
      status: "Sufficient",
      date: "05.06.2025",
    },
    {
      name: "Batteries",
      quantity: 100,
      usage: "90%",
      status: "Low Stock",
      date: "03.06.2025",
    },
    {
      name: "Blankets",
      quantity: 70,
      usage: "40%",
      status: "Sufficient",
      date: "06.06.2025",
    },
    {
      name: "First Aid Kits",
      quantity: 25,
      usage: "80%",
      status: "Moderate",
      date: "04.06.2025",
    },
  ],

  Devices: [
    {
      name: "Ventilator",
      quantity: 8,
      usage: "60%",
      status: "Moderate",
      date: "10.06.2025",
    },
    {
      name: "Infusion Pump",
      quantity: 15,
      usage: "50%",
      status: "Sufficient",
      date: "14.06.2025",
    },
    {
      name: "X-ray Machine",
      quantity: 3,
      usage: "70%",
      status: "Low Stock",
      date: "07.06.2025",
    },
    {
      name: "Ultrasound",
      quantity: 5,
      usage: "55%",
      status: "Moderate",
      date: "12.06.2025",
    },
  ],

  "Surgical Tools": [
    {
      name: "Scissors",
      quantity: 60,
      usage: "65%",
      status: "Moderate",
      date: "05.06.2025",
    },
    {
      name: "Clamps",
      quantity: 80,
      usage: "50%",
      status: "Sufficient",
      date: "06.06.2025",
    },
    {
      name: "Forceps",
      quantity: 100,
      usage: "35%",
      status: "Sufficient",
      date: "07.06.2025",
    },
    {
      name: "Retractors",
      quantity: 20,
      usage: "85%",
      status: "Low Stock",
      date: "08.06.2025",
    },
  ],
};

const Inventory = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const scrollRef = useRef();

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };
  const [selectedCategory, setSelectedCategory] = useState("PPE Kits");

  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className={styles.wrapper}>
      <CommonPanelMini />

      <div className={styles.categorySection}>
        <div className={styles.headingRow}>
          <h2>Cardiology Inventory</h2>
          <button
            className={styles.addCategory}
            onClick={() => setShowCategoryModal(true)}
          >
            + Add New Category
          </button>
        </div>

        <Slider
          slidesToShow={4}
          infinite={false}
          arrows={true}
          slidesToScroll={1}
          className={styles.slickSlider}
          responsive={[
            {
              breakpoint: 1024,
              settings: { slidesToShow: 3 },
            },
            {
              breakpoint: 768,
              settings: { slidesToShow: 2 },
            },
            {
              breakpoint: 480,
              settings: { slidesToShow: 1 },
            },
          ]}
        >
          {Object.entries(categoryData).map(([name, items], idx) => {
            // Example logic for calculating quantity, usage, and status
            const totalQuantity = items.reduce(
              (sum, item) => sum + item.quantity,
              0
            );
            const avgUsage =
              items.reduce((sum, item) => sum + parseFloat(item.usage), 0) /
              items.length;
            const statusCounts = items.reduce((acc, item) => {
              acc[item.status] = (acc[item.status] || 0) + 1;
              return acc;
            }, {});
            const finalStatus = statusCounts["Low Stock"]
              ? "Low Stock"
              : statusCounts["Moderate"]
              ? "Moderate"
              : "Sufficient";

            return (
              <div key={idx} onClick={() => setSelectedCategory(name)}>
                <div
                  className={`${styles.card} ${
                    selectedCategory === name ? styles.selectedCard : ""
                  }`}
                >
                  <h4>{name}</h4>
                  <p>Quantity: {totalQuantity} units</p>
                  <p>Usage: {Math.round(avgUsage)}%</p>
                  <p>Status: {finalStatus}</p>
                  <span className={styles.updated}>
                    Last restocked: {items[0].date}
                  </span>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>

      <div className={styles.headerRow}>
        <div className={styles.title}>
          Category: <span>PPE Kits</span>
        </div>
        <div className={styles.actions}>
          <input
            className={styles.search}
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className={styles.addBtn} onClick={() => setShowModal(true)}>
            + Add items
          </button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Item name</th>
              <th>Quantity</th>
              <th>Usage</th>
              <th>Status</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {categoryData[selectedCategory]
              .filter((item) => {
                const lower = searchTerm.toLowerCase();
                return (
                  item.name.toLowerCase().includes(lower) ||
                  item.status.toLowerCase().includes(lower) ||
                  item.date.toLowerCase().includes(lower)
                );
              })
              .map((item, i) => (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.usage}</td>
                  <td
                    className={
                      item.status === "Low Stock"
                        ? styles.low
                        : item.status === "Moderate"
                        ? styles.moderate
                        : styles.sufficient
                    }
                  >
                    {item.status}
                  </td>
                  <td>{item.date}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {showModal && <AddItemModal onClose={() => setShowModal(false)} />}
      {showCategoryModal && (
        <AddCategoryModal onClose={() => setShowCategoryModal(false)} />
      )}
    </div>
  );
};

export default Inventory;
