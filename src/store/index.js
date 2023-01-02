import Vue from 'vue';
import Vuex from 'vuex';

// Modules
import dashboard from './dashboard';
import auth from './auth';
import packages from './packages';
import financial from './financial';
import profits from './profits';
import reviews from './reviews';
import sections from './sections';
import coupons from './coupons';
import skills from './skills';
import applicants from './applicants';
import services from './services';
import utilities from './utilities';
import app from './app';
import chats from './chats';
import appConfig from './app-config';
import verticalMenu from './vertical-menu';
import halabik from './halabik';
import profile from './profile';
import booking from './booking';
import subscription from './subscription';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    dashboard,
    app,
    appConfig,
    verticalMenu,
    auth,
    coupons,
    financial,
    reviews,
    sections,
    applicants,
    services,
    skills,
    utilities,
    chats,
    packages,
    profits,
    halabik,
    profile,
    booking,
    subscription,
  },
  strict: process.env.DEV,
});
