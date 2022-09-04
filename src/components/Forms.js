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
        defaultValue={this.props.defaultValue}
        disabled={this.props.disabled}
      ></input>
    );
  }
}

class PhotoInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.displayFileName = this.displayFileName.bind(this);
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
      // this.setState({
      //   fileName: fileName,
      // });
    });
  }

  displayFileName() {
    if (!this.props.defaultValue) {
      return `${this.props.infoContent.chose_file}`;
    }
    return `${this.props.infoContent.file_name}: ${this.props.defaultValue}.`;
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
    this.createTextAriaContent = this.createTextAriaContent.bind(this);
  }

  createTextAriaContent(array) {
    return array.reduce((str, elem) => {
      return str + elem[this.props.name] + '\n';
    }, '');
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
        defaultValue={this.createTextAriaContent(this.props.defaultValues)}
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
        <Input
          type="text"
          placeholder={plContent.firstName}
          name="firstName"
          defaultValue={this.props.defaultValues['firstName']}
        />
        <Input
          type="text"
          placeholder={plContent.secondName}
          name="secondName"
          defaultValue={this.props.defaultValues['secondName']}
        />
        <PhotoInput
          onFormChange={this.props.onFormChange}
          section={this.section}
          buttonContent={this.props.buttonContent}
          infoContent={this.props.infoContent}
          defaultValue={this.props.defaultValues['fileName']}
        />
        <Input
          type="text"
          placeholder={plContent.address}
          name="address"
          defaultValue={this.props.defaultValues['address']}
        />
        <Input
          type="text"
          placeholder={plContent.phone}
          name="phone"
          defaultValue={this.props.defaultValues['phone']}
        />
        <Input
          type="email"
          placeholder={plContent.email}
          name="email"
          defaultValue={this.props.defaultValues['email']}
        />

        <textarea
          placeholder={plContent.description}
          name="description"
          defaultValue={this.props.defaultValues['description']}
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
            defaultValue={this.props.defaultValues['university']}
          />
          <Input
            type="text"
            placeholder={plContent.city}
            name="city"
            defaultValue={this.props.defaultValues['city']}
          />
          <Input
            type="text"
            placeholder={plContent.degree}
            name="degree"
            defaultValue={this.props.defaultValues['degree']}
          />
          <Input
            type="text"
            placeholder={plContent.subject}
            name="subject"
            defaultValue={this.props.defaultValues['subject']}
          />
          <Input
            type="date"
            placeholder={plContent.dateFrom}
            name="dateFrom"
            defaultValue={this.props.defaultValues['dateFrom']}
          />
          <Input
            type="date"
            placeholder={plContent.dateTo}
            name="dateTo"
            defaultValue={this.props.defaultValues['dateTo']}
          />
        </form>
      </fieldset>
    );
  }
}

class ExperienceInfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlace: false,
    };
    this.section = 'experience';
    this.handleOnChange = this.handleOnChange.bind(this);
    this.createTextAriaContent = this.createTextAriaContent.bind(this);
    this.changeCurPlace = this.changeCurPlace.bind(this);
  }

  handleOnChange(e) {
    const key = e.target.name;
    let value = e.target.value;
    if (e.target.type === 'checkbox') {
      const checked = e.target.checked;
      this.changeCurPlace(checked);
      if (!checked) {
        value = '';
      }
    }
    this.props.onFormChange(this.section, key, value, this.props.index);
  }

  changeCurPlace(val) {
    this.setState({ currentPlace: val });
  }

  createTextAriaContent(array) {
    return array.reduce((str, elem) => {
      return str + elem + '\n';
    }, '');
  }

  render() {
    const plContent = this.props.placeholderContent;
    return (
      <fieldset>
        <form onChange={this.handleOnChange}>
          <div className="checkbox">
            <Input
              type="checkbox"
              name="dateTo"
              defaultValue={this.props.infoContent.now}
            />
            {this.props.infoContent.cur_job}
          </div>
          <Input
            type="text"
            placeholder={plContent.company}
            name="company"
            defaultValue={this.props.defaultValues['company']}
          />
          <Input
            type="text"
            placeholder={plContent.position}
            name="position"
            defaultValue={this.props.defaultValues['position']}
          />
          <Input
            type="text"
            placeholder={plContent.city}
            name="city"
            defaultValue={this.props.defaultValues['city']}
          />
          <Input
            type="date"
            placeholder={plContent.dateFrom}
            name="dateFrom"
            defaultValue={this.props.defaultValues['dateFrom']}
          />
          <Input
            type={this.state.currentPlace ? 'text' : 'date'}
            placeholder={plContent.dateTo}
            name="dateTo"
            defaultValue={
              this.state.currentPlace ? '' : this.props.defaultValues['dateTo']
            }
            disabled={this.state.currentPlace ? 'disabled' : ''}
          />
          <textarea
            placeholder={plContent.duties}
            name="duties"
            defaultValue={this.createTextAriaContent(
              this.props.defaultValues['duties']
            )}
          ></textarea>
          <textarea
            placeholder={plContent.achievements}
            name="achievements"
            defaultValue={this.createTextAriaContent(
              this.props.defaultValues['achievements']
            )}
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
          <Input
            type="text"
            placeholder={plContent.language}
            name="language"
            defaultValue={this.props.defaultValues['language']}
          />
          <Input
            type="text"
            placeholder={plContent.level}
            name="level"
            defaultValue={this.props.defaultValues['level']}
          />
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
