import React from 'react';
import { ModeButton } from './Buttons';
import '../styles/Header.css';

class Header extends React.Component {
  render() {
    const buttonValue = this.props.mode === 'input' ? 'Preview' : 'Input';
    const buttonName = this.props.mode === 'input' ? 'preview' : 'input';
    return (
      <header>
        <div className="app-info">
          <div className="logo"></div>
          <div className="app-name">CV Creator</div>
        </div>
        <div className="h-button">
          <ModeButton
            value={buttonValue}
            name={buttonName}
            onButtonClick={this.props.onChangeMode}
          />
        </div>
      </header>
    );
  }
}

export { Header };
