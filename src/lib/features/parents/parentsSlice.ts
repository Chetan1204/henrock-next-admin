import { createSlice } from "@reduxjs/toolkit";
import { number, object, string } from "yup";

const initialState = {
  parents: [],
  parentsNotAssigned: [],
  parentById: {},
  parentReport: {},
  dashboardStudentData: {
    student: {
      school_id: 0,
      student_id: 0,
      parent_mobile: null,
      student_name: "",
      otp: null,
    },
    school: {
      school_id: 0,
      unique_prefix: "",
      school_logo: "",
      user_id: 0,
      doctors_id: null,
      type: 0,
      logo: "",
      is_deleted: 0,
      user_role: 0,
      full_name: "",
      email: null,
      code: "",
      password: "",
      mobile: null,
      specialist: "",
      location: "",
      salt: "",
      confirmation_code: "",
      last_ip: "",
      last_login: null,
      new_password_key: "",
      new_password_requested: null,
      status: 0,
      created: "",
      modified: "",
      temp_status: null,
    },
    students: [],
    student_info: {
      student_name: "",
      stu_date_of_birth: null,
      unique_id: "",
      age: "",
      school_prefix: "",
      student_division: "",
      parent_mobile: null,
      student_roll_no: "",
      school_id: 0,
      class_name: "",
      ss_gender: "",
      ss_date_of_birth: null,
      ss_division: "",
      ss_class: 0,
      student_test_id: 0,
      student_id: 0,
      doctors_id: 0,
      test_id: 0,
      race_id: null,
      gender: null,
      date_of_birth: "any",
      general: {
        bmi: null,
        bmi_status: "",
        height: "",
        weight: "",
      },
      dental: {
        gum_info: "",
        calculus: "",
        bleeding: "",
        filling: "",
        stage: "",
        caries: "",
        alignment: "",
        stains: "",
        plaque: "",
      },
      eye: {
        right_sp: "",
        right_cy: "",
        right_axis: "",
        right_pupil_size: "",
        right_se: "",
        left_sp: "",
        left_cy: "",
        left_axis: "",
        left_pupil_size: "",
        left_se: "",
        screeing_result: "",
        myopia: "",
        hyperopia: "",
        astigmatism: "",
        anisometropia: "",
        strabismus: "",
        anisocoria: "",
        prescription: "",
      },
      created:"",
      inbody: {},
      final_notes: "",
      general_notes: "",
      status: 0,
      class_id: 0,
      roll_no: 0,
      is_delete: 0,
      is_publish: 0,
    },
  },
  selectedparent: false, 
  parentDetails: {name:""}, 
  parentStudentList: [], 
  parentRecord: [],
  status: "idle",
  loading: false,
  error: null,
};

const parentsSlice = createSlice({
  name: "parent",
  initialState,
  reducers: {
    setDashboardStudentData: (state, action) => {
      state.dashboardStudentData = action.payload;
      state.status = "succeeded";
    }, 
    setParentDetail: (state, action) => {
      state.parentDetails = action.payload;
      state.status = "succeeded";
    }, 
    setparentStudentList: (state, action) => {
      state.parentStudentList = action.payload;
      state.status = "succeeded";
    }, 
    setparentRecord: (state, action) => {
      state.parentRecord = action.payload;
      state.status = "succeeded";
    },
    setparentReport: (state, action) => {
      state.parentReport = action.payload;
      state.status = "succeeded";
    },
    setLoading: (state, action) => {
      state.status = "loading";
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    },
  },
});

export const {
  setParentDetail,
  setparentStudentList,
  setDashboardStudentData,
  setLoading,
  setError,
} = parentsSlice.actions;

export default parentsSlice.reducer;
