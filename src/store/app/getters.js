import { $themeBreakpoints } from '@themeConfig'
export default {
  currentBreakPoint: state => {
    const { windowWidth } = state
    if (windowWidth >= $themeBreakpoints.xl) return 'xl'
    if (windowWidth >= $themeBreakpoints.lg) return 'lg'
    if (windowWidth >= $themeBreakpoints.md) return 'md'
    if (windowWidth >= $themeBreakpoints.sm) return 'sm'
    return 'xs'
  },
  getlang(state) {
    return state.language;
  },
  getloading(state) {
    return state.loading;
  },
};
