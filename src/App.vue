<script setup>
// import HelloWorld from './components/HelloWorld.vue'
import { useRoute } from 'vue-router';
const route = useRoute()
</script>

<template>
  <!-- {
  "email": "admin.mihhiu@example.com",
  "password": "string"
} -->
  <div>
    <header>
      <div>
        <router-link class="home" to="/">Home</router-link>
        <h3 class="path">{{ path }}</h3>
      </div>
      <div v-if="isMobile">
        <button class="list" @click="isclick = !isclick"><img width="40" height="40"
            src="https://img.icons8.com/sf-regular-filled/48/list.png" alt="list" /></button>
        <div v-if="isclick">
          <span v-for="item in titles" :key="item">
            <span class="type">
              {{ item.title }}
            </span>
          </span>
          <span class="type" @click="this.$router.push('/aboutme')">Về bản thân tôi</span>
        </div>
      </div>
      <div v-else>
        <span class="type" @click="this.$router.push('/aboutme')">Về bản</span>
        <span class="type" @click="this.$router.push('/aboutme')">thân tôi</span>
        <span class="type" @click="this.$router.push('/aboutme')">Về tôi</span>
        <span class="type" @click="this.$router.push('/aboutme')">bản tôi</span>
        <span v-for="item in titles" :key="item">
          <span class="type">
            {{ item.title }}
          </span>
        </span>
        <span class="type" @click="this.$router.push('/aboutme')">Về bản thân tôi</span>
      </div>
    </header>
    <router-view :width="width"></router-view>
    <hr>
    <footer>
      <ShareNetwork network="facebook" url="https://www.youtube.com/watch?v=3MNpWP6TFjI" quote="Vue makes sharing easy!"
        title="Vue App" media="https://vuejs.org/images/logo.png" hashtags="vuejs,javascript,webdev"
        description="Vue makes sharing easy! Ứng dụng Vue tuyệt vời" v-slot="{ share }">
        <button @click="share" class="share-button">Share on Facebook</button>
      </ShareNetwork>
      <div>
        <a class="afooter" href="">Về trang blog này</a>
        <p>Trang blog cá nhân của tôi (Minh Hiếu), nơi tôi chia sẻ những trải nghiệm và nhiếp ảnh nghiệp dư.</p>
      </div>
      <div>
        <img width="32" height="32" src="https://img.icons8.com/ios-filled/50/facebook-new.png" alt="facebook-new" />
        <img width="32" height="32" src="https://img.icons8.com/ios/50/instagram-new.png" alt="instagram-new" />
        <img width="32" height="32" style="border-radius: 50% !important;"
          src="https://img.icons8.com/ios-glyphs/30/linkedin.png" alt="linkedin" />
        <img width="32" height="32" src="https://img.icons8.com/glyph-neue/50/gmail.png" alt="gmail" />
      </div>
    </footer>
  </div>
</template>
<script>
import PostService from './service/api/PostService'
import { ShareNetwork } from "vue3-social-sharing";
import { provide, ref, onMounted, onUnmounted } from "vue";
export default {
  data() {
    return {
      path: 'Trang chủ',
      titles: [],
      isclick: false,
      width: window.innerWidth
    }
  },
  methods: {
    async getAllType() {
      const res = await PostService.getAllTypePost();
      if (res) {
        this.titles = res;
      }
    },
    updateWidth() {
      this.width = window.innerWidth;
    },
  },
  async created() {
    await this.getAllType();
  },
  computed: {
    isMobile() {
      return this.width <= 768; // Mobile: Dưới 768px
    },
    isTablet() {
      return this.width > 768 && this.width <= 1024; // Tablet: 768px - 1024px
    }
  },
  mounted() {
    window.addEventListener("resize", this.updateWidth);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateWidth);
  },

}
</script>
<!-- // const res = await axios.get('http://54.179.35.186:3000/type-post');
    // console.log("Console: ",res); -->
<style></style>





<!-- <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>-->
<!-- <HelloWorld msg="Vite + Vue" />  -->