<template>
    <div id="appv1">
        <header>
            <div>
                <router-link class="home" to="/home/listblogs">Home</router-link>
                <h3 class="path">{{ $route.name }}</h3>
                <!-- <h3 class="path">{{ path }}</h3> -->
            </div>
            <div v-if="isMobile">
                <button class="list" @click="isclick = !isclick"><img width="40" height="40"
                        src="https://img.icons8.com/sf-regular-filled/48/list.png" alt="list" /></button>
                <div v-if="isclick">
                    <span v-for="item in items" :key="item">
                        <span class="type">
                            {{ item.title }}
                        </span>
                    </span>
                    <span class="type" @click="this.$router.push('/aboutme')">Về bản thân tôi</span>
                    <span class="type" @click="this.$router.push('/login')">Đăng nhập</span>
                </div>
            </div>
            <div v-else>
                <span v-for="item in items" :key="item">
                    <span class="type">
                        {{ item.title }}
                    </span>
                </span>
                <span class="type" @click="this.$router.push('/aboutme')">Về bản thân tôi</span>
                <span class="type" @click="this.$router.push('/login')">Đăng nhập</span>
            </div>
        </header>
        <router-view :width="width"></router-view>
        <hr>
        <footer>
            <ShareNetwork network="facebook" url="https://www.youtube.com/watch?v=3MNpWP6TFjI"
                quote="Vue makes sharing easy!" title="Vue App" media="https://vuejs.org/images/logo.png"
                hashtags="vuejs,javascript,webdev" description="Vue makes sharing easy! Ứng dụng Vue tuyệt vời">
                <!-- v-slot="{ share }" -->
                <button @click="share" class="share-button">Share on Facebook</button>
            </ShareNetwork>
            <div>
                <a class="afooter" href="">Về trang blog này</a>
                <p>Trang blog cá nhân của tôi (Minh Hiếu), nơi tôi chia sẻ những trải nghiệm và nhiếp ảnh nghiệp dư.</p>
            </div>
            <div>
                <img width="32" height="32" src="https://img.icons8.com/ios-filled/50/facebook-new.png"
                    alt="facebook-new" />
                <img width="32" height="32" src="https://img.icons8.com/ios/50/instagram-new.png" alt="instagram-new" />
                <img width="32" height="32" style="border-radius: 50% !important;"
                    src="https://img.icons8.com/ios-glyphs/30/linkedin.png" alt="linkedin" />
                <img width="32" height="32" src="https://img.icons8.com/glyph-neue/50/gmail.png" alt="gmail" />
            </div>
        </footer>
    </div>



</template>

<script>
import { ShareNetwork } from "vue3-social-sharing";
import TypeDTO from "../../models/typeDto";
import TypeService from "../../service/api/TypeService";
export default {
    data() {
        return {
            cards: [
                {
                    img: 'src/assets/logo.png',
                    title: "Xin chào bạn nha bạn ơi"
                }
            ],
            items: [new TypeDTO()],
        }
    },
    methods: {
        async fetchData() {
            try {
                const response = await TypeService.getAllTypies();
                this.items = response.data;
                console.log("Response: ",this.items);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        },
    },
    async created() {
        console.log("Chạy vô đây nha");
        await this.fetchData();
    },
}
</script>

<style></style>