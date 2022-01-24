import React, { Component } from 'react';
import { Navigate, Routes } from 'react-router';

import { PROJECT_PATH } from '../api';
import { AuthenticatedRoute } from '../authentication';

import DemoProject from './DemoProject';

class ProjectRouting extends Component {

  render() {
    return (
      <Routes>
        {
          /*
          * Add your project page routing below.
          */
        }
        <AuthenticatedRoute exact path={`/${PROJECT_PATH}/demo/*`} component={DemoProject} />
        {
          /*
          * The redirect below caters for the default project route and redirecting invalid paths.
          * The "to" property must match one of the routes above for this to work correctly.
          */
        }
        <Navigate to={`/${PROJECT_PATH}/demo/`} />
      </Routes>
    )
  }

}

export default ProjectRouting;
