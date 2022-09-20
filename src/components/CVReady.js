import React, { useEffect, useState } from 'react';
import '../styles/CVReady.css';
import { nanoid } from 'nanoid';
import Photo_placeholder from '../images/photo-placeholder.png';

const CVReady = React.forwardRef((props, ref) => {
  const convertDateStr = (dateStr) => {
    const re = /(\d{4})-{1}(\d{2})-{1}\d{2}/;
    if (!re.test(dateStr)) {
      return dateStr;
    }
    const [, year, month] = re.exec(dateStr);
    return month + '/' + year;
  };

  const {
    personalInfo,
    education,
    experience,
    skills,
    languages,
    certifications,
  } = props.info;
  const { firstName, secondName, address, phone, email, myPhoto, description } =
    personalInfo;

  const titleContent = props.content.title;
  const separatorContent = props.content.separator;
  return (
    <div className="cv" {...props} ref={ref}>
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
          convertDateStr={convertDateStr}
        />
        <EducationInfo
          education={education}
          titleContent={titleContent}
          separatorContent={separatorContent}
          convertDateStr={convertDateStr}
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
});

function H2Title(props) {
  return <h2>{props.title}</h2>;
}

function H3Title(props) {
  return <h3>{props.title}</h3>;
}

function Photo(props) {
  const [url, setUrl] = useState(Photo_placeholder);

  useEffect(() => {
    setUrl(props.url ? props.url : Photo_placeholder);
  });

  return (
    <div className="photo">
      <img alt="myPhoto" src={url}></img>
    </div>
  );
}

function ContactInfo(props) {
  const titleContent = props.titleContent;
  return (
    <section>
      <H2Title title={titleContent.contact} />
      <hr></hr>
      <H3Title title={titleContent.address} />
      <p>{props.address}</p>
      <H3Title title={titleContent.phone} />
      <p>{props.phone}</p>
      <H3Title title={titleContent.email} />
      <p>{props.email}</p>
    </section>
  );
}

function LineInfo(props) {
  const createArrayOfP = () => {
    const pArray = [];
    for (let key in props.infoObj) {
      pArray.push(<p key={nanoid(3)}>{props.infoObj[key]}</p>);
    }
    return pArray;
  };

  const convertKeysToNumbers = () => {
    if (props.separators === undefined) {
      return [];
    }
    let arrKey = Object.keys(props.separators);
    return arrKey.map((elem) => {
      return parseInt(elem);
    });
  };

  const createLine = () => {
    let pArr = createArrayOfP();
    let keysArr = convertKeysToNumbers();
    keysArr.forEach((elem) => {
      let newText = pArr[elem].props.children + props.separators[`${elem}`];
      pArr[elem] = <p key={nanoid(3)}>{newText}</p>;
    });
    return pArr;
  };

  return <div className={'line-info ' + props.clName}>{createLine()}</div>;
}

function LanguagesInfo(props) {
  const titleContent = props.titleContent;
  return (
    <section>
      <H2Title title={titleContent.languages} />
      <hr></hr>
      {props.languages.map((langInfo, index) => {
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

function SummaryInfo(props) {
  const titleContent = props.titleContent;
  return (
    <section>
      <H2Title title={titleContent.description} />
      <hr></hr>
      <div className="simple-info">{props.description}</div>
    </section>
  );
}

function ListInfo(props) {
  const createListElements = () => {
    let array = props.listedInfo;
    let key = props.name;
    return array.map((elem) => {
      return <li key={nanoid(2)}>{key === undefined ? elem : elem[key]}</li>;
    });
  };

  const createGroupOfListElements = () => {
    let arrayLi = createListElements();
    let maxCount = Math.ceil(arrayLi.length / props.q);
    let ulArray = [];
    let index = 0;
    for (let count = 0; count < props.q; count++) {
      if (index < arrayLi.length) {
        ulArray.push(
          <ul key={nanoid(2)}>{arrayLi.slice(index, index + maxCount)}</ul>
        );
      }

      index += maxCount;
    }
    return ulArray;
  };

  const ulElems = createGroupOfListElements();
  return <div className="list-info">{ulElems}</div>;
}

function SkillsInfo(props) {
  const titleContent = props.titleContent;
  return (
    <section className="highlights">
      <H2Title title={titleContent.skills} />
      <hr></hr>
      <ListInfo listedInfo={props.skills} name={props.name} q={props.q} />
    </section>
  );
}

function CertificationsInfo(props) {
  const titleContent = props.titleContent;
  return (
    <section className="highlights">
      <H2Title title={titleContent.certifications} />
      <hr></hr>
      <ListInfo
        listedInfo={props.sertifications}
        name={props.name}
        q={props.q}
      />
    </section>
  );
}

function ExperienceInfo(props) {
  const titleContent = props.titleContent;
  const separatorContent = props.separatorContent;
  let jobs = props.experience.map((job) => {
    return (
      <ExperienceSubsection
        infoObj={job}
        separatorContent={separatorContent}
        key={nanoid(2)}
        convertDateStr={props.convertDateStr}
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

function ExperienceSubsection(props) {
  const { company, position, city, dateFrom, dateTo, duties, achievements } =
    props.infoObj;
  const separatorContent = props.separatorContent;

  return (
    <div className="subsection">
      <LineInfo
        infoObj={{
          position,
          dateFrom: props.convertDateStr(dateFrom),
          dateTo: props.convertDateStr(dateTo),
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

function EducationInfo(props) {
  const titleContent = props.titleContent;
  const separatorContent = props.separatorContent;
  let edus = props.education.map((edu) => {
    return (
      <EducationSubsection
        infoObj={edu}
        separatorContent={separatorContent}
        key={nanoid(2)}
        convertDateStr={props.convertDateStr}
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

function EducationSubsection(props) {
  const separatorContent = props.separatorContent;
  const { university, city, degree, subject, dateFrom, dateTo } = props.infoObj;

  return (
    <div className="subsection">
      <LineInfo
        infoObj={{
          degree,
          subject,
          dateFrom: props.convertDateStr(dateFrom),
          dateTo: props.convertDateStr(dateTo),
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

export { CVReady };
