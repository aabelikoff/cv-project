import React, { useState } from 'react';
import '../styles/FormsContainer.css';
import {
  PersonalInfoForm,
  EducationInfoForm,
  ExperienceInfoForm,
  LanguageInfoForm,
  TextAreaInfoForm,
} from './Forms';
import { SubSectionButton } from './Buttons';

function FormsContainer(props) {
  const headerContent = props.content.header;
  const buttonContent = props.content.button;
  const placeholderContent = props.content.placeholder;
  const infoContent = props.content.info;

  return (
    <div className="cv-container">
      <div className="cv-form">
        <section>
          <h2>{headerContent.personalInfo}</h2>
          <PersonalInfoForm
            onFormChange={props.updateInfo}
            placeholderContent={placeholderContent}
            buttonContent={buttonContent}
            infoContent={infoContent}
            defaultValues={props.info.personalInfo}
          />
        </section>
        <section>
          <h2>{headerContent.education}</h2>
          {props.info.education.map((elem, index) => {
            return (
              <EducationInfoForm
                onFormChange={props.updateInfoInArray}
                placeholderContent={placeholderContent}
                index={index}
                key={index}
                defaultValues={props.info.education[index]}
              />
            );
          })}
          <div className="sub-buttons">
            <SubSectionButton
              value={buttonContent.add}
              section="education"
              onButtonClick={props.addSubsection}
            />
            {props.info.education.length > 0 && (
              <SubSectionButton
                value={buttonContent.delete}
                section="education"
                onButtonClick={props.removeSubsection}
              />
            )}
          </div>
        </section>

        <section>
          <h2>{headerContent.experience}</h2>
          {props.info.experience.map((elem, index) => {
            return (
              <ExperienceInfoForm
                onFormChange={props.updateInfoInArray}
                placeholderContent={placeholderContent}
                infoContent={infoContent}
                index={index}
                key={index}
                defaultValues={props.info.experience[index]}
              />
            );
          })}
          <div className="sub-buttons">
            <SubSectionButton
              value={buttonContent.add}
              section="experience"
              onButtonClick={props.addSubsection}
            />
            {props.info.experience.length > 0 && (
              <SubSectionButton
                value={buttonContent.delete}
                section="experience"
                onButtonClick={props.removeSubsection}
              />
            )}
          </div>
        </section>

        <section>
          <h2>{headerContent.languages}</h2>
          {props.info.languages.map((elem, index) => {
            return (
              <LanguageInfoForm
                onFormChange={props.updateInfoInArray}
                placeholderContent={placeholderContent}
                index={index}
                key={index}
                defaultValues={props.info.languages[index]}
              />
            );
          })}
          <div className="sub-buttons">
            <SubSectionButton
              value={buttonContent.add}
              section="languages"
              onButtonClick={props.addSubsection}
            />
            {props.info.languages.length > 0 && (
              <SubSectionButton
                value={buttonContent.delete}
                section="languages"
                onButtonClick={props.removeSubsection}
              />
            )}
          </div>
        </section>
        <section>
          <h2>{headerContent.skills}</h2>
          <TextAreaInfoForm
            onFormChange={props.updateInfoInTextarea}
            section="skills"
            name="skill"
            placeholder={placeholderContent.skills}
            defaultValues={props.info.skills}
          />
        </section>
        <section>
          <h2>{headerContent.certifications}</h2>
          <TextAreaInfoForm
            onFormChange={props.updateInfoInTextarea}
            section="certifications"
            name="certificate"
            placeholder={placeholderContent.sertificates}
            defaultValues={props.info.certifications}
          />
        </section>
      </div>
    </div>
  );
}

export { FormsContainer };
