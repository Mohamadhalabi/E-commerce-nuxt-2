import * as rtlStore from '../store/rtlStore.js';
import Api from "~/api";





export default ({ app }) => {
  /*  console.log(rtlStore.getters.getLan(rtlStore.state())); */

  // app.router.afterEach((to, from, next) => {
  //   const title = /*'routes.js//'  +  to.name.substring(0, to.name.length - 5) */
  //     document.title = title;
  //
  // });
};







/* import Api from '~/api';

import * as rtlStore from '~/store/rtlStore.js';


export default async ({ app }) => {
  try {
    console.log(app.router);
    const responce = await Api.get('/setting');
    let lan = rtlStore.getters.getLan(rtlStore.state());
    let systemName = responce.data.data.setting.website.system_name[`${lan}`]
    app.router.afterEach((to, from, next) => {
      const title = 'routes.js//' + systemName  + to.name.substring(0, to.name.length - 5) ;
document.title = title;

    });
  } catch (error) {
  throw error
}

};
 */
