import { useEffect, useState } from "react";
import styles from "./PerceptionAndMedicines.module.scss";
import PNMLoader from "./PNMLoader";
import {useDispatch, useSelector} from "react-redux";
import {generatePrescriptionsWithAI} from "../../../../components/State/Doctor/Action.js";
const PerceptionAndMedicines = ({ patient,completeData,generatedPrescriptions,onConfirm }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    if (generatedPrescriptions && Object.keys(generatedPrescriptions).length > 0) {

      setLoading(false);
    }
  }, [generatedPrescriptions]);

  // console.log("Pat: ",patient)

  if (loading) {
    return <PNMLoader patient={patient} />;
  }

  const handleRegenerate = () => {
    dispatch(generatePrescriptionsWithAI(completeData));
    setLoading(true);
  }
  return (
    <div>
      <div className={styles.container1}>
        {/* row1 */}
        <div className={styles.row1}>
          <p>Perception And Medicines</p>
        </div>

        {/* row2 */}
        <p className={styles.row2}>
          {patient.name} | Age: {patient.age} | {patient.symptoms[0]} | BP: 140/90
        </p>

        <img
          src="/assets/NOVA-on-border.svg"
          height={100}
          alt=""
          className={styles.nova}
        />

        <div className={styles.container2}>
          {/* row3 */}
          <div className={styles.row3}>
            <img src="/assets/mdi_magic.svg" alt="" height={30} />
            <p>AI Clinical Darft Assistant</p>
          </div>

          {/* row4 */}
          <div className={styles.row4}>
            <p className={styles.value}>
              <span className={styles.key}>Problem Statement:</span> {generatedPrescriptions?.aiGeneratedText?.problemStatement}
            </p>
          </div>

          {/* row5 */}
          <div className={styles.row5}>
            <p className={styles.value}>
              <span className={styles.key}>ICD:</span> {generatedPrescriptions?.aiGeneratedText.icdCode}
            </p>
          </div>

          {/* row6 */}
          <div className={styles.row5}>
            <p className={styles.value}>
              <span className={styles.key}>Therapy Plan:</span> {generatedPrescriptions?.aiGeneratedText.therapyPlan}
            </p>
          </div>

          {/* row7 */}
          <div className={styles.row5}>
            <p className={styles.value}>
              <span className={styles.key}>Precautions:</span> {generatedPrescriptions?.aiGeneratedText.precautions}
            </p>
          </div>

          {/* row8 */}
          <div className={styles.row5}>
            <p className={styles.value}>
              <span className={styles.key}>Follow-Up:</span> {generatedPrescriptions?.aiGeneratedText.followUp}
            </p>
          </div>

          {/* row9 */}
          <div className={styles.row9}>
            {/*<button className={styles.row9Button}>Edit</button>*/}
            <button className={styles.row9Button} onClick={handleRegenerate}>Regenerate</button>
          </div>

          {/* Instruct */}
          <div className={styles.instruct}>
            {/* row10 */}
            <div className={styles.row10}>
              <p>Medications</p>
            </div>

            {/* row11 */}
            <div className={styles.row11}>
              <div>
                {
                  generatedPrescriptions?.aiGeneratedText.medications.map((medic, index) => (
                      <div key={index} style={{display: 'flex', alignItems: 'flex-start', marginBottom: '4px'}}>
                        <span style={{marginRight: '10px'}}>&#8226;</span>
                        <p style={{margin: 0}}>{medic}</p>
                      </div>
                  ))
                }
              </div>
              <div className={styles.iconBtn}>
                <button className={styles.leftArrowBtn}>
                  <img
                      src="/assets/Group.svg"
                      alt=""
                      className={styles.leftArrow}
                      width={18}
                  />
                </button>
                <button className={styles.rightArrowBtn}>
                  <img
                    src="/assets/ion_return-down-back-outline.svg"
                    width={30}
                    alt=""
                    className={styles.rightArrow}
                  />
                </button>
              </div>
            </div>

            <div className={styles.lineContainer}>
              <div className={styles.line} />
            </div>
          </div>

          {/* Instruct */}
          <div className={styles.instruct}>
            {/* row10 */}
            <div className={styles.row10}>
              <p>Injection / Therapies</p>
            </div>

            {/* row11 */}
            <div className={styles.row11}>
              <div>
                {
                  generatedPrescriptions?.aiGeneratedText.injectionsTherapies.map((inject, index) => (
                      <div key={index} style={{display: 'flex', alignItems: 'flex-start', marginBottom: '4px'}}>
                        <span style={{marginRight: '10px'}}>&#8226;</span>
                        <p style={{margin: 0}}>{inject}</p>
                      </div>
                  ))
                }
              </div>
              <div className={styles.iconBtn}>
                <button className={styles.leftArrowBtn}>
                  <img
                      src="/assets/Group.svg"
                      alt=""
                      className={styles.leftArrow}
                      width={18}
                  />
                </button>
                <button className={styles.rightArrowBtn}>
                  <img
                    src="/assets/ion_return-down-back-outline.svg"
                    width={30}
                    alt=""
                    className={styles.rightArrow}
                  />
                </button>
              </div>
            </div>

            <div className={styles.lineContainer}>
              <div className={styles.line} />
            </div>
          </div>

          {/* Instruct */}
          <div className={styles.instruct}>
            {/* row10 */}
            <div className={styles.row10}>
              <p>Non-Drug Recommendation</p>
            </div>

            {/* row11 */}
            <div className={styles.row11}>
              <div>
                {generatedPrescriptions?.aiGeneratedText.nonDrugRecommendations.map((nonDrug, index) => (
                    <div key={index} style={{display: 'flex'}}>
                      <span style={{marginRight: '10px'}}>&#8226;</span>
                      <p style={{margin: 0}}>{nonDrug}</p>
                    </div>
                ))}
              </div>
              <div className={styles.iconBtn}>
                <button className={styles.leftArrowBtn}>
                  <img
                      src="/assets/Group.svg"
                      alt=""
                      className={styles.leftArrow}
                      width={18}
                  />
                </button>
                <button className={styles.rightArrowBtn}>
                  <img
                    src="/assets/ion_return-down-back-outline.svg"
                    width={30}
                    alt=""
                    className={styles.rightArrow}
                  />
                </button>
              </div>
            </div>

            <div className={styles.lineContainer}>
              <div className={styles.line} />
            </div>
          </div>
          {/* Instruct */}
          <div className={styles.instruct}>
            {/* row10 */}
            <div className={styles.row10}>
              <p>Life Style & Diet</p>
            </div>

            {/* row11 */}
            <div className={styles.row11}>
              <div>
                {
                  generatedPrescriptions?.aiGeneratedText.lifestyle.map((life, index) => (
                      <div key={index} style={{display: 'flex', alignItems: 'flex-start', marginBottom: '4px'}}>
                        <span style={{marginRight: '10px'}}>&#8226;</span>
                        <p style={{margin: 0}}>{life}</p>
                      </div>
                  ))
                }
              </div>
              <div className={styles.iconBtn}>
                <button className={styles.leftArrowBtn}>
                  <img
                      src="/assets/Group.svg"
                      alt=""
                      className={styles.leftArrow}
                      width={18}
                  />
                </button>
                <button className={styles.rightArrowBtn}>
                  <img
                    src="/assets/ion_return-down-back-outline.svg"
                    width={30}
                    alt=""
                    className={styles.rightArrow}
                  />
                </button>
              </div>
            </div>

            <div className={styles.lineContainer}>
              <div className={styles.line} />
            </div>
          </div>

          {/* Instruct */}
          <div className={styles.instruct}>
            {/* row10 */}
            <div className={styles.row10}>
              <p>Follow-Up Instructions</p>
            </div>

            {/* row11 */}
            <div className={styles.row11}>
              <div>
                <p>
                  <span>&#8226; </span>&nbsp; Review Date: {generatedPrescriptions?.aiGeneratedText.followUpInstructions.reviewDate}
                </p>
                <p>
                  <span>&#8226; </span>&nbsp; Notes: {generatedPrescriptions?.aiGeneratedText.followUpInstructions.notes}
                </p>
              </div>
              <div className={styles.iconBtn}>
                <button className={styles.leftArrowBtn}>
                  <img
                    src="/assets/Group.svg"
                    alt=""
                    className={styles.leftArrow}
                    width={18}
                  />
                </button>
                <button className={styles.rightArrowBtn}>
                  <img
                    src="/assets/ion_return-down-back-outline.svg"
                    width={30}
                    alt=""
                    className={styles.rightArrow}
                  />
                </button>
              </div>
            </div>

            <div className={styles.lineContainer}>
              <div className={styles.line} />
            </div>
          </div>

          {/* row10 */}
          <div className={styles.blackText}>
            <p>
              AI Interaction Tracker: Used: Meds, Diet | Edited: Problem |
              Regenerated: Lifestyle & Diet
            </p>
          </div>
        </div>

        {/* row13 */}
        <div className={styles.row13}>
          <button className={styles.print}>
            <img src="/assets/Print-icon.svg" alt="" />
            <p>Print</p>
          </button>
          <button className={styles.approve} onClick={() => onConfirm(generatedPrescriptions.aiGeneratedText)}>
            <img src="/assets/Tick.svg" alt="" height={12} />
            <p>Approve</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PerceptionAndMedicines;
