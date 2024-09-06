import { useEffect, useState } from "react";
import { Chart } from "./Chart";
import { Trade } from "./types";

const API_URL = "https://api.binance.com/api/v3/trades?symbol=BTCUSDT";

export const TransactionChart = () => {
  const [dataset, setDataset] = useState<Trade[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error();
      }

      const result: Trade[] = await response.json();

      setDataset(result);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const refreshInterval = setInterval(() => {
      fetchData();
    }, 3000);

    return () => clearInterval(refreshInterval);
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>Error occurred. The chart cannot be displayed.</h2>;
  }

  if (dataset.length === 0) {
    return <h2>No data has been fetched. The chart cannot be displayed.</h2>;
  }

  return <Chart dataset={dataset} />;
};
