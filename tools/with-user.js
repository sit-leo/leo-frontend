import React, { Component } from 'react';
import { serverInstance } from './request';

import { isApplicant, isRecruiter } from './with-roles';

import userAdapter from '../store/user/user-adapter';
import profileAdapter from '../store/profile/profile-adapter';

import { setId, setRole, setFullname } from '../store/user';
import {
  setApplicantProfile,
  setEducation,
  setRecruiterProfile,
} from '../store/profile';


const withUser = WrappedComponent => class extends Component {
  static async getInitialProps(ctx) {
    const props = WrappedComponent.getInitialProps
          && (await WrappedComponent.getInitialProps(ctx));

    const userRequest = userAdapter(serverInstance(props.token));
    const user = await userRequest.getUser();

    if (user.error) {
      // redirect error or to login page.
      return {};
    }

    const profileRequest = profileAdapter(serverInstance(props.token));

    const profile = await profileRequest.getProfile();

    await ctx.store.dispatch(setId(user.id));
    await ctx.store.dispatch(setRole(user.role));

    if (isApplicant(user.role)) {
      await ctx.store.dispatch(setFullname(profile.firstName));
      await ctx.store.dispatch(setApplicantProfile(profile));
      await ctx.store.dispatch(setEducation('applicantId', profile.applicantId));
    }

    if (isRecruiter(user.role)) {
      await ctx.store.dispatch(setFullname(profile.name));
      await ctx.store.dispatch(setRecruiterProfile(profile));
    }

    return { ...props, user };
  }

  render() {
    return <WrappedComponent {...this.props} />;
  }
};

export default withUser;
