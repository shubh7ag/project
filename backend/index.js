const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Feature data
const features = {
    "E-commerce": {
        "Product Listing": 30,
        "Payment Integration": 25,
    },
    "Social Media": {
        "User Profiles": 30,
        "Chat System": 40,
    },
    "Cloud Kitchen": {
        "Menu Display": 25,
        "Online Ordering": 40,
    }
};

app.post('/calculate', (req, res) => {
    const { category, selectedFeatures } = req.body;
    if (!category || !selectedFeatures.length) {
        return res.status(400).json({ error: "Please select a category and at least one feature." });
    }

    const totalHours = selectedFeatures.reduce((total, feature) => total + features[category][feature], 0);
    const totalCost = totalHours * 10; // $10/hour
    res.json({ totalCost });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
