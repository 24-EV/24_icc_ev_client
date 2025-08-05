const dataFormat = {
  // 24년도 컨트롤러
  24: {
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
      lat: {
        label: '경도',
        value: null,
        unit: '°'
      }
    }
  },
  // 25년도 컨트롤러
  25: {
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
      Batt_percent: null,
      Total_power: null
    },
    hv: {
      Current_L: null,
      Current_R: null,
      Voltage_L: null,
      Voltage_R: null
    },
    motor: {
      Motor_temp_L: null,
      Motor_temp_R: null,
      Controller_temp_L: null,
      Controller_temp_R: null,
      Power_L: null,
      Power_R: null,
      RPM_L: null,
      RPM_R: null,
      Torque_L: null,
      Torque_R: null,
      Torque_cmd_L: null,
      Torque_cmd_R: null
    },
    gps: {
      lat: {
        label: '위도',
        value: null,
        unit: '°'
      },
      lat: {
        label: '경도',
        value: null,
        unit: '°'
      }
    }
  }
};

export default dataFormat;
