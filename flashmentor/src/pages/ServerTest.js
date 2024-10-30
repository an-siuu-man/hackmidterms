import React, { useState } from 'react';
import axios from 'axios';

const ServerTest = () => {
    const [data, setData] = useState(null);

    const testCreateUser = async () => {
        const res = await axios.post('http://localhost:5000/create-user', {
            uid : "testuid"
        });
        console.log(res.data);
        setData(res.data);
    };

    return (
        <div>
            <h1>Server Test</h1>
            <button onClick={testCreateUser}>Create new User</button>
            <h2>Response:</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );


}

export default ServerTest;
