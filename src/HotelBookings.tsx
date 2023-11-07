// types.ts
export interface HotelBooking {
  arrival_date_year: number;
  arrival_date_month: number;
  arrival_date_day_of_month: number;
  adults: number;
  children: number;
  babies: number;
  country: string;
}

// HotelBookings.tsx
import React from 'react';
import ApexCharts from 'apexcharts';
import { HotelBooking } from './types';

interface HotelBookingsState {
  hotelBookings: HotelBooking[];
}

const HotelBookings: React.FC<{
  startDate: Date;
  endDate: Date;
  apexCharts: ApexCharts;
  hotelBookings: HotelBooking[];
}> = ({ startDate, endDate, apexCharts, hotelBookings }) => {
  const [state, setState] = useState<HotelBookingsState>({
    hotelBookings,
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
  }, []);

  // Filter the hotel bookings by start and end dates
  const filteredBookings = state.hotelBookings.filter((booking) => {
    return (
      booking.arrival_date_year >= startDate.getFullYear() &&
      booking.arrival_date_month >= startDate.getMonth() + 1 &&
      booking.arrival_date_day_of_month >= startDate.getDate() &&
      booking.arrival_date_year <= endDate.getFullYear() &&
      booking.arrival_date_month <= endDate.getMonth() + 1 &&
      booking.arrival_date_day_of_month <= endDate.getDate()
    );
  });

  // Render the charts
  return (
    <div>
      <TimeSeriesChart
        startDate={startDate}
        endDate={endDate}
        apexCharts={apexCharts}
        hotelBookings={filteredBookings}
      />
      <ColumnChart
        startDate={startDate}
        endDate={endDate}
        apexCharts={apexCharts}
        hotelBookings={filteredBookings}
      />
      <SparklineChart
        startDate={startDate}
        endDate={endDate}
        apexCharts={apexCharts}
        hotelBookings={filteredBookings}
        metric="adults"
      />
      <SparklineChart
        startDate={startDate}
        endDate={endDate}
        apexCharts={apexCharts}
        hotelBookings={filteredBookings}
        metric="children"
      />
    </div>
  );
};

export default HotelBookings;