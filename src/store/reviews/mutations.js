export default {
  setReviews: (state, data) => {
    state.allReviews = data.comments.content;
    state.totalReviews = {
      totalItems: data.comments.total,
      totalPages: data.comments.last_page,
      rateAverage: data.rate_avg,
      rates: data.rates,
    };
  },
  deleteOneReview: (state, data) => {
    let index = state.allReviews.findIndex((review) => review.id == data);
    if (index > -1) {
      state.allReviews.splice(index, 1);
    }
  },
};
