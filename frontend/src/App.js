import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [category, setCategory] = useState('');
    const [features, setFeatures] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const featureOptions = {
        "E-commerce": ["Product Listing", "Payment Integration"],
        "Social Media": ["User Profiles", "Chat System"],
        "Cloud Kitchen": ["Menu Display", "Online Ordering"],
    };

    const handleFeatureChange = (feature) => {
        setFeatures((prev) => 
            prev.includes(feature) 
                ? prev.filter(f => f !== feature) 
                : [...prev, feature]
        );
    };

    const handleCalculate = async () => {
        if (!category || features.length === 0) {
            setErrorMessage("Please select a category and at least one feature.");
            return;
        }
        setErrorMessage("");
        setLoading(true);

        try {
            const response = await axios.post('https://project-vqau.onrender.com', {
                category,
                selectedFeatures: features,
            });
            setTotalCost(response.data.totalCost);
        } catch (error) {
            setErrorMessage("An error occurred while calculating the cost. Please try again.");
            console.error("Error details:", error);
        } finally {
            setLoading(false);
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
            <button className="btn btn-primary" onClick={handleCalculate} disabled={loading}>
                {loading ? 'Calculating...' : 'Calculate Cost'}
            </button>
            <h2 className="mt-3">Total Cost: ${totalCost}</h2>
        </div>
    );
}

export default App;
