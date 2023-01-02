export default {
  setApplicants: (state, data) => {
    state.allApplicants= data.content;
    state.totalApplicants=  {totalItems:data.total,totalPages:data.last_page};
  },
  setApplicantDetails: (state, data) => {
    state.applicantDetails = data;
  }, 
};
