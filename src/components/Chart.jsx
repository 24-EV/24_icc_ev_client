import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, } from "recharts";

function Chart(props) {
  let dataKeyArr = [];

  Object.keys(props.data[0]).map(function (each) {
    if (each !== "name") {
      dataKeyArr.push(each);
    }
  })

  const color = ['cornflowerblue', 'green', 'tomato', 'blueviolet', 'olive', 'darkslateblue'];

  return (
    <div>
      <h1>{props.chartName}</h1>
      <LineChart width={1000} height={500} data={props.data}>
        {
          dataKeyArr.map(function (each, index) {
            return (
                <Line
                  type="monotone"
                  dataKey={each}
                  stroke={color[index % 6]}
                  strokeWidth={2}
                  dot={false}
                />
          )})
        }
        <CartesianGrid stroke="#ccc" />
        <YAxis />
        <XAxis dataKey="name" />
        <Tooltip />
        <Legend />
      </LineChart>
    </div>
  );
};

export default Chart;