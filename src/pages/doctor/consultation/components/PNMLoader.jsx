import styles from "./PNMLoader.module.scss";
const PNMLoader = ({ patient }) => {
  return (
    <div className={styles.container1}>
      {/* row1 */}
      <div className={styles.row1}>
        <p>Perception And Medicines</p>
      </div>

      {/* row2 */}
      <p className={styles.row2}>
        {patient.name} | Age: 28 | Diagnosis Mellitus | BP: 140/90
      </p>

      <div className={styles.container}>
        <img
          src="/assets/NOVA_2-removebg-preview 1.svg"
          alt=""
          className={styles.bot}
        />
        <div className={styles.text}>
          <img src="/assets/mdi_magic.svg" height={25} />
          <p>AI Clinical Draft Assistant</p>
        </div>
        <div className={styles.dotsLoader}>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
        </div>
      </div>
    </div>
  );
};

export default PNMLoader;
