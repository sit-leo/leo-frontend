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
  setEmail,
  SET_EMAIL,
  setTelno,
  SET_TELNO,
  setEducation,
  SET_EDUCATION,
  setApplicantProfile,
  SET_APPLICANT_PROFILE,
} from '../profile';

import { applicant } from './data.json';

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

  it('Test setEmail action should return type and property correctly.', () => {
    const action = setEmail('admin@leo.org');
    expect(action.type).toEqual(SET_EMAIL);
    expect(action.email).toEqual('admin@leo.org');
  });

  it('Test setTelno action should return type and property correctly.', () => {
    const action = setTelno('0988887765');
    expect(action.type).toEqual(SET_TELNO);
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

  it('Test setEmail should return email correctly.', (done) => {
    const email = 'admin@leo.org';
    const action = { type: SET_EMAIL, email };

    const store = JoinReducer(undefined, action);

    expect(store.applicant.email).toEqual(email);
    done();
  });

  it('Test setTelno should return telNo correctly.', (done) => {
    const telNo = '0998886655';
    const action = { type: SET_TELNO, telNo };

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

  it('Test setApplicantProfile should return skill correctly.', (done) => {
    const action = { type: SET_APPLICANT_PROFILE, applicant };

    const store = JoinReducer(undefined, action);

    expect(store.applicant).toEqual(applicant);
    done();
  });
});
