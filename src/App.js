import { FormsContainer } from './components/FormsContainer';
import { CVReady } from './components/CVReady';
import { Header } from './components/Header';
import React, { useState, useRef } from 'react';
import './styles/App.css';
import { FunctionalButton, ModeButton } from './components/Buttons';
import Lang from './components/Languages';
import { useReactToPrint } from 'react-to-print';

function App() {
  const [appMode, setAppMode] = useState('preview');
  const [appLang, setAppLang] = useState('en');
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [cv, setCv] = useState({
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
  });

  const loadInfo = () => {
    let dataStr = localStorage.getItem(appLang);
    if (!dataStr) {
      return;
    }
    let newCv = JSON.parse(dataStr);
    setCv(newCv);
  };

  const saveInfo = () => {
    let dataStr = JSON.stringify(cv);
    let key = appLang;
    localStorage.setItem(key, dataStr);
  };

  const splitStringToArray = (str) => {
    const re = /[;\n]+/;
    return str.split(re);
  };

  const splitStringToArrayObj = (str, key) => {
    const arr = splitStringToArray(str);
    return arr.map((elem) => {
      return {
        [key]: elem,
      };
    });
  };

  const updateInfo = (section, key, value) => {
    setCv((prevCv) => {
      return {
        ...prevCv,
        [section]: { ...prevCv[section], [key]: value },
      };
    });
  };

  const updateInfoInArray = (section, key, value, index) => {
    setCv((prevCv) => {
      cv[section][index][key] =
        cv[section][index][key] instanceof Array
          ? splitStringToArray(value)
          : value;

      return {
        ...prevCv,
        [section]: cv[section],
      };
    });
  };

  const updateInfoInTextarea = (section, key, value) => {
    setCv((prevCv) => {
      return {
        ...prevCv,
        [section]: !value ? [] : splitStringToArrayObj(value, key),
      };
    });
  };

  const addSubsection = (section) => {
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
    setCv((prevCv) => {
      return { ...prevCv, [section]: cv[section].concat(elem) };
    });
  };

  const removeSubsection = (section) => {
    setCv((prevCv) => {
      return { ...prevCv, [section]: cv[section].slice(0, -1) };
    });
  };

  const content = Lang[appLang];
  const buttonContent = content.button;

  return (
    <div className="App">
      <Header
        mode={appMode}
        onChangeMode={setAppMode}
        onChangeLanguage={setAppLang}
        lang={appLang}
      />

      {appMode === 'input' && (
        <FormsContainer
          content={content}
          mode={appMode}
          lang={appLang}
          info={cv}
          updateInfo={updateInfo}
          updateInfoInArray={updateInfoInArray}
          updateInfoInTextarea={updateInfoInTextarea}
          addSubsection={addSubsection}
          removeSubsection={removeSubsection}
        />
      )}
      {appMode === 'preview' && (
        <CVReady
          info={cv}
          mode={appMode}
          content={content}
          ref={componentRef}
        />
      )}

      <div className="func-buttons">
        <ModeButton
          value={
            appMode === 'input' ? buttonContent.preview : buttonContent.input
          }
          name={appMode === 'input' ? 'preview' : 'input'}
          onButtonClick={setAppMode}
        />
        <FunctionalButton onButtonClick={loadInfo} value={buttonContent.load} />

        <FunctionalButton onButtonClick={saveInfo} value={buttonContent.save} />
        {appMode === 'preview' && (
          <button className="functional-btn" onClick={handlePrint}>
            {buttonContent.print}
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
