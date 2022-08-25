import React from 'react';

class Input extends React.Component {
  render() {
    return (
      <input
        type={this.props.type}
        placeholder={this.props.placeholder}
        name={this.props.name}
      ></input>
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
    let value;
    if (key === 'myPhoto') {
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
        this.props.onFormChange(this.section, key, data);
      });
    } else {
      value = e.target.value;
      this.props.onFormChange(this.section, key, value);
    }
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
        <Input type="text" placeholder={plContent.address} name="address" />
        <Input type="text" placeholder={plContent.phone} name="phone" />
        <Input type="email" placeholder={plContent.email} name="email" />
        <Input
          type="file"
          placeholder={plContent.photo}
          alt="myPhoto"
          name="myPhoto"
        />
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
      <form onChange={this.handleOnChange}>
        <Input type="text" placeholder={plContent.language} name="language" />
        <Input type="text" placeholder={plContent.level} name="level" />
      </form>
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
