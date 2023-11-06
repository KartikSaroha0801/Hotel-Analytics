import Papa from 'papaparse';

const loadCSVData = async () => {
  return new Promise((resolve, reject) => {
    Papa.parse('./data/hotel_bookings_1000.csv', {
      header: true,
      download: true,
      dynamicTyping: true,
      complete: (result) => {
        if (result.errors.length === 0) {
          resolve(result.data);
        } else {
          reject(result.errors);
        }
      },
    });
  });
};

export default loadCSVData;
