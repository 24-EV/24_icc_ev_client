import React from 'react';
import Chart from '../../../components/chart/Chart';
import PageHeader from '../../../components/layout/PageHeader';
import Section from '../../../components/common/Section';
import dataFormat from '../../../constants/DataFormat';
import styles from '../../../styles/layout/AppLayout.module.css';
import { CONTROLLER_VERSION } from '../../../config/envConfig';
import PageLayout from '../../../components/layout/PageLayout';

function ChartsPage() {
  const partsKeyName = { vehicle: '차량', hv: 'HV', motor: '모터' };
  const nowDataFormat = { ...dataFormat[CONTROLLER_VERSION] } || {};
  delete nowDataFormat.timestamp;

  return (
    <PageLayout
      header={<PageHeader title="차트" />}
      mainPanel={
        <div>
          {Object.entries(nowDataFormat).map(([groupKey]) => (
            <div key={groupKey} style={{ marginBottom: '1rem' }}>
              {groupKey !== 'vehicle' ? (
                <div>
                  <Chart dataKey={groupKey} title={`${partsKeyName[groupKey]} 차트 L`} side="L" />
                  <Chart dataKey={groupKey} title={`${partsKeyName[groupKey]} 차트 R`} side="R" />
                </div>
              ) : (
                <div>
                  <Chart dataKey={groupKey} title={`${partsKeyName[groupKey]} 차트`} />
                </div>
              )}
            </div>
          ))}
        </div>
      }
    />
  );
}

export default ChartsPage;
