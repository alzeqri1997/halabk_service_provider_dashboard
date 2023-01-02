import i18n from '@/libs/i18n';

/* eslint-disable */
// prettier-ignore
export default {
  pages: {
    key: 'title',
    data: [
      { title: i18n.t('nav.dashboard'), route: { name: 'dashboard' },icon: 'home-icon' },
      { title: i18n.t('nav.packages'), route: { name: 'packages' },icon: 'element-icon' },
      { title: i18n.t('nav.bookings'), route: { name: 'bookings' },icon: 'calender-icon' },
      { title: i18n.t('nav.financial_operations'), route: { name: 'financial-operations' },icon: 'status-up-icon' },
      { title: i18n.t('nav.profits'), route: { name: 'profits' },icon: 'money-icon' },
      { title: i18n.t('nav.chats'), route: { name: 'chats' },icon: 'messages-icon' },
      { title: i18n.t('nav.coupons'), route: { name: 'coupons' },icon: 'ticket-discount-icon' },
      { title: i18n.t('nav.reviews'), route: { name: 'reviews' },icon: 'star-icon' },
      { title: i18n.t('nav.settings'), route: { name: 'settings' },icon: 'setting-icon' },
    ],
  },
  
  
}
/* eslint-enable */
