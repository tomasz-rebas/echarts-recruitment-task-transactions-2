import { useEffect, useState } from "react";
import { Chart } from "./Chart";
import { Trade } from "./types";

export const TransactionChart = () => {
  const [dataset, setDataset] = useState<Trade[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = "https://api.binance.com/api/v3/trades?symbol=BTCUSDT";

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Couldn't fetch the data");
      }

      const result: Trade[] = await response.json();

      setDataset(result);
      console.log("result", result);
    } catch (error) {
      //setError((error as ErrorResponse).msg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const refreshInterval = setInterval(() => {
      fetchData();
    }, 2500);

    return () => clearInterval(refreshInterval);
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (dataset.length === 0) {
    return <h2>No data has been fetched. The chart cannot be displayed.</h2>;
  }

  if (error) {
    return <h2>Error occurred. The chart cannot be displayed. {error}</h2>;
  }

  return <Chart dataset={dataset} />;
};
