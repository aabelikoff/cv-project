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
      cv: {
        personalInfo: {
          firstName: '',
          secondName: '',
          address: '',
          phone: '',
          email: '',
          myPhoto: '',
          description: '',
          fileName: '',
        },
        education: [],
        experience: [],
        skills: [],
        languages: [],
        certifications: [],
      },
    };

    this.splitStringToArray = this.splitStringToArray.bind(this);
    this.splitStringToArrayObj = this.splitStringToArrayObj.bind(this);
    this.changeAppMode = this.changeAppMode.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
    this.loadInfo = this.loadInfo.bind(this);
    this.saveInfo = this.saveInfo.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
    this.updateInfoInArray = this.updateInfoInArray.bind(this);
    this.updateInfoInTextarea = this.updateInfoInTextarea.bind(this);
    this.addSubsection = this.addSubsection.bind(this);
    this.removeSubsection = this.removeSubsection.bind(this);
  }

  loadInfo() {
    let dataStr = localStorage.getItem(this.state.appLang);
    if (!dataStr) {
      return;
    }
    let newCV = JSON.parse(dataStr);
    this.setState({ cv: newCV });
  }

  saveInfo() {
    let dataStr = JSON.stringify(this.state.cv);
    let key = this.state.appLang;
    localStorage.setItem(key, dataStr);
  }

  changeAppMode(value) {
    this.setState({ appMode: value });
  }

  changeLanguage(value) {
    this.setState({ appLang: value });
  }

  updateInfo(section, key, value) {
    this.setState((state) => {
      const newCv = state.cv;
      const newSection = newCv[section];

      if (newSection[key] instanceof Array) {
        newSection[key] = this.splitStringToArray(value);
      } else {
        newSection[key] = value;
      }
      return {
        cv: newCv,
      };
    });
  }

  updateInfoInArray(section, key, value, index) {
    this.setState((state) => {
      const newCv = state.cv;
      const newSectionArray = newCv[section];

      if (newSectionArray[index][key] instanceof Array) {
        newSectionArray[index][key] = this.splitStringToArray(value);
      } else {
        newSectionArray[index][key] = value;
      }
      return {
        cv: newCv,
      };
    });
  }

  updateInfoInTextarea(section, key, value) {
    if (value === '') {
      this.setState((state) => {
        const newCv = state.cv;
        newCv[section] = [];
        return { cv: newCv };
      });
      return;
    }
    this.setState((state) => {
      const newCv = state.cv;
      newCv[section] = this.splitStringToArrayObj(value, key);
      return {
        cv: newCv,
      };
    });
  }

  addSubsection(section) {
    let elem;
    switch (section) {
      case 'education':
        elem = {
          university: '',
          city: '',
          degree: '',
          subject: '',
          dateFrom: '',
          dateTo: '',
        };
        break;
      case 'experience':
        elem = {
          company: '',
          position: '',
          city: '',
          dateFrom: '',
          dateTo: '',
          duties: [],
          achievements: [],
        };
        break;
      case 'languages':
        elem = {
          language: '',
          level: '',
        };
        break;
      default:
        return;
    }

    const newCv = this.state.cv;
    const newSection = newCv[section].concat([elem]);
    newCv[section] = newSection;
    this.setState({ cv: newCv });
  }

  removeSubsection(section) {
    const newCv = this.state.cv;
    const newSubsection = newCv[section];
    newSubsection.pop();
    this.setState({
      cv: newCv,
    });
  }

  splitStringToArray(str) {
    const re = /[;\n]+/;
    return str.split(re);
  }

  splitStringToArrayObj(str, key) {
    const arr = this.splitStringToArray(str);
    return arr.map((elem) => {
      return {
        [key]: elem,
      };
    });
  }

  render() {
    const content = Lang[this.state.appLang];
    const buttonContent = content.button;

    return (
      <div className="App">
        <Header
          mode={this.state.appMode}
          onChangeMode={this.changeAppMode}
          onChangeLanguage={this.changeLanguage}
          lang={this.state.appLang}
        />

        {this.state.appMode === 'input' && (
          <FormsContainer
            content={content}
            mode={this.state.appMode}
            lang={this.state.appLang}
            info={this.state.cv}
            updateInfo={this.updateInfo}
            updateInfoInArray={this.updateInfoInArray}
            updateInfoInTextarea={this.updateInfoInTextarea}
            addSubsection={this.addSubsection}
            removeSubsection={this.removeSubsection}
          />
        )}
        {this.state.appMode === 'preview' && (
          <CVReady
            info={this.state.cv}
            mode={this.state.appMode}
            content={content}
            ref={(el) => (this.componentRef = el)}
          />
        )}

        <div className="func-buttons">
          <FunctionalButton
            onButtonClick={this.loadInfo}
            value={buttonContent.load}
          />

          <FunctionalButton
            onButtonClick={this.saveInfo}
            value={buttonContent.save}
          />
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
