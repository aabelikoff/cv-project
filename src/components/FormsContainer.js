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
    let displayForm = this.props.mode === 'input' ? 'block' : 'none';
    return (
      <div>
        <div className="cv-form" style={{ display: displayForm }}>
          <section>
            <h2>Personal information</h2>
            <PersonalInfoForm onFormChange={this.updateInfo} />;
          </section>
          <section>
            <h2>Education</h2>
            {this.state.education.map((elem, index) => {
              return (
                <EducationInfoForm
                  onFormChange={this.updateInfoInArray}
                  index={index}
                  key={index}
                />
              );
            })}
            <SubSectionButton
              value="Add"
              section="education"
              onButtonClick={this.addSubsection}
            />
            {this.state.education.length > 0 && (
              <SubSectionButton
                value="Delete"
                section="education"
                onButtonClick={this.removeSubsection}
              />
            )}
          </section>
          <section>
            <h2>Experience</h2>
            {this.state.experience.map((elem, index) => {
              return (
                <ExperienceInfoForm
                  onFormChange={this.updateInfoInArray}
                  index={index}
                  key={index}
                />
              );
            })}
            <SubSectionButton
              value="Add"
              section="experience"
              onButtonClick={this.addSubsection}
            />
            {this.state.experience.length > 0 && (
              <SubSectionButton
                value="Delete"
                section="experience"
                onButtonClick={this.removeSubsection}
              />
            )}
          </section>
          <section>
            <h2>Languages</h2>
            {this.state.languages.map((elem, index) => {
              return (
                <LanguageInfoForm
                  onFormChange={this.updateInfoInArray}
                  index={index}
                  key={index}
                />
              );
            })}
            {/* <LanguageInfoForm onFormChange={this.updateInfoInArray} index={0} /> */}
            <SubSectionButton
              value="Add"
              section="languages"
              onButtonClick={this.addSubsection}
            />
            {this.state.languages.length > 0 && (
              <SubSectionButton
                value="Delete"
                section="languages"
                onButtonClick={this.removeSubsection}
              />
            )}
          </section>
          <section>
            <h2>Skills</h2>
            <TextAreaInfoForm
              onFormChange={this.updateInfoInTextarea}
              section="skills"
              name="skill"
              placeholder="Skills"
            />
          </section>
          <section>
            <h2>Sertifications</h2>
            <TextAreaInfoForm
              onFormChange={this.updateInfoInTextarea}
              section="certifications"
              name="certificate"
              placeholder="Certifications"
            />
          </section>
        </div>
        <CVReady info={this.state} mode={this.props.mode} />
        <FunctionalButton value="Load CV" onButtonClick={this.loadInfo} />
        <FunctionalButton value="Save CV" onButtonClick={this.saveInfo} />
      </div>
    );
  }
}

export { FormsContainer };
