export default {
  setCoupons: (state, data) => {
    state.allCoupons = data.content;
    state.totalCoupons = {
      totalItems: data.total,
      totalPages: data.last_page,
    };
  },
  setCouponDetails: (state, data) => {
    state.couponDetails = data.data;
  },
  setCouponChangedState: state => {
    state.couponDetails.state = state.couponDetails.state === 0 ? 1 : 0;
  },
  setAllCouponDropdown: (state, data) => {
    state.allCouponDropdown = data;
  },
  setCouponUsers: (state, data) => {
    state.couponUsers = data.content;
    state.totalCouponUsers = {
      totalItems: data.total,
      totalPages: data.last_page,
    };
  },
};
