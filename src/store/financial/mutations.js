export default {
  setFinancial: (state, data) => {
    state.allFinancial = data;
    state.totalFinancial = {
      totalItems: data.total,
      totalPages: data.last_page,
    };
  },
};
