const mongoose = require('mongoose');

const vitalsSchema = new mongoose.Schema({
    patientID: {
        type: String,
        required: true
    },
    bloodPressure: String,
    temperature: String,
    pulse: String,
    spO2: String
    
});

const Vitals = mongoose.model('Vitals', vitalsSchema);

module.exports = Vitals;

const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/emrDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Connection error:', err.message);
});

const Vitals = require('./models/vitals');


app.post('/vitals/submit', async (req, res) => {
    try {
        const { patientID, bloodPressure, temperature, pulse, spO2 } = req.body;
        const newVitals = new Vitals({ patientID, bloodPressure, temperature, pulse, spO2 });
        await newVitals.save();
        res.json({ message: 'Patient vitals submitted successfully', data: newVitals });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${3000}`);
});
