import JoinReducer,
{
  setSkill,
  SET_SKILL,
  setInputSkillVisible,
  SET_INPUT_SKILL_VISIBLE,
  setExperiences,
  SET_APPLICANT_EXPERIENCES,
  addApplicantSkill,
  ADD_APPLICANT_SKILL,
  removeApplicantSkill,
  REMOVE_APPLICANT_SKILL,
  setFirstname,
  SET_FIRSTNAME,
  setLastname,
  SET_LASTNAME,
  setApplicantEmail,
  SET_APPLICANT_EMAIL,
  setApplicantTelno,
  SET_APPLICANT_TELNO,
  setEducation,
  SET_EDUCATION,
  setApplicantProfile,
  SET_APPLICANT_PROFILE,
  setRecruiterProfile,
  SET_RECRUITER_PROFILE,
  setRecruiterName,
  SET_RECRUITER_NAME,
  setRecruiterDescription,
  SET_RECRUITER_DESCRIPTION,
  setRecruiterLocation,
  SET_RECRUITER_LOCATION,
  setRecruiterTelno,
  SET_RECRUITER_TELNO,
  setRecruiterEmail,
  SET_RECRUITER_EMAIL,
  setOrganizer,
} from '../index';

import { applicant, recruiter, organizer } from './data.json';

describe('Test Profile Actions', () => {
  it('Test setApplicantExperiences action should return type and property correctly.', () => {
    const experiences = '- Designer at Alchemist, 1 year\n- UX/UI Designer as an outsource, 5 months';
    const action = setExperiences(experiences);
    expect(action.type).toEqual(SET_APPLICANT_EXPERIENCES);
    expect(action.experiences).toEqual(experiences);
  });

  it('Test addApplicantSkill action should return type and property correctly.', () => {
    const skill = 'Backend Development';
    const action = addApplicantSkill(skill);
    expect(action.type).toEqual(ADD_APPLICANT_SKILL);
    expect(action.skill).toEqual(skill);
  });

  it('Test removeApplicantSkill action should return type and property correctly.', () => {
    const skill = 'Backend Development';
    const action = removeApplicantSkill(skill);
    expect(action.type).toEqual(REMOVE_APPLICANT_SKILL);
    expect(action.skill).toEqual(skill);
  });

  it('Test setInputSkillVisible action should return type and property correctly.', () => {
    const action = setInputSkillVisible(true);
    expect(action.type).toEqual(SET_INPUT_SKILL_VISIBLE);
    expect(action.inputSkillVisible).toEqual(true);
  });

  it('Test setSkill action should return type and property correctly.', () => {
    const skill = 'React Unit Test.';
    const action = setSkill(skill);
    expect(action.type).toEqual(SET_SKILL);
    expect(action.skill).toEqual(skill);
  });

  it('Test setFirstname action should return type and property correctly.', () => {
    const action = setFirstname('Keerati');
    expect(action.type).toEqual(SET_FIRSTNAME);
    expect(action.firstName).toEqual('Keerati');
  });

  it('Test setLastname action should return type and property correctly.', () => {
    const action = setLastname('Jearjindarat');
    expect(action.type).toEqual(SET_LASTNAME);
    expect(action.lastName).toEqual('Jearjindarat');
  });

  it('Test setApplicantEmail action should return type and property correctly.', () => {
    const action = setApplicantEmail('admin@leo.org');
    expect(action.type).toEqual(SET_APPLICANT_EMAIL);
    expect(action.email).toEqual('admin@leo.org');
  });

  it('Test setApplicantTelno action should return type and property correctly.', () => {
    const action = setApplicantTelno('0988887765');
    expect(action.type).toEqual(SET_APPLICANT_TELNO);
    expect(action.telNo).toEqual('0988887765');
  });

  it('Test setEducation action should return type and property correctly.', () => {
    const action = setEducation('university', 'KMUTT');
    expect(action.type).toEqual(SET_EDUCATION);
    expect(action.payload.field).toEqual('university');
    expect(action.payload.value).toEqual('KMUTT');
  });

  it('Test setApplicantProfile action should return type and property correctly.', () => {
    const action = setApplicantProfile(applicant);
    expect(action.type).toEqual(SET_APPLICANT_PROFILE);
    expect(action.applicant).toEqual(applicant);
  });

  it('Test setRecruiterProfile action should return type and property correctly.', () => {
    const action = setRecruiterProfile(recruiter);
    expect(action.type).toEqual(SET_RECRUITER_PROFILE);
    expect(action.recruiter).toEqual(recruiter);
  });

  it('Test setRecruiterName action should return type and property correctly.', () => {
    const action = setRecruiterName('Facebook');
    expect(action.type).toEqual(SET_RECRUITER_NAME);
    expect(action.name).toEqual('Facebook');
  });

  it('Test setRecruiterDescription action should return type and property correctly.', () => {
    const action = setRecruiterDescription('Facebook Description');
    expect(action.type).toEqual(SET_RECRUITER_DESCRIPTION);
    expect(action.description).toEqual('Facebook Description');
  });

  it('Test setRecruiterLocation action should return type and property correctly.', () => {
    const action = setRecruiterLocation('Menlo Park, California');
    expect(action.type).toEqual(SET_RECRUITER_LOCATION);
    expect(action.location).toEqual('Menlo Park, California');
  });

  it('Test setRecruiterTelno action should return type and property correctly.', () => {
    const action = setRecruiterTelno('09123444555');
    expect(action.type).toEqual(SET_RECRUITER_TELNO);
    expect(action.telNo).toEqual('09123444555');
  });

  it('Test setRecruiterEmail action should return type and property correctly.', () => {
    const action = setRecruiterEmail('hr@admin.facebook.com');
    expect(action.type).toEqual(SET_RECRUITER_EMAIL);
    expect(action.email).toEqual('hr@admin.facebook.com');
  });
});

describe('Test Profile Reducer', () => {
  it('Test setApplicantExperiences should return applicant correctly.', (done) => {
    const experiences = '- Designer at Alchemist, 1 year\n- UX/UI Designer as an outsource, 5 months';
    const action = { type: SET_APPLICANT_EXPERIENCES, experiences };

    const store = JoinReducer(undefined, action);

    expect(store.applicant.experiences).toEqual(experiences);
    done();
  });

  it('Test setApplicantExperiences should return applicant correctly when experiences dont have value.', (done) => {
    const experiences = undefined;
    const action = { type: SET_APPLICANT_EXPERIENCES, experiences };

    const store = JoinReducer(undefined, action);

    expect(store.applicant.experiences).toEqual('');
    done();
  });

  it('Test addApplicantSkill should return applicant skills correctly', (done) => {
    const skill1 = 'Frontend Development';
    const action1 = { type: ADD_APPLICANT_SKILL, skill: skill1 };
    let store = JoinReducer(undefined, action1);

    const skill2 = 'Backend Development';
    const action2 = { type: ADD_APPLICANT_SKILL, skill: skill2 };
    store = JoinReducer(store, action2);

    const [
      frontendDevelopment,
      backendDevelopment,
    ] = store.applicant.skills;

    expect(frontendDevelopment).toEqual(skill1);
    expect(backendDevelopment).toEqual(skill2);
    done();
  });

  it('Test removeApplicantSkill should return applicant skills correctly', (done) => {
    const skill = 'Frontend Development';
    const action1 = { type: ADD_APPLICANT_SKILL, skill };
    let store = JoinReducer(undefined, action1);

    const action2 = { type: REMOVE_APPLICANT_SKILL, skill };
    store = JoinReducer(store, action2);

    const [
      frontendDevelopment,
    ] = store.applicant.skills;

    expect(store.applicant.skills.length).toEqual(0);
    expect(frontendDevelopment).toEqual(undefined);
    done();
  });

  it('Test setInputSkillVisible should return true.', (done) => {
    const action = { type: SET_INPUT_SKILL_VISIBLE, inputSkillVisible: true };

    const store = JoinReducer(undefined, action);

    expect(store.inputSkillVisible).toEqual(true);
    done();
  });

  it('Test setSkill should return skill correctly.', (done) => {
    const skill = 'React Unit Test.';
    const action = { type: SET_SKILL, skill };

    const store = JoinReducer(undefined, action);

    expect(store.skill).toEqual(skill);
    done();
  });

  it('Test setFirstname should return firstName correctly.', (done) => {
    const firstName = 'Keerati';
    const action = { type: SET_FIRSTNAME, firstName };

    const store = JoinReducer(undefined, action);

    expect(store.applicant.firstName).toEqual(firstName);
    done();
  });

  it('Test setLastname should return lastName correctly.', (done) => {
    const lastName = 'Jearjindarat';
    const action = { type: SET_LASTNAME, lastName };

    const store = JoinReducer(undefined, action);

    expect(store.applicant.lastName).toEqual(lastName);
    done();
  });

  it('Test setApplicantEmail should return email correctly.', (done) => {
    const email = 'admin@leo.org';
    const action = { type: SET_APPLICANT_EMAIL, email };

    const store = JoinReducer(undefined, action);

    expect(store.applicant.email).toEqual(email);
    done();
  });

  it('Test setApplicantTelno should return telNo correctly.', (done) => {
    const telNo = '0998886655';
    const action = { type: SET_APPLICANT_TELNO, telNo };

    const store = JoinReducer(undefined, action);

    expect(store.applicant.telNo).toEqual(telNo);
    done();
  });

  it('Test setEducation should return educations correctly.', (done) => {
    const payload = { field: 'university', value: 'KMUTT' };
    const action = { type: SET_EDUCATION, payload };

    const store = JoinReducer(undefined, action);

    const [education] = store.applicant.educations;
    expect(education.university).toEqual('KMUTT');
    done();
  });

  it('Test setApplicantProfile should return applicant profile correctly.', (done) => {
    const action = { type: SET_APPLICANT_PROFILE, applicant };

    const store = JoinReducer(undefined, action);

    expect(store.applicant).toEqual(applicant);
    done();
  });

  it('Test setRecruiterProfile should return recruiter profile correctly.', (done) => {
    const action = { type: SET_RECRUITER_PROFILE, recruiter };

    const store = JoinReducer(undefined, action);

    expect(store.recruiter).toEqual(recruiter);
    done();
  });

  it('Test setRecruiterName should return recruiter name correctly.', (done) => {
    const action = { type: SET_RECRUITER_NAME, name: 'Facebook' };

    const store = JoinReducer(undefined, action);

    expect(store.recruiter.name).toEqual('Facebook');
    done();
  });

  it('Test setRecruiterDescription should return recruiter description correctly.', (done) => {
    const action = { type: SET_RECRUITER_DESCRIPTION, description: 'Facebook, Inc. is an American online social media and social networking service company.' };

    const store = JoinReducer(undefined, action);

    expect(store.recruiter.description).toEqual('Facebook, Inc. is an American online social media and social networking service company.');
    done();
  });

  it('Test setRecruiterEmail should return recruiter email correctly.', (done) => {
    const action = { type: SET_RECRUITER_EMAIL, email: 'hr@facebook.com' };

    const store = JoinReducer(undefined, action);

    expect(store.recruiter.email).toEqual('hr@facebook.com');
    done();
  });

  it('Test setRecruiterLocation should return recruiter location correctly.', (done) => {
    const action = { type: SET_RECRUITER_LOCATION, location: 'Menlo Park, California' };

    const store = JoinReducer(undefined, action);

    expect(store.recruiter.location).toEqual('Menlo Park, California');
    done();
  });

  it('Test setRecruiterTelno should return recruiter telno correctly.', (done) => {
    const action = { type: SET_RECRUITER_TELNO, telNo: '0999999999' };

    const store = JoinReducer(undefined, action);

    expect(store.recruiter.telNo).toEqual('0999999999');
    done();
  });

  it('Test setOrganizer should return organizer correctly', (done) => {
    const action = setOrganizer(organizer);

    const store = JoinReducer(undefined, action);

    expect(store.organizer.organizerId).toEqual(organizer.id);
    expect(store.organizer.name).toEqual(organizer.name);
    expect(store.organizer.description).toEqual(organizer.description);
    done();
  });
});
