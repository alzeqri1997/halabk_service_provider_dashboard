import Vue from 'vue';
import store from '@/store/index';

export default function middlewareAccountState({ to, next }) {
  const loginData = Vue.$cookies.get('login-data', { parseJSON: true });
  // the only routes that are allowed to be accessed without active account
  const rejectRoute = ['dashboard', 'edit-profile'];
  // this is the the route that the account of all types can access.
  const routeName = 'dashboard';
  if (loginData) {
    // first, check if the user is logged in.
    // then , check if data is fetched from the server.
    if (store.getters.getProfileInfo) {
      // third, check if the provider is active. 
      if (store.getters.getProfileInfo.complete_status !== 'active') {
        // if not active, that means the user would be 
        // rejected, suspended, or pending.
        // we will show the provider only the dashboard page.
        // so we have to close the all other features of the provider account until the account is active.

        // now, let's check if the provider is rejected or not.
        if (
          (store.getters.getProfileInfo.complete_status !== 'rejected' &&
            to.name !== routeName) ||
          (store.getters.getProfileInfo.complete_status === 'rejected' &&
            !rejectRoute.includes(to.name))
        ) {
          // if the provider account is not rejected, AND the route name is not the same as routeName variable which is 'dashboard',
          // OR
          // if the provider account is rejected, AND the route name is one of the rejectRoute variable which is ['dashboard', 'edit-profile'],
          // then we will redirect the user to the dashboard page.
          return next({ name: routeName, params: { lang: to.params.lang } });
        } else {
          // otherwise, we will let the user to access the page he wants.
          return next();
        }
      } else {
        // if the provider is active, 
        // we should add some restrictions to the routes based on the package type ( Basic, Growth, or Premium )
        // if the package type is Basic, we should not allow the user to access the Dashboard and reports pages.
        // the other package types should be allowed to access the Dashboard and reports pages.


        const [reports] = store.getters.getProfileInfo.restrictions.filter(
          (item) => item.name === 'reports'
        )
        const [dashboard] = store.getters.getProfileInfo.restrictions.filter(
          (item) => item.name === 'dashboard'
        )
        // the reports and dashboard variables contains a key called 'code'.
        // if the code is 'xx_xx_01', that means the provider is not allowed to access that page.
        // if the code is 'xx_xx_00', that means the provider is allowed to access that page.
        //==========================================================================================================================
        // reports = '02_06_xx'
        // dashboard = '02_07_xx'
        //==========================================================================================================================
        // so the logic is:
        // if the the provider is not allowed to access the reports page or the dashboard page,
        // AND
        // if the route name is the dashboard or the reports,
        // the provider should be redirected to the package page because he is not allowed to access them.
        if ((reports.code === '02_06_01' || dashboard.code === '02_07_01') && (to.name === 'dashboard' || to.name === 'financial-operations')) {
          return next({ name: 'packages', params: { lang: to.params.lang } });
        } else {
          // otherwise, the provider is allowed to access the reports page or the dashboard page.
          return next();
        }
      }
    }
    return next();
  }
  return next({ name: 'login', params: { lang: to.params.lang } });
}
