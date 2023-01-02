export default {
  setPackages: (state, data) => {
    state.allPackages = data.data.content;
    state.totalPackages = {
      totalItems: data.data.total,
      totalPages: data.data.last_page,
      restrictions: data.restrictions,
    };
  },
  setPackageDetails: (state, data) => {
    state.packageDetails = data;
  },
};
