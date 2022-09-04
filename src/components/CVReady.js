import React from 'react';
import '../styles/CVReady.css';
import { nanoid } from 'nanoid';
import Photo_placeholder from '../images/photo-placeholder.png';

const convertDateStr = (dateStr) => {
  const re = /(\d{4})-{1}(\d{2})-{1}\d{2}/;
  if (!re.test(dateStr)) {
    return dateStr;
  }
  const [, year, month] = re.exec(dateStr);
  return month + '/' + year;
};

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

    const titleContent = this.props.content.title;
    const separatorContent = this.props.content.separator;
    return (
      <div className="cv">
        <div className="introduction">
          <div className="blue-line"></div>
          <h1>
            {firstName} {secondName}
          </h1>
          <Photo url={myPhoto} />
          <ContactInfo
            address={address}
            phone={phone}
            email={email}
            titleContent={titleContent}
          />
          <LanguagesInfo languages={languages} titleContent={titleContent} />
        </div>
        <div className="basic-info">
          <div className="empty-line"></div>
          <SummaryInfo description={description} titleContent={titleContent} />
          <SkillsInfo
            skills={skills}
            titleContent={titleContent}
            name="skill"
            q={3}
          />
          <ExperienceInfo
            experience={experience}
            titleContent={titleContent}
            separatorContent={separatorContent}
          />
          <EducationInfo
            education={education}
            titleContent={titleContent}
            separatorContent={separatorContent}
          />
          <CertificationsInfo
            sertifications={certifications}
            titleContent={titleContent}
            name="certificate"
            q={1}
          />
          <div className="blue-line"></div>
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
    const url = this.props.url ? this.props.url : Photo_placeholder;
    const img = <img alt="myPhoto" src={url}></img>;
    return <div className="photo">{img}</div>;
  }
}

class ContactInfo extends React.Component {
  render() {
    const titleContent = this.props.titleContent;
    return (
      <section>
        <H2Title title={titleContent.contact} />
        <hr></hr>
        <H3Title title={titleContent.address} />
        <p>{this.props.address}</p>
        <H3Title title={titleContent.phone} />
        <p>{this.props.phone}</p>
        <H3Title title={titleContent.email} />
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
      pArray.push(<p key={nanoid(3)}>{this.props.infoObj[key]}</p>);
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
      pArr[elem] = <p key={nanoid(3)}>{newText}</p>;
    });
    return pArr;
  }

  render() {
    return (
      <div className={'line-info ' + this.props.clName}>
        {this.createLine()}
      </div>
    );
  }
}

class LanguagesInfo extends React.Component {
  render() {
    const titleContent = this.props.titleContent;
    return (
      <section>
        <H2Title title={titleContent.languages} />
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
    const titleContent = this.props.titleContent;
    return (
      <section>
        <H2Title title={titleContent.description} />
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
    const titleContent = this.props.titleContent;
    return (
      <section className="highlights">
        <H2Title title={titleContent.skills} />
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
    const titleContent = this.props.titleContent;
    return (
      <section className="highlights">
        <H2Title title={titleContent.certifications} />
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
    const titleContent = this.props.titleContent;
    const separatorContent = this.props.separatorContent;
    let jobs = this.props.experience.map((job) => {
      return (
        <ExperienceSubsection
          infoObj={job}
          separatorContent={separatorContent}
          key={nanoid(2)}
        />
      );
    });
    return (
      <section>
        <H2Title title={titleContent.experience} />
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
    const separatorContent = this.props.separatorContent;

    return (
      <div className="subsection">
        <LineInfo
          infoObj={{
            position,
            dateFrom: convertDateStr(dateFrom),
            dateTo: convertDateStr(dateTo),
          }}
          separators={{ 0: ':', 1: ` ${separatorContent.to} ` }}
          clName="position"
        />
        <LineInfo
          infoObj={{ company, city }}
          separators={{ 0: ',' }}
          clName="company"
        />
        <ListInfo listedInfo={duties} q={1} />
        <ListInfo listedInfo={achievements} q={1} />
      </div>
    );
  }
}

class EducationInfo extends React.Component {
  render() {
    const titleContent = this.props.titleContent;
    const separatorContent = this.props.separatorContent;
    let edus = this.props.education.map((edu) => {
      return (
        <EducationSubsection
          infoObj={edu}
          separatorContent={separatorContent}
          key={nanoid(2)}
        />
      );
    });
    return (
      <section>
        <H2Title title={titleContent.education} />
        <hr></hr>
        {edus}
      </section>
    );
  }
}

class EducationSubsection extends React.Component {
  render() {
    const separatorContent = this.props.separatorContent;
    const { university, city, degree, subject, dateFrom, dateTo } =
      this.props.infoObj;

    return (
      <div className="subsection">
        <LineInfo
          infoObj={{
            degree,
            subject,
            dateFrom: convertDateStr(dateFrom),
            dateTo: convertDateStr(dateTo),
          }}
          separators={{ 0: ':', 1: ' -', 2: ` ${separatorContent.to}` }}
          clName="degree"
        />
        <LineInfo
          infoObj={{ university, city }}
          separators={{ 0: ',' }}
          clName="university"
        />
      </div>
    );
  }
}

export { CVReady };
