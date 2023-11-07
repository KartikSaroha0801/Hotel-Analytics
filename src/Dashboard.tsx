import React from 'react';
import HotelBookings from './HotelBookings';
import ApexCharts from 'apexcharts';

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
        startDate={state.startDate}
        endDate={state.endDate}
        onStartDateChange={(date) => setState((prevState) => ({
          ...prevState,
          startDate: date,
        }))}
        onEndDateChange={(date) => setState((prevState) => ({
          ...prevState,
          endDate: date,
        }))}
      />
      <HotelBookings startDate={state.startDate} endDate={state.endDate} apexCharts={ApexCharts} hotelBookings={hotelBookings} />
    </div>
  );
};

export default Dashboard;