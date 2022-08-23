import React from 'react';
import '../styles/CVReady.css';
import { nanoid } from 'nanoid';

class CVReady extends React.Component {
  render() {
    const {
      personalInfo,
      education,
      experience,
      skills,
      languages,
      certifications,
    } = this.props.info;
    const {
      firstName,
      secondName,
      address,
      phone,
      email,
      myPhoto,
      description,
    } = personalInfo;

    let displayCV = this.props.mode === 'preview' ? 'block' : 'none';
    return (
      <div className="cv" style={{ display: displayCV }}>
        <div className="introduction">
          <h1>
            {firstName} {secondName}
          </h1>
          <Photo file={myPhoto} />
          <ContactInfo address={address} phone={phone} email={email} />
          <LanguagesInfo languages={languages} />
        </div>
        <div className="basic-info">
          <SummaryInfo description={description} />
          <SkillsInfo skills={skills} name="skill" q={3} />
          <ExperienceInfo experience={experience} />
          <EducationInfo education={education} />
          <CertificationsInfo
            sertifications={certifications}
            name="certificate"
            q={1}
          />
        </div>
      </div>
    );
  }
}

class H2Title extends React.Component {
  render() {
    return <h2>{this.props.title}</h2>;
  }
}

class H3Title extends React.Component {
  render() {
    return <h3>{this.props.title}</h3>;
  }
}

class Photo extends React.Component {
  render() {
    let url;
    if (this.props.file === '') {
      url = '';
    } else {
      url = window.URL.createObjectURL(this.props.file);
    }
    const img = <img alt="myPhoto" height="100px" src={url}></img>;

    return <div className="photo">{img}</div>;
  }
}

class ContactInfo extends React.Component {
  render() {
    return (
      <section>
        <H2Title title="Contact" />
        <hr></hr>
        <H3Title title="Address:" />
        <p>{this.props.address}</p>
        <H3Title title="Phone:" />
        <p>{this.props.phone}</p>
        <H3Title title="Email:" />
        <p>{this.props.email}</p>
      </section>
    );
  }
}

class LineInfo extends React.Component {
  constructor(props) {
    super(props);

    this.createArrayOfP = this.createArrayOfP.bind(this);
    this.convertKeysToNumbers = this.convertKeysToNumbers.bind(this);
    this.createLine = this.createLine.bind(this);
  }

  createArrayOfP() {
    const pArray = [];
    for (let key in this.props.infoObj) {
      pArray.push(<p key={nanoid(2)}>{this.props.infoObj[key]}</p>);
    }
    return pArray;
  }

  convertKeysToNumbers() {
    if (this.props.separators === undefined) {
      return [];
    }
    let arrKey = Object.keys(this.props.separators);
    return arrKey.map((elem) => {
      return parseInt(elem);
    });
  }

  createLine() {
    let pArr = this.createArrayOfP();
    let keysArr = this.convertKeysToNumbers();
    keysArr.forEach((elem) => {
      // console.log(pArr[elem]);
      let newText =
        pArr[elem].props.children + this.props.separators[`${elem}`];
      pArr[elem] = <p>{newText}</p>;
    });
    return pArr;
  }

  render() {
    return <div className="line-info">{this.createLine()}</div>;
  }
}

class LanguagesInfo extends React.Component {
  render() {
    return (
      <section>
        <H2Title title="Languages" />
        <hr></hr>
        {this.props.languages.map((langInfo, index) => {
          return (
            <LineInfo
              infoObj={langInfo}
              key={nanoid(3)}
              separators={{ 0: ' -' }}
            />
          );
        })}
      </section>
    );
  }
}

class SummaryInfo extends React.Component {
  render() {
    return (
      <section>
        <H2Title title="Summary" />
        <hr></hr>
        <div className="simple-info">{this.props.description}</div>
      </section>
    );
  }
}

class ListInfo extends React.Component {
  constructor(props) {
    super(props);

    this.createListElements = this.createListElements.bind(this);
    this.createGroupOfListElements = this.createGroupOfListElements.bind(this);
  }

  createListElements() {
    let array = this.props.listedInfo;
    let key = this.props.name;
    return array.map((elem) => {
      return <li key={nanoid(2)}>{key === undefined ? elem : elem[key]}</li>;
    });
  }

  createGroupOfListElements() {
    let arrayLi = this.createListElements();
    let maxCount = Math.ceil(arrayLi.length / this.props.q);
    let ulArray = [];
    let index = 0;
    for (let count = 0; count < this.props.q; count++) {
      if (index < arrayLi.length) {
        ulArray.push(
          <ul key={nanoid(2)}>{arrayLi.slice(index, index + maxCount)}</ul>
        );
      }

      index += maxCount;
    }
    return ulArray;
  }

  render() {
    let ulElems = this.createGroupOfListElements();
    return <div className="list-info">{ulElems}</div>;
  }
}

class SkillsInfo extends React.Component {
  render() {
    return (
      <section>
        <H2Title title="Skill highlights" />
        <hr></hr>
        <ListInfo
          listedInfo={this.props.skills}
          name={this.props.name}
          q={this.props.q}
        />
      </section>
    );
  }
}

class CertificationsInfo extends React.Component {
  render() {
    return (
      <section>
        <H2Title title="Sertifications" />
        <hr></hr>
        <ListInfo
          listedInfo={this.props.sertifications}
          name={this.props.name}
          q={this.props.q}
        />
      </section>
    );
  }
}

class ExperienceInfo extends React.Component {
  render() {
    let jobs = this.props.experience.map((job) => {
      return <ExperienceSubsection infoObj={job} key={nanoid(2)} />;
    });
    return (
      <section>
        <H2Title title="Experience" />
        <hr></hr>
        {jobs}
      </section>
    );
  }
}

class ExperienceSubsection extends React.Component {
  render() {
    const { company, position, city, dateFrom, dateTo, duties, achievements } =
      this.props.infoObj;

    return (
      <div className="subsection">
        <LineInfo
          infoObj={{ position, dateFrom, dateTo }}
          separators={{ 0: ':', 1: ' to' }}
        />
        <LineInfo infoObj={{ company, city }} separators={{ 0: ',' }} />
        <ListInfo listedInfo={duties} q={1} />
        <ListInfo listedInfo={achievements} q={1} />
      </div>
    );
  }
}

class EducationInfo extends React.Component {
  render() {
    let edus = this.props.education.map((edu) => {
      return <EducationSubsection infoObj={edu} key={nanoid(2)} />;
    });
    return (
      <section>
        <H2Title title="Education" />
        <hr></hr>
        {edus}
      </section>
    );
  }
}

class EducationSubsection extends React.Component {
  render() {
    const { university, city, degree, subject, dateFrom, dateTo } =
      this.props.infoObj;

    return (
      <div className="subsection">
        <LineInfo
          infoObj={{ degree, subject, dateFrom, dateTo }}
          separators={{ 0: ':', 1: ' -', 2: ' to' }}
        />
        <LineInfo infoObj={{ university, city }} separators={{ 0: ',' }} />
      </div>
    );
  }
}

export { CVReady };
