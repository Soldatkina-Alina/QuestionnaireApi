const SliderQuestion = ({ question, onChange }) => {
  console.log('Rendering slider question:', question); // Логирование
  const [value, setValue] = React.useState(question.MinValue || 0);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange(question.Id, newValue);
  };

  return (
    <div className="slider-question">
      <label>{question.Text}</label>
      <input
        type="range"
        min={question.MinValue}
        max={question.MaxValue}
        value={value}
        onChange={handleChange}
        className="slider"
      />
      <div className="slider-value">{value}</div>
    </div>
  );
};

export default SliderQuestion;