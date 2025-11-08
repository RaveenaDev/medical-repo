import React, { useEffect, useRef, useState } from "react";
import styles from "./PrescriptionAndMedicines.module.scss";
import PNMLoader from "../../PNMLoader.jsx";
import { useDispatch } from "react-redux";
import {
  chatWithAI,
  generatePrescriptionsWithAI,
} from "../../../../../../components/State/Doctor/Action.js";
import ManualPrescriptionForm from "../../manual/ManualPrescriptionForm.jsx";
import { useReactToPrint } from "react-to-print";
import PrescriptionAndMedicinesPrint from "../../print/PrescriptionAndMedicinesPrint.jsx";
import { MicOff } from "lucide-react";

const PrescriptionAndMedicines = ({
  patient,
  completeData,
  generatedPrescriptions,
  onConfirm,
  selectedComponent,
  existingData,
}) => {
  const [loading, setLoading] = useState(true);
  const [isListening, setIsListening] = useState(false);

  const [micText, setMicText] = useState("");
  const [isSending, setIsSending] = useState(false);

  const recognitionRef = useRef(null);
  const isListeningRef = useRef(false);

  const [isManualMode, setIsManualMode] = useState(
    () => localStorage.getItem("prescriptionMode") === "manual"
  );
  const dispatch = useDispatch();

  const [selected, setSelected] = useState({
    medications: [],
    injectionsTherapies: [],
    nonDrugRecommendations: [],
    lifestyle: [],
    followUpInstructions: [], // <-- now a list of strings
  });

  //  Use patient-based key to avoid overwriting across patients
  const storageKey = `savedPrescriptionData_${patient?._id || "unknown"}`;

  //  Load existing data or saved data on mount
  useEffect(() => {
    // Step 1: Try localStorage first
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        //  Validate the shape (ensure all arrays exist)
        const safeData = {
          medications: parsed.medications || [],
          injectionsTherapies: parsed.injectionsTherapies || [],
          nonDrugRecommendations: parsed.nonDrugRecommendations || [],
          lifestyle: parsed.lifestyle || [],
          followUpInstructions: parsed.followUpInstructions || [],
        };

        setSelected(safeData);
        setLoading(false);
        return;
      } catch (err) {
        console.error(" Failed to parse saved prescription data:", err);
      }
    }

    // Step 2: Fallback — load from existingData if available
    if (existingData?.[selectedComponent]) {
      const data = existingData[selectedComponent];
      const safeData = {
        medications: data.medications || [],
        injectionsTherapies: data.injectionsTherapies || [],
        nonDrugRecommendations: data.nonDrugRecommendations || [],
        lifestyle: data.lifestyle || [],
        followUpInstructions: data.followUpInstructions || [],
      };

      setSelected(safeData);
      setLoading(false);
    } else {
      setLoading(false); //  make sure loader hides even if empty
    }
  }, [existingData, selectedComponent, patient?._id]);

  //  Auto-save any updates to localStorage
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(storageKey, JSON.stringify(selected));
    }
  }, [selected, storageKey, loading]);

  // Add-new text fields for non-meds sections
  const [showAdd, setShowAdd] = useState({
    inj: false,
    non: false,
    life: false,
    fu: false,
  });
  const [addBuf, setAddBuf] = useState({ inj: "", non: "", life: "", fu: "" });

  // Inline edit for non-meds sections
  const [editIdx, setEditIdx] = useState({
    inj: null,
    non: null,
    life: null,
    fu: null,
  });
  const [editBuf, setEditBuf] = useState("");

  // Inline edit: AI meds
  const [aiMedEditIdx, setAiMedEditIdx] = useState(null);
  const [aiMedBuf, setAiMedBuf] = useState("");

  // Manual med modal
  const [medModalOpen, setMedModalOpen] = useState(false);
  const [medModalMode, setMedModalMode] = useState("add"); // 'add' | 'edit'
  const [editingMedIndex, setEditingMedIndex] = useState(null);
  const [medForm, setMedForm] = useState({
    name: "",
    dosage: "",
    duration: "",
    instructions: "",
  });

  const hasSelection =
    selected.medications.length +
      selected.injectionsTherapies.length +
      selected.nonDrugRecommendations.length +
      selected.lifestyle.length +
      selected.followUpInstructions.length >
    0;

  const dedupSimple = (prevArr, newArr) => {
    const set = new Set(prevArr.map(String));
    const out = [...prevArr];
    newArr.forEach((x) => {
      const k = String(x);
      if (!set.has(k)) {
        set.add(k);
        out.push(x);
      }
    });
    return out;
  };

  // ===== Add from AI into selected =====
  const addMedsFromAI = () =>
    setSelected((s) => ({
      ...s,
      medications: [
        ...s.medications,
        ...(generatedPrescriptions?.aiGeneratedText?.medications || [])
          .filter(
            (t) => !s.medications.some((m) => m.kind === "ai" && m.text === t)
          )
          .map((t) => ({ kind: "ai", text: t })),
      ],
    }));

  const addInjections = () =>
    setSelected((s) => ({
      ...s,
      injectionsTherapies: dedupSimple(
        s.injectionsTherapies,
        generatedPrescriptions?.aiGeneratedText?.injectionsTherapies || []
      ),
    }));

  const addNonDrug = () =>
    setSelected((s) => ({
      ...s,
      nonDrugRecommendations: dedupSimple(
        s.nonDrugRecommendations,
        generatedPrescriptions?.aiGeneratedText?.nonDrugRecommendations || []
      ),
    }));

  const addLifestyle = () =>
    setSelected((s) => ({
      ...s,
      lifestyle: dedupSimple(
        s.lifestyle,
        generatedPrescriptions?.aiGeneratedText?.lifestyle || []
      ),
    }));

  // Follow-up from AI: convert Review Date + Notes into two plain bullet strings
  const addFollowUpFromAI = () => {
    const fu = generatedPrescriptions?.aiGeneratedText?.followUpInstructions;
    const lines = [];
    if (fu) {
      if (fu.reviewDate) lines.push(`Review: ${fu.reviewDate}`);
      if (fu.notes) lines.push(`Notes: ${fu.notes}`);
    } else if (
      Array.isArray(generatedPrescriptions?.aiGeneratedText?.followUp)
    ) {
      // fallback if you ever return an array
      lines.push(...generatedPrescriptions.aiGeneratedText.followUp);
    } else if (generatedPrescriptions?.aiGeneratedText?.followUp) {
      lines.push(String(generatedPrescriptions.aiGeneratedText.followUp));
    }
    if (lines.length === 0) return;
    setSelected((s) => ({
      ...s,
      followUpInstructions: dedupSimple(s.followUpInstructions, lines),
    }));
  };

  // ===== Add (manual text) for non-meds =====
  const openAdd = (sectionKey) =>
    setShowAdd((v) => ({ ...v, [sectionKey]: true }));
  const cancelAdd = (sectionKey) => {
    setShowAdd((v) => ({ ...v, [sectionKey]: false }));
    setAddBuf((v) => ({ ...v, [sectionKey]: "" }));
  };
  const saveAdd = (sectionKey) => {
    const mapKey = {
      inj: "injectionsTherapies",
      non: "nonDrugRecommendations",
      life: "lifestyle",
      fu: "followUpInstructions",
    }[sectionKey];
    const val = addBuf[sectionKey].trim();
    if (!val) return;
    setSelected((s) => ({ ...s, [mapKey]: [...s[mapKey], val] }));
    cancelAdd(sectionKey);
  };

  // ===== Remove from any array =====
  const removeFromArray = (key, idx) =>
    setSelected((s) => ({ ...s, [key]: s[key].filter((_, i) => i !== idx) }));

  // ===== Inline edit non-meds =====
  const startInlineEdit = (section, idx, current) => {
    setEditIdx((prev) => ({ ...prev, [section]: idx }));
    setEditBuf(current);
  };
  const saveInlineEdit = (section) => {
    const keyMap = {
      inj: "injectionsTherapies",
      non: "nonDrugRecommendations",
      life: "lifestyle",
      fu: "followUpInstructions",
    };
    const stateKey = keyMap[section];
    setSelected((s) => ({
      ...s,
      [stateKey]: s[stateKey].map((v, i) =>
        i === editIdx[section] ? editBuf : v
      ),
    }));
    setEditIdx((prev) => ({ ...prev, [section]: null }));
    setEditBuf("");
  };
  const cancelInline = (section) => {
    setEditIdx((prev) => ({ ...prev, [section]: null }));
    setEditBuf("");
  };

  // ===== Inline edit AI med =====
  const startAiMedEdit = (idx) => {
    const item = selected.medications[idx];
    if (item?.kind !== "ai") return;
    setAiMedEditIdx(idx);
    setAiMedBuf(item.text || "");
  };
  const saveAiMedEdit = () => {
    if (aiMedEditIdx === null) return;
    setSelected((s) => ({
      ...s,
      medications: s.medications.map((m, i) =>
        i === aiMedEditIdx ? { ...m, text: aiMedBuf.trim() } : m
      ),
    }));
    setAiMedEditIdx(null);
    setAiMedBuf("");
  };
  const cancelAiMedEdit = () => {
    setAiMedEditIdx(null);
    setAiMedBuf("");
  };

  // ===== Manual med modal =====
  const openMedModal = (mode = "add", index = null) => {
    setMedModalMode(mode);
    setEditingMedIndex(index);
    if (mode === "edit" && index !== null) {
      const item = selected.medications[index];
      if (item?.kind !== "manual") return;
      setMedForm({
        name: item.name || "",
        dosage: item.dosage || "",
        duration: item.duration || "",
        instructions: item.instructions || "",
      });
    } else {
      setMedForm({ name: "", dosage: "", duration: "", instructions: "" });
    }
    setMedModalOpen(true);
  };
  const closeMedModal = () => setMedModalOpen(false);
  const submitMedModal = (e) => {
    e.preventDefault();
    const payload = { kind: "manual", ...medForm };
    if (!payload.name?.trim()) return;

    if (medModalMode === "add") {
      setSelected((s) => ({ ...s, medications: [...s.medications, payload] }));
    } else if (editingMedIndex !== null) {
      setSelected((s) => ({
        ...s,
        medications: s.medications.map((m, i) =>
          i === editingMedIndex ? payload : m
        ),
      }));
    }
    setMedModalOpen(false);
  };

  // ===== Lifecycle =====
  useEffect(() => {
    if (existingData && selectedComponent && existingData[selectedComponent])
      setLoading(false);
    else if (
      generatedPrescriptions &&
      Object.keys(generatedPrescriptions).length > 0
    )
      setLoading(false);
  }, [existingData, selectedComponent, generatedPrescriptions]);

  useEffect(() => {
    if (
      generatedPrescriptions &&
      Object.keys(generatedPrescriptions).length > 0
    )
      setLoading(false);
  }, [generatedPrescriptions]);

  const handleRegenerate = () => {
    const aiData = {
      ...completeData,
      patientId: patient._id,
      diagnosisVitals: completeData?.diagnosisAndVitals, // ✅ new key
    };

    delete aiData.diagnosisAndVitals; //  remove old key
    dispatch(generatePrescriptionsWithAI(aiData));
    setLoading(true);
  };

  const handleToggle = (manual) => {
    setIsManualMode(manual);
    localStorage.setItem("prescriptionMode", manual ? "manual" : "ai");
  };

  const printRef = useRef();
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Prescriptions And Medicines",
  });

  // Keep isListeningRef in sync with isListening state
  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      console.warn("Speech Recognition not supported in this browser");
      return;
    }

    const rec = new SR();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-IN";

    rec.onresult = (e) => {
      let finalChunk = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const transcript = e.results[i][0].transcript;
        if (e.results[i].isFinal) finalChunk += transcript + " ";
      }
      if (finalChunk) setMicText((t) => (t ? t + " " : "") + finalChunk.trim());
    };

    rec.onend = () => {
      if (isListeningRef.current) {
        try {
          rec.start();
        } catch (err) {
          console.error("Error restarting recognition:", err);
        }
      }
    };

    rec.onerror = (e) => {
      console.error("Speech recognition error:", e.error);
      if (e.error === "no-speech" || e.error === "aborted") {
        return;
      }
      setIsListening(false);
    };

    recognitionRef.current = rec;
    return () => {
      if (rec) {
        rec.abort();
      }
    };
  }, []);

  const toggleMic = () => {
    const rec = recognitionRef.current;
    if (!rec) {
      console.error("Speech recognition not available");
      return;
    }

    if (isListening) {
      setIsListening(false);
      rec.stop();
    } else {
      setIsListening(true);
      try {
        rec.start();
      } catch (err) {
        console.error("Error starting recognition:", err);
        setIsListening(false);
      }
    }
  };
  // ===== CHAT THREAD =====
  const [chatMessages, setChatMessages] = useState([]); // {role: 'user'|'ai', text: string}

  // ===== Handle sending micText to AI and update chat =====
  const handleSendChat = async () => {
    const message = micText.trim();
    if (!message) return;

    // add user's message to chat immediately
    setChatMessages((prev) => [...prev, { role: "user", text: message }]);
    setIsSending(true);
    setMicText("");

    try {
      const aiData = {
        prescriptionId: generatedPrescriptions?._id,
        message: message, // include user note
      };

      const response = await dispatch(chatWithAI(aiData));

      // some Redux setups return response via `response.payload` — handle both cases
      const reply =
        response?.aiReply || "Prescription updated based on your note.";

      setChatMessages((prev) => [...prev, { role: "ai", text: reply }]);
    } catch (err) {
      console.error("Error sending chat to AI:", err);
      setChatMessages((prev) => [
        ...prev,
        { role: "ai", text: "⚠️ Error: Could not reach AI service." },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div>
      <div className={styles.container1}>
        <div className={styles.row1}>
          <p>Prescription And Medicines</p>
        </div>

        <p className={styles.row2}>
          {patient?.name} | Age: {patient?.age ?? "N/A"} |{" "}
          {patient?.gender ?? "N/A"}
        </p>

        <div className={styles.toggleWrapper}>
          <span
            className={!isManualMode ? styles.activeToggle : ""}
            onClick={() => handleToggle(false)}
          >
            AI
          </span>
          <span
            className={isManualMode ? styles.activeToggle : ""}
            onClick={() => handleToggle(true)}
          >
            Manual
          </span>
        </div>

        {isManualMode ? (
          <ManualPrescriptionForm
            patient={patient}
            onConfirm={onConfirm}
            existingData={existingData?.[selectedComponent]}
          />
        ) : !loading ? (
          <>
            {/* ==== AI draft container (unchanged UI) ==== */}
            <img
              src="/assets/NOVA-on-border.svg"
              height={100}
              alt=""
              className={styles.nova}
            />
            <div className={styles.parentContainer}>
              <div className={styles.container2}>
                <div className={styles.row3}>
                  <img src="/assets/mdi_magic.svg" alt="" height={30} />
                  <p>AI Clinical Draft Assistant</p>
                </div>

                <div className={styles.regenerate}>
                  <button
                    className={styles.regenerateButton}
                    onClick={handleRegenerate}
                  >
                    Regenerate
                  </button>
                </div>

                <div className={styles.row4}>
                  <p className={styles.value}>
                    <span className={styles.key}>Problem Statement:</span>{" "}
                    {generatedPrescriptions?.aiGeneratedText?.problemStatement}
                  </p>
                </div>
                <div className={styles.row5}>
                  <p className={styles.value}>
                    <span className={styles.key}>ICD:</span>{" "}
                    {generatedPrescriptions?.aiGeneratedText?.icdCode}
                  </p>
                </div>
                <div className={styles.row5}>
                  <p className={styles.value}>
                    <span className={styles.key}>Therapy Plan:</span>{" "}
                    {generatedPrescriptions?.aiGeneratedText?.therapyPlan}
                  </p>
                </div>
                <div className={styles.row5}>
                  <p className={styles.value}>
                    <span className={styles.key}>Precautions:</span>{" "}
                    {generatedPrescriptions?.aiGeneratedText?.precautions}
                  </p>
                </div>
                <div className={styles.row5}>
                  <p className={styles.value}>
                    <span className={styles.key}>Follow-Up:</span>{" "}
                    {generatedPrescriptions?.aiGeneratedText?.followUp}
                  </p>
                </div>

                {/* Medications */}
                <div className={styles.instruct}>
                  <div className={styles.row10}>
                    <p>Medications</p>
                  </div>
                  <div className={styles.row11}>
                    <div>
                      {generatedPrescriptions?.aiGeneratedText?.medications?.map(
                        (med, i) => (
                          <div
                            key={i}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              marginBottom: 4,
                            }}
                          >
                            <span style={{ marginRight: 10 }}>&#8226;</span>
                            <p style={{ margin: 0 }}>{med}</p>
                          </div>
                        )
                      )}
                    </div>
                    <div
                      className={styles.iconContainer}
                      onClick={addMedsFromAI}
                    >
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.5"
                          y="0.5"
                          width="39"
                          height="39"
                          rx="4.5"
                          stroke="#868ECB"
                        />
                        <path
                          d="M14.832 11.832H13.4987C12.7915 11.832 12.1132 12.113 11.6131 12.6131C11.113 13.1132 10.832 13.7915 10.832 14.4987V26.4987C10.832 27.2059 11.113 27.8842 11.6131 28.3843C12.1132 28.8844 12.7915 29.1654 13.4987 29.1654H25.4987C26.2059 29.1654 26.8842 28.8844 27.3843 28.3843C27.8844 27.8842 28.1654 27.2059 28.1654 26.4987V25.1654"
                          stroke="#686868"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M24.166 12.8321L27.1659 15.8321M28.5509 14.4171C28.9448 14.0233 29.166 13.4891 29.166 12.9321C29.166 12.3751 28.9448 11.841 28.5509 11.4471C28.1571 11.0533 27.6229 10.832 27.0659 10.832C26.5089 10.832 25.9748 11.0533 25.5809 11.4471L17.166 19.8321V22.832H20.166L28.5509 14.4171Z"
                          stroke="#686868"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className={styles.hoverText}>
                        Add to Prescription
                      </span>
                    </div>
                  </div>
                  {/*<div className={styles.lineContainer}>*/}
                  {/*    <div className={styles.line}/>*/}
                  {/*</div>*/}
                </div>

                {/* Injection / Therapies */}
                <div className={styles.instruct}>
                  <div className={styles.row10}>
                    <p>Injection / Therapies</p>
                  </div>
                  <div className={styles.row11}>
                    <div>
                      {generatedPrescriptions?.aiGeneratedText?.injectionsTherapies?.map(
                        (text, i) => (
                          <div
                            key={i}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              marginBottom: 4,
                            }}
                          >
                            <span style={{ marginRight: 10 }}>&#8226;</span>
                            <p style={{ margin: 0 }}>{text}</p>
                          </div>
                        )
                      )}
                    </div>
                    <div
                      className={styles.iconContainer}
                      onClick={addInjections}
                    >
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.5"
                          y="0.5"
                          width="39"
                          height="39"
                          rx="4.5"
                          stroke="#868ECB"
                        />
                        <path
                          d="M14.832 11.832H13.4987C12.7915 11.832 12.1132 12.113 11.6131 12.6131C11.113 13.1132 10.832 13.7915 10.832 14.4987V26.4987C10.832 27.2059 11.113 27.8842 11.6131 28.3843C12.1132 28.8844 12.7915 29.1654 13.4987 29.1654H25.4987C26.2059 29.1654 26.8842 28.8844 27.3843 28.3843C27.8844 27.8842 28.1654 27.2059 28.1654 26.4987V25.1654"
                          stroke="#686868"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M24.166 12.8321L27.1659 15.8321M28.5509 14.4171C28.9448 14.0233 29.166 13.4891 29.166 12.9321C29.166 12.3751 28.9448 11.841 28.5509 11.4471C28.1571 11.0533 27.6229 10.832 27.0659 10.832C26.5089 10.832 25.9748 11.0533 25.5809 11.4471L17.166 19.8321V22.832H20.166L28.5509 14.4171Z"
                          stroke="#686868"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className={styles.hoverText}>
                        Add to Prescription
                      </span>
                    </div>
                  </div>
                  {/*<div className={styles.lineContainer}>*/}
                  {/*    <div className={styles.line}/>*/}
                  {/*</div>*/}
                </div>

                {/* Non-Drug Recommendation */}
                <div className={styles.instruct}>
                  <div className={styles.row10}>
                    <p>Non-Drug Recommendation</p>
                  </div>
                  <div className={styles.row11}>
                    <div>
                      {generatedPrescriptions?.aiGeneratedText?.nonDrugRecommendations?.map(
                        (text, i) => (
                          <div key={i} style={{ display: "flex" }}>
                            <span style={{ marginRight: 10 }}>&#8226;</span>
                            <p style={{ margin: 0 }}>{text}</p>
                          </div>
                        )
                      )}
                    </div>
                    <div className={styles.iconContainer} onClick={addNonDrug}>
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.5"
                          y="0.5"
                          width="39"
                          height="39"
                          rx="4.5"
                          stroke="#868ECB"
                        />
                        <path
                          d="M14.832 11.832H13.4987C12.7915 11.832 12.1132 12.113 11.6131 12.6131C11.113 13.1132 10.832 13.7915 10.832 14.4987V26.4987C10.832 27.2059 11.113 27.8842 11.6131 28.3843C12.1132 28.8844 12.7915 29.1654 13.4987 29.1654H25.4987C26.2059 29.1654 26.8842 28.8844 27.3843 28.3843C27.8844 27.8842 28.1654 27.2059 28.1654 26.4987V25.1654"
                          stroke="#686868"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M24.166 12.8321L27.1659 15.8321M28.5509 14.4171C28.9448 14.0233 29.166 13.4891 29.166 12.9321C29.166 12.3751 28.9448 11.841 28.5509 11.4471C28.1571 11.0533 27.6229 10.832 27.0659 10.832C26.5089 10.832 25.9748 11.0533 25.5809 11.4471L17.166 19.8321V22.832H20.166L28.5509 14.4171Z"
                          stroke="#686868"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className={styles.hoverText}>
                        Add to Prescription
                      </span>
                    </div>
                  </div>
                  {/*<div className={styles.lineContainer}>*/}
                  {/*    <div className={styles.line}/>*/}
                  {/*</div>*/}
                </div>

                {/* Life Style & Diet */}
                <div className={styles.instruct}>
                  <div className={styles.row10}>
                    <p>Life Style & Diet</p>
                  </div>
                  <div className={styles.row11}>
                    <div>
                      {generatedPrescriptions?.aiGeneratedText?.lifestyle?.map(
                        (text, i) => (
                          <div
                            key={i}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              marginBottom: 4,
                            }}
                          >
                            <span style={{ marginRight: 10 }}>&#8226;</span>
                            <p style={{ margin: 0 }}>{text}</p>
                          </div>
                        )
                      )}
                    </div>
                    <div
                      className={styles.iconContainer}
                      onClick={addLifestyle}
                    >
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.5"
                          y="0.5"
                          width="39"
                          height="39"
                          rx="4.5"
                          stroke="#868ECB"
                        />
                        <path
                          d="M14.832 11.832H13.4987C12.7915 11.832 12.1132 12.113 11.6131 12.6131C11.113 13.1132 10.832 13.7915 10.832 14.4987V26.4987C10.832 27.2059 11.113 27.8842 11.6131 28.3843C12.1132 28.8844 12.7915 29.1654 13.4987 29.1654H25.4987C26.2059 29.1654 26.8842 28.8844 27.3843 28.3843C27.8844 27.8842 28.1654 27.2059 28.1654 26.4987V25.1654"
                          stroke="#686868"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M24.166 12.8321L27.1659 15.8321M28.5509 14.4171C28.9448 14.0233 29.166 13.4891 29.166 12.9321C29.166 12.3751 28.9448 11.841 28.5509 11.4471C28.1571 11.0533 27.6229 10.832 27.0659 10.832C26.5089 10.832 25.9748 11.0533 25.5809 11.4471L17.166 19.8321V22.832H20.166L28.5509 14.4171Z"
                          stroke="#686868"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className={styles.hoverText}>
                        Add to Prescription
                      </span>
                    </div>
                  </div>
                  {/*<div className={styles.lineContainer}>*/}
                  {/*    <div className={styles.line}/>*/}
                  {/*</div>*/}
                </div>

                {/* Follow-Up Instructions (AI -> two plain lines; selected -> list of strings) */}
                <div className={styles.instruct1}>
                  <div className={styles.row10}>
                    <p>Follow-Up Instructions</p>
                  </div>
                  <div className={styles.row11}>
                    <div>
                      <p>
                        <span>&#8226; </span>&nbsp; Review:{" "}
                        {generatedPrescriptions?.aiGeneratedText
                          ?.followUpInstructions?.reviewDate || "Not specified"}
                      </p>
                      <p>
                        <span>&#8226; </span>&nbsp; Notes:{" "}
                        {generatedPrescriptions?.aiGeneratedText
                          ?.followUpInstructions?.notes || "Not specified"}
                      </p>
                    </div>
                    <div
                      className={styles.iconContainer}
                      onClick={addFollowUpFromAI}
                    >
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.5"
                          y="0.5"
                          width="39"
                          height="39"
                          rx="4.5"
                          stroke="#868ECB"
                        />
                        <path
                          d="M14.832 11.832H13.4987C12.7915 11.832 12.1132 12.113 11.6131 12.6131C11.113 13.1132 10.832 13.7915 10.832 14.4987V26.4987C10.832 27.2059 11.113 27.8842 11.6131 28.3843C12.1132 28.8844 12.7915 29.1654 13.4987 29.1654H25.4987C26.2059 29.1654 26.8842 28.8844 27.3843 28.3843C27.8844 27.8842 28.1654 27.2059 28.1654 26.4987V25.1654"
                          stroke="#686868"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M24.166 12.8321L27.1659 15.8321M28.5509 14.4171C28.9448 14.0233 29.166 13.4891 29.166 12.9321C29.166 12.3751 28.9448 11.841 28.5509 11.4471C28.1571 11.0533 27.6229 10.832 27.0659 10.832C26.5089 10.832 25.9748 11.0533 25.5809 11.4471L17.166 19.8321V22.832H20.166L28.5509 14.4171Z"
                          stroke="#686868"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className={styles.hoverText}>
                        Add to Prescription
                      </span>
                    </div>
                  </div>
                </div>
                {/* === Chat Feed (moved here) === */}
                {chatMessages.length > 0 && (
                  <div className={styles.chatFeedContainer}>
                    <h4 className={styles.chatHeader}>
                      💬 Conversation with AI
                    </h4>
                    {chatMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={
                          msg.role === "user"
                            ? styles.userMessage
                            : styles.aiMessage
                        }
                      >
                        {msg.text}
                      </div>
                    ))}
                    {isSending && (
                      <div className={styles.aiMessage}>
                        ⏳ AI is thinking...
                      </div>
                    )}
                  </div>
                )}

                {/* Keep Chat Input Bar at bottom */}
                <div className={styles.search}>
                  <div className={styles.searchSection}>
                    <input
                      type="text"
                      className={styles.searchInput}
                      placeholder="Type or speak your note..."
                      value={micText}
                      onChange={(e) => setMicText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !isSending) handleSendChat();
                      }}
                    />
                    {/* Send icon */}
                    <svg
                      style={{ marginLeft: "1rem", cursor: "pointer" }}
                      width="35"
                      height="35"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={handleSendChat}
                    >
                      <rect
                        x="0.5"
                        y="0.5"
                        width="39"
                        height="39"
                        rx="19.5"
                        fill="#25307F"
                      />
                      <rect
                        x="0.5"
                        y="0.5"
                        width="39"
                        height="39"
                        rx="19.5"
                        stroke="#5C6EA7"
                      />
                      <path
                        d="M21.0649 12.1836V32.0783M21.0649 12.1836L27.1043 18.3051M21.0649 12.1836L15.0254 18.3051"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  {/* Mic */}
                  {isListening ? (
                    <button
                      className={`${styles.btn} ${styles.micBtn}`}
                      onClick={toggleMic}
                    >
                      <MicOff />
                    </button>
                  ) : (
                    <div
                      style={{
                        cursor: "pointer",
                        padding: 0,
                        marginTop: 1,
                        height: "2rem",
                      }}
                      onClick={toggleMic}
                    >
                      <svg
                        width="50"
                        height="40"
                        viewBox="0 0 60 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          y="0.199219"
                          width="60"
                          height="55.6077"
                          rx="27.8038"
                          fill="#25307F"
                        />
                        <path
                          d="M29.9994 31.1719C28.6799 31.1719 27.5584 30.7101 26.6348 29.7865C25.7112 28.8628 25.2494 27.7413 25.2494 26.4219V16.9219C25.2494 15.6024 25.7112 14.4809 26.6348 13.5573C27.5584 12.6337 28.6799 12.1719 29.9994 12.1719C31.3188 12.1719 32.4403 12.6337 33.3639 13.5573C34.2875 14.4809 34.7494 15.6024 34.7494 16.9219V26.4219C34.7494 27.7413 34.2875 28.8628 33.3639 29.7865C32.4403 30.7101 31.3188 31.1719 29.9994 31.1719ZM28.416 42.2552V37.3865C25.6716 37.017 23.4021 35.7899 21.6077 33.7052C19.8132 31.6205 18.916 29.1927 18.916 26.4219H22.0827C22.0827 28.6122 22.8548 30.4794 24.3991 32.0237C25.9434 33.568 27.8101 34.3396 29.9994 34.3385C32.1886 34.3375 34.0559 33.5653 35.6012 32.0221C37.1465 30.4789 37.9181 28.6122 37.916 26.4219H41.0827C41.0827 29.1927 40.1855 31.6205 38.391 33.7052C36.5966 35.7899 34.3271 37.017 31.5827 37.3865V42.2552H28.416Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              {/* ==== Selected below AI draft ==== */}
              <div className={styles.selectedBlock}>
                <div className={styles.selectedHeader}>
                  <p className={styles.selectedTitle}>SELECTED PRESCRIPTION</p>
                  <span className={styles.selectedCount}>
                    {selected.medications.length +
                      selected.injectionsTherapies.length +
                      selected.nonDrugRecommendations.length +
                      selected.lifestyle.length +
                      selected.followUpInstructions.length}{" "}
                    item(s)
                  </span>
                </div>

                {/* Medications */}
                <div className={styles.selectedSection}>
                  <div className={styles.sectionHeader}>
                    <h4>Medications</h4>
                    <button
                      className={styles.addBtn}
                      onClick={() => openMedModal("add")}
                    >
                      + Add Medicine
                    </button>
                  </div>

                  {selected.medications.length === 0 && (
                    <div className={styles.emptyNote}>
                      No medicines selected.
                    </div>
                  )}

                  {selected.medications.map((m, i) => (
                    <div className={styles.selRow} key={`med-${i}`}>
                      {m.kind === "ai" ? (
                        aiMedEditIdx === i ? (
                          <div className={styles.aiEditWrap}>
                            <textarea
                              className={styles.inlineTextarea}
                              value={aiMedBuf}
                              onChange={(e) => setAiMedBuf(e.target.value)}
                              rows={3}
                            />
                            <div className={styles.rowActions}>
                              <button
                                className={styles.saveBtn}
                                onClick={saveAiMedEdit}
                              >
                                Save
                              </button>
                              <button
                                className={styles.cancelBtn}
                                onClick={cancelAiMedEdit}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div>{m.text}</div>
                            <div className={styles.rowActions}>
                              <button
                                className={styles.editBtn}
                                onClick={() => startAiMedEdit(i)}
                              >
                                Edit
                              </button>
                              <button
                                className={styles.removeBtn}
                                onClick={() =>
                                  removeFromArray("medications", i)
                                }
                              >
                                ✕
                              </button>
                            </div>
                          </>
                        )
                      ) : (
                        <>
                          <div>
                            <b>{m.name}</b>
                            {m.dosage ? ` — ${m.dosage}` : ""}
                            {m.duration ? ` — for ${m.duration}` : ""}
                            {m.instructions ? ` — ${m.instructions}` : ""}
                          </div>
                          <div className={styles.rowActions}>
                            <button
                              className={styles.editBtn}
                              onClick={() => openMedModal("edit", i)}
                            >
                              Edit
                            </button>
                            <button
                              className={styles.removeBtn}
                              onClick={() => removeFromArray("medications", i)}
                            >
                              ✕
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                {/* Injection / Therapies */}
                <div className={styles.selectedSection}>
                  <div className={styles.sectionHeader}>
                    <h4>Injection / Therapies</h4>
                    {!showAdd.inj ? (
                      <button
                        className={styles.addBtn}
                        onClick={() => openAdd("inj")}
                      >
                        + Add
                      </button>
                    ) : (
                      <div className={styles.addInlineWrap}>
                        <input
                          className={styles.inlineInput}
                          value={addBuf.inj}
                          onChange={(e) =>
                            setAddBuf((b) => ({ ...b, inj: e.target.value }))
                          }
                          placeholder="Type instruction…"
                        />
                        <div className={styles.rowActions}>
                          <button
                            className={styles.saveBtn}
                            onClick={() => saveAdd("inj")}
                          >
                            Save
                          </button>
                          <button
                            className={styles.cancelBtn}
                            onClick={() => cancelAdd("inj")}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  {selected.injectionsTherapies.length === 0 && (
                    <div className={styles.emptyNote}>None.</div>
                  )}
                  {selected.injectionsTherapies.map((v, i) => (
                    <div className={styles.selRow} key={`inj-${i}`}>
                      {editIdx.inj === i ? (
                        <>
                          <input
                            className={styles.inlineInput}
                            value={editBuf}
                            onChange={(e) => setEditBuf(e.target.value)}
                          />
                          <div className={styles.rowActions}>
                            <button
                              className={styles.saveBtn}
                              onClick={() => saveInlineEdit("inj")}
                            >
                              Save
                            </button>
                            <button
                              className={styles.cancelBtn}
                              onClick={() => cancelInline("inj")}
                            >
                              Cancel
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>{v}</div>
                          <div className={styles.rowActions}>
                            <button
                              className={styles.editBtn}
                              onClick={() => startInlineEdit("inj", i, v)}
                            >
                              Edit
                            </button>
                            <button
                              className={styles.removeBtn}
                              onClick={() =>
                                removeFromArray("injectionsTherapies", i)
                              }
                            >
                              ✕
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                {/* Non-Drug */}
                <div className={styles.selectedSection}>
                  <div className={styles.sectionHeader}>
                    <h4>Non-Drug Recommendation</h4>
                    {!showAdd.non ? (
                      <button
                        className={styles.addBtn}
                        onClick={() => openAdd("non")}
                      >
                        + Add
                      </button>
                    ) : (
                      <div className={styles.addInlineWrap}>
                        <input
                          className={styles.inlineInput}
                          value={addBuf.non}
                          onChange={(e) =>
                            setAddBuf((b) => ({ ...b, non: e.target.value }))
                          }
                          placeholder="Type recommendation…"
                        />
                        <div className={styles.rowActions}>
                          <button
                            className={styles.saveBtn}
                            onClick={() => saveAdd("non")}
                          >
                            Save
                          </button>
                          <button
                            className={styles.cancelBtn}
                            onClick={() => cancelAdd("non")}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  {selected.nonDrugRecommendations.length === 0 && (
                    <div className={styles.emptyNote}>None.</div>
                  )}
                  {selected.nonDrugRecommendations.map((v, i) => (
                    <div className={styles.selRow} key={`non-${i}`}>
                      {editIdx.non === i ? (
                        <>
                          <input
                            className={styles.inlineInput}
                            value={editBuf}
                            onChange={(e) => setEditBuf(e.target.value)}
                          />
                          <div className={styles.rowActions}>
                            <button
                              className={styles.saveBtn}
                              onClick={() => saveInlineEdit("non")}
                            >
                              Save
                            </button>
                            <button
                              className={styles.cancelBtn}
                              onClick={() => cancelInline("non")}
                            >
                              Cancel
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>{v}</div>
                          <div className={styles.rowActions}>
                            <button
                              className={styles.editBtn}
                              onClick={() => startInlineEdit("non", i, v)}
                            >
                              Edit
                            </button>
                            <button
                              className={styles.removeBtn}
                              onClick={() =>
                                removeFromArray("nonDrugRecommendations", i)
                              }
                            >
                              ✕
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                {/* Lifestyle */}
                <div className={styles.selectedSection}>
                  <div className={styles.sectionHeader}>
                    <h4>Life Style & Diet</h4>
                    {!showAdd.life ? (
                      <button
                        className={styles.addBtn}
                        onClick={() => openAdd("life")}
                      >
                        + Add
                      </button>
                    ) : (
                      <div className={styles.addInlineWrap}>
                        <input
                          className={styles.inlineInput}
                          value={addBuf.life}
                          onChange={(e) =>
                            setAddBuf((b) => ({ ...b, life: e.target.value }))
                          }
                          placeholder="Type lifestyle point…"
                        />
                        <div className={styles.rowActions}>
                          <button
                            className={styles.saveBtn}
                            onClick={() => saveAdd("life")}
                          >
                            Save
                          </button>
                          <button
                            className={styles.cancelBtn}
                            onClick={() => cancelAdd("life")}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  {selected.lifestyle.length === 0 && (
                    <div className={styles.emptyNote}>None.</div>
                  )}
                  {selected.lifestyle.map((v, i) => (
                    <div className={styles.selRow} key={`life-${i}`}>
                      {editIdx.life === i ? (
                        <>
                          <input
                            className={styles.inlineInput}
                            value={editBuf}
                            onChange={(e) => setEditBuf(e.target.value)}
                          />
                          <div className={styles.rowActions}>
                            <button
                              className={styles.saveBtn}
                              onClick={() => saveInlineEdit("life")}
                            >
                              Save
                            </button>
                            <button
                              className={styles.cancelBtn}
                              onClick={() => cancelInline("life")}
                            >
                              Cancel
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>{v}</div>
                          <div className={styles.rowActions}>
                            <button
                              className={styles.editBtn}
                              onClick={() => startInlineEdit("life", i, v)}
                            >
                              Edit
                            </button>
                            <button
                              className={styles.removeBtn}
                              onClick={() => removeFromArray("lifestyle", i)}
                            >
                              ✕
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                {/* Follow-up now plain list */}
                <div className={styles.selectedSection}>
                  <div className={styles.sectionHeader}>
                    <h4>Follow-Up Instructions</h4>
                    {!showAdd.fu ? (
                      <button
                        className={styles.addBtn}
                        onClick={() => openAdd("fu")}
                      >
                        + Add
                      </button>
                    ) : (
                      <div className={styles.addInlineWrap}>
                        <input
                          className={styles.inlineInput}
                          value={addBuf.fu}
                          onChange={(e) =>
                            setAddBuf((b) => ({ ...b, fu: e.target.value }))
                          }
                          placeholder="Type follow-up instruction…"
                        />
                        <div className={styles.rowActions}>
                          <button
                            className={styles.saveBtn}
                            onClick={() => saveAdd("fu")}
                          >
                            Save
                          </button>
                          <button
                            className={styles.cancelBtn}
                            onClick={() => cancelAdd("fu")}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  {selected.followUpInstructions.length === 0 && (
                    <div className={styles.emptyNote}>None.</div>
                  )}
                  {selected.followUpInstructions.map((v, i) => (
                    <div className={styles.selRow} key={`fu-${i}`}>
                      {editIdx.fu === i ? (
                        <>
                          <input
                            className={styles.inlineInput}
                            value={editBuf}
                            onChange={(e) => setEditBuf(e.target.value)}
                          />
                          <div className={styles.rowActions}>
                            <button
                              className={styles.saveBtn}
                              onClick={() => saveInlineEdit("fu")}
                            >
                              Save
                            </button>
                            <button
                              className={styles.cancelBtn}
                              onClick={() => cancelInline("fu")}
                            >
                              Cancel
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>{v}</div>
                          <div className={styles.rowActions}>
                            <button
                              className={styles.editBtn}
                              onClick={() => startInlineEdit("fu", i, v)}
                            >
                              Edit
                            </button>
                            <button
                              className={styles.removeBtn}
                              onClick={() =>
                                removeFromArray("followUpInstructions", i)
                              }
                            >
                              ✕
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                <div className={styles.row13}>
                  <button
                    className={styles.print}
                    onClick={handlePrint}
                    disabled={!hasSelection}
                  >
                    <img src="/assets/Print-icon.svg" alt="" />
                    <p>Print</p>
                  </button>
                  <button
                    className={styles.approve}
                    onClick={() => onConfirm(selected)}
                    disabled={!hasSelection}
                  >
                    <img src="/assets/Tick.svg" alt="" height={12} />
                    <p>Approve</p>
                  </button>
                </div>
              </div>
            </div>

            {/* Manual Medication Modal */}
            {medModalOpen && (
              <div className={styles.modalBackdrop} onClick={closeMedModal}>
                <div
                  className={styles.modalCard}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className={styles.modalHeader}>
                    <h3>
                      {medModalMode === "add"
                        ? "Add Medicine"
                        : "Edit Medicine"}
                    </h3>
                    <button
                      className={styles.modalClose}
                      onClick={closeMedModal}
                    >
                      ✕
                    </button>
                  </div>
                  <form onSubmit={submitMedModal} className={styles.modalBody}>
                    <label>
                      Name
                      <input
                        className={styles.modalInput}
                        value={medForm.name}
                        onChange={(e) =>
                          setMedForm((v) => ({ ...v, name: e.target.value }))
                        }
                        required
                      />
                    </label>
                    <label>
                      Dosage
                      <input
                        className={styles.modalInput}
                        value={medForm.dosage}
                        onChange={(e) =>
                          setMedForm((v) => ({ ...v, dosage: e.target.value }))
                        }
                      />
                    </label>
                    <label>
                      Duration
                      <input
                        className={styles.modalInput}
                        value={medForm.duration}
                        onChange={(e) =>
                          setMedForm((v) => ({
                            ...v,
                            duration: e.target.value,
                          }))
                        }
                      />
                    </label>
                    <label>
                      Instructions
                      <input
                        className={styles.modalInput}
                        value={medForm.instructions}
                        onChange={(e) =>
                          setMedForm((v) => ({
                            ...v,
                            instructions: e.target.value,
                          }))
                        }
                      />
                    </label>
                    <div className={styles.modalFooter}>
                      <button
                        type="button"
                        className={styles.cancelBtn}
                        onClick={closeMedModal}
                      >
                        Cancel
                      </button>
                      <button type="submit" className={styles.saveBtn}>
                        {medModalMode === "add" ? "Add" : "Save"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </>
        ) : (
          <PNMLoader patient={patient} />
        )}
      </div>

      {/* Print selected only */}
      <PrescriptionAndMedicinesPrint
        ref={printRef}
        prescriptions={selected}
        patient={patient}
      />
    </div>
  );
};

export default PrescriptionAndMedicines;
