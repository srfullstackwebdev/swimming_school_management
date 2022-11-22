import { Card } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import actions from 'src/modules/teacher/form/teacherFormActions';
import selectors from 'src/modules/teacher/form/teacherFormSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';
import TeacherNewForm from 'src/view/teacher/new/TeacherNewForm';

function TeacherNewPage(props) {
  const dispatch = useDispatch();

  const saveLoading = useSelector(
    selectors.selectSaveLoading,
  );

  useEffect(() => {
    dispatch(actions.doInit());
  }, [dispatch]);

  const doSubmit = (id, data) => {
    dispatch(actions.doAdd(data));
  };

  return (
    <>
      <Card>
        <MDBox px={2.4} py={2.4}>
          <MDBox
            pb={2.4}
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <MDTypography variant="h3">
              {i18n('teacher.new.title')}
            </MDTypography>
          </MDBox>
          <TeacherNewForm
            saveLoading={saveLoading}
            onSubmit={doSubmit}
            onCancel={() => getHistory().push('/teacher')}
          />
        </MDBox>
      </Card>
    </>
  );
}

export default TeacherNewPage;
