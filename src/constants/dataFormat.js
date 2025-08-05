const dataFormat = {
  // 24년도 컨트롤러
  24: {
    timestamp: null,
    vehicle: {
      SPEED: {
        label: '속도',
        value: null,
        unit: 'km/h'
      }
    },
    hv: {
      BATTERY_VOLTAGE: {
        label: '전압',
        value: null,
        unit: 'V'
      },
      MOTOR_CURRENT: {
        label: '전류',
        value: null,
        unit: 'A'
      },
      BATTERY_PERCENT: {
        label: '배터리 잔량',
        value: null,
        unit: '%'
      }
    },
    motor: {
      RPM: {
        label: 'RPM',
        value: null,
        unit: 'RPM'
      },
      THROTTLE_SIGNAL: {
        label: 'Throttle',
        value: null,
        unit: '/ 255'
      },
      CONTROLLER_TEMPERATURE: {
        label: '컨트롤러 온도',
        value: null,
        unit: '℃'
      }
    },
    gps: {
      lat: {
        label: '위도',
        value: null,
        unit: '°'
      },
      lng: {
        label: '경도',
        value: null,
        unit: '°'
      }
    }
  },
  // 25년도 컨트롤러
  25: {
    timestamp: null,
    vehicle: {
      Speed: {
        label: '속도',
        value: null,
        unit: 'km/h'
      },
      ADC_Signal: {
        label: 'ADC 신호',
        value: null,
        unit: ''
      },
      Yaw_Rate: {
        label: '요 속도',
        value: null,
        unit: '°/s'
      },
      Steering_angle: {
        label: '조향각',
        value: null,
        unit: '°'
      },
      Batt_percent: {
        label: '배터리 잔량',
        value: null,
        unit: 'km/h'
      },
      Total_power: {
        label: '총 출력',
        value: null,
        unit: 'W'
      }
    },
    hv: {
      Current: {
        label: '전류',
        value: null,
        unit: 'A'
      },
      Voltage: {
        label: '전압',
        value: null,
        unit: 'V'
      }
    },
    motor: {
      Motor_temp: {
        label: '모터 온도',
        value: null,
        unit: '℃'
      },
      Controller_temp: {
        label: '컨트롤러 온도',
        value: null,
        unit: '℃'
      },
      Power: {
        label: '출력',
        value: null,
        unit: 'W'
      },
      RPM: {
        label: 'RPM',
        value: null,
        unit: 'RPM'
      },
      Torque: {
        label: '토크',
        value: null,
        unit: 'Nm'
      },
      Torque_cmd: {
        label: '토크 커맨드',
        value: null,
        unit: 'Nm'
      }
    },
    gps: {
      lat: {
        label: '위도',
        value: null,
        unit: '°'
      },
      lng: {
        label: '경도',
        value: null,
        unit: '°'
      }
    }
  }
};

export default dataFormat;
