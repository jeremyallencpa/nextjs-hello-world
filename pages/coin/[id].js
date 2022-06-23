import Layout from '../../components/Layout';
import styles from './Coin.module.css';

const Coin = ({ coin }) => {
  return (
    <Layout>
      <div className={styles.coin_page}>
        <div className={styles.coin_container}>
          <h1 className={styles.coin_name}>{coin[0].name}</h1>
          <p className={styles.coin_ticker}>{coin[0].coin}</p>
          <p className={styles.coin_ticker}>{coin[0].price}</p>
          <p className={styles.coin_ticker}>{coin[0].supply}</p>
          <p className={styles.coin_current}>
            {coin.tvl}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Coin;

export async function getServerSideProps(context) {
  const { id } = context.query;


  const res = await fetch(`https://wrapped-metrics-api.onrender.com/tvl/${id}
  `);

  const data = await res.json();

  return {
    props: {
      coin: data
    }
  };
}
