import React from 'react';
import { ModeButton, ChangeLangButton } from './Buttons';
import '../styles/Header.css';
import Lang from './Languages';

function Header(props) {
  const content = Lang[props.lang];
  const buttonValue =
    props.mode === 'input' ? content.button.preview : content.button.input;
  const buttonName = props.mode === 'input' ? 'preview' : 'input';

  return (
    <header>
      <div className="app-info">
        <div className="logo"></div>
        <h2 className="app-name">CV Creator</h2>
      </div>
      <div className="languages">
        <ChangeLangButton
          lang={props.lang}
          name="en"
          value="language"
          onButtonClick={props.onChangeLanguage}
        />
        <ChangeLangButton
          lang={props.lang}
          name="ua"
          value="мова"
          onButtonClick={props.onChangeLanguage}
        />
        <ChangeLangButton
          lang={props.lang}
          name="ru"
          value="язык"
          onButtonClick={props.onChangeLanguage}
        />
      </div>
      <div className="h-button">
        <ModeButton
          value={buttonValue}
          name={buttonName}
          onButtonClick={props.onChangeMode}
        />
      </div>
    </header>
  );
}

export { Header };
