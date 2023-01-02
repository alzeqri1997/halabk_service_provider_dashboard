export default {
  setProfits: (state, data) => {
    state.allProfits = data;
    state.totalProfits = {
      totalItems: data.total,
      totalPages: data.last_page,
    };
  },
};
