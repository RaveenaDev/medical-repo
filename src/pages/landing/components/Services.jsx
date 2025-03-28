import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ServiceCard = ({ bgColor, icon, title, description }) => {
  return (
    <div
      style={{
        background: bgColor,
        borderRadius: "1.14rem",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        minHeight: "19.375rem",
        maxWidth: "16.875rem",
        width: "100%",
        padding: "1rem 0.5rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          //   alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {icon}
        </div>

        <span
          style={{
            color: "#555555",
            //   fontFamily: "Poppins",
            fontWeight: "600",
            fontSize: "1.35rem",
            lineHeight: "150%",
            letterSpacing: "0%",
            textAlign: "center",
          }}
        >
          {title}
        </span>
      </div>
      <p
        style={{
          marginTop: "1.875rem",
          fontWeight: "400",
          fontSize: "1rem",
          lineHeight: "150%",
          letterSpacing: "0%",
          textAlign: "center",
          color: "#555555",
        }}
      >
        {description}
      </p>
    </div>
  );
};

export const Services = () => {
  const sliderSettings = {
    infinite: false,
    speed: 200,
    slidesToShow: 4.7, // Show 4 full slides and part of the 5th
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2.7, slidesToScroll: 1 }, // Adjust for medium screens
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2.5, slidesToScroll: 1 }, // Adjust for mobile screens
      },
    ],
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          color: "#25307F",
          fontWeight: " 700",
          fontSize: " 40px",
          lineHeight: "100%",
          letterSpacing: " 0%",
        }}
      >
        We Provide The Best Service
      </div>
      <div
        style={{
          boxShadow: "0px 0px 20px 0px #5663C257",
          padding: "50px 18px",
          margin: "40px 28px",
        }}
      >
        <Slider {...sliderSettings}>
          <ServiceCard
            bgColor="#D9DDFAAB"
            icon={
              <svg
                width="29"
                height="28"
                viewBox="0 0 29 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{marginTop:'-26px'}}
              >
                <mask
                  id="mask0_4930_1972"
                  mask-type="alpha"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="29"
                  height="28"
                >
                  <rect
                    x="0.945312"
                    y="0.277344"
                    width="27.3649"
                    height="27.3649"
                    fill="#D9D9D9"
                  />
                </mask>
                <g mask="url(#mask0_4930_1972)">
                  <path
                    d="M11.2119 19.6617C11.535 19.6617 11.8058 19.5524 12.0243 19.3338C12.2428 19.1153 12.3521 18.8445 12.3521 18.5214C12.3521 18.1984 12.2428 17.9276 12.0243 17.7091C11.8058 17.4905 11.535 17.3812 11.2119 17.3812C10.8888 17.3812 10.618 17.4905 10.3995 17.7091C10.181 17.9276 10.0717 18.1984 10.0717 18.5214C10.0717 18.8445 10.181 19.1153 10.3995 19.3338C10.618 19.5524 10.8888 19.6617 11.2119 19.6617ZM14.6325 19.6617C14.9556 19.6617 15.2264 19.5524 15.4449 19.3338C15.6634 19.1153 15.7727 18.8445 15.7727 18.5214C15.7727 18.1984 15.6634 17.9276 15.4449 17.7091C15.2264 17.4905 14.9556 17.3812 14.6325 17.3812C14.3094 17.3812 14.0387 17.4905 13.8201 17.7091C13.6016 17.9276 13.4923 18.1984 13.4923 18.5214C13.4923 18.8445 13.6016 19.1153 13.8201 19.3338C14.0387 19.5524 14.3094 19.6617 14.6325 19.6617ZM18.0531 19.6617C18.3762 19.6617 18.647 19.5524 18.8655 19.3338C19.0841 19.1153 19.1933 18.8445 19.1933 18.5214C19.1933 18.1984 19.0841 17.9276 18.8655 17.7091C18.647 17.4905 18.3762 17.3812 18.0531 17.3812C17.7301 17.3812 17.4593 17.4905 17.2407 17.7091C17.0222 17.9276 16.9129 18.1984 16.9129 18.5214C16.9129 18.8445 17.0222 19.1153 17.2407 19.3338C17.4593 19.5524 17.7301 19.6617 18.0531 19.6617ZM13.4353 16.241L19.8489 9.79889L18.2527 8.1741L13.4068 13.02L10.9839 10.597L9.38757 12.1933L13.4353 16.241ZM14.6325 25.3627C13.0552 25.3627 11.573 25.0634 10.1857 24.4648C8.79846 23.8662 7.59175 23.0538 6.56556 22.0276C5.53938 21.0014 4.72699 19.7947 4.12838 18.4074C3.52977 17.0202 3.23047 15.5379 3.23047 13.9606C3.23047 12.3834 3.52977 10.9011 4.12838 9.51384C4.72699 8.12659 5.53938 6.91987 6.56556 5.89369C7.59175 4.86751 8.79846 4.05511 10.1857 3.4565C11.573 2.8579 13.0552 2.55859 14.6325 2.55859C16.2098 2.55859 17.6921 2.8579 19.0793 3.4565C20.4666 4.05511 21.6733 4.86751 22.6994 5.89369C23.7256 6.91987 24.538 8.12659 25.1366 9.51384C25.7352 10.9011 26.0345 12.3834 26.0345 13.9606C26.0345 15.5379 25.7352 17.0202 25.1366 18.4074C24.538 19.7947 23.7256 21.0014 22.6994 22.0276C21.6733 23.0538 20.4666 23.8662 19.0793 24.4648C17.6921 25.0634 16.2098 25.3627 14.6325 25.3627Z"
                    fill="#555555"
                  />
                </g>
              </svg>
            }
            title="Complete Healthcare Solution"
            description="Fully integrated modular software architecture with seamless data
            flow between departments for effortless patient data management."
          />
          <ServiceCard
            bgColor="#F3DED9"
            icon={
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_4714_1177"
                  maskType="alpha"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="28"
                  height="28"
                >
                  <rect
                    x="0.304688"
                    y="0.189453"
                    width="27.3649"
                    height="27.3649"
                    fill="#D9D9D9"
                  />
                </mask>
                <g mask="url(#mask0_4714_1177)">
                  <path
                    d="M7.14369 9.3115H17.4055V7.0311C17.4055 6.08093 17.073 5.27328 16.4078 4.60816C15.7427 3.94305 14.9351 3.61049 13.9849 3.61049C13.0347 3.61049 12.2271 3.94305 11.562 4.60816C10.8969 5.27328 10.5643 6.08093 10.5643 7.0311H8.28389C8.28389 5.45382 8.83974 4.10932 9.95144 2.99763C11.0631 1.88593 12.4076 1.33008 13.9849 1.33008C15.5622 1.33008 16.9067 1.88593 18.0184 2.99763C19.1301 4.10932 19.6859 5.45382 19.6859 7.0311V9.3115H20.8261C21.4532 9.3115 21.9901 9.53479 22.4367 9.98137C22.8833 10.428 23.1065 10.9648 23.1065 11.5919V22.994C23.1065 23.6211 22.8833 24.1579 22.4367 24.6045C21.9901 25.0511 21.4532 25.2744 20.8261 25.2744H7.14369C6.51658 25.2744 5.97973 25.0511 5.53315 24.6045C5.08657 24.1579 4.86328 23.6211 4.86328 22.994V11.5919C4.86328 10.9648 5.08657 10.428 5.53315 9.98137C5.97973 9.53479 6.51658 9.3115 7.14369 9.3115ZM13.9849 19.5733C14.612 19.5733 15.1489 19.35 15.5955 18.9035C16.042 18.4569 16.2653 17.92 16.2653 17.2929C16.2653 16.6658 16.042 16.129 15.5955 15.6824C15.1489 15.2358 14.612 15.0125 13.9849 15.0125C13.3578 15.0125 12.821 15.2358 12.3744 15.6824C11.9278 16.129 11.7045 16.6658 11.7045 17.2929C11.7045 17.92 11.9278 18.4569 12.3744 18.9035C12.821 19.35 13.3578 19.5733 13.9849 19.5733Z"
                    fill="#555555"
                  />
                </g>
              </svg>
            }
            title="Secure & Reliable"
            description="  Robust security protocols and data privacy policy safeguards
            customer data, ensuring confidentiality without any data
            commercialization"
          />
          <ServiceCard
            bgColor="#D7ECE5"
            icon={
              <svg
                width="27"
                height="27"
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_4930_1976"
                  maskType="alpha"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="27"
                  height="27"
                >
                  <rect width="27" height="27" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_4930_1976)">
                  <path
                    d="M7.3125 22.5C5.60625 22.5 4.14844 21.9094 2.93906 20.7281C1.72969 19.5469 1.125 18.1031 1.125 16.3969C1.125 14.9344 1.56563 13.6313 2.44688 12.4875C3.32812 11.3438 4.48125 10.6125 5.90625 10.2938C6.375 8.56875 7.3125 7.17188 8.71875 6.10313C10.125 5.03438 11.7188 4.5 13.5 4.5C15.6938 4.5 17.5547 5.26406 19.0828 6.79219C20.6109 8.32031 21.375 10.1813 21.375 12.375C22.6688 12.525 23.7422 13.0828 24.5953 14.0484C25.4484 15.0141 25.875 16.1438 25.875 17.4375C25.875 18.8438 25.3828 20.0391 24.3984 21.0234C23.4141 22.0078 22.2188 22.5 20.8125 22.5H7.3125Z"
                    fill="#555555"
                  />
                </g>
              </svg>
            }
            title="Stable cloud solution"
            description="  Proven >99.99% uptime for more than a decade in service. Mobile apps
            for doctors and patients"
          />

          <ServiceCard
            bgColor="#CDE2E6"
            icon={
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_4714_1180"
                  maskType="alpha"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="28"
                  height="28"
                >
                  <rect
                    x="0.5625"
                    y="0.277344"
                    width="27.3649"
                    height="27.3649"
                    fill="#D9D9D9"
                  />
                </mask>
                <g mask="url(#mask0_4714_1180)">
                  <path
                    d="M14.2427 13.9595C12.9885 13.9595 11.9148 13.5129 11.0216 12.6198C10.1285 11.7266 9.68191 10.6529 9.68191 9.39871C9.68191 8.14448 10.1285 7.07079 11.0216 6.17763C11.9148 5.28447 12.9885 4.83789 14.2427 4.83789C15.4969 4.83789 16.5706 5.28447 17.4638 6.17763C18.357 7.07079 18.8035 8.14448 18.8035 9.39871C18.8035 10.6529 18.357 11.7266 17.4638 12.6198C16.5706 13.5129 15.4969 13.9595 14.2427 13.9595ZM5.12109 23.0812V19.8886C5.12109 19.2425 5.28737 18.6486 5.61993 18.107C5.95249 17.5654 6.39432 17.1521 6.94542 16.867C8.12363 16.2779 9.32084 15.8361 10.5371 15.5416C11.7533 15.247 12.9885 15.0997 14.2427 15.0997C15.4969 15.0997 16.7322 15.247 17.9484 15.5416C19.1646 15.8361 20.3618 16.2779 21.54 16.867C22.0911 17.1521 22.533 17.5654 22.8655 18.107C23.1981 18.6486 23.3644 19.2425 23.3644 19.8886V23.0812H5.12109Z"
                    fill="#555555"
                  />
                </g>
              </svg>
            }
            title="Patient-Centric Design"
            description="  24/7 appointment booking, instant notifications, feedback tools,
              and telemedicine platforms for higher patient engagement."
          />

          <ServiceCard
            bgColor="#F5F7FC"
            icon={
              <svg
                width="27"
                height="27"
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_4930_1966"
                  maskType="alpha"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="27"
                  height="27"
                >
                  <rect width="27" height="27" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_4930_1966)">
                  <path
                    d="M12.375 19.125H14.625V18H15.75C16.0688 18 16.3359 17.8922 16.5516 17.6766C16.7672 17.4609 16.875 17.1938 16.875 16.875V13.5C16.875 13.1812 16.7672 12.9141 16.5516 12.6984C16.3359 12.4828 16.0688 12.375 15.75 12.375H12.375V11.25H16.875V9H14.625V7.875H12.375V9H11.25C10.9312 9 10.6641 9.10781 10.4484 9.32344C10.2328 9.53906 10.125 9.80625 10.125 10.125V13.5C10.125 13.8188 10.2328 14.0859 10.4484 14.3016C10.6641 14.5172 10.9312 14.625 11.25 14.625H14.625V15.75H10.125V18H12.375V19.125ZM4.5 22.5C3.88125 22.5 3.35156 22.2797 2.91094 21.8391C2.47031 21.3984 2.25 20.8687 2.25 20.25V6.75C2.25 6.13125 2.47031 5.60156 2.91094 5.16094C3.35156 4.72031 3.88125 4.5 4.5 4.5H22.5C23.1187 4.5 23.6484 4.72031 24.0891 5.16094C24.5297 5.60156 24.75 6.13125 24.75 6.75V20.25C24.75 20.8687 24.5297 21.3984 24.0891 21.8391C23.6484 22.2797 23.1187 22.5 22.5 22.5H4.5Z"
                    fill="#555555"
                  />
                </g>
              </svg>
            }
            title="Affordable"
            description="Proven >99.99% uptime for more than a decade in service. Mobile
              apps for doctors and patients"
          />

          <ServiceCard
            bgColor="#D5F0FC"
            icon="🕒"
            title="Established Trust"
            description=" 24/7 appointment booking, instant notifications, feedback tools,
              and telemedicine platforms for higher patient engagement."
          />
        </Slider>
      </div>
    </div>
  );
};

export default Services;
