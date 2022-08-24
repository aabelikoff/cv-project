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
import storage from './components/Storage';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appMode: 'input',
      appLang: 'en',
    };

    this.changeAppMode = this.changeAppMode.bind(this);
  }

  changeAppMode(value) {
    this.setState({ appMode: value });
  }

  render() {
    return (
      <div className="App">
        <Header
          mode={this.state.appMode}
          onChangeMode={this.changeAppMode}
          lang={this.state.appLang}
        />
        <FormsContainer mode={this.state.appMode} lang={this.state.appLang} />
      </div>
    );
  }
}

export default App;
