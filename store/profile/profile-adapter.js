
import env from '../../config/env';

const PROFILE_API = env.public.profileApi;

export default adapter => ({
  getProfile() {
    return adapter.get(`${PROFILE_API}/profile`)
      .then(({ data: profile }) => profile);
  },
  updateApplicantProfile(applicant) {
    return adapter.put(`${PROFILE_API}/profile/applicant`, applicant)
      .then(({ data: profile }) => profile);
  },
  updateRecruiterProfile(recruiter) {
    return adapter.put(`${PROFILE_API}/profile/recruiter`, recruiter)
      .then(({ data: profile }) => profile);
  },
  uploadFile(file) {
    const body = new FormData();
    body.append('files', file);
    return adapter.post(`${PROFILE_API}/profile/documents`, body)
      .then(({ data }) => data);
  },
  getFiles() {
    return adapter.get(`${PROFILE_API}/profile/documents`)
      .then(({ data }) => data);
  },
  getDocument(fileId) {
    return adapter.get(`${PROFILE_API}/documents/${fileId}`)
      .then(data => data);
  },
});
