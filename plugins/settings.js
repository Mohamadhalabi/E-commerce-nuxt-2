// settings.js

import Api from '~/api';

export default async function ({ app, isClient }, inject) {
  try {
    const settingsRes = await Api.get('/setting');
    let settings = settingsRes.data.data.setting;
    inject('settings', settings);
  } catch (error) {
    throw error;
  }
}
