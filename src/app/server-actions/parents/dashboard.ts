"use server";

export async function userdata(token:any) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/admin/classes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Pass the token here
      },
    }); 

    if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`); 
        throw new Error(`Server responded with status ${response.status}`); 
    }
    const result = await response.json(); 
    if (!result) { 
        throw new Error("Received empty or invalid response"); 
    } 
    console.log('response', result); 
    return result.data.data;

  } catch (err) {
    console.error("Error during data fetch:", err);
    throw new Error("Data fetch failed");
  }
}

export async function studentList(token:any) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/parent/getParentstudentList`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Pass the token here
      },
    });
    if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`); 
        throw new Error(`Server responded with status ${response.status}`); 
    }
    const result = await response.json(); 
    if (!result) { 
        throw new Error("Received empty or invalid response"); 
    } 
    console.log('response', result); 
    return result.data;

  } catch (err) {
    console.error("Error during data fetch:", err);
    throw new Error("Data fetch failed");
  }
}

export async function getDashboardStudent(token:any) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/parent/dashboard`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Pass the token here
      },
    });
    if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`); 
        throw new Error(`Server responded with status ${response.status}`); 
    }
    const result = await response.json(); 
    if (!result) { 
        throw new Error("Received empty or invalid response"); 
    } 
    console.log('response', result); 
    return result.data;

  } catch (err) {
    console.error("Error during data fetch:", err);
    throw new Error("Data fetch failed");
  }
}