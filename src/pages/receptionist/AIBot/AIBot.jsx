import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Divider,
  Modal,
  Box,
  CircularProgress,
  IconButton,
  Tooltip,
  Chip,
  Paper,
  Typography,
  Avatar,
} from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./AIBot.scss";
// import CommonPanel from "../components/CommonPanel.jsx";
// import arrowBack from "../../../assets/arrow_back.svg";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  bookAppointment,
  getAllDepartments,
  getDoctors,
  getDoctorsByDepartment,
  getPatients,
  removeBookAppointmentData,
} from "../../../components/State/Receptionist/Action.js";

/* ================= i18n ================= */
const I18N = {
  en: {
    langName: "English",
    ui: {
      title: "Book Appointment",
      selectDate: "Select Date",
      selectTime: "Select Time",
      note: "Note",
      patientName: "Patient Name",
      age: "Age",
      gender: "Gender",
      address: "Address",
      apptType: "Select Appointment Type",
      branch: "Select Branch",
      doctor: "Select Doctor",
      visitType: "Type Visit",
      mobile: "Mobile Number",
      email: "Email",
      confirm: "Confirm",
      walkIn: "Walk In",
      referral: "Referral",
      online: "Online",
      followUp: "Follow up",
      consultation: "Consultation",
      vaccination: "Vaccination",
      other: "Other",
      listening: "Listening…",
      heard: (s) => `Heard: "${s}"`,
      voiceReady: "Voice fill ready",
      micStart: "Start voice fill",
      micStop: "Stop voice fill",
      successBtn: "Appointment Confirmed",
      speakWelcome:
        "Welcome! Click the microphone and speak details. Say 'book appointment' to submit.",
      speakComplete:
        "Complete all required fields before booking. You can keep speaking to fill them.",
      speakBooking: "Booking your appointment, please wait.",
      speakSubmitted: "Details submitted. I will confirm shortly.",
      speakNetErr:
        "Network error. Check your connection and try again.",
      errors: {
        required: "This field is required",
        phone: "Enter a valid 10-digit phone number",
        age: "Enter a valid age (0-120)",
        email: "Enter a valid email address",
        futureTime: "Select a future time",
      },
      langLabel: "Language",
      langNote:
        "",
    },
  },
  hi: {
    langName: "हिन्दी",
    ui: {
      title: "अपॉइंटमेंट बुक करें",
      selectDate: "तारीख चुनें",
      selectTime: "समय चुनें",
      note: "नोट",
      patientName: "रोगी का नाम",
      age: "आयु",
      gender: "लिंग",
      address: "पता",
      apptType: "अपॉइंटमेंट प्रकार चुनें",
      branch: "शाखा चुनें",
      doctor: "डॉक्टर चुनें",
      visitType: "भेंट प्रकार",
      mobile: "मोबाइल नंबर",
      email: "ईमेल",
      confirm: "कन्फर्म",
      walkIn: "वॉक इन",
      referral: "रेफरल",
      online: "ऑनलाइन",
      followUp: "फॉलो-अप",
      consultation: "कंसल्टेशन",
      vaccination: "वैक्सीनेशन",
      other: "अन्य",
      listening: "सुन रहा है…",
      heard: (s) => `सुना: "${s}"`,
      voiceReady: "वॉयस फिल तैयार",
      micStart: "वॉयस फिल शुरू करें",
      micStop: "वॉयस फिल रोकें",
      successBtn: "अपॉइंटमेंट कन्फर्म हुआ",
      speakWelcome:
        "माइक पर क्लिक करें और विवरण बोलें. अंत में 'book appointment' कहें.",
      speakComplete:
        "बुकिंग से पहले आवश्यक फ़ील्ड भरें. आप वॉयस से जारी रख सकते हैं.",
      speakBooking: "आपका अपॉइंटमेंट बुक हो रहा है.",
      speakSubmitted: "विवरण भेज दिया. मैं शीघ्र पुष्टि करूँगा.",
      speakNetErr:
        "नेटवर्क त्रुटि. कनेक्शन जाँचें और पुनः प्रयास करें.",
      errors: {
        required: "यह फ़ील्ड आवश्यक है",
        phone: "मान्य 10 अंकों का फ़ोन नंबर दर्ज करें",
        age: "मान्य आयु दर्ज करें (0-120)",
        email: "मान्य ईमेल दर्ज करें",
        futureTime: "भविष्य का समय चुनें",
      },
      langLabel: "भाषा",
      langNote:
        "",
    },
  },
  mr: {
    langName: "मराठी",
    ui: {
      title: "अपॉइंटमेंट बुक करा",
      selectDate: "दिनांक निवडा",
      selectTime: "वेळ निवडा",
      note: "नोंद",
      patientName: "रुग्णाचे नाव",
      age: "वय",
      gender: "लिंग",
      address: "पत्ता",
      apptType: "अपॉइंटमेंट प्रकार निवडा",
      branch: "शाखा निवडा",
      doctor: "डॉक्टर निवडा",
      visitType: "भेट प्रकार",
      mobile: "मोबाइल नंबर",
      email: "ईमेल",
      confirm: "कन्फर्म",
      walkIn: "वॉक-इन",
      referral: "रिफरल",
      online: "ऑनलाईन",
      followUp: "फॉलो-अप",
      consultation: "कन्सल्टेशन",
      vaccination: "लसीकरण",
      other: "इतर",
      listening: "ऐकत आहे…",
      heard: (s) => `ऐकले: "${s}"`,
      voiceReady: "व्हॉइस फिल तयार",
      micStart: "व्हॉइस फिल सुरू करा",
      micStop: "व्हॉइस फिल थांबवा",
      successBtn: "अपॉइंटमेंट कन्फर्म झाले",
      speakWelcome:
        "माईकवर क्लिक करा आणि तपशील बोला. शेवटी 'book appointment' म्हणा.",
      speakComplete:
        "बुकिंगपूर्वी आवश्यक फील्ड भरा. तुम्ही व्हॉइसने पुढे जाऊ शकता.",
      speakBooking: "अपॉइंटमेंट बुक होत आहे.",
      speakSubmitted: "तपशील पाठवले. लवकरच पुष्टी करतो.",
      speakNetErr:
        "नेटवर्क त्रुटी. कनेक्शन तपासा आणि पुन्हा प्रयत्न करा.",
      errors: {
        required: "हे फील्ड आवश्यक आहे",
        phone: "वैध 10 अंकी फोन नंबर टाका",
        age: "वैध वय टाका (0-120)",
        email: "वैध ईमेल टाका",
        futureTime: "भविष्यातील वेळ निवडा",
      },
      langLabel: "भाषा",
      langNote:
        "",
    },
  },
};

/* ============== helpers ============== */
const addDays = (d, n) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return new Date(x.getFullYear(), x.getMonth(), x.getDate());
};

const monthMap = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
};

const toDateObj = (spoken) => {
  const s = (spoken || "").toLowerCase().trim();
  const now = new Date();
  if (/\btoday\b/.test(s)) return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (/\btomorrow\b/.test(s)) return addDays(now, 1);
  const dm = s.match(/\b(\d{1,2})[\/\-\.](\d{1,2})(?:[\/\-\.](\d{2,4}))?\b/);
  if (dm) {
    const d = parseInt(dm[1], 10);
    const m = parseInt(dm[2], 10) - 1;
    const y = dm[3] ? parseInt(dm[3], 10) : now.getFullYear();
    if (m >= 0 && m <= 11 && d >= 1 && d <= 31) return new Date(y, m, d);
  }
  const dmw = s.match(/\b(\d{1,2})\s+(january|february|march|april|may|june|july|august|september|october|november|december)\s*(\d{4})?\b/);
  if (dmw) {
    const d = parseInt(dmw[1], 10);
    const m = monthMap[dmw[2]];
    const y = dmw[3] ? parseInt(dmw[3], 10) : now.getFullYear();
    if (m >= 0 && d >= 1 && d <= 31) return new Date(y, m, d);
  }
  return null;
};

const toTime24 = (spoken) => {
  let s = (spoken || "").toLowerCase().replace(/o'clock/g, "").trim();
  const ampmMatch = s.match(/\b(am|pm)\b/);
  const ampm = ampmMatch ? ampmMatch[1] : null;
  s = s.replace(/\b(am|pm)\b/, "").trim();

  let h = 0, m = 0;
  const timeParts = s.match(/(\d{1,2})[\s.:](\d{1,2})/);
  if (timeParts) {
    h = parseInt(timeParts[1], 10);
    m = parseInt(timeParts[2], 10);
  } else {
    const singleHour = s.match(/\b(\d{1,2})\b/);
    if (singleHour) h = parseInt(singleHour[1], 10);
    else return null;
  }

  if (isNaN(h) || isNaN(m)) return null;
  if (ampm === "pm" && h < 12) h += 12;
  if (ampm === "am" && h === 12) h = 0;

  return `${String(Math.min(h, 23)).padStart(2, "0")}:${String(Math.min(m, 59)).padStart(2, "0")}`;
};

const capitalizeWords = (s) =>
  s.replace(/\s+/g, " ").trim().replace(/\b\w/g, (c) => c.toUpperCase());

/* ============== component ============== */
const AIBot = ({
  isOpen = true,
  onClose = () => {},
  isFromDoctor,
  doctorEmail,
  department,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* Language for UI. Voice stays English. */
  const [lang, setLang] = useState("en");
  const T = I18N[lang].ui;

  const [botMessage, setBotMessage] = useState("");
  const botMessageTimeoutRef = useRef(null);

  const botSpeak = useCallback(
    (text) => {
      if (botMessageTimeoutRef.current) clearTimeout(botMessageTimeoutRef.current);
      setBotMessage(text);
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang === "hi" ? "hi-IN" : lang === "mr" ? "mr-IN" : "en-US";
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
      }
      botMessageTimeoutRef.current = setTimeout(() => setBotMessage(""), 8000);
    },
    [lang]
  );

  let dep = "";
  if (department) dep = department[0]?.name;
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    patientName: "",
    mobileNumber: "",
    email: "",
    appointmentType: "",
    departmentName: dep || "",
    doctorEmail: doctorEmail || "",
    typeVisit: "Walk in",
    note: "",
    date: new Date(),
    time: "",
    age: "",
    gender: "",
    address: "",
  });

  const latestFormDataRef = useRef(formData);
  useEffect(() => { latestFormDataRef.current = formData; }, [formData]);

  useEffect(() => {
    const t = setTimeout(() => botSpeak(T.speakWelcome), 500);
    return () => {
      clearTimeout(t);
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, [botSpeak, T.speakWelcome]);

  useEffect(() => {
    if (doctorEmail) {
      setFormData((p) => {
        const updated = { ...p, doctorEmail };
        latestFormDataRef.current = updated;
        return updated;
      });
    }
  }, [doctorEmail]);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (typeof value === "string") value = value.trimStart();
    if (name === "age") value = value.replace(/\D/g, "");
    if (name === "departmentName") {
      setFormData((fd) => {
        const updated = { ...fd, departmentName: value, doctorEmail: "" };
        latestFormDataRef.current = updated;
        return updated;
      });
    } else {
      setFormData((fd) => {
        const updated = { ...fd, [name]: value };
        latestFormDataRef.current = updated;
        return updated;
      });
    }
  };

  const renderRequiredLabel = (label) => (
    <span>
      {label} <span style={{ color: "red" }}>*</span>
    </span>
  );

  const handleDepartmentDoctors = (departmentId) => {
    dispatch(getDoctorsByDepartment(departmentId));
  };

  useEffect(() => {
    if (department && department[0]?._id) {
      dispatch(getDoctorsByDepartment(department[0]._id));
    }
  }, [dispatch, department]);

  useEffect(() => {
    dispatch(getDoctors());
    dispatch(getAllDepartments());
    dispatch(getPatients());
  }, [dispatch]);

  const departments = useSelector((s) => s.receptionist.departments) || [];
  const allDoctors = useSelector((s) => s.receptionist.doctors) || [];
  const doctorsByDepartment =
    useSelector((s) => s.receptionist.doctorsByDepartment) || [];

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const bookingSuccess = useSelector((s) => s.receptionist.bookAppointment);

  useEffect(() => {
    if (bookingSuccess) setShowSuccessModal(true);
  }, [bookingSuccess]);

  const validateForm = (data = null) => {
    const fd = data || latestFormDataRef.current || formData;
    let newErrors = {};
    const required = [
      "patientName",
      "mobileNumber",
      "appointmentType",
      "departmentName",
      "doctorEmail",
      "age",
      "gender",
      "time",
    ];
    required.forEach((f) => {
      if (!fd[f]?.toString().trim()) newErrors[f] = T.errors.required;
    });
    if (fd.mobileNumber && !/^\d{10}$/.test(fd.mobileNumber.trim())) {
      newErrors.mobileNumber = T.errors.phone;
    }
    if (fd.age && (+fd.age < 0 || +fd.age > 120)) {
      newErrors.age = T.errors.age;
    }
    if (fd.email && !/^\S+@\S+\.\S+$/.test(fd.email.trim())) {
      newErrors.email = T.errors.email;
    }
    if (fd.time) {
      const [hh, mm] = fd.time.split(":").map(Number);
      const chosen = new Date(fd.date);
      chosen.setHours(hh || 0, mm || 0, 0, 0);
      const now = new Date();
      const sameDay = chosen.toDateString() === now.toDateString();
      if (sameDay && chosen < now) newErrors.time = T.errors.futureTime;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [loadingBtn, setLoadingBtn] = useState(false);
  const stopListening = useRef(null);
  const startListeningRef = useRef(null);

  const handleClick = useCallback(
    async (dataForBooking = null) => {
      stopListening.current?.();
      const dataToSubmit = dataForBooking || latestFormDataRef.current;
      const isValid = validateForm(dataToSubmit);
      if (!isValid) {
        botSpeak(T.speakComplete);
        return;
      }
      botSpeak(T.speakBooking);
      setLoadingBtn(true);
      try {
        dispatch(bookAppointment(dataToSubmit));
        botSpeak(T.speakSubmitted);
      } catch (error) {
        console.error(error);
        setLoadingBtn(false);
        botSpeak(T.speakNetErr);
      }
    },
    [dispatch, botSpeak, T]
  );

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const handleDateChange = (date) => {
    setFormData((p) => {
      const updated = { ...p, date };
      latestFormDataRef.current = updated;
      return updated;
    });
  };

  const SR =
    typeof window !== "undefined"
      ? window.SpeechRecognition || window.webkitSpeechRecognition
      : null;

  const [listening, setListening] = useState(false);
  const [lastHeard, setLastHeard] = useState("");
  const [liveTranscript, setLiveTranscript] = useState("");
  const srRef = useRef(null);
  const manuallyStopped = useRef(false);

  const departmentsLower = useMemo(
    () => departments.map((d) => (d.departmentName || "").toLowerCase()),
    [departments]
  );

  /* ============== Voice parsing with hi/mr transliterations for all fields ============== */
  const handleVoiceCommand = (txtRaw) => {
    // ASR is English. Accept common Hindi/Marathi transliterated tokens.
    let txt = (txtRaw || "").toLowerCase().trim();
    let patch = {};

    const isBookingCommand = /\b(book|confirm)\b.*\bappointment\b/.test(txt);
    if (isBookingCommand) {
      txt = txt.replace(/\b(book|confirm)\b.*\bappointment\b/, " ").trim();
    }

    const tail = (re) => {
      const m = txt.match(re);
      return m ? (m[2] || m[1] || "").replace(/^is\s+/, "").trim() : null;
    };

    // Name: "patient name/name/naam/nam/mera naam/patient ka naam ..."
    let m =
      txt.match(/\b(?:patient\s+name|name|naam|nam|nav|now|mera\s+naam|patient\s+ka\s+naam)\s+(?:is\s+)?(.+)/) ||
      txt.match(/^\s*(?:patient\s+)?name\s*[:\-]\s*(.+)$/);
    if (m?.[1]) {
      const val = m[1].trim();
      if (val) patch.patientName = capitalizeWords(val);
    }

    // Age: "age 32", "umr 30", "35 saal", "45 varsh/varsha"
    m =
      txt.match(/\b(?:age|umr|umar|umra|umrah|umraha|varsha|vai|version)\s+(?:is\s+)?(\d{1,3})\b/) ||
      txt.match(/\b(\d{1,3})\s*(?:years?|saal|sal|varsh|varsha|version)\b/);
    if (m) patch.age = String(Math.min(+m[1], 120));

    // Gender
    if (/\b(male|purush|mail)\b/.test(txt)) patch.gender = "Male";
    if (/\b(female|mahila|stri|stree)\b/.test(txt)) patch.gender = "Female";
    if (/\b(other|anya|anyaa)\b/.test(txt)) patch.gender = "Other";

    // Mobile: any 10-digit
    m = txt.replace(/\D/g, "").match(/\b(\d{10})\b/);
    if (m) patch.mobileNumber = m[1];

    // Email
    m =
      txt.match(/[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}/i) ||
      txt.match(/\b(?:mail\s*id|email)\s*(?:is\s*)?([a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,})/i);
    if (m) patch.email = m[1] || m[0];

    // Appointment Type
    if (/\b(follow\s?up|dobara|phir\s*se|punah|punaha)\b/.test(txt))
      patch.appointmentType = "Follow up";
    else if (/\b(consult(?:ation)?|paramarsh|salah|salaah)\b/.test(txt))
      patch.appointmentType = "Consultation";
    else if (/\b(vaccination|teeka|tikakaran|teekakaran)\b/.test(txt))
      patch.appointmentType = "Vaccination";
    else if (/\b(other|anya|anyaa)\b/.test(txt))
      patch.appointmentType = "Other";

    // Visit Type
    if (/\b(walk\s*in|seedha\s*aana|sidha\s*ana|sidha\s*aao)\b/.test(txt))
      patch.typeVisit = "Walk in";
    if (/\b(referral|refer|sifarish)\b/.test(txt))
      patch.typeVisit = "Referral";
    if (/\b(on\s*line|online)\b/.test(txt))
      patch.typeVisit = "Online";

    // Date: today/tomorrow/"kal"/"parso"
    if (/\b(today|aaj|aj)\b/.test(txt))
      patch.date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    else if (/\b(tomorrow|kal)\b/.test(txt))
      patch.date = addDays(new Date(), 1);
    else if (/\b(parso|parsu|parsoh)\b/.test(txt))
      patch.date = addDays(new Date(), 2);
    else {
      const d1 = toDateObj(txt);
      if (d1) patch.date = d1;
    }

    // Time: standard forms + "7 baje", am/pm hints
    const t = toTime24(txt);
    if (t) patch.time = t;
    let hm = txt.match(/\b(\d{1,2})\s*baje?\b/);
    if (hm && !patch.time) {
      let h = Math.min(parseInt(hm[1], 10), 12);
      const isPM = /\b(pm|shaam|raat)\b/.test(txt);
      const isAM = /\b(am|subah|savera)\b/.test(txt);
      if (isPM && h < 12) h += 12;
      if (isAM && h === 12) h = 0;
      patch.time = `${String(h).padStart(2, "0")}:00`;
    }

    // Department (Branch): explicit phrase "branch/vibhag/shakha <name>" or any match
    const depPhrase = (() => {
      const m1 = txt.match(/\b(?:branch|vibhag|shakha)\s+(.+)$/);
      return m1 ? (m1[1] || "").trim() : null;
    })();

    let targetDoctorList = doctorsByDepartment;
    if (depPhrase) {
      const hit = (departments || []).find((d) =>
        depPhrase.includes((d.departmentName || "").toLowerCase())
      );
      if (hit) {
        patch.departmentName = hit.departmentName;
        patch.doctorEmail = "";
        handleDepartmentDoctors(hit.departmentId);
        targetDoctorList = allDoctors.filter(
          (doc) => doc.departmentId === hit.departmentId
        );
      }
    } else {
      const depHit = (departments || []).find((d) =>
        txt.includes((d.departmentName || "").toLowerCase())
      );
      if (depHit) {
        patch.departmentName = depHit.departmentName;
        patch.doctorEmail = "";
        handleDepartmentDoctors(depHit.departmentId);
        targetDoctorList = allDoctors.filter(
          (doc) => doc.departmentId === depHit.departmentId
        );
      }
    }

    // Doctor: "doctor/dr/daktar <name>" or fuzzy includes
    let docName = (() => {
      const m2 = txt.match(/\b(?:doctor|dr\.?|daktar|doctar)\s+([^,]+)/);
      return m2 ? (m2[1] || "").trim() : null;
    })();
    if (docName) {
      const doc = (targetDoctorList || []).find((d) =>
        (d.name || "").toLowerCase().includes(docName.toLowerCase())
      );
      if (doc) patch.doctorEmail = doc.email;
    } else if ((targetDoctorList || []).length) {
      const docHit = targetDoctorList.find((d) =>
        txt.includes((d.name || "").toLowerCase())
      );
      if (docHit) patch.doctorEmail = docHit.email;
    }

    // Note
    const noteTail = (() => {
      const m3 = txt.match(/\b(?:note|remarks|tipani|tippani)\s+(.*)$/);
      return m3 ? (m3[1] || "").trim() : null;
    })();
    if (noteTail) patch.note = noteTail;

    // Address
    const addrTail = (() => {
      const m4 = txt.match(/\b(?:address|patta|pata|thikana|thikanaa)\s+(.*)$/);
      return m4 ? (m4[1] || "").trim() : null;
    })();
    if (addrTail) patch.address = addrTail;

    if (Object.keys(patch).length) {
      setFormData((fd) => {
        const updated = { ...fd, ...patch };
        latestFormDataRef.current = updated;
        return updated;
      });
    }

    if (isBookingCommand) {
      if (srRef.current) {
        manuallyStopped.current = true;
        try { srRef.current.stop(); } catch {}
        setListening(false);
      }
      const finalData = { ...latestFormDataRef.current, ...patch };
      handleClick(finalData);
    }
  };

  /* ============== SR wiring ============== */
  const startListening = () => {
    if (!SR || listening) return;
    manuallyStopped.current = false;
    const r = srRef.current || new SR();
    r.continuous = true;
    r.interimResults = true;
    r.lang = "en-IN"; // always English input

    r.onresult = (e) => {
      let interim = "";
      let final = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const transcript = e.results[i][0].transcript;
        if (e.results[i].isFinal) final += transcript.trim() + " ";
        else interim += transcript;
      }
      setLiveTranscript(interim);
      if (final) {
        const finalCommand = final.trim();
        setLastHeard(finalCommand);
        handleVoiceCommand(finalCommand);
        setLiveTranscript("");
      }
    };

    r.onerror = (e) => {
      console.error("Speech Recognition Error:", e);
      try { r.stop(); } catch {}
      setListening(false);
    };

    r.onend = () => {
      if (!manuallyStopped.current) {
        try { r.start(); } catch {}
      } else {
        setListening(false);
        setLiveTranscript("");
      }
    };

    try { r.start(); } catch {}
    srRef.current = r;
    setListening(true);
  };

  const stopListeningFn = () => {
    if (!srRef.current) return;
    manuallyStopped.current = true;
    try { srRef.current.stop(); } catch {}
  };

  stopListening.current = stopListeningFn;
  startListeningRef.current = startListening;

  const toggleListening = () => {
    if (!SR) return;
    listening ? stopListeningFn() : startListening();
  };

  /* ============== UI ============== */
  return (
    <>
      <Modal
        open={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          dispatch(removeBookAppointmentData());
        }}
      >
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "28px",
            }}
          >
            <svg
              width="70"
              height="70"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M40 0C18 0 0 18 0 40C0 62 18 80 40 80C62 80 80 62 80 40C80 18 62 0 40 0ZM40 72C22.36 72 8 57.64 8 40C8 22.36 22.36 8 40 8C57.64 8 72 22.36 72 40C72 57.64 57.64 72 40 72ZM58.36 22.32L32 48.68L21.64 38.36L16 44L32 60L64 28L58.36 22.32Z"
                fill="#2E823B"
              />
            </svg>
            <Button
              onClick={() => {
                onClose();
                setShowSuccessModal(false);
                dispatch(removeBookAppointmentData());
                navigate("/receptionist/patients");
              }}
              sx={{
                backgroundColor: "#25307F",
                color: "white",
                "&:focus": { outline: "none", boxShadow: "none" },
              }}
            >
              {T.successBtn}
            </Button>
          </div>
        </Box>
      </Modal>

      <div style={{ height: "100vh", position: "relative" }}>
        {/* Bot bubble */}
        <div
          style={{
            position: "fixed",
            left: 16,
            bottom: 150,
            display: "flex",
            alignItems: "flex-end",
            gap: 2,
            zIndex: 998,
            maxWidth: "280px",
          }}
        >
          <Avatar
            src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
            sx={{ width: 56, height: 56, border: "2px solid #25307F", mb: 1 }}
          />
          {botMessage && (
            <Paper
              elevation={4}
              sx={{
                p: "10px 14px",
                bgcolor: "#25307F",
                color: "white",
                borderRadius: "16px 16px 16px 0",
                mb: 1,
                transition: "opacity 0.3s",
              }}
            >
              <Typography variant="body2">{botMessage}</Typography>
            </Paper>
          )}
        </div>

        {/* Top-right controls */}
        <div
          style={{
            position: "fixed",
            right: 100,
            top: 10,
            display: "flex",
            gap: 12,
            alignItems: "center",
            zIndex: 999,
          }}
        >
          {SR ? (
            <>
              {listening && liveTranscript && (
                <Paper
                  elevation={3}
                  sx={{
                    p: "8px 12px",
                    bgcolor: "rgba(0,0,0,0.7)",
                    color: "white",
                    borderRadius: "16px",
                    maxWidth: 420,
                  }}
                >
                  <Typography variant="body2" component="p">
                    {liveTranscript}
                  </Typography>
                </Paper>
              )}
              <Chip
                icon={<GraphicEqIcon />}
                label={
                  listening
                    ? T.listening
                    : lastHeard
                    ? I18N[lang].ui.heard(
                        `${lastHeard.slice(0, 32)}${
                          lastHeard.length > 32 ? "…" : ""
                        }`
                      )
                    : T.voiceReady
                }
                variant="outlined"
              />
              <Tooltip title={listening ? T.micStop : T.micStart} placement="left">
                <IconButton
                  onClick={toggleListening}
                  size="large"
                  sx={{
                    bgcolor: listening ? "#d32f2f" : "#25307F",
                    color: "white",
                    "&:hover": { bgcolor: listening ? "#b71c1c" : "#1b235f" },
                  }}
                >
                  {listening ? <MicOffIcon /> : <MicIcon />}
                </IconButton>
              </Tooltip>

              {/* Language selector */}
              <TextField
                select
                size="small"
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                label={T.langLabel}
                sx={{ minWidth: 160 }}
                helperText={T.langNote}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="hi">हिन्दी</MenuItem>
                <MenuItem value="mr">मराठी</MenuItem>
              </TextField>
            </>
          ) : (
            <Chip color="warning" label="Speech not supported in this browser" />
          )}
        </div>

        <div className={`book-appointment-AI ${isFromDoctor ? "from-doctor" : "default"}`}>
          <div className="book-header">
            <h2 style={{ fontWeight: 500, marginTop: "3px" }}>{T.title}</h2>
          </div>

          <Divider className="divider" />
          <div className="content">
            <div className="left-panel">
              <h3>{renderRequiredLabel(T.selectDate)}</h3>
              <Calendar
                onChange={handleDateChange}
                name="date"
                value={formData.date}
                tileDisabled={({ date }) =>
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
              />

              <h3 style={{ marginTop: 12 }}>{renderRequiredLabel(T.selectTime)}</h3>
              <TextField
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                inputProps={{ step: 300 }}
                error={!!errors.time}
                helperText={errors.time}
                sx={{
                  "& .MuiOutlinedInput-root": { height: 46, width: 180 },
                  "& .MuiOutlinedInput-input": {
                    padding: "6px 10px",
                    boxSizing: "border-box",
                  },
                }}
              />

              <h3 style={{ marginTop: 12 }}>{T.note}</h3>
              <TextField
                name="note"
                value={formData.note}
                onChange={handleChange}
                multiline
                rows={5}
                fullWidth
                placeholder={T.note}
              />
            </div>

            <div className="right-panel">
              <p>{renderRequiredLabel(T.patientName)}</p>
              <TextField
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                fullWidth
                error={!!errors.patientName}
                helperText={errors.patientName}
              />

              <p>{renderRequiredLabel(T.age)}</p>
              <TextField
                name="age"
                value={formData.age}
                onChange={handleChange}
                fullWidth
                error={!!errors.age}
                helperText={errors.age}
              />

              <p>{renderRequiredLabel(T.gender)}</p>
              <TextField
                select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                fullWidth
                error={!!errors.gender}
                helperText={errors.gender}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>

              <p>{T.address}</p>
              <TextField
                name="address"
                value={formData.address}
                onChange={handleChange}
                fullWidth
                multiline
                rows={2}
              />

              <p>{renderRequiredLabel(T.apptType)}</p>
              <TextField
                select
                name="appointmentType"
                value={formData.appointmentType}
                onChange={handleChange}
                fullWidth
                error={!!errors.appointmentType}
                helperText={errors.appointmentType}
              >
                <MenuItem value="Follow up">{T.followUp}</MenuItem>
                <MenuItem value="Consultation">{T.consultation}</MenuItem>
                <MenuItem value="Vaccination">{T.vaccination}</MenuItem>
                <MenuItem value="Other">{T.other}</MenuItem>
              </TextField>

              <p>{renderRequiredLabel(T.branch)}</p>
              <TextField
                select
                name="departmentName"
                value={formData.departmentName}
                onChange={handleChange}
                fullWidth
                error={!!errors.departmentName}
                helperText={errors.departmentName}
                slotProps={{
                  select: {
                    MenuProps: {
                      PaperProps: { style: { maxHeight: 200, overflowY: "auto" } },
                    },
                  },
                }}
              >
                {departments.map((department, index) => (
                  <MenuItem
                    key={index}
                    value={department.departmentName}
                    onClick={() => handleDepartmentDoctors(department.departmentId)}
                  >
                    {department.departmentName}
                  </MenuItem>
                ))}
              </TextField>

              <p>{renderRequiredLabel(T.doctor)}</p>
              <TextField
                select
                name="doctorEmail"
                value={formData.doctorEmail}
                onChange={handleChange}
                fullWidth
                error={!!errors.doctorEmail}
                helperText={errors.doctorEmail}
                slotProps={{
                  select: {
                    MenuProps: {
                      PaperProps: { style: { maxHeight: 200, overflowY: "auto" } },
                    },
                  },
                }}
              >
                {doctorsByDepartment.map((doctor, index) => (
                  <MenuItem key={index} value={doctor.email}>
                    {doctor.name}
                  </MenuItem>
                ))}
              </TextField>

              <p>{renderRequiredLabel(T.visitType)}</p>
              <TextField
                select
                name="typeVisit"
                value={formData.typeVisit}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="Walk in">{T.walkIn}</MenuItem>
                <MenuItem value="Referral">{T.referral}</MenuItem>
                <MenuItem value="Online">{T.online}</MenuItem>
              </TextField>

              <p>{renderRequiredLabel(T.mobile)}</p>
              <TextField
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                fullWidth
                error={!!errors.mobileNumber}
                helperText={errors.mobileNumber}
              />

              <p>{T.email}</p>
              <TextField
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                error={!!errors.email}
                helperText={errors.email}
              />

              {loadingBtn ? (
                <Button
                  variant="contained"
                  className="submit-btn"
                  fullWidth
                  sx={{ "&:focus": { outline: "none", boxShadow: "none" } }}
                >
                  <CircularProgress size={28} thickness={5} sx={{ color: "white" }} />
                </Button>
              ) : (
                <Button
                  variant="contained"
                  className="submit-btn"
                  fullWidth
                  onClick={() => handleClick()}
                  sx={{ "&:focus": { outline: "none", boxShadow: "none" } }}
                >
                  {T.confirm}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIBot;
