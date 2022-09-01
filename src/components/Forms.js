import { toHaveDisplayValue } from '@testing-library/jest-dom/dist/matchers';
import React from 'react';
import '../styles/Forms.css';

class Input extends React.Component {
  render() {
    return (
      <input
        type={this.props.type}
        placeholder={this.props.placeholder}
        name={this.props.name}
        accept={this.props.accept}
        className={this.props.className}
      ></input>
    );
  }
}

class PhotoInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.displayFileName = this.displayFileName.bind(this);

    this.state = {
      fileName: '',
    };
  }

  handleOnChange(e) {
    e.preventDefault();
    const key = e.target.name;
    let fileName = e.target.files[0].name;
    this.setState({ fileName: e.target.files[0].name });
    new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = () => {
        reject('Error'); //доделать, добавив фоточку
      };
    }).then((data) => {
      this.props.onFormChange(this.props.section, key, data);
      this.props.onFormChange(this.props.section, 'fileName', fileName);
      this.setState({
        fileName: fileName,
      });
    });
  }

  displayFileName() {
    if (!this.state.fileName) {
      return `${this.props.infoContent.chose_file}`;
    }
    return `${this.props.infoContent.file_name}: ${this.state.fileName}.`;
  }

  render() {
    return (
      <div className="form-photo" onChange={this.handleOnChange}>
        <div>{this.displayFileName()}</div>
        <button>{this.props.buttonContent.chose}</button>
        <Input
          className="photo-upload"
          type="file"
          // placeholder={plContent.photo}
          alt="myPhoto"
          name="myPhoto"
          accept=".png, .jpg, .jpeg"
        />
      </div>
    );
  }
}

class TextAreaInfoForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(e) {
    e.preventDefault();
    const section = this.props.section;
    const key = e.target.name;
    const value = e.target.value;
    this.props.onFormChange(section, key, value);
  }

  render() {
    return (
      <textarea
        placeholder={this.props.placeholder}
        name={this.props.name}
        onChange={this.handleOnChange}
        accept={this.props.accept}
      ></textarea>
    );
  }
}

class PersonalInfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.section = 'personalInfo';
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(e) {
    e.preventDefault();
    const key = e.target.name;
    let value = e.target.value;
    this.props.onFormChange(this.section, key, value);
  }

  render() {
    const plContent = this.props.placeholderContent;
    return (
      <form onChange={this.handleOnChange}>
        <Input type="text" placeholder={plContent.firstName} name="firstName" />
        <Input
          type="text"
          placeholder={plContent.secondName}
          name="secondName"
        />
        <PhotoInput
          onFormChange={this.props.onFormChange}
          section={this.section}
          buttonContent={this.props.buttonContent}
          infoContent={this.props.infoContent}
        />
        <Input type="text" placeholder={plContent.address} name="address" />
        <Input type="text" placeholder={plContent.phone} name="phone" />
        <Input type="email" placeholder={plContent.email} name="email" />

        <textarea
          placeholder={plContent.description}
          name="description"
        ></textarea>
      </form>
    );
  }
}

class EducationInfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.section = 'education';
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(e) {
    e.preventDefault();
    const key = e.target.name;
    const value = e.target.value;
    this.props.onFormChange(this.section, key, value, this.props.index);
  }

  render() {
    const plContent = this.props.placeholderContent;
    return (
      <fieldset>
        <form onChange={this.handleOnChange}>
          <Input
            type="text"
            placeholder={plContent.university}
            name="university"
          />
          <Input type="text" placeholder={plContent.city} name="city" />
          <Input type="text" placeholder={plContent.degree} name="degree" />
          <Input type="text" placeholder={plContent.subject} name="subject" />
          <Input type="date" placeholder={plContent.dateFrom} name="dateFrom" />
          <Input type="date" placeholder={plContent.dateTo} name="dateTo" />
        </form>
      </fieldset>
    );
  }
}

class ExperienceInfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.section = 'experience';
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(e) {
    e.preventDefault();
    const key = e.target.name;
    const value = e.target.value;
    this.props.onFormChange(this.section, key, value, this.props.index);
  }

  render() {
    const plContent = this.props.placeholderContent;
    return (
      <fieldset>
        <form onChange={this.handleOnChange}>
          <Input type="text" placeholder={plContent.company} name="company" />
          <Input type="text" placeholder={plContent.position} name="position" />
          <Input type="text" placeholder={plContent.city} name="city" />
          <Input type="date" placeholder={plContent.dateFrom} name="dateFrom" />
          <Input type="date" placeholder={plContent.dateTo} name="dateTo" />
          <textarea placeholder={plContent.duties} name="duties"></textarea>
          <textarea
            placeholder={plContent.achievements}
            name="achievements"
          ></textarea>
        </form>
      </fieldset>
    );
  }
}

class LanguageInfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.section = 'languages';

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(e) {
    e.preventDefault();
    const key = e.target.name;
    const value = e.target.value;
    this.props.onFormChange(this.section, key, value, this.props.index);
  }

  render() {
    const plContent = this.props.placeholderContent;
    return (
      <fieldset>
        <form onChange={this.handleOnChange}>
          <Input type="text" placeholder={plContent.language} name="language" />
          <Input type="text" placeholder={plContent.level} name="level" />
        </form>
      </fieldset>
    );
  }
}

export {
  Input,
  PersonalInfoForm,
  EducationInfoForm,
  ExperienceInfoForm,
  LanguageInfoForm,
  TextAreaInfoForm,
};
