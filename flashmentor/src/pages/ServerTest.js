import React, { useState } from 'react';
import axios from 'axios';

const ServerTest = () => {
    const [name, setName] = useState('');
    const [data, setData] = useState(null);
    
    const fetchData = async (e) => {
        e.preventDefault();
        try {
            // Send name as JSON in the request body
            const response = await axios.post('http://localhost:5000/api/hello', {
                name,
                "shivansh"
            });
            setData(response.data);  // Save response data in state
        } catch (error) {
            console.error('Error fetching data from the server:', error);
        }
    };

    return (
        <div>
            <h1>Server Test</h1>
            <form onSubmit={fetchData}>
                <input 
                    type='text' 
                    placeholder='Enter your name' 
                    value={name}  // Controlled input
                    onChange={(e) => setName(e.target.value)}  // Update state with input value
                />
                <button type='submit'>Submit</button>
            </form>
            {data && <p>{data.express}</p>}  {/* Display response from server */}
        </div>
    );
}

export default ServerTest;
