import React from 'react';

const RadioQuestion = ({ question, onChange }) => {
  return (
    <div className="radio-question">
      <label>{question.Text}</label>
      <div className="radio-group">
        {question.Options.map((option, index) => (
          <label key={index} className="radio-label">
            <input
              type="radio"
              name={`question-${question.Id}`}
              value={option}
              onChange={() => onChange(question.Id, option)}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioQuestion;