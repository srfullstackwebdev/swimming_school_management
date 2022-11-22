import listActions from 'src/modules/class/list/classListActions';
import ClassService from 'src/modules/class/classService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'CLASS_DESTROY';

const classDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: classDestroyActions.DESTROY_STARTED,
      });

      await ClassService.destroyAll([id]);

      dispatch({
        type: classDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(i18n('class.destroy.success'));

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/class');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: classDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: classDestroyActions.DESTROY_ALL_STARTED,
      });

      await ClassService.destroyAll(ids);

      dispatch({
        type: classDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(i18n('class.destroyAll.success'));

      getHistory().push('/class');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: classDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default classDestroyActions;
