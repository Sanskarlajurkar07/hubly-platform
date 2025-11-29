import React, { useState } from 'react';

const ColorPicker = ({ value, onChange, label }) => {
  const [showPicker, setShowPicker] = useState(false);

  const colors = [
    '#667eea',
    '#764ba2',
    '#f093fb',
    '#4facfe',
    '#00f2fe',
    '#43e97b',
    '#fa709a',
    '#fee140',
    '#30cfd0',
    '#330867'
  ];

  return (
    <div className="color-picker-container">
      <label>{label}</label>
      <div className="color-picker">
        <button
          type="button"
          className="color-preview"
          style={{ backgroundColor: value }}
          onClick={() => setShowPicker(!showPicker)}
        />
        {showPicker && (
          <div className="color-palette">
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                className={`color-option ${value === color ? 'active' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => {
                  onChange(color);
                  setShowPicker(false);
                }}
              />
            ))}
          </div>
        )}
      </div>
      <span className="color-value">{value}</span>
    </div>
  );
};

export default ColorPicker;
