import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import actions from 'src/modules/teacher/importer/teacherImporterActions';
import fields from 'src/modules/teacher/importer/teacherImporterFields';
import selectors from 'src/modules/teacher/importer/teacherImporterSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import importerHoc from 'src/view/shared/importer/Importer';

const Importer = importerHoc(
  selectors,
  actions,
  fields,
  i18n('teacher.importer.hint'),
);

function TeacherImportPage(props) {
  return (
    <>
      <Card>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          p={2.4}
        >
          <MDTypography variant="h3">
            {i18n('teacher.importer.title')}
          </MDTypography>
        </MDBox>
        <Importer />
      </Card>
    </>
  );
}

export default TeacherImportPage;
