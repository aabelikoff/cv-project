import React from 'react';
import '../styles/FormsContainer.css';
import {
  PersonalInfoForm,
  EducationInfoForm,
  ExperienceInfoForm,
  LanguageInfoForm,
  TextAreaInfoForm,
} from './Forms';
import { SubSectionButton, FunctionalButton } from './Buttons';
import { CVReady } from './CVReady';
import Lang from './Languages';
import { ReactToPrint } from 'react-to-print';

class FormsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.updateInfo = this.updateInfo.bind(this);
    this.updateInfoInArray = this.updateInfoInArray.bind(this);
    this.updateInfoInTextarea = this.updateInfoInTextarea.bind(this);
    this.splitStringToArray = this.splitStringToArray.bind(this);
    this.splitStringToArrayObj = this.splitStringToArrayObj.bind(this);
    this.addSubsection = this.addSubsection.bind(this);
    this.removeSubsection = this.removeSubsection.bind(this);
    this.loadInfo = this.loadInfo.bind(this);
    this.saveInfo = this.saveInfo.bind(this);

    this.state = {
      personalInfo: {
        firstName: '',
        secondName: '',
        address: '',
        phone: '',
        email: '',
        myPhoto: '',
        description: '',
      },
      education: [],
      experience: [],
      skills: [],
      languages: [],
      certifications: [],
    };
  }

  loadInfo() {
    let dataStr = localStorage.getItem(this.props.lang);
    if (!dataStr) {
      return;
    }
    let newState = JSON.parse(dataStr);
    this.setState(newState);
  }

  saveInfo() {
    let dataStr = JSON.stringify(this.state);
    let key = this.props.lang;
    localStorage.setItem(key, dataStr);
  }

  updateInfo(section, key, value) {
    this.setState((state) => {
      const newSection = state[section];
      if (newSection[key] instanceof Array) {
        newSection[key] = this.splitStringToArray(value);
      } else {
        newSection[key] = value;
      }
      return {
        [section]: newSection,
      };
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

  updateInfoInArray(section, key, value, index) {
    this.setState((state) => {
      const newSectionArray = state[section];
      if (newSectionArray[index][key] instanceof Array) {
        newSectionArray[index][key] = this.splitStringToArray(value);
      } else {
        newSectionArray[index][key] = value;
      }
      return {
        section: newSectionArray,
      };
    });
  }

  updateInfoInTextarea(section, key, value) {
    if (value === '') {
      this.setState({ [section]: [] });
      return;
    }
    this.setState({ [section]: this.splitStringToArrayObj(value, key) });
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
    this.setState((state) => {
      const newSection = state[section].concat([elem]);
      return {
        [section]: newSection,
      };
    });
  }

  removeSubsection(section) {
    const newSubsection = this.state[section];
    newSubsection.pop();
    this.setState({
      [section]: newSubsection,
    });
  }

  render() {
    const content = Lang[this.props.lang];
    const headerContent = content.header;
    const buttonContent = content.button;
    const placeholderContent = content.placeholder;
    const titleContent = content.title;
    const separatorContent = content.separator;
    const infoContent = content.info;

    let displayForm = this.props.mode === 'input' ? 'block' : 'none';
    return (
      <div className="cv-container">
        <div className="cv-form" style={{ display: displayForm }}>
          <section>
            <h2>{headerContent.personalInfo}</h2>
            <PersonalInfoForm
              onFormChange={this.updateInfo}
              placeholderContent={placeholderContent}
              buttonContent={buttonContent}
              infoContent={infoContent}
            />
          </section>
          <section>
            <h2>{headerContent.education}</h2>
            {this.state.education.map((elem, index) => {
              return (
                <EducationInfoForm
                  onFormChange={this.updateInfoInArray}
                  placeholderContent={placeholderContent}
                  index={index}
                  key={index}
                />
              );
            })}
            <div className="sub-buttons">
              <SubSectionButton
                value={buttonContent.add}
                section="education"
                onButtonClick={this.addSubsection}
              />
              {this.state.education.length > 0 && (
                <SubSectionButton
                  value={buttonContent.delete}
                  section="education"
                  onButtonClick={this.removeSubsection}
                />
              )}
            </div>
          </section>
          <section>
            <h2>{headerContent.experience}</h2>
            {this.state.experience.map((elem, index) => {
              return (
                <ExperienceInfoForm
                  onFormChange={this.updateInfoInArray}
                  placeholderContent={placeholderContent}
                  index={index}
                  key={index}
                />
              );
            })}
            <div className="sub-buttons">
              <SubSectionButton
                value={buttonContent.add}
                section="experience"
                onButtonClick={this.addSubsection}
              />
              {this.state.experience.length > 0 && (
                <SubSectionButton
                  value={buttonContent.delete}
                  section="experience"
                  onButtonClick={this.removeSubsection}
                />
              )}
            </div>
          </section>
          <section>
            <h2>{headerContent.languages}</h2>
            {this.state.languages.map((elem, index) => {
              return (
                <LanguageInfoForm
                  onFormChange={this.updateInfoInArray}
                  placeholderContent={placeholderContent}
                  index={index}
                  key={index}
                />
              );
            })}
            <div className="sub-buttons">
              <SubSectionButton
                value={buttonContent.add}
                section="languages"
                onButtonClick={this.addSubsection}
              />
              {this.state.languages.length > 0 && (
                <SubSectionButton
                  value={buttonContent.delete}
                  section="languages"
                  onButtonClick={this.removeSubsection}
                />
              )}
            </div>
          </section>
          <section>
            <h2>{headerContent.skills}</h2>
            <TextAreaInfoForm
              onFormChange={this.updateInfoInTextarea}
              section="skills"
              name="skill"
              placeholder={placeholderContent.skills}
            />
          </section>
          <section>
            <h2>{headerContent.certifications}</h2>
            <TextAreaInfoForm
              onFormChange={this.updateInfoInTextarea}
              section="certifications"
              name="certificate"
              placeholder={placeholderContent.sertificates}
            />
          </section>
        </div>
        <CVReady
          info={this.state}
          mode={this.props.mode}
          titleContent={titleContent}
          separatorContent={separatorContent}
        />
      </div>
    );
  }
}

export { FormsContainer };
