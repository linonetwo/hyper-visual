import { createRoutine } from 'redux-saga-routines';

export const SESSION_USER_DATA = data => ({
  type: 'SESSION_ADD_DATA',
  data,
});
export const updateRecommendation = createRoutine('cli2gui/updateRecommendation');
export const execCLIByGUI = createRoutine('cli2gui/execCLIByGUI');
