/* eslint-disable import/prefer-default-export */
import React from 'react';

import RouterContext from './RouterContext';

export const useParams = () => {
  const { params } = React.useContext(RouterContext).match;
  return params || {};
};

export const useHistory = () => {
  const { history } = React.useContext(RouterContext);
  return history || {};
};
