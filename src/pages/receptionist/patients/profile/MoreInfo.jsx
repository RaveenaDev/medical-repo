// MoreInfo.jsx
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import EntityBasedTable from "../../EntityBasedTable/index.jsx";
import FileDocuments from "./FileDocuments";
import PatientHeader from "./components/PatientHeader.jsx";
import styles from "./profile.module.scss";

/* ---------- helpers ---------- */
const humanize = (s = "") =>
    String(s)
        .replace(/[_-]+/g, " ")
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, (c) => c.toUpperCase());

const isPrimitive = (v) =>
    v == null || ["string", "number", "boolean"].includes(typeof v);

const isEmptyArray = (v) => Array.isArray(v) && v.length === 0;
const isEmptyObject = (v) =>
    v && typeof v === "object" && !Array.isArray(v) && Object.keys(v).length === 0;

/** Render dynamicQuestions array directly (no heading) */
const DynamicQuestions = ({ items, depth = 0 }) => {
  if (!Array.isArray(items) || items.length === 0) return null;

  const pad = { paddingLeft: depth ? 16 : 0 };

  const getFirst = (obj, keys) => {
    for (const k of keys) {
      if (obj?.[k] != null && obj[k] !== "") return obj[k];
    }
    return null;
  };

  return (
      <Box component="ul" sx={{ pl: depth ? 3 : 2, m: 0 }}>
        {items.map((it, i) => {
          // primitives: show as-is
          if (isPrimitive(it)) {
            return (
                <Box component="li" key={i} sx={{ mb: 0.75, ...pad }}>
                  {String(it)}
                </Box>
            );
          }
          // objects: try to extract question / options / answer
          if (it && typeof it === "object") {
            const q = getFirst(it, ["question", "ques", "que", "q", "title", "label"]);
            const ans = getFirst(it, ["answer", "ans", "response", "value"]);
            const opts =
                it.options || it.choices || it.answers || it.responses || it.items;

            return (
                <Box component="li" key={i} sx={{ mb: 1 }}>
                  <div style={{ fontWeight: 600 }}>
                    {q ? `Q${i + 1}. ${q}` : `Q${i + 1}`}
                  </div>

                  {Array.isArray(opts) && opts.length > 0 && (
                      <Box component="ul" sx={{ pl: 3, mt: 0.25, mb: 0.25 }}>
                        {opts.map((op, j) => (
                            <Box component="li" key={j} sx={{ mb: 0.25 }}>
                              {isPrimitive(op) ? String(op) : JSON.stringify(op)}
                            </Box>
                        ))}
                      </Box>
                  )}

                  {ans != null && ans !== "" && (
                      <div>
                        <em>Answer:</em> {String(ans)}
                      </div>
                  )}

                  {/* show any extra fields (excluding the ones we already rendered) */}
                  <ExtraObjectFields obj={it} excludeKeys={["question","ques","que","q","title","label","answer","ans","response","value","options","choices","answers","responses","items"]} depth={depth + 1} />
                </Box>
            );
          }
          return null;
        })}
      </Box>
  );
};

/** Render object fields except excluded keys (used to show extra props on question items) */
const ExtraObjectFields = ({ obj, excludeKeys = [], depth = 0 }) => {
  if (!obj || typeof obj !== "object") return null;
  const entries = Object.entries(obj).filter(([k, v]) => !excludeKeys.includes(k));

  if (entries.length === 0) return null;

  return (
      <Box component="ul" sx={{ pl: depth ? 3 : 2, m: 0 }}>
        {entries.map(([k, v]) => {
          if (Array.isArray(v) && v.length === 0) return null; // skip empty arrays
          if (isEmptyObject(v)) return null; // skip empty objects

          return (
              <Box component="li" key={k} sx={{ mb: 0.5 }}>
                <strong>{humanize(k)}: </strong>
                {isPrimitive(v) ? (
                    <span>{v === null ? "null" : String(v)}</span>
                ) : (
                    <ValueNode label={k} value={v} depth={depth + 1} />
                )}
              </Box>
          );
        })}
      </Box>
  );
};

/** Generic value renderer with special rules for images/videos/dynamicQuestions */
const ValueNode = ({ label, value, depth = 0 }) => {
  const keyLower = (label || "").toString().toLowerCase();

  // Hide empty arrays (including images/videos)
  if (Array.isArray(value)) {
    if (value.length === 0) return null;

    if (keyLower === "dynamicquestions") {
      return <DynamicQuestions items={value} depth={depth} />;
    }

    return (
        <Box component="ul" sx={{ pl: depth ? 3 : 2, m: 0 }}>
          {value.map((item, i) => (
              <Box component="li" key={i} sx={{ mb: 0.5 }}>
                {isPrimitive(item) ? (
                    <span>{String(item)}</span>
                ) : (
                    <ValueNode value={item} depth={depth + 1} />
                )}
              </Box>
          ))}
        </Box>
    );
  }

  // Primitive
  if (isPrimitive(value)) {
    return (
        <Box sx={{ pl: depth ? 2 : 0, wordBreak: "break-word" }}>
          <span>{value === null ? "null" : String(value)}</span>
        </Box>
    );
  }

  // Object
  if (value && typeof value === "object") {
    const entries = Object.entries(value);
    if (entries.length === 0) return null; // skip empty object

    return (
        <Box component="ul" sx={{ pl: depth ? 3 : 2, m: 0, borderLeft: depth ? "1px solid #eee" : "none" }}>
          {entries.map(([k, v]) => {
            const kLower = k.toLowerCase();

            // skip empty arrays like images/videos: []
            if (Array.isArray(v) && v.length === 0) return null;

            // handle dynamicQuestions specially: render questions directly (no label)
            if (kLower === "dynamicquestions") {
              return <DynamicQuestions key={k} items={v} depth={depth + 0} />;
            }

            // normal field
            return (
                <Box component="li" key={k} sx={{ mb: 0.75 }}>
                  <strong>{humanize(k)}: </strong>
                  {isPrimitive(v) ? (
                      <span>{v === null ? "null" : String(v)}</span>
                  ) : (
                      <ValueNode label={k} value={v} depth={depth + 1} />
                  )}
                </Box>
            );
          })}
        </Box>
    );
  }

  return null;
};

/** Renders the full consultationData with top-level headings; skips empty arrays/objects. */
const ConsultationDetails = ({ data }) => {
  if (!data) return <p>No consultation data</p>;

  // Normalize into sections
  const sections = Array.isArray(data)
      ? data.map((val, i) => [`Section ${i + 1}`, val])
      : Object.entries(data);

  const filtered = sections.filter(([k, v]) => {
    if (Array.isArray(v)) return v.length > 0;         // skip empty arrays at top level
    if (v && typeof v === "object") return Object.keys(v).length > 0; // skip empty objects
    return v != null && v !== ""; // keep primitives if present
  });

  if (filtered.length === 0) return <p>No consultation data</p>;

  return (
      <Box>
        {filtered.map(([key, val]) => {
          const keyLower = key.toString().toLowerCase();

          // Top-level dynamicQuestions: render directly (no heading)
          if (keyLower === "dynamicquestions") {
            return (
                <Box key={key} sx={{ mb: 2.5 }}>
                  <DynamicQuestions items={val} />
                </Box>
            );
          }

          return (
              <Box key={key} sx={{ mb: 2 }}>
                <h4 className={styles.title} style={{ marginBottom: 1,fontSize:'1rem' }}>
                  {humanize(key)}
                </h4>
                <ValueNode label={key} value={val} />
              </Box>
          );
        })}
      </Box>
  );
};
/* -------------------------------- */

const MoreInfo = (props) => {
  const [tableIndex, setTableIndex] = useState(null);

  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);

  const location = useLocation();
  const {
    medicalHistory,
    currentMedications,
    symptoms,
    history,
    patient,
    consultationData, // <-- passed in state
  } = location.state || {};

  return (
      <div style={{ height: "88vh" }}>
        {!props.entity ? (
            <>
              <PatientHeader showEditPatients={false} patient={patient} />
              <div
                  style={{
                    height: "80vh",
                    padding: "1rem",
                    marginBottom: "1rem",
                    marginTop: "50px",
                    display: "grid",
                    gridTemplateColumns: "1.2fr 1fr",
                    gap: "20px",
                  }}
              >
                {/* LEFT: detailed consultation data */}
                <div
                    style={{
                      height: "100%",
                      padding: "20px",
                      textAlign: "left",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      backgroundColor: "white",
                      borderRadius: "8px",
                      overflow: "auto",
                    }}
                >
                  <h3 className={styles.title} style={{ marginTop: 0,fontWeight:600,fontSize:'1.2rem' }}>
                    Medical Info
                  </h3>
                  <ConsultationDetails data={consultationData} />
                </div>

                {/* RIGHT: files/documents */}
                <div
                    style={{
                      height: "100%",
                      padding: "20px",
                      textAlign: "center",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      backgroundColor: "white",
                      borderRadius: "8px",
                    }}
                >
                  <FileDocuments />
                </div>
              </div>
            </>
        ) : (
            <EntityBasedTable entity={props?.entity} tableIndex={tableIndex} />
        )}
      </div>
  );
};

export default MoreInfo;
