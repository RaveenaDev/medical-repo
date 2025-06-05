import styles from "./TreatmentAndTest.module.scss";
import { Plus } from "lucide-react";
const TreatmentAndTest = () => {
  return (
    <div>
      <div className={styles.container1}>
        {/* row 1 */}
        <div className={styles.row1}>
          <p>Treatment And Tests</p>
        </div>

        {/* row 2 */}
        <div className={styles.row2}>
          <input
            type="text"
            className={styles.input1}
            placeholder="Medicine name"
          />
          <input type="text" className={styles.input1} placeholder="Dosage" />
          <input
            type="text"
            className={styles.input1}
            placeholder="Frequency"
          />
          <input type="text" className={styles.input1} placeholder="Duration" />
        </div>

        {/* row 3 */}
        <div className={styles.row3}>
          <button>
            <Plus size={18} />
            Add Treatment
          </button>
        </div>

        {/* row4 */}
        <div className={styles.row4}>
          <div className={styles.r4Left}>
            <p>Prescribed :</p>
          </div>
          <div className={styles.r4Right}>
            <div className={styles.r4RightContent}>
              <p>
                <span>&#8226;&nbsp;</span>Paracetamol 500mg - 1-0-1 x 5 days
              </p>
              <button>Remove</button>
            </div>
            <div className={styles.r4RightContent}>
              {" "}
              <p>
                <span>&#8226;&nbsp;</span>Ascoril 5ml - 2-2-2 x 3 days
              </p>
              <button>Remove</button>
            </div>
          </div>
        </div>

        {/* row5 */}
        <div className={styles.row5}>
          <p>Order Tests</p>
        </div>

        {/* row6 */}
        <div className={styles.row6}>
          <input type="text" className={styles.in1} placeholder="Search Test" />
          <input type="text" placeholder="Blood" />
          <input type="text" placeholder="Routine" />
        </div>

        {/* row 7 */}
        <div className={styles.row7}>
          <button>
            <Plus size={18} />
            Add Test
          </button>
        </div>

        {/* row 8 */}
        <div className={styles.row4}>
          <div className={styles.r4Left}>
            <p>To be ordered :</p>
          </div>
          <div className={styles.r4Right}>
            <div className={styles.r4RightContent}>
              <p>
                <span>&#8226;&nbsp;</span>CBC - Routine
              </p>
              <button>Remove</button>
            </div>
            <div className={styles.r4RightContent}>
              {" "}
              <p>
                <span>&#8226;&nbsp;</span>ECG - Urgent (Check BP)
              </p>
              <button>Remove</button>
            </div>
          </div>
        </div>

        {/* row 9 */}
        <div className={styles.row9}>
          <button>
            <img src="/assets/mingcute_schedule-line.svg" alt="" width={20} />
            <p>Schedule Treatment</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TreatmentAndTest;
