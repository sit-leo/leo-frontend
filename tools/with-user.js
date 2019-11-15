import React, { Component } from 'react';
import { serverInstance } from './request';

import { isApplicant, isRecruiter, isOrganizer } from './with-roles';

import userAdapter from '../store/user/user-adapter';
import profileAdapter from '../store/profile/profile-adapter';

import { setId, setRole, setFullname } from '../store/user';
import {
  setApplicantProfile,
  setEducation,
  setRecruiterProfile,
  setOrganizer,
  setImageUrl,
} from '../store/profile';
import redirectToLogin from './reditect-login';


const withUser = WrappedComponent => class extends Component {
  static async getInitialProps(ctx) {
    const props = WrappedComponent.getInitialProps
          && (await WrappedComponent.getInitialProps(ctx));

    const userRequest = userAdapter(serverInstance(props.token));
    const user = await userRequest.getUser();

    const profileRequest = profileAdapter(serverInstance(props.token));
    const profile = await profileRequest.getProfile();

    if ((user && user.error) || (profile && profile.error)) {
      redirectToLogin(ctx);
      return {};
    }

    await ctx.store.dispatch(setId(user.id));
    await ctx.store.dispatch(setRole(user.role));
    await ctx.store.dispatch(setImageUrl(profile.imageURL));

    if (isApplicant(user.role)) {
      await ctx.store.dispatch(setFullname(profile.firstName));
      await ctx.store.dispatch(setApplicantProfile(profile));
      await ctx.store.dispatch(setEducation('applicantId', profile.applicantId));
    }

    if (isRecruiter(user.role)) {
      await ctx.store.dispatch(setFullname(profile.name));
      await ctx.store.dispatch(setRecruiterProfile(profile));
    }

    if (isOrganizer(user.role)) {
      await ctx.store.dispatch(setFullname(profile.name));
      await ctx.store.dispatch(setOrganizer(profile));
    }

    return { ...props, user };
  }

  render() {
    return <WrappedComponent {...this.props} />;
  }
};

export default withUser;
