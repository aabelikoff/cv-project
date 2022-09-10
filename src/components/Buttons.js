import React, { useState, useEffect } from 'react';
import '../styles/Buttons.css';

function SubSectionButton(props) {
  const handleOnClick = (e) => {
    e.preventDefault();
    props.onButtonClick(props.section);
  };

  return (
    <button className="subsection-btn" onClick={handleOnClick}>
      {props.value}
    </button>
  );
}

function ModeButton(props) {
  const handleOnClick = (e) => {
    e.preventDefault();
    let name = props.name;
    props.onButtonClick(name);
  };

  return (
    <button className="mode-button" onClick={handleOnClick}>
      {props.value}
    </button>
  );
}

function FunctionalButton(props) {
  return (
    <button
      className="functional-btn"
      onClick={(e) => {
        e.preventDefault();
        props.onButtonClick();
      }}
    >
      {props.value}
    </button>
  );
}

function ChangeLangButton(props) {
  const [properClass, setProperClass] = useState();

  useEffect(() => {
    setProperClass(() => {
      return props.name === props.lang
        ? 'change-lang yellow-color'
        : 'change-lang';
    });
  });

  const handleOnClick = (e) => {
    e.preventDefault();
    props.onButtonClick(e.target.name);
  };

  return (
    <button className={properClass} name={props.name} onClick={handleOnClick}>
      {props.value}
    </button>
  );
}

export { SubSectionButton, ModeButton, FunctionalButton, ChangeLangButton };
