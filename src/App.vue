<script>
import axios from 'axios';

export default {
  created() {
    axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('UAUTHTKKEY');
  
        if (!token) {
          this.$router.push('/login')
        }
  
        config.headers.Authorization = `Bearer ${token}`;
  
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
    (response) => {
      return response;
    },
      async (error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('UAUTHTKKEY');

          await router.push('/login');

          return Promise.reject();
        }

        return Promise.reject(error);
      }
    );
  },
}
</script>

<template>
  <router-view/>
</template>

<style>
/* Fonts */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

/* Variáveis globais */
:root {
  --primary-color: #C0AB61;
  --secondary-color: #383838;
  --white-color: #FFFFFF;
}

* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  font-family: 'Montserrat';
}

a,
router-link {
  text-decoration: none;
}

body{
  overflow: hidden;
}

/* Variáveis */
.mt-1 {
  margin-top: 10px;
}

.mt-1p5 {
  margin-top: 15px;
}

.mt-2 {
  margin-top: 20px;
}

.mt-2p5 {
  margin-top: 25px;
}

.mt-3 {
  margin-top: 30px;
}
</style>
