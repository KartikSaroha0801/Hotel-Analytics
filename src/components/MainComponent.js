import React, { useEffect, useState } from 'react';
import loadCSVData from '../data/DataLoader'; 
import TimeSeriesChart from './TimeSeriesChart';
import CountryColumnChart from './CountryColumnChart'; 
import AdultVisitorsSparkline from './AdultVisitorsSparkline'; 
import ChildrenVisitorsSparkline from './ChildrenVisitorsSparkline';


const MainComponent = () => {
  const [data, setData] = useState([]);

  const adultVisitorsData = data.map(item => ({
    date: item.date,
    adultVisitors: item.adults, 
  }));
  
  const childrenVisitorsData = data.map(item => ({
    date: item.date,
    childrenVisitors: item.children, 
  }));
  

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const csvData = await loadCSVData();
        setData(csvData);
        setIsLoading(false); 
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
  
    fetchData();
  }, []);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="MainComponent">
      <h1>Hotel Booking Dashboard</h1>
      <div className="row">
        <div className="col-md-6">
          <h2>Country-wise Bookings</h2>
          <div className="chart-container">
            <CountryColumnChart data={data} />
          </div>
        </div>
        <div className="col-md-6">
          <h2>Visitors Per Day</h2>
          <div className="chart-container">
            <TimeSeriesChart data={data} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <h2>Adult Visitors Trend</h2>
          <div className="chart-container">
            <AdultVisitorsSparkline data={adultVisitorsData} />
          </div>
        </div>
        <div className="col-md-6">
          <h2>Children Visitors Trend</h2>
          <div className="chart-container">
            <ChildrenVisitorsSparkline data={childrenVisitorsData} />
          </div>
        </div>
      </div>
    </div>
  );
  
  
};

export default MainComponent;
