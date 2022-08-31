import React from 'react';
import '../styles/Buttons.css';

class SubSectionButton extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(e) {
    e.preventDefault();
    this.props.onButtonClick(this.props.section);
  }

  render() {
    return (
      <button className="subsection-btn" onClick={this.handleOnClick}>
        {this.props.value}
      </button>
    );
  }
}

class ModeButton extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(e) {
    e.preventDefault();
    let name = this.props.name;
    this.props.onButtonClick(name);
  }

  render() {
    return (
      <button className="mode-button" onClick={this.handleOnClick}>
        {this.props.value}
      </button>
    );
  }
}

class FunctionalButton extends React.Component {
  render() {
    return (
      <button
        className="functional-btn"
        // onClick={(e) => {
        //   e.preventDefault();
        //   this.props.onButtonClick();
        // }}
      >
        {this.props.value}
      </button>
    );
  }
}

class ChangeLangButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(e) {
    e.preventDefault();
    this.props.onButtonClick(e.target.name);
  }

  render() {
    const properClass =
      this.props.name === this.props.lang
        ? 'change-lang yellow-color'
        : 'change-lang';
    return (
      <button
        className={properClass}
        name={this.props.name}
        onClick={this.handleOnClick}
      >
        {this.props.value}
      </button>
    );
  }
}

class PrintButton extends React.Component {
  render() {
    let buttonValue = 'Print CV';
    if (this.props.buttonLang === 'ua') {
      buttonValue = 'Друк';
    } else if (this.props.buttonLang === 'ru') {
      buttonValue = 'Печать';
    }

    return <button>{buttonValue}</button>;
  }
}

export {
  SubSectionButton,
  ModeButton,
  FunctionalButton,
  ChangeLangButton,
  PrintButton,
};
