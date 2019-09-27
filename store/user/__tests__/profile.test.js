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
} from '../profile';

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
});
