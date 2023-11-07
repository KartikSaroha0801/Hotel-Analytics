import { HotelBooking } from "./types";

// CSVParser.ts
export class CSVParser {
  static parse(csv: string): HotelBooking[] {
    const rows = csv.split('\n');
    const bookings: HotelBooking[] = [];

    for (const row of rows) {
      const columns = row.split(',');
      const booking: HotelBooking = {
        arrival_date_year: parseInt(columns[0], 10),
        arrival_date_month: parseInt(columns[1], 10),
        arrival_date_day_of_month: parseInt(columns[2], 10),
        adults: parseInt(columns[3], 10),
        children: parseInt(columns[4], 10),
        babies: parseInt(columns[5], 10),
        country: columns[6],
      };

      bookings.push(booking);
    }

    return bookings;
  }
}