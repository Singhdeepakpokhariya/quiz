import React from "react";
const Star = ({
  count,
  value,
  inactiveColor = "#ddd",
  size = 24,
  activeColor = "#f00",
  onChange,
}) => {
  const stars = Array.from({ length: count }, () => "🟊");

  // Internal handle change function
  const handleChange = (value) => {
    onChange(value + 1);
  };
  return (
    <>
      <h1>hello</h1>
      {stars.map((s, index) => {
        let style = inactiveColor;
        if (index < value) {
          style = activeColor;
        }
        return (
          <span
            className={"star"}
            key={index}
            style={{ color: style, width: size, height: size, fontSize: size }}
            onClick={() => handleChange(index)}
          >
            {s}
          </span>
        );
      })}
    </>
  );
};
export default Star;
