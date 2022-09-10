import React, { useState } from 'react';
import '../styles/Forms.css';

function Input(props) {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      name={props.name}
      accept={props.accept}
      className={props.className}
      defaultValue={props.defaultValue}
      disabled={props.disabled}
    />
  );
}

function PhotoInput(props) {
  const [fileName, setFileName] = useState();

  const handleOnChange = (e) => {
    e.preventDefault();
    const key = e.target.name;
    let fileName = e.target.files[0].name;
    setFileName(e.target.files[0].name);
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
      props.onFormChange(props.section, key, data);
      props.onFormChange(props.section, 'fileName', fileName);
    });
  };

  const displayFileName = () => {
    if (!props.defaultValue) {
      return `${props.infoContent.chose_file}`;
    }
    return `${props.infoContent.file_name}: ${props.defaultValue}.`;
  };

  return (
    <div className="form-photo" onChange={handleOnChange}>
      <div>{displayFileName()}</div>
      <button>{props.buttonContent.chose}</button>
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

function TextAreaInfoForm(props) {
  const createTextAriaContent = (array) => {
    return array.reduce((str, elem) => {
      return str + elem[props.name] + '\n';
    }, '');
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    const section = props.section;
    const key = e.target.name;
    const value = e.target.value;
    props.onFormChange(section, key, value);
  };

  return (
    <textarea
      placeholder={props.placeholder}
      name={props.name}
      onChange={handleOnChange}
      // accept={props.accept} //????
      defaultValue={createTextAriaContent(props.defaultValues)}
    />
  );
}

function PersonalInfoForm(props) {
  const section = 'personalInfo';
  const plContent = props.placeholderContent;

  const handleOnChange = (e) => {
    e.preventDefault();
    const key = e.target.name;
    let value = e.target.value;
    props.onFormChange(section, key, value);
  };

  return (
    <form onChange={handleOnChange}>
      <Input
        type="text"
        placeholder={plContent.firstName}
        name="firstName"
        defaultValue={props.defaultValues['firstName']}
      />
      <Input
        type="text"
        placeholder={plContent.secondName}
        name="secondName"
        defaultValue={props.defaultValues['secondName']}
      />
      <PhotoInput
        onFormChange={props.onFormChange}
        section={section}
        buttonContent={props.buttonContent}
        infoContent={props.infoContent}
        defaultValue={props.defaultValues['fileName']}
      />
      <Input
        type="text"
        placeholder={plContent.address}
        name="address"
        defaultValue={props.defaultValues['address']}
      />
      <Input
        type="text"
        placeholder={plContent.phone}
        name="phone"
        defaultValue={props.defaultValues['phone']}
      />
      <Input
        type="email"
        placeholder={plContent.email}
        name="email"
        defaultValue={props.defaultValues['email']}
      />
      <textarea
        placeholder={plContent.description}
        name="description"
        defaultValue={props.defaultValues['description']}
      ></textarea>
    </form>
  );
}

function EducationInfoForm(props) {
  const section = 'education';
  const plContent = props.placeholderContent;

  const handleOnChange = (e) => {
    e.preventDefault();
    const key = e.target.name;
    const value = e.target.value;
    props.onFormChange(section, key, value, props.index);
  };

  return (
    <fieldset>
      <form onChange={handleOnChange}>
        <Input
          type="text"
          placeholder={plContent.university}
          name="university"
          defaultValue={props.defaultValues['university']}
        />
        <Input
          type="text"
          placeholder={plContent.city}
          name="city"
          defaultValue={props.defaultValues['city']}
        />
        <Input
          type="text"
          placeholder={plContent.degree}
          name="degree"
          defaultValue={props.defaultValues['degree']}
        />
        <Input
          type="text"
          placeholder={plContent.subject}
          name="subject"
          defaultValue={props.defaultValues['subject']}
        />
        <Input
          type="date"
          placeholder={plContent.dateFrom}
          name="dateFrom"
          defaultValue={props.defaultValues['dateFrom']}
        />
        <Input
          type="date"
          placeholder={plContent.dateTo}
          name="dateTo"
          defaultValue={props.defaultValues['dateTo']}
        />
      </form>
    </fieldset>
  );
}

function ExperienceInfoForm(props) {
  const section = 'experience';
  const plContent = props.placeholderContent;
  const index = props.index;
  const infoContent = props.infoContent;
  const defaultValues = props.defaultValues;
  const [currentPlace, setCurrentPlace] = useState(false);

  const handleOnChange = (e) => {
    if (e.target.type === 'checkbox') {
      setCurrentPlace(e.target.checked);
    }
    const key = e.target.name;
    const value = currentPlace ? '' : e.target.value;

    props.onFormChange(section, key, value, index);
  };

  const createTextAriaContent = (array) => {
    return array.reduce((str, elem) => {
      return str + elem + '\n';
    }, '');
  };

  return (
    <fieldset>
      <form onChange={handleOnChange}>
        <div className="checkbox">
          <Input type="checkbox" name="dateTo" defaultValue={infoContent.now} />
          {infoContent.cur_job}
        </div>
        <Input
          type="text"
          placeholder={plContent.company}
          name="company"
          defaultValue={defaultValues['company']}
        />
        <Input
          type="text"
          placeholder={plContent.position}
          name="position"
          defaultValue={defaultValues['position']}
        />
        <Input
          type="text"
          placeholder={plContent.city}
          name="city"
          defaultValue={defaultValues['city']}
        />
        <Input
          type="date"
          placeholder={plContent.dateFrom}
          name="dateFrom"
          defaultValue={defaultValues['dateFrom']}
        />
        <Input
          type={currentPlace ? 'text' : 'date'}
          placeholder={plContent.dateTo}
          name="dateTo"
          defaultValue={currentPlace ? '' : props.defaultValues['dateTo']}
          disabled={currentPlace ? 'disabled' : ''}
        />
        <textarea
          placeholder={plContent.duties}
          name="duties"
          defaultValue={createTextAriaContent(defaultValues['duties'])}
        ></textarea>
        <textarea
          placeholder={plContent.achievements}
          name="achievements"
          defaultValue={createTextAriaContent(defaultValues['achievements'])}
        ></textarea>
      </form>
    </fieldset>
  );
}

function LanguageInfoForm(props) {
  const section = 'languages';
  const index = props.index;
  const plContent = props.placeholderContent;
  const defaultValues = props.defaultValues;

  const handleOnChange = (e) => {
    e.preventDefault();
    const key = e.target.name;
    const value = e.target.value;
    props.onFormChange(section, key, value, index);
  };

  return (
    <fieldset>
      <form onChange={handleOnChange}>
        <Input
          type="text"
          placeholder={plContent.language}
          name="language"
          defaultValue={defaultValues['language']}
        />
        <Input
          type="text"
          placeholder={plContent.level}
          name="level"
          defaultValue={defaultValues['level']}
        />
      </form>
    </fieldset>
  );
}

export {
  Input,
  PersonalInfoForm,
  EducationInfoForm,
  ExperienceInfoForm,
  LanguageInfoForm,
  TextAreaInfoForm,
};
