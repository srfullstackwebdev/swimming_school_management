import {
  AccordionDetails,
  AccordionSummary,
  Grid,
} from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import actions from 'src/modules/student/list/studentListActions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterAccordion from 'src/view/shared/filter/FilterAccordion';
import FilterPreview from 'src/view/shared/filter/FilterPreview';
import filterRenders from 'src/modules/shared/filter/filterRenders';
import FilterWrapper, {
  FilterButtons,
} from 'src/view/shared/styles/FilterWrapper';
import formActions from 'src/modules/form/formActions';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import SearchIcon from '@mui/icons-material/Search';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import selectors from 'src/modules/student/list/studentListSelectors';
import UndoIcon from '@mui/icons-material/Undo';
import yupFilterSchemas from 'src/modules/shared/yup/yupFilterSchemas';
import studentEnumerators from 'src/modules/student/studentEnumerators';
import DatePickerFormItem from 'src/view/shared/form/items/DatePickerFormItem';

const schema = yup.object().shape({
  studentNumber: yupFilterSchemas.integer(
    i18n('student.fields.studentNumber'),
  ),
  firstName: yupFilterSchemas.string(
    i18n('student.fields.firstName'),
  ),
  lastName: yupFilterSchemas.string(
    i18n('student.fields.lastName'),
  ),
  phoneNumber: yupFilterSchemas.string(
    i18n('student.fields.phoneNumber'),
  ),
  street: yupFilterSchemas.string(
    i18n('student.fields.street'),
  ),
  postalCode: yupFilterSchemas.string(
    i18n('student.fields.postalCode'),
  ),
  cologne: yupFilterSchemas.string(
    i18n('student.fields.cologne'),
  ),
  city: yupFilterSchemas.string(
    i18n('student.fields.city'),
  ),
  RFC: yupFilterSchemas.string(i18n('student.fields.RFC')),
  CURP: yupFilterSchemas.string(
    i18n('student.fields.CURP'),
  ),
  bloodType: yupFilterSchemas.string(
    i18n('student.fields.bloodType'),
  ),
  sex: yupFilterSchemas.string(i18n('student.fields.sex')),
  birthday: yupFilterSchemas.date(
    i18n('student.fields.birthday'),
  ),
  guardianPhoneNumber: yupFilterSchemas.string(
    i18n('student.fields.guardianPhoneNumber'),
  ),
  guardianFullName: yupFilterSchemas.string(
    i18n('student.fields.guardianFullName'),
  ),
  healthInsuranceCompany: yupFilterSchemas.string(
    i18n('student.fields.healthInsuranceCompany'),
  ),
  healthInsuranceNumber: yupFilterSchemas.string(
    i18n('student.fields.healthInsuranceNumber'),
  ),
  comment: yupFilterSchemas.string(
    i18n('student.fields.comment'),
  ),
  email: yupFilterSchemas.email(
    i18n('student.fields.email'),
  ),
});

const previewRenders = {
  studentNumber: {
    label: i18n('student.fields.studentNumber'),
    render: filterRenders.decimal(),
  },
  fullName: {
    label: i18n('student.fields.fullName'),
    render: filterRenders.generic(),
  },
  email: {
    label: i18n('student.fields.email'),
    render: filterRenders.generic(),
  },
  sex: {
    label: i18n('student.fields.sex'),
    render: filterRenders.generic(),
  },
};

const emptyValues = {
  studentNumber: null,
  fullName: '',
  email: '',
  sex: '',
  bloodType: '',
  birthday: '',
  city: '',
  postalCode: '',
  phoneNumber: '',
  CURP: '',
  RFC: '',
  guardianFullName: '',
  guardianPhoneNumber: '',
  healthInsuranceCompany: '',
  healthInsuranceNumber: '',
  status: 'active',
};

function StudentFilter(props) {
  const { sidenavColor } = selectMuiSettings();
  const rawFilter = useSelector(selectors.selectRawFilter);
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);

  const [initialValues] = useState(() => {
    return {
      ...emptyValues,
      ...rawFilter,
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
    mode: 'onSubmit',
  });

  useEffect(() => {
    dispatch(
      actions.doFetch(
        schema.cast(initialValues),
        initialValues,
      ),
    );
    // eslint-disable-next-line
  }, [dispatch]);

  const onSubmit = (values) => {
    const rawValues = form.getValues();
    dispatch(actions.doFetch(values, rawValues, false));
    setExpanded(false);
    dispatch(formActions.doRefresh());
  };

  const onReset = () => {
    Object.keys(emptyValues).forEach((key) => {
      form.setValue(key, emptyValues[key]);
    });
    dispatch(actions.doReset());
    setExpanded(false);
    dispatch(formActions.doRefresh());
  };

  const onRemove = (key) => {
    form.setValue(key, emptyValues[key]);
    dispatch(formActions.doRefresh());
    return form.handleSubmit(onSubmit)();
  };

  const { loading } = props;

  return (
    <FilterWrapper>
      <FilterAccordion
        expanded={expanded}
        onChange={(event, isExpanded) =>
          setExpanded(isExpanded)
        }
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color="secondary" />}
        >
          <FilterPreview
            values={rawFilter}
            renders={previewRenders}
            expanded={expanded}
            onRemove={onRemove}
          />
        </AccordionSummary>
        <AccordionDetails>
          <FormProvider {...form}>
            <MDBox
              component="form"
              role="form"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <Grid container spacing={1.6}>
                <Grid item lg={4} md={6} xs={12}>
                  <InputFormItem
                    name={'studentNumber'}
                    label={i18n(
                      'student.fields.studentNumber',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <InputFormItem
                    name={'email'}
                    label={i18n('student.fields.email')}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <InputFormItem
                    name={'fullName'}
                    label={i18n('student.fields.fullName')}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <SelectFormItem
                    name={'sex'}
                    label={i18n('student.fields.sex')}
                    options={studentEnumerators.sex.map(
                      (value) => ({
                        value,
                        label: value,
                      }),
                    )}
                    mode="signle"
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <SelectFormItem
                    name={'bloodType'}
                    label={i18n('student.fields.bloodType')}
                    options={studentEnumerators.bloodType.map(
                      (value) => ({
                        value,
                        label: value,
                      }),
                    )}
                    mode="single"
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <DatePickerFormItem
                    name={'birthday'}
                    label={i18n('student.fields.birthday')}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <InputFormItem
                    name={'city'}
                    label={i18n('student.fields.city')}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <InputFormItem
                    name={'postalCode'}
                    label={i18n(
                      'student.fields.postalCode',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <InputFormItem
                    name={'phoneNumber'}
                    label={i18n(
                      'student.fields.phoneNumber',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <InputFormItem
                    name={'RFC'}
                    label={i18n('student.fields.RFC')}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <InputFormItem
                    name={'CURP'}
                    label={i18n('student.fields.CURP')}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <InputFormItem
                    name={'guardianFullName'}
                    label={i18n(
                      'student.fields.guardianFullName',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <InputFormItem
                    name={'guardianPhoneNumber'}
                    label={i18n(
                      'student.fields.guardianPhoneNumber',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <InputFormItem
                    name={'healthInsuranceCompany'}
                    label={i18n(
                      'student.fields.healthInsuranceCompany',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <InputFormItem
                    name={'healthInsuranceNumber'}
                    label={i18n(
                      'student.fields.healthInsuranceNumber',
                    )}
                    variant="standard"
                  />
                </Grid>
              </Grid>
              <FilterButtons>
                <MDButton
                  size="small"
                  variant="gradient"
                  color={sidenavColor}
                  type="submit"
                  disabled={loading}
                  startIcon={<SearchIcon />}
                >
                  {i18n('common.search')}
                </MDButton>

                <MDButton
                  size="small"
                  variant="outlined"
                  color={sidenavColor}
                  type="button"
                  onClick={onReset}
                  disabled={loading}
                  startIcon={<UndoIcon />}
                >
                  {i18n('common.reset')}
                </MDButton>
              </FilterButtons>
            </MDBox>
          </FormProvider>
        </AccordionDetails>
      </FilterAccordion>
    </FilterWrapper>
  );
}

export default StudentFilter;
