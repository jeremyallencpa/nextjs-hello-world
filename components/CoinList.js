import Coins from './Coins';

export default function CoinList({ filteredCoins }) {
  return (
    <>
      {filteredCoins.map(coin => {
        return (
          <Coins
            key={coin.coin}
            name={coin.name}
            id={coin.coin}
            price={coin.price}
            supply={coin.supply}
            tvl={coin.tvl}
          />
        );
      })}
    </>
  );
}
