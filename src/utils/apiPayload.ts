// function to convert active tooth name to numbers
const generateToothName = (toothNumber: number): string => {
// active tooth number in words
const toothNumberWords: { [key: number]: string } = {
  51: 'fifty-one',52: 'fifty-two',53: 'fifty-three',54: 'fifty-four',55: 'fifty-five',61: 'sixty-one',62: 'sixty-two',63: 'sixty-three',64: 'sixty-four',65: 'sixty-five',71: 'seventy-one',72: 'seventy-two',73: 'seventy-three',74: 'seventy-four',75: 'seventy-five',81: 'eighty-one',82: 'eighty-two',83: 'eighty-three',84: 'eighty-four',85: 'eighty-five',11: 'eleven',12: 'twelve',13: 'thirteen',14: 'fourteen',15: 'fifteen',16: 'sixteen',17: 'seventeen',18: 'eighteen',21: 'twenty-one',22: 'twenty-two',23: 'twenty-three',24: 'twenty-four',25: 'twenty-five',26: 'twenty-six',27: 'twenty-seven',28: 'twenty-eight',31: 'thirty-one',32: 'thirty-two',33: 'thirty-three',34: 'thirty-four',35: 'thirty-five',36: 'thirty-six',37: 'thirty-seven',38: 'thirty-eight',41: 'fourty-one',42: 'fourty-two',43: 'fourty-three',44: 'fourty-four',45: 'fourty-five',46: 'fourty-six',47: 'fourty-seven',48: 'fourty-eight'
};

  // Check if the tooth number is in the predefined mapping
  if (toothNumberWords[toothNumber]) {
    return toothNumberWords[toothNumber];
  }

  // Handle dynamic tooth number names (if out of the predefined range)
  return `${toothNumber}`;
};


// payload to update switch status
export const createSwitchTogglePayload = (
  testId:any,
  studentData: any,
  status: any,
  system: string,
  fild: string,
  fild_per: string
) => {
  return {
    test_id: testId,
    student_id: studentData?.studentId,
    value: status,
    system: system,
    fild: fild,
    fild_per: fild_per,
  };
};

// payload to add / update biometric test
export const BiometricTestPayload = (testId:any,formData: any) => {
  return {
    
    test_id: testId,
    section_id: "1",
    generalswitch: formData?.generalswitch,
    inbodyswitch: formData?.inbodyswitch,
    general: {
      weight: formData?.weight,
      height: formData?.height,
      bmi: formData?.bmi,
      bmi_status: formData?.bmi_status,
    },
    notes: {
      general_notes: formData?.general_notes,
    },
  };
};

// payload to add / update eye test
export const EyeTestPayload = (testId:any,formData:any)=>{
  return{
    
        test_id: testId,
    section_id: 2,
    eyeswitch: formData?.eyeswitch,
    eye: {
      right_sp: formData?.right_sp,
      right_cy: formData?.right_cy,
      right_axis: formData?.right_axis,
      right_pupil_size: formData?.right_pupil_size,
      right_se: formData?.right_se,
      left_sp: formData?.left_sp,
      left_cy: formData?.left_cy,
      left_axis: formData?.left_axis,
      left_pupil_size: formData?.left_pupil_size,
      left_se: formData?.left_se,
      myopia: formData?.myopia,
      anisometropia: formData?.anisometropia,
      hyperopia: formData?.hyperopia,
      strabismus: formData?.strabismus,
      astigmatism: formData?.astigmatism,
      anisocoria: formData?.anisocoria,
      screeing_result: formData?.screeing_result,
      prescription: formData?.prescription,
    },
    notes: {
      eye_notes: formData?.eye_notes,
    },
  }
}
// payload to add / update dental test
export const DentalPayloadFormData = (testId:any,formData: any, activeTeeth: any) => {
  
  const payload = new FormData();

  // Append primitive values
  payload.append("test_id", testId)
  payload.append("section_id", "3");
  payload.append("dentalswitch", String(Number(formData?.dentalswitch || 0)));
  payload.append(`dental[gum_info]`, String(formData?.gum_info || "")); 
  payload.append(`dental[calculus]`, String(formData?.calculus || "")); 
  payload.append(`dental[bleeding]`, String(formData?.bleeding || "")); 
  payload.append(`dental[filling]`, String(formData?.filling || "")); 
  payload.append(`dental[caries]`, String(formData?.caries || "")); 
  payload.append(`dental[alignment]`, String(formData?.alignment || "")); 
  payload.append(`dental[stains]`, String(formData?.stains || "")); 
  payload.append(`dental[plaque]`, String(formData?.plaque || "")); 
  payload.append(`dental[stage]`, String(formData?.stage || "")); 

// Map tooth numbers to their respective names and format like "51 ko fifty-one"
  activeTeeth.forEach((tooth: number) => {
    const toothName = generateToothName(tooth);
    payload.append(`scal[${toothName}]`, toothName); // Append the formatted string
  });
  
  payload.append(`multiple_file_1`, formData?.multiple_file_1); 
  payload.append(`multiple_file_2`, formData?.multiple_file_2); 


  // Append notes
  payload.append("notes[dental_notes]", formData?.dental_notes || "");

  return payload;
};


// payload to add / update ent test
export const EntPayload = (testId:any,formData:any)=>{
  return{
        test_id: testId,
    section_id: 4,
    entswitch: formData?.entswitch,
    ent: {
      ear_wax:formData?.ear_wax,
      ear_drum:formData?.ear_drum,
      ear:formData?.ear,
      nosal_track:formData?.nosal_track,
      nose:formData?.nose,
      tonsils:formData?.tonsils,
      throat:formData?.throat
    },
    notes: {
      ent_notes: formData?.notes,
    },
  }
}
// payload to add / update cardiovascular test
export const CardiovascularPayload = (testId:any,formData:any)=>{
  return{
    
        test_id: testId,
    section_id: 5,
    cardiovascularswitch: formData?.cardiovascularswitch,
    cardiovascular: {
      pulse:formData?.pulse,
      pulse_status:formData?.pulse_status,
      spirometry:formData?.spirometrySystolic+"/"+formData?.spirometryDiastolic,
      spirometry_status:formData?.spirometry_status,
      respiratory:formData?.respiratory,
      resporatory_status:formData?.resporatory_status,
      oximetry:formData?.oximetry,
      oximetry_status:formData?.oximetry_status,
      mummur:formData?.mummur,
      auscultation:formData?.auscultation,
    },
    notes: {
      cardiovascular_notes: formData?.cardiovascular_notes,
    },
  }
}

// payload to add / update general test
export const GeneralPayload = (testId:any,formData:any)=>{
  return{
    
        test_id: testId,
    section_id: 6,
    examinationswitch: formData?.examinationswitch,
    spirometer: formData?.spirometer,
    examination: {
      palor:formData?.palor,
      skin:formData?.skin,
      allergy:formData?.allergy,
      lymphadenopathy:formData?.lymphadenopathy,
      cyanosis:formData?.cyanosis,
      stomach_ache:formData?.stomach_ache,
      edema:formData?.edema,
      icterus:formData?.icterus,
      mummur:formData?.mummur,
      cns:formData?.cns,
      nail:formData?.nail,
      hair:formData?.hair,
    },
    notes: {
      examination_notes: formData?.examination_notes,
    },
  }
}

// payload to update spirometer switch
export const spirometeTogglePayload = (testId:any,studentData:any,status:any)=>{
  return{
    test_id: testId,
    student_id: studentData?.student_id,
    spirometer_status: status,
  }
}



// payload to update or save final notes and special notes

export const saveSpecialNotesPayload = (testId:any,formData:any)=>{
  return{
    section_id: 6,
    
        test_id: testId,
    examinationswitch: formData?.examinationswitch,
    final_notes:formData?.final_notes,
    special_notes:formData?.special_notes,
  }
}


// payload to add student

export const addStudentPayload = (testId:any,schoolId:any,formData:any)=>{
  return{
    parent_mobile: formData?.parentMobile,
    school_id:schoolId,
    test_id:testId,
    parent_email:formData?.parentEmail,
    student_name:formData?.studentName,
    class:formData?.studentClass,
    division:formData?.division,
    gender:formData?.gender,
    day:formData?.dob.day,
    month:formData?.dob.month,
    year:formData?.dob.year,
    roll_no:formData?.roll_no,
    race_id:1,
  }
}



// payload to import student through csv file

export const ImportStudentPayloadFormData = (testId: any,schoolId:any ,file:File) => {
  
  const payload = new FormData();

  // Append primitive values
  payload.append("test_id", "25")
  payload.append("school_id", "160")
  payload.append("importContactsFile", file);
  
  // ## uncomment following for dynamic testId and school id ## 
  // payload.append("test_id",testId);
  // payload.append("school_id",schoolId);

  return payload;
};
