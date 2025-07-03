import React from 'react';
import ParentsDashboard from '../../components/parents/ParentsDashboard';
import "../../styles/global.scss";
import { userdata } from "app/server-actions/parents/dashboard";

const ParentsPage = async () => {

  const fetchData = async () => {
    let token  = '';
    try {
      const response = await userdata(token); // Fetch data
      return response; // Return fetched data
    } catch (err) {
      console.error("Error fetching data:", err);
      return null;
    }
  };

  const data = {}; //await fetchData();

  return <ParentsDashboard  />;
};

export default ParentsPage;
