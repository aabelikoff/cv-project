import React from 'react';
import '../styles/FormsContainer.css';
import {
  PersonalInfoForm,
  EducationInfoForm,
  ExperienceInfoForm,
  LanguageInfoForm,
  TextAreaInfoForm,
} from './Forms';
import { SubSectionButton } from './Buttons';

class FormsContainer extends React.Component {
  render() {
    const headerContent = this.props.content.header;
    const buttonContent = this.props.content.button;
    const placeholderContent = this.props.content.placeholder;
    const infoContent = this.props.content.info;

    return (
      <div className="cv-container">
        <div className="cv-form">
          <section>
            <h2>{headerContent.personalInfo}</h2>
            <PersonalInfoForm
              onFormChange={this.props.updateInfo}
              placeholderContent={placeholderContent}
              buttonContent={buttonContent}
              infoContent={infoContent}
              defaultValues={this.props.info.personalInfo}
            />
          </section>
          <section>
            <h2>{headerContent.education}</h2>
            {this.props.info.education.map((elem, index) => {
              return (
                <EducationInfoForm
                  onFormChange={this.props.updateInfoInArray}
                  placeholderContent={placeholderContent}
                  index={index}
                  key={index}
                  defaultValues={this.props.info.education[index]}
                />
              );
            })}
            <div className="sub-buttons">
              <SubSectionButton
                value={buttonContent.add}
                section="education"
                onButtonClick={this.props.addSubsection}
              />
              {this.props.info.education.length > 0 && (
                <SubSectionButton
                  value={buttonContent.delete}
                  section="education"
                  onButtonClick={this.props.removeSubsection}
                />
              )}
            </div>
          </section>

          <section>
            <h2>{headerContent.experience}</h2>
            {this.props.info.experience.map((elem, index) => {
              return (
                <ExperienceInfoForm
                  onFormChange={this.props.updateInfoInArray}
                  placeholderContent={placeholderContent}
                  infoContent={infoContent}
                  index={index}
                  key={index}
                  defaultValues={this.props.info.experience[index]}
                />
              );
            })}
            <div className="sub-buttons">
              <SubSectionButton
                value={buttonContent.add}
                section="experience"
                onButtonClick={this.props.addSubsection}
              />
              {this.props.info.experience.length > 0 && (
                <SubSectionButton
                  value={buttonContent.delete}
                  section="experience"
                  onButtonClick={this.props.removeSubsection}
                />
              )}
            </div>
          </section>

          <section>
            <h2>{headerContent.languages}</h2>
            {this.props.info.languages.map((elem, index) => {
              return (
                <LanguageInfoForm
                  onFormChange={this.props.updateInfoInArray}
                  placeholderContent={placeholderContent}
                  index={index}
                  key={index}
                  defaultValues={this.props.info.languages[index]}
                />
              );
            })}
            <div className="sub-buttons">
              <SubSectionButton
                value={buttonContent.add}
                section="languages"
                onButtonClick={this.props.addSubsection}
              />
              {this.props.info.languages.length > 0 && (
                <SubSectionButton
                  value={buttonContent.delete}
                  section="languages"
                  onButtonClick={this.props.removeSubsection}
                />
              )}
            </div>
          </section>
          <section>
            <h2>{headerContent.skills}</h2>
            <TextAreaInfoForm
              onFormChange={this.props.updateInfoInTextarea}
              section="skills"
              name="skill"
              placeholder={placeholderContent.skills}
              defaultValues={this.props.info.skills}
            />
          </section>
          <section>
            <h2>{headerContent.certifications}</h2>
            <TextAreaInfoForm
              onFormChange={this.props.updateInfoInTextarea}
              section="certifications"
              name="certificate"
              placeholder={placeholderContent.sertificates}
              defaultValues={this.props.info.certifications}
            />
          </section>
        </div>
      </div>
    );
  }
}

export { FormsContainer };
