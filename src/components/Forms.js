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
    return (
      <form onChange={this.handleOnChange}>
        <Input type="text" placeholder="First name" name="firstName" />
        <Input type="text" placeholder="Second name" name="secondName" />
        <Input type="text" placeholder="Address" name="address" />
        <Input type="text" placeholder="Phone" name="phone" />
        <Input type="email" placeholder="Email" name="email" />
        <Input type="file" placeholder="Photo" alt="myPhoto" name="myPhoto" />
        <textarea placeholder="Description" name="description"></textarea>
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
    return (
      <form onChange={this.handleOnChange}>
        <Input type="text" placeholder="University" name="university" />
        <Input type="text" placeholder="City" name="city" />
        <Input type="text" placeholder="Degree" name="degree" />
        <Input type="text" placeholder="Subject" name="subject" />
        <Input type="date" placeholder="From" name="dateFrom" />
        <Input type="date" placeholder="To" name="dateTo" />
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
    return (
      <form onChange={this.handleOnChange}>
        <Input type="text" placeholder="Company" name="company" />
        <Input type="text" placeholder="Position" name="position" />
        <Input type="text" placeholder="City" name="city" />
        <Input type="date" placeholder="From" name="dateFrom" />
        <Input type="date" placeholder="To" name="dateTo" />
        <textarea placeholder="Duties" name="duties"></textarea>
        <textarea placeholder="Achievments" name="achievements"></textarea>
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
    return (
      <form onChange={this.handleOnChange}>
        <Input type="text" placeholder="Language" name="language" />
        <Input type="text" placeholder="Level" name="level" />
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
