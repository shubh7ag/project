import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [category, setCategory] = useState('');
    const [features, setFeatures] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    const featureOptions = {
        "E-commerce": ["Product Listing", "Payment Integration"],
        "Social Media": ["User Profiles", "Chat System"],
        "Cloud Kitchen": ["Menu Display", "Online Ordering"],
    };

    const handleFeatureChange = (feature) => {
        setFeatures((prev) => {
            if (prev.includes(feature)) {
                return prev.filter(f => f !== feature);
            } else {
                return [...prev, feature];
            }
        });
    };

    const handleCalculate = async () => {
        if (!category || features.length === 0) {
            setErrorMessage("Please select a category and at least one feature.");
            return;
        }
        setErrorMessage("");

        try {
            const response = await axios.post('http://localhost:5000/calculate', {
                category,
                selectedFeatures: features,
            });
            setTotalCost(response.data.totalCost);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mt-4">
            <h1>App Cost Calculator</h1>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <div className="mb-3">
                <label htmlFor="category" className="form-label">App Category</label>
                <select
                    id="category"
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Select Category</option>
                    {Object.keys(featureOptions).map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Features</label>
                {category && featureOptions[category].map((feature) => (
                    <div key={feature} className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            checked={features.includes(feature)}
                            onChange={() => handleFeatureChange(feature)}
                        />
                        <label className="form-check-label">{feature}</label>
                    </div>
                ))}
            </div>
            <button className="btn btn-primary" onClick={handleCalculate}>Calculate Cost</button>
            <h2 className="mt-3">Total Cost: ${totalCost}</h2>
        </div>
    );
}

export default App;
