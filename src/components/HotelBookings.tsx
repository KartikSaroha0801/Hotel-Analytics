import React from 'react';
import ApexCharts from 'apexcharts';
import { HotelBooking } from './types';
import TimeSeriesChart from './TimeSeriesChart';
import CountryColumnChart from './CountryColumnChart'; 
import AdultVisitorsSparkline from './AdultVisitorsSparkline'; 
import ChildrenVisitorsSparkline from './ChildrenVisitorsSparkline';

interface HotelBookingsState {
  hotelBookings: HotelBooking[];
  startDate: Date;
  endDate: Date;
}

const HotelBookings: React.FC<{
  startDate: Date;
  endDate: Date;
  apexCharts: ApexCharts;
  hotelBookings: HotelBooking[];
}> = ({ startDate, endDate, apexCharts, hotelBookings }) => {
  const [state, setState] = useState<HotelBookingsState>({
    hotelBookings,
    startDate,
    endDate,
  });

  useEffect(() => {
    // Fetch the hotel bookings from the server
    fetch('./hotel_bookings_1000.csv')
      .then((response) => response.text())
      .then((csv) => {
        const parsedBookings: HotelBooking[] = CSVParser.parse(csv);
        setState((prevState) => ({
          ...prevState,
          hotelBookings: parsedBookings,
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [startDate, endDate]);

  // Filter the hotel bookings by start and end dates
  const filteredBookings = state.hotelBookings.filter((booking) => {
    return (
      booking.arrival_date_year >= state.startDate.getFullYear() &&
      booking.arrival_date_month >= state.startDate.getMonth() + 1 &&
      booking.arrival_date_day_of_month >= state.startDate.getDate() &&
      booking.arrival_date_year <= state.endDate.getFullYear() &&
      booking.arrival_date_month <= state.endDate.getMonth() + 1 &&
      booking.arrival_date_day_of_month <= state.endDate.getDate()
    );
  });

  // Render the charts
  return (
    <div>
      <TimeSeriesChart
        startDate={state.startDate}
        endDate={state.endDate}
        apexCharts={apexCharts}
        hotelBookings={filteredBookings}
      />
      <ColumnChart
        startDate={state.startDate}
        endDate={state.endDate}
        apexCharts={apexCharts}
        hotelBookings={filteredBookings}
      />
      <SparklineChart
        startDate={state.startDate}
        endDate={state.endDate}
        apexCharts={apexCharts}
        hotelBookings={filteredBookings}
        metric="adults"
      />
      <SparklineChart
        startDate={state.startDate}
        endDate={state.endDate}
        apexCharts={apexCharts}
        hotelBookings={filteredBookings}
        metric="children"
      />
    </div>
  );
};

export default HotelBookings;