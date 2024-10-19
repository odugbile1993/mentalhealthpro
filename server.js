const express = require('express');
const cors = require('cors');  // Include CORS
const mysql = require('mysql2');
const app = express();

app.use(cors());  // Enable CORS
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Odugbile@1993',
    database: 'mental_health_support'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL!');
});

// Handle expert registration submission
app.post('/submit-expert', (req, res) => {
    const { name, email, field_of_expertise } = req.body;
    const sql = `INSERT INTO expert_registration (name, email, field_of_expertise, registration_date) VALUES (?, ?, ?, NOW())`;

    connection.query(sql, [name, email, field_of_expertise], (err, result) => {
        if (err) {
            console.error('Error inserting data into MySQL:', err);
            res.status(500).json({ message: 'Error registering expert' });
        } else {
            res.json({ message: 'Expert registered successfully' });
        }
    });
});

// Handle request service  submission
app.post('/submit-service', (req, res) => {
    const { name, address, phone_number, service_type, service_details } = req.body;
    const sql = `INSERT INTO service_requests (name, address, phone_number, service_type, service_details, date_of_request) VALUES (?, ?, ?, ?, ?, NOW())`;

    connection.query(sql, [name, address, phone_number, service_type, service_details], (err, result) => {
        if (err) {
            console.error('Error inserting data into MySQL:', err);
            res.status(500).json({ message: 'Error submitting service request' });
        } else {
            res.json({ message: 'Service request submitted successfully' });
        }
    });
});


// Start the server
const PORT = 3300;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
