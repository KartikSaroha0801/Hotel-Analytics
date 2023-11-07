import React, { useState } from 'react';
import HotelBookings from './HotelBookings';
import ApexCharts from 'apexcharts';
import TimeSeriesChart from './TimeSeriesChart';
import DateSelector from './DateSelector';
import { HotelBooking } from './types';

interface DashboardState {
  startDate: Date;
  endDate: Date;
}

const Dashboard: React.FC = () => {
  const [state, setState] = useState<DashboardState>({
    startDate: new Date(),
    endDate: new Date(),
  });

  return (
    <div>
      <DateSelector
        selectedDates={[state.startDate, state.endDate]}
        onDatesChange={(dates) => {
          setState((prevState) => ({
            ...prevState,
            startDate: dates[0],
            endDate: dates[1],
          }));
        }}
      />
      <HotelBookings
        startDate={state.startDate}
        endDate={state.endDate}
        apexCharts={ApexCharts}
      />
    </div>
  );
};

export default Dashboard;