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
        //모름
        label: 'ADC 신호',
        value: null,
        unit: ''
      },
      Yaw_Rate: {
        // 모름
        label: '요 속도',
        value: null,
        unit: '°/s'
      },
      Steering_angle: {
        //모름
        label: '스티어링 각',
        value: null,
        unit: '°'
      },
      Batt_percent: {
        label: '속도',
        value: null,
        unit: 'km/h'
      },
      Total_power: {
        label: '속도',
        value: null,
        unit: 'km/h'
      }
    },
    hv: {
      Current_L: {
        label: '전류 L',
        value: null,
        unit: 'A'
      },
      Current_R: {
        label: '전류 R',
        value: null,
        unit: 'A'
      },
      Voltage_L: {
        label: '속도',
        value: null,
        unit: 'km/h'
      },
      Voltage_R: {
        label: '속도',
        value: null,
        unit: 'km/h'
      }
    },
    motor: {
      Motor_temp_L: {
        label: '속도',
        value: null,
        unit: 'km/h'
      },
      Motor_temp_R: {
        label: '속도',
        value: null,
        unit: 'km/h'
      },
      Controller_temp_L: {
        label: '속도',
        value: null,
        unit: 'km/h'
      },
      Controller_temp_R: {
        label: '속도',
        value: null,
        unit: 'km/h'
      },
      Power_L: {
        label: '속도',
        value: null,
        unit: 'km/h'
      },
      Power_R: {
        label: '속도',
        value: null,
        unit: 'km/h'
      },
      RPM_L: {
        label: '속도',
        value: null,
        unit: 'km/h'
      },
      RPM_R: {
        label: '속도',
        value: null,
        unit: 'km/h'
      },
      Torque_L: {
        label: '속도',
        value: null,
        unit: 'km/h'
      },
      Torque_R: {
        label: '속도',
        value: null,
        unit: 'km/h'
      },
      Torque_cmd_L: {
        label: '속도',
        value: null,
        unit: 'km/h'
      },
      Torque_cmd_R: {
        label: '속도',
        value: null,
        unit: 'km/h'
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
