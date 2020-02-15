
import React, { useState } from "react";
import { Flipper, Flipped } from "react-flip-toolkit";
import "./style.css";

const genData = (n) => {
  const res = [];
  for (let i = 0; i < n; i++) {
    res.push(i)
  }
  return res;
}
const Page = () => {
  const [data, setData] = useState(genData(200));
  const shuffleList = () => {
    const newData = data.sort((a, b) => b - a - 2 * Math.random());
    setData(newData.join(',').split(','))
  }
  return (
    <Flipper flipKey={data.join("")}>
      <button onClick={shuffleList}> shuffle</button>
      <ul className="list">
        {data.map(d => (
          <Flipped key={d} flipId={d}>
            <li>{d}</li>
          </Flipped>
        ))}
      </ul>
    </Flipper>
  );
};

export default Page