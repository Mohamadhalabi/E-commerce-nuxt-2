export default async ({ $cookies, $axios, store }) => {  
    const token = $cookies.get('authToken');  
    if (token) {
      $axios.setToken(token, 'Bearer');  
      try {
        const { data } = await $axios.get('/user/profile');        
        // Commit the user_info to Vuex
        store.commit('authentication/SET_USER', data.user_info);
        return data.user_info;  // Return user info if fetched successfully
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        return null;  // Return null in case of error
      }
    } 
    return null;  // Return null if no user data is available
  };
  