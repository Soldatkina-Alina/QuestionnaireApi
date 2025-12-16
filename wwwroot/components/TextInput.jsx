import React from 'react';

const TextInput = ({ question, onChange }) => {
  return (
    <div className="text-input">
      <label>{question.Text}</label>
      <input
        type="text"
        placeholder={question.Options ? question.Options[0] : ''}
        onChange={(e) => onChange(question.Id, e.target.value)}
        className="input-text"
      />
    </div>
  );
};

export default TextInput;