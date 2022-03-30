import React from "react";

const SelectedResult = ({ result }) => (
    <Text>{result && result.title}</Text>
);

export default SelectedResult;