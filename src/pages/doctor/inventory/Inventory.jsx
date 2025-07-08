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

const icons = {
  icon1: `<svg width="38" height="37" viewBox="0 0 38 37" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.353516" y="0.0996094" width="36.8284" height="36.8284" rx="18.4142" fill="white"/>
<path d="M25.6446 8.20133C24.9932 8.19415 24.3463 8.42639 23.7489 9.02385L23.0167 9.75563L24.2565 10.9932L23.6815 11.5642L22.4417 10.3293L20.9862 11.7888L22.2215 13.0241L21.6465 13.5991L20.4112 12.3638L18.9512 13.8193L20.1911 15.0591L19.6161 15.6341L18.3762 14.3943L16.9208 15.8542L18.1561 17.0896L17.5811 17.6646L16.3458 16.4292L14.8858 17.8847L16.1256 19.1245L15.5506 19.6995L14.3108 18.4597L13.5831 19.1919C13.5516 19.2234 13.4528 19.3941 13.3809 19.6366C13.309 19.8792 13.2462 20.1892 13.1833 20.5081C13.1204 20.8226 13.0575 21.1505 12.9676 21.447C12.8823 21.7435 12.7879 22.013 12.5678 22.2376L9.00732 25.7954C8.57068 26.2312 8.43277 26.6759 8.45793 27.1072C8.48309 27.5339 8.68973 27.9562 9.00732 28.2751C9.32537 28.5896 9.74629 28.7962 10.1753 28.8232C10.6038 28.8456 11.0495 28.7109 11.487 28.2706L15.043 24.7128C15.2676 24.4927 15.5372 24.3984 15.8337 24.313C16.1301 24.2232 16.4581 24.1603 16.7725 24.0974C17.0915 24.0345 17.4014 23.9716 17.644 23.8997C17.8866 23.8279 18.0573 23.729 18.0887 23.6976L28.2545 13.5318C28.9374 12.849 29.144 12.1032 29.0631 11.3548C28.9778 10.6065 28.5825 9.85581 28.003 9.27766C27.4235 8.69997 26.6733 8.30196 25.9276 8.2184C25.8333 8.20807 25.7389 8.20133 25.6446 8.20133ZM26.2241 10.4852L26.7991 11.0566L12.3432 25.5124L12.8508 26.02L11.5477 27.3228C11.2462 27.6238 10.9179 27.7989 10.589 27.8484C10.2602 27.8933 9.92867 27.799 9.70631 27.5743C9.48394 27.3542 9.38602 27.0218 9.43318 26.6939C9.4799 26.3615 9.65869 26.0335 9.96057 25.7325L10.9758 24.7128L11.262 24.4298L11.7682 24.9374L26.2241 10.4852Z" fill="#27327F" fill-opacity="0.56"/>
</svg>
`,
  icon2: `
<svg width="38" height="37" viewBox="0 0 38 37" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.353516" y="0.0996094" width="36.8284" height="36.8284" rx="18.4142" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M26.3121 18.8012L18.6138 26.4659C17.5878 27.4676 16.2079 28.0239 14.774 28.0137C13.3401 28.0036 11.9682 27.4278 10.9565 26.4117C9.94475 25.3956 9.37501 24.0211 9.37111 22.5872C9.36721 21.1533 9.92946 19.7758 10.9356 18.7542L18.6339 11.0894C19.6599 10.0877 21.0399 9.53149 22.4738 9.54164C23.9076 9.55179 25.2795 10.1275 26.2913 11.1437C27.303 12.1598 27.8727 13.5342 27.8766 14.9681C27.8805 16.402 27.3183 17.7795 26.3121 18.8012ZM24.9704 12.4589C24.3107 11.7973 23.4155 11.4244 22.4811 11.4223C21.5468 11.4201 20.6498 11.7888 19.9871 12.4474L12.2878 20.1122C11.6254 20.7717 11.252 21.6674 11.25 22.6023C11.2479 23.5371 11.6173 24.4344 12.2768 25.0969C12.9364 25.7594 13.8321 26.1327 14.7669 26.1348C15.7018 26.1369 16.5991 25.7675 17.2616 25.1079L24.9599 17.4432C25.6218 16.7835 25.9948 15.888 25.997 14.9534C25.9992 14.0189 25.6303 13.1217 24.9714 12.4589H24.9704Z" fill="#CE7D82"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.0472 15.1824C15.2269 15.0028 15.4706 14.9019 15.7247 14.9019C15.9788 14.9019 16.2226 15.0028 16.4023 15.1824L22.2002 20.9804C22.3748 21.1611 22.4714 21.4032 22.4692 21.6545C22.467 21.9057 22.3662 22.1461 22.1885 22.3238C22.0108 22.5015 21.7705 22.6022 21.5192 22.6044C21.2679 22.6066 21.0259 22.51 20.8451 22.3354L15.0472 16.5375C14.8675 16.3578 14.7666 16.1141 14.7666 15.86C14.7666 15.6059 14.8675 15.3622 15.0472 15.1824Z" fill="#CE7D82"/>
</svg>`,
  icon3: `<svg width="38" height="37" viewBox="0 0 38 37" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.353516" y="0.0996094" width="36.8284" height="36.8284" rx="18.4142" fill="white"/>
<path d="M13.9759 10.847C13.9759 10.5928 14.0769 10.3491 14.2566 10.1694C14.4363 9.98964 14.6801 9.88867 14.9342 9.88867H26.4342C26.6884 9.88867 26.9322 9.98964 27.1119 10.1694C27.2916 10.3491 27.3926 10.5928 27.3926 10.847V22.347C27.3926 22.6012 27.2916 22.8449 27.1119 23.0247C26.9322 23.2044 26.6884 23.3053 26.4342 23.3053H23.5592V26.1803C23.5592 26.4345 23.4583 26.6783 23.2786 26.858C23.0988 27.0377 22.8551 27.1387 22.6009 27.1387H17.8092V29.0553H15.8926V27.1387H11.1009C10.8467 27.1387 10.603 27.0377 10.4233 26.858C10.2435 26.6783 10.1426 26.4345 10.1426 26.1803V14.6803C10.1426 14.4262 10.2435 14.1824 10.4233 14.0027C10.603 13.823 10.8467 13.722 11.1009 13.722H13.9759V10.847ZM25.4759 21.3887V11.8053H15.8926V13.722H22.6009C22.8551 13.722 23.0988 13.823 23.2786 14.0027C23.4583 14.1824 23.5592 14.4262 23.5592 14.6803V21.3887H25.4759ZM12.0592 15.6387V25.222H21.6426V15.6387H12.0592Z" fill="#EAA000" fill-opacity="0.47"/>
</svg>
`,
  icon4: `<svg width="38" height="37" viewBox="0 0 38 37" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.353516" y="0.0996094" width="36.8284" height="36.8284" rx="18.4142" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.7676 10.1282C18.7676 9.93755 18.8433 9.75473 18.9781 9.61994C19.1129 9.48515 19.2957 9.40942 19.4863 9.40942C19.677 9.40942 19.8598 9.48515 19.9946 9.61994C20.1294 9.75473 20.2051 9.93755 20.2051 10.1282V16.1178H20.6842V11.0865C20.6842 10.8959 20.76 10.7131 20.8948 10.5783C21.0296 10.4435 21.2124 10.3678 21.403 10.3678C21.5936 10.3678 21.7764 10.4435 21.9112 10.5783C22.046 10.7131 22.1217 10.8959 22.1217 11.0865V18.5136L23.5223 16.7632C23.6675 16.5821 23.877 16.464 24.1071 16.4335C24.3371 16.4029 24.5701 16.4623 24.7575 16.5993C24.9449 16.7363 25.0722 16.9403 25.1129 17.1688C25.1537 17.3973 25.1047 17.6327 24.9761 17.826L22.9397 20.8802C22.5075 21.5292 21.9091 22.0504 21.207 22.3896L21.6426 27.6178H15.8926L16.3262 22.4145C15.9015 22.1587 15.5501 21.7975 15.3062 21.3659C15.0623 20.9342 14.9342 20.4469 14.9342 19.9511V12.0448C14.9342 11.8542 15.01 11.6714 15.1448 11.5366C15.2796 11.4018 15.4624 11.3261 15.653 11.3261C15.8436 11.3261 16.0264 11.4018 16.1612 11.5366C16.296 11.6714 16.3717 11.8542 16.3717 12.0448V16.1178H16.8509V11.0865C16.8509 10.8959 16.9266 10.7131 17.0614 10.5783C17.1962 10.4435 17.379 10.3678 17.5697 10.3678C17.7603 10.3678 17.9431 10.4435 18.0779 10.5783C18.2127 10.7131 18.2884 10.8959 18.2884 11.0865V16.1178H18.7676V10.1282ZM13.0176 12.7636H13.9759V20.4303C13.9759 21.3167 14.4992 22.2434 15.182 22.6555L15.4426 22.8127L15.0377 26.6594H14.0741L14.4278 23.3C13.5835 22.6569 13.0176 21.5256 13.0176 20.4303V12.7636Z" fill="#64A36E"/>
</svg>
`,
  icon5: `<svg width="38" height="37" viewBox="0 0 38 37" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.353516" y="0.0996094" width="36.8284" height="36.8284" rx="18.4142" fill="white"/>
<rect width="23" height="23" transform="translate(7.26758 7.01367)" fill="white"/>
<path d="M12.0589 26.1803V24.2637H13.5923L15.8923 16.597H21.6423L23.9423 24.2637H25.4756V26.1803H12.0589ZM17.8089 14.6803V9.88867H19.7256V14.6803H17.8089ZM23.511 17.0522L22.1454 15.6866L25.5475 12.3085L26.8891 13.6501L23.511 17.0522ZM24.5173 21.3887V19.472H29.3089V21.3887H24.5173ZM14.0235 17.0522L10.6454 13.6501L11.987 12.3085L15.3891 15.6866L14.0235 17.0522ZM8.22559 21.3887V19.472H13.0173V21.3887H8.22559Z" fill="#90B4BB"/>
</svg>
`,
};

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

  const iconKeys = Object.keys(icons);
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
            <h2>Cardiology Inventory</h2>
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

            const iconKey = iconKeys[idx % iconKeys.length];
            const iconHTML = icons[iconKey];
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
                    <div
                      dangerouslySetInnerHTML={{ __html: iconHTML }}
                      className={inventoryStyles.icon}
                    />
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
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Inventory;
