const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/patientDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Connection error:', err.message);
});


const Patient = mongoose.model('Patient', {
    ID: Number,
    surname: String,
    otherName: String,
    phoneNumber: Number,
    residentialAddress: String,
    emergencyName: String,
    contact: Number,
    relationshipeithParent: String,
    gender: String,
    
});


app.post('/patients/register', async (req, res) => {
    try {
        const patientData = req.body;
        const newPatient = new Patient(patientData);
        await newPatient.save();
        res.json({ message: 'Patient registered successfully', data: newPatient });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${3000}`);
});
