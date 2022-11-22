import { connectRouter } from 'connected-react-router';
import layout from 'src/modules/layout/layoutReducers';
import auth from 'src/modules/auth/authReducers';
import tenant from 'src/modules/tenant/tenantReducers';
import plan from 'src/modules/plan/planReducers';
import admin from 'src/modules/admin/adminReducers';
import teacher from 'src/modules/teacher/teacherReducers';
import student from 'src/modules/student/studentReducers';
import auditLog from 'src/modules/auditLog/auditLogReducers';
import settings from 'src/modules/settings/settingsReducers';
import pool from 'src/modules/pool/poolReducers';
import grade from 'src/modules/grade/gradeReducers';
import skill from 'src/modules/skill/skillReducers';
import classCategory from 'src/modules/classCategory/classCategoryReducers';
import classReducers from 'src/modules/class/classReducers';
import lesson from 'src/modules/lesson/lessonReducers';
import paymentCategory from 'src/modules/paymentCategory/paymentCategoryReducers';
import paymentMethod from 'src/modules/paymentMethod/paymentMethodReducers';
import { combineReducers } from 'redux';
import form from 'src/modules/form/formReducers';
import mui from 'src/modules/mui/muiReducers';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    form,
    mui,
    layout,
    auth,
    tenant,
    plan,
    admin,
    teacher,
    student,
    auditLog,
    settings,
    pool,
    grade,
    skill,
    classCategory,
    paymentCategory,
    paymentMethod,
    class: classReducers,
    lesson,
  });
