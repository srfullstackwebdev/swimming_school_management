import { Typography } from '@mui/material';
import MaterialLink from '@mui/material/Link';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import selectors from 'src/modules/organizationProfile/organizationProfileSelectors';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import NoViewItem from 'src/view/shared/view/NoViewItem';

function OrganizationProfileViewItem(props) {
  const { sidenavColor, darkMode } = selectMuiSettings();
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

  const displayableRecord = (record) => {
    if (hasPermissionToRead) {
      return (
        <MDBox key={record.id}>
          <MDButton
            component={Link}
            variant="contained"
            color={sidenavColor}
            to={`/organization-profile/${record.id}`}
            size="large"
          >
            {record.companyName}
          </MDButton>
        </MDBox>
      );
    }

    return (
      <MDBox key={record.id}>
        <MDTypography variant="button" fontWeight="regular">
          {record.companyName}
        </MDTypography>
      </MDBox>
    );
  };

  if (!valueAsArray().length) {
    return <NoViewItem {...props} />;
  }

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
        {valueAsArray().map((value) =>
          displayableRecord(value),
        )}
      </MDBox>
    </MDBox>
  );
}

OrganizationProfileViewItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
};

export default OrganizationProfileViewItem;
