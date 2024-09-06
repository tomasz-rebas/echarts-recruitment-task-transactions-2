import ReactECharts from "echarts-for-react";
import { Trade } from "./types";

interface Props {
  dataset: Trade[];
}

export const Chart = ({ dataset }: Props) => {
  const prices = dataset.map((element) => Number(element.price));
  const lowestPrice = Math.min(...prices);
  const highestPrice = Math.max(...prices);

  const option = {
    title: {
      text: "Real-time transaction data for BTCUSDT",
    },
    xAxis: {
      data: dataset.map((element) =>
        new Date(element.time).toLocaleTimeString()
      ),
    },
    yAxis: {
      min: lowestPrice,
      max: highestPrice,
    },
    series: [
      {
        type: "line",
        data: prices,
      },
    ],
  };

  return <ReactECharts option={option} />;
};
