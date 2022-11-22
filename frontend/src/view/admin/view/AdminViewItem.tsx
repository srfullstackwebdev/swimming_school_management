import { Avatar } from '@mui/material';
import MaterialLink from '@mui/material/Link';
import selectors from 'src/modules/admin/adminSelectors';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MDBox from 'src/mui/components/MDBox';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDTypography from 'src/mui/components/MDTypography';
import {
  getUserAvatar,
  getUserNameOrEmailPrefix,
} from 'src/modules/utils';
import { i18n } from 'src/i18n';

function AdminViewItem(props) {
  const { darkMode } = selectMuiSettings();
  const hasPermissionToRead = useSelector(
    selectors.selectPermissionToRead,
  );

  const valueAsArray = () => {
    const { value } = props;

    if (!value) {
      return [];
    }

    if (Array.isArray(value)) {
      return value;
    }

    return [value];
  };

  const values = valueAsArray();

  const label = (record) =>
    getUserNameOrEmailPrefix(record);

  const avatar = (record) => {
    return (
      <Avatar
        src={getUserAvatar(record)}
        sx={{ width: 24, height: 24 }}
      />
    );
  };

  const renderAdmin = (record, italic = false) => (
    <MDBox display="flex" alignItems="center" gap={0.8}>
      {avatar(record)}
      <MDTypography
        variant="button"
        fontWeight="regular"
        fontStyle={italic ? 'italic' : null}
        textTransform="capitalize"
        width="max-content"
      >
        {label(record)}
      </MDTypography>
    </MDBox>
  );

  const readOnly = (record, italic = false) => {
    return (
      <MDBox key={record.id}>
        {renderAdmin(record, italic)}
      </MDBox>
    );
  };

  const displayableRecord = (record) => {
    if (hasPermissionToRead) {
      return (
        <MDBox key={record.id}>
          <MaterialLink
            component={Link}
            to={`/admin/${record.id}`}
          >
            {renderAdmin(record)}
          </MaterialLink>
        </MDBox>
      );
    }

    return readOnly(record);
  };

  return (
    <MDBox pt={1.6} position="relative">
      <MDTypography
        variant="caption"
        color={darkMode ? 'text' : 'secondary'}
        fontWeight="regular"
        lineHeight={1}
        position="absolute"
        top="0"
      >
        {props.label}
      </MDTypography>
      <MDBox
        display="inline-flex"
        flexWrap="wrap"
        gap={0.8}
      >
        {!!values.length &&
          values.map((value) => displayableRecord(value))}
        {!values.length &&
          readOnly(
            {
              email: i18n(
                'customViewer.noData',
                props.label,
              ),
            },
            true,
          )}
      </MDBox>
    </MDBox>
  );
}

AdminViewItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
};

export default AdminViewItem;
