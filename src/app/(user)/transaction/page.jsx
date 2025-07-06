import styles from "./transaction.module.css";

const Transaction = () => {
  return (
    <div>
      <h1>Ini Transaction</h1>
      <div className={styles.container}>
        <form>
          <div className={styles.row}>
            <div className={styles.column}>
              <h3 className={styles.title}>Billing Address</h3>
              <div className={styles.inputBox}>
                <span>Full Name:</span>
                <input type="text" placeholder="Salvia" />
              </div>
              <div className={styles.inputBox}>
                <span>Email:</span>
                <input type="email" placeholder="example@example.com" />
              </div>
              <div className={styles.inputBox}>
                <span>Address:</span>
                <input type="text" placeholder="jalan - kecamatan - kota" />
              </div>
              <div className={styles.inputBox}>
                <span>Kota:</span>
                <input type="text" placeholder="Jakarta Barat" />
              </div>
              <div className={styles.flex}>
                <div className={styles.inputBox}>
                  <span>Provinsi:</span>
                  <input type="text" placeholder="DKI Jakarta" />
                </div>
                <div className={styles.inputBox}>
                  <span>Kode Pos:</span>
                  <input type="number" placeholder="123 456" />
                </div>
              </div>
            </div>

            <div className={styles.column}>
              <h3 className={styles.title}>Payment</h3>
              <div className={styles.inputBox}>
                <span>Cards Accepted:</span>
                <input type="text" placeholder="Salvia" />
              </div>
              <div className={styles.inputBox}>
                <span>Name On Card:</span>
                <input type="text" placeholder="Mrs. Salvia" />
              </div>
              <div className={styles.inputBox}>
                <span>Credit Card Number</span>
                <input type="number" placeholder="1111 2222 3333 4444" />
              </div>
              <div className={styles.inputBox}>
                <span>Exp. Month:</span>
                <input type="text" placeholder="Agustus" />
              </div>

              <div className={styles.flex}>
                <div className={styles.inputBox}>
                  <span>Exp. Year:</span>
                  <input type="number" placeholder="2025" />
                </div>
                <div className={styles.inputBox}>
                  <span>CVV:</span>
                  <input type="number" placeholder="123" />
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className={styles.btn}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Transaction;
