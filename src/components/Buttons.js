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
    return <button onClick={this.handleOnClick}>{this.props.value}</button>;
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
    console.log(name);
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

class SaveButton extends React.Component {
  render() {
    return <button>Save</button>;
  }
}

export { SubSectionButton, ModeButton };
