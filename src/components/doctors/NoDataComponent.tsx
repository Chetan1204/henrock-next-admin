import React from "react";

const NoDataFound: React.FC = () => {

    return (
        <div className="no-data-container">
            <img src="/no-data-icon.png" alt="No data icon" />
            <p>No data available</p>
        </div>

    )
};

export default NoDataFound;