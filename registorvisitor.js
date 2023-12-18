
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

const Encounter = require('./models/encounter');

app.post('/encounters/start', async (req, res) => {
    try {
        const { patientID, type } = req.body;
        const newEncounter = new Encounter({ patientID, type });
        await newEncounter.save();
        res.json({ message: 'Encounter started successfully', data: newEncounter });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
