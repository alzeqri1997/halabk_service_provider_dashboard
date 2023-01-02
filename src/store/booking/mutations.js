export default {
  setBookings: (state, data) => {
    if (data.content) {
      state.allBookings = data.content;
    } else {
      state.allBookings = data.data;
    }
    state.totalBookings = {
      totalItems: data.total,
      totalPages: data.last_page,
    };
  },
  setBookingDetails: (state, data) => {
    state.bookingDetails = data;
  },
};
