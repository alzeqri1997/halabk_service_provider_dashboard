
export default {
  TOGGLE_RTL(state, payload) {
    state.layout.isRTL = payload  == 'en' ? false : true
    state.lang = payload  
    document.querySelector('html').setAttribute('lang',payload);
    document.documentElement.setAttribute('dir', state.layout.isRTL ? 'rtl' : 'ltr')
  },
  UPDATE_SKIN(state, skin) {
    state.layout.skin = skin

    // Update value in localStorage
    localStorage.setItem('vuexy-skin', skin)

    // Update DOM for dark-layout
    if (skin === 'dark') document.body.classList.add('dark-layout')
    else if (document.body.className.match('dark-layout')) document.body.classList.remove('dark-layout')
  },
  UPDATE_ROUTER_TRANSITION(state, val) {
    state.layout.routerTransition = val
  },
  UPDATE_LAYOUT_TYPE(state, val) {
    state.layout.type = val
  },
  UPDATE_CONTENT_WIDTH(state, val) {
    state.layout.contentWidth = val
  },
  UPDATE_NAV_MENU_HIDDEN(state, val) {
    state.layout.menu.hidden = val
  },
  UPDATE_NAVBAR_CONFIG(state, obj) {
    Object.assign(state.layout.navbar, obj)
  },
  UPDATE_FOOTER_CONFIG(state, obj) {
    Object.assign(state.layout.footer, obj)
  },
};
