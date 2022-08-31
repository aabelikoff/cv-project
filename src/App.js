import {
  Form,
  Input,
  PersonalInfoForm,
  EducationInfoForm,
  ExperienceInfoForm,
} from './components/Forms';
import { FormsContainer } from './components/FormsContainer';
import { CVReady } from './components/CVReady';
import { Header } from './components/Header';
import React from 'react';
import './styles/App.css';
import ReactToPrint from 'react-to-print';
import { PrintButton, FunctionalButton } from './components/Buttons';
import Lang from './components/Languages';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appMode: 'input',
      appLang: 'ua',
    };

    this.changeAppMode = this.changeAppMode.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
  }

  changeAppMode(value) {
    this.setState({ appMode: value });
  }

  changeLanguage(value) {
    this.setState({ appLang: value });
  }

  render() {
    let buttonContent = Lang[this.state.appLang].button;
    return (
      <div className="App">
        <Header
          mode={this.state.appMode}
          onChangeMode={this.changeAppMode}
          onChangeLanguage={this.changeLanguage}
          lang={this.state.appLang}
        />
        <FormsContainer
          mode={this.state.appMode}
          lang={this.state.appLang}
          ref={(el) => (this.componentRef = el)}
          load={this.state.load}
          save={this.state.save}
        />
        <div className="func-buttons">
          <button
            name="load"
            onClick={(e) => {
              e.preventDefault();
              this.changeInfo('load');
            }}
          >
            {buttonContent.load}
          </button>
          <button
            name="save"
            onClick={(e) => {
              e.preventDefault();
              this.changeInfo('save');
            }}
          >
            {buttonContent.save}
          </button>
        </div>
        {this.state.appMode === 'preview' && (
          <ReactToPrint
            trigger={() => {
              return <PrintButton buttonLang={this.state.appLang} />;
            }}
            content={() => this.componentRef}
          />
        )}
      </div>
    );
  }
}

export default App;
