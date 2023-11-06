import React, { useEffect, useState } from 'react';
import loadCSVData from './data/dataLoader';

 // Adjust the import path as needed

import TimeSeriesChart from './components/TimeSeriesChart';
import CountryColumnChart from './components/CountryColumnChart';
import AdultVisitorsSparkline from './components/AdultVisitorsSparkline';
import ChildrenVisitorsSparkline from './components/ChildrenVisitorsSparkline';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  const adultVisitorsData = data.map(item => ({
    date: item.date,
    adultVisitors: item.adults, // Assuming 'adults' contains adult visitor data
  }));

  const childrenVisitorsData = data.map(item => ({
    date: item.date,
    childrenVisitors: item.children, // Assuming 'children' contains children visitor data
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const csvData = await loadCSVData();
        setData(csvData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Hotel Booking Dashboard</h1>
      <div className="row">
        <div className="col-md-6">
          <h2>Country-wise Bookings</h2>
          <CountryColumnChart data={data} />
        </div>
        <div className="col-md-6">
          <h2>Visitors Per Day</h2>
          <TimeSeriesChart data={data} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <h2>Adult Visitors Trend</h2>
          <AdultVisitorsSparkline data={adultVisitorsData} />
        </div>
        <div className="col-md-6">
          <h2>Children Visitors Trend</h2>
          <ChildrenVisitorsSparkline data={childrenVisitorsData} />
        </div>
      </div>
    </div>
  );
}

export default App;
