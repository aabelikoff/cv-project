import React from 'react';
import { ModeButton, ChangeLangButton } from './Buttons';
import '../styles/Header.css';
import Lang from './Languages';

class Header extends React.Component {
  render() {
    const content = Lang[this.props.lang];
    const buttonValue =
      this.props.mode === 'input'
        ? content.button.preview
        : content.button.input;
    const buttonName = this.props.mode === 'input' ? 'preview' : 'input';
    return (
      <header>
        <div className="app-info">
          <div className="logo"></div>
          <div className="app-name">CV Creator</div>
        </div>
        <div className="languages">
          <ChangeLangButton
            name="en"
            value="language"
            onButtonClick={this.props.onChangeLanguage}
          />
          <ChangeLangButton
            name="ua"
            value="мова"
            onButtonClick={this.props.onChangeLanguage}
          />
          <ChangeLangButton
            name="ru"
            value="язык"
            onButtonClick={this.props.onChangeLanguage}
          />
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
