import { useState, useRef, useEffect } from "react";
import inventoryStyles from "./Inventory.module.scss";
import CommonPanelMini from "../components/CommonPanelMini.jsx";
import AddItemModal from "./components/addItem/AddItemModal.jsx";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AddCategoryModal from "./components/addCategory/AddCategoryModal.jsx";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getInventoryByDepartment } from "../../../components/State/Doctor/Action.js";

const Inventory = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInventoryByDepartment());
  }, []);

  const inventoryData = useSelector(
    (state) => state.doctor.inventory.data || []
  );
  const [selectedCategory, setSelectedCategory] = useState("");
  useEffect(() => {
    if (inventoryData.length > 0) {
      setSelectedCategory(inventoryData[0].category.name);
      setSelectedCategoryId(inventoryData[0].category._id);
    }
  }, [inventoryData]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const bgColors = [
    "#DAE4FF",
    "#E5B5B8B8",
    "#EAA00038",
    "#69BD854A",
    "#66A7B487",
  ];
  const departmentName = useSelector(
    (state) => state.authentication.departmentName
  );

  return (
    <div className={inventoryStyles.wrapper}>
      <CommonPanelMini />

      <div className={inventoryStyles.categorySection}>
        <div className={inventoryStyles.headingRow}>
          <div className={inventoryStyles.heading}>
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/doctor/department")}
            >
              <g clip-path="url(#clip0_6149_7254)">
                <path
                  d="M18.0045 3.23895C17.4736 2.70811 16.6178 2.70811 16.087 3.23895L7.08445 12.2414C6.66195 12.6639 6.66195 13.3464 7.08445 13.7689L16.087 22.7714C16.6178 23.3023 17.4736 23.3023 18.0045 22.7714C18.5353 22.2406 18.5353 21.3848 18.0045 20.8539L10.1611 12.9998L18.0153 5.14561C18.5353 4.62561 18.5353 3.75895 18.0045 3.23895Z"
                  fill="#25307F"
                />
              </g>
              <defs>
                <clipPath id="clip0_6149_7254">
                  <rect width="26" height="26" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <h2>{departmentName} Inventory</h2>
          </div>
          <button
            className={inventoryStyles.addBtn}
            onClick={() => setShowCategoryModal(true)}
          >
            <Plus size={20} /> Add New Category
          </button>
        </div>

        <Slider
          slidesToShow={3.8}
          swipeToSlide={true}
          touchThreshold={4}
          speed={400}
          infinite={false}
          arrows={true}
          className={inventoryStyles.slickSlider}
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ]}
        >
          {inventoryData.map(({ category, items }, idx) => {
            const name = category.name;

            const totalQuantity = items.reduce(
              (sum, item) => sum + (item.quantity || 0),
              0
            );
            const avgUsage =
              items.length > 0
                ? items.reduce(
                    (sum, item) => sum + (parseFloat(item.usage) || 0),
                    0
                  ) / items.length
                : 0;

            const statusCounts = items.reduce((acc, item) => {
              const status = item.status || "Sufficient";
              acc[status] = (acc[status] || 0) + 1;
              return acc;
            }, {});

            const finalStatus = statusCounts["Low Stock"]
              ? "low"
              : statusCounts["Moderate"]
              ? "moderate"
              : "sufficient";

            const headerBg = bgColors[idx % bgColors.length];

            const formatIndianNumber = (num) => {
              if (num >= 1e7)
                return (num / 1e7).toFixed(1).replace(/\.0$/, "") + "Cr";
              if (num >= 1e5)
                return (num / 1e5).toFixed(1).replace(/\.0$/, "") + "L";
              if (num >= 1e3)
                return (num / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
              return num.toString();
            };

            const lastUpdated =
              items[0]?.lastRestockedDate?.split("T")[0] ||
              items[0]?.date || // fallback if you temporarily use mock data
              "-";

            return (
              <div
                className={inventoryStyles.slideWrapper}
                key={category._id}
                onClick={() => {
                  setSelectedCategory(name);
                  setSelectedCategoryId(category._id);
                }}
              >
                <div
                  className={` ${
                    selectedCategory === name
                      ? inventoryStyles.selectedCard
                      : inventoryStyles.card
                  }`}
                >
                  <div
                    className={inventoryStyles.cardHeader}
                    style={{ backgroundColor: headerBg }}
                  >
                    <div className={inventoryStyles.cardHeading}>{name}</div>
                  </div>
                  <div className={inventoryStyles.cardBody}>
                    <div className={inventoryStyles.cardSummary}>
                      {formatIndianNumber(totalQuantity)} (
                      {Math.round(avgUsage)}%)
                    </div>

                    <div className={inventoryStyles.cardDetails}>
                      <p>Quantity: {totalQuantity} units</p>
                      <p>Usage: {Math.round(avgUsage)}%</p>
                      <p>
                        Status:{" "}
                        <span className={inventoryStyles[`${finalStatus}`]}>
                          {finalStatus}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className={inventoryStyles.cardFooter}>
                    <p className={inventoryStyles.updated}>
                      Last restocked: {lastUpdated}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>

      <div className={inventoryStyles.headerRow}>
        <div className={inventoryStyles.title}>
          Category: <span>{selectedCategory}</span>
        </div>
        <div className={inventoryStyles.actions}>
          <div className={inventoryStyles.searchWrapper}>
            <svg
              className={inventoryStyles.searchIcon}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 32 32"
            >
              <path
                fill="currentColor"
                d="M26.1333 28L17.7333 19.6C17.0667 20.1333 16.3 20.5556 15.4333 20.8667C14.5667 21.1778 13.6444 21.3333 12.6667 21.3333C10.2444 21.3333 8.19467 20.4942 6.51733 18.816C4.84 17.1378 4.00089 15.088 4 12.6667C3.99911 10.2453 4.83822 8.19556 6.51733 6.51733C8.19645 4.83911 10.2462 4 12.6667 4C15.0871 4 17.1373 4.83911 18.8173 6.51733C20.4973 8.19556 21.336 10.2453 21.3333 12.6667C21.3333 13.6444 21.1778 14.5667 20.8667 15.4333C20.5556 16.3 20.1333 17.0667 19.6 17.7333L28 26.1333L26.1333 28ZM12.6667 18.6667C14.3333 18.6667 15.7502 18.0836 16.9173 16.9173C18.0844 15.7511 18.6676 14.3342 18.6667 12.6667C18.6658 10.9991 18.0827 9.58267 16.9173 8.41733C15.752 7.252 14.3351 6.66844 12.6667 6.66667C10.9982 6.66489 9.58178 7.24844 8.41733 8.41733C7.25289 9.58622 6.66933 11.0027 6.66667 12.6667C6.664 14.3307 7.24756 15.7476 8.41733 16.9173C9.58711 18.0871 11.0036 18.6702 12.6667 18.6667Z"
              />
            </svg>
            <input
              className={inventoryStyles.searchInput}
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            className={inventoryStyles.addBtn}
            onClick={() => setShowModal(true)}
          >
            <Plus size={20} /> Add items
          </button>
        </div>
      </div>

      <div className={inventoryStyles.tableContainer}>
        <div className={inventoryStyles.tableHeader}>
          <span>Item Name</span>
          <span>Quantity</span>
          <span>Usage</span>
          <span>Status</span>
          <span>Last Updated</span>
        </div>

        <div className={inventoryStyles.tableBody}>
          {(
            inventoryData.find((cat) => cat.category.name === selectedCategory)
              ?.items || []
          )
            .filter((item) => {
              const lower = searchTerm.toLowerCase();
              return (
                item.name.toLowerCase().includes(lower) ||
                (item.status || "").toLowerCase().includes(lower) ||
                (item.lastRestockedDate || "").toLowerCase().includes(lower)
              );
            })
            .map((item, i) => (
              <div key={i} className={inventoryStyles.tableRow}>
                <span>{item.name}</span>
                <span>{item.quantity}</span>
                <span>{item.usagePercent || "-"}</span>
                <span
                  className={
                    inventoryStyles[
                      (item.status || "sufficient")
                        .replace(/\s/g, "")
                        .toLowerCase()
                    ]
                  }
                >
                  {item.status || "Sufficient"}
                </span>
                <span>{item.lastRestockedDate?.split("T")[0] || "-"}</span>
              </div>
            ))}
        </div>
      </div>
      {showModal && (
        <AddItemModal
          onClose={() => setShowModal(false)}
          categoryId={selectedCategoryId}
          categoryName={selectedCategory}
          onItemAdded={async () => {
            await dispatch(getInventoryByDepartment()); //  wait for fresh data
            setShowModal(false);
          }}
        />
      )}
      {showCategoryModal && (
        <AddCategoryModal
          onClose={() => setShowCategoryModal(false)}
          onItemAdded={async () => {
            await dispatch(getInventoryByDepartment());
            setShowCategoryModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Inventory;
