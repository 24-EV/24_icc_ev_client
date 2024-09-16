import React, { useContext, useEffect, useState } from 'react';

import RechartsExample from '../components/Chart';
import Loading from '../components/Loading';
import { Background } from '../components/Styles';
import { SocketContext } from '../context/SocketContext'; // 올바른 import 문

const MAX_QUEUE_SIZE = 60;

class Queue {
  constructor() {
    this.storage = {};
    this.front = 0;
    this.rear = 0;
  }

  size() {
    return this.rear - this.front;
  }

  enqueue(element) {
    this.storage[this.rear] = element;
    this.rear++;
  }

  dequeue() {
    const removed = this.storage[this.front];
    delete this.storage[this.front];
    this.front++;

    if (this.front === this.rear) {
      this.front = 0;
      this.rear = 0;
    }

    return removed;
  }
}

function Vehicle() {
  const [loading, vehicleData] = useContext(SocketContext);

  const vehicle_data = [
    // Example data for chart
    {
      name: "2017",
      react: 32,
      angular: 37,
      vue: 60,
    },
    {
      name: "2018",
      react: 42,
      angular: 42,
      vue: 54,
    },
    {
      name: "2019",
      react: 51,
      angular: 41,
      vue: 54,
    },
    {
      name: "2020",
      react: 60,
      angular: 37,
      vue: 28,
    },
    {
      name: "2021",
      react: 51,
      angular: 31,
      vue: 27,
    },
    {
      name: "2022",
      react: 95,
      angular: 44,
      vue: 4,
    },
    {
      name: "2023",
      react: 97,
      angular: 42,
      vue: 52,
    },
    {
      name: "2024",
      react: 100,
      angular: 100,
      vue: 100,
    },
  ];

  let vehicle_data_queue = new Queue();

  if (vehicle_data_queue.size() === MAX_QUEUE_SIZE) {
    vehicle_data_queue.dequeue();
  }
  vehicle_data_queue.enqueue(vehicleData  );

  return (
    <div className="vehicle-container">
      <h1>Vehicle</h1>
      <div className="velocity-container">
        <h3>속력</h3>
        <h1>{vehicleData.velocity} km/h</h1>
        <RechartsExample chartName="속력 차트 예시" data={vehicle_data} />
        <div>그래프 들어갈 자리</div>
      </div>
      <div className="rtc-module-container">
        <h3>RTC Module</h3>
        <h1>{vehicleData.rtc_module}</h1>
      </div>
    </div>
  );
}

export default Vehicle;
