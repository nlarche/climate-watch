import { LineChart, XAxis, YAxis, CartesianGrid, Line } from "recharts";
import { useEffect, useState } from "react";
import { TemperatureData } from "@climate-watch/app/domain/model/data";

interface Data {
  date: string;
  mean: number;
  median: number;
}

export function TemperatureGraph({ inputs }: { inputs: TemperatureData[] }) {
  const [data, setData] = useState<Data[]>([]);
  useEffect(() => {
    if (inputs.length) {
      console.log(inputs);
      const p = inputs
        .map((v) => ({
          date: v.period.start,
          mean: v.meanTemperature,
          median: v.medianTemperature,
        }))
        .sort((a, b) => a.date.localeCompare(b.date));
      setData(p);
    }
  }, [inputs]);

  return (
    <LineChart width={500} height={300} data={data}>
      <XAxis dataKey="date" />
      <YAxis />
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <Line type="monotone" dataKey="mean" stroke="#8884d8" />
      <Line type="monotone" dataKey="median" stroke="#82ca9d" />
    </LineChart>
  );
}
