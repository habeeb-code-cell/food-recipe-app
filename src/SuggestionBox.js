import React, { useState } from 'react';

const SuggestionBox = () => {
  const [suggestion, setSuggestion] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (suggestion.trim()) {
      setSubmitted(true);
      // Here you can send the suggestion to a backend or API
      console.log("User suggestion:", suggestion);
      setSuggestion('');
    }
  };

  return (
    <div className="suggestion-box">
      <h3>Have a suggestion?</h3>
      <textarea
        value={suggestion}
        onChange={(e) => setSuggestion(e.target.value)}
        placeholder="Write your suggestion or recipe idea here..."
      />
      <button onClick={handleSubmit}>Submit</button>
      {submitted && <p>Thank you for your feedback!</p>}
    </div>
  );
};

export default SuggestionBox;
