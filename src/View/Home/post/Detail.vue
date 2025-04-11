<template>

    <div class="details" v-if="isMobile">
        <div class="left">
            <div class="titleLeft">
                <p>19/02/2025</p>
                <p>Blog</p>
                <p>Tự sự</p>
            </div>
            <div>
                <img src="/src/assets/logo.png" alt="">
            </div>
        </div>
        <div class="right">
            <p class="head">Tiêu đề</p>
            <div class="noidung">Ngày xửa ngày xưa, khi đất trời còn giao hòa giữa thần linh và con người, có hai linh
                thú cai quản vận mệnh nhân gian: Rồng – chúa tể của trời xanh, và Lân – linh vật của hòa bình và thịnh
                vượng</div>
            <img src="/src/assets/logo.png" alt="">

            <hr>
            <div class="comment">
                <div class="sumcmt" style="font-size: 20px;">
                    Có 3 bình luận của bài viết
                </div>
                <div class="detailcmt">
                    <div class="avt"><img src="/src/assets/logo.png" alt=""></div>
                    <div class="cmt">
                        <div class="one">Minh Hiếu</div>
                        <div class="two">19/02/2025</div>
                        <div class="three">Ngày xửa ngày xưa, khi đất trời</div>
                    </div>
                </div>
                <div class="detailcmt">
                    <div class="avt"><img src="/src/assets/logo.png" alt=""></div>
                    <div class="cmt">
                        <div class="one">Minh Hiếu</div>
                        <div class="two">19/02/2025</div>
                        <div class="three">Ngày xửa ngày xưa, khi đất trời còn giao hòa giữa thần linh và con người, có
                            hai linh thú cai</div>
                    </div>
                </div>
                <div class="detailcmt">
                    <div class="avt"><img src="/src/assets/logo.png" alt=""></div>
                    <div class="cmt">
                        <div class="one">Minh Hiếu</div>
                        <div class="two">19/02/2025</div>
                        <div class="three">Ngày xửa ngày xưa, khi đất trời còn giao hòa giữa thần linh và con người, có
                            hai linh thú cai</div>
                    </div>
                </div>
                <div class="detailcmt">
                    <div class="avt"><img src="/src/assets/logo.png" alt=""></div>
                    <div class="cmt">
                        <div class="one">Minh Hiếu</div>
                        <div class="two">19/02/2025</div>
                        <div class="three">Ngày xửa ngày xưa, khi đất trời còn giao hòa giữa thần linh và con người, có
                            hai linh thú cai</div>
                    </div>
                </div>
                <div class="detailcmt">
                    <div class="avt"><img src="/src/assets/logo.png" alt=""></div>
                    <div class="cmt">
                        <div class="one">Minh Hiếu</div>
                        <div class="two">19/02/2025</div>
                        <div class="three">Ngày xửa ngày xưa, khi đất trời còn giao hòa</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="detail" v-else>
        <!-- <div class="left">
            <div v-for="item in blog.typePosts" :key="item.id" class="titleLeft">
                <p>{{ formatDate(item.createdAt) }}</p>
                <p>{{ item.title }}</p>
                <p>{{ item.description }}</p>
            </div>
        </div> -->
        <div class="left">
            <div v-for="item in blog.typePosts" :key="item.id" class="titleLeft">
                <p>{{ formatDate(item.createdAt) }}</p>
                <p>{{ item.title }}</p>
                <p>{{ item.description }}</p>
            </div>
            <div>
                <img v-if="!blog.img"
                    src="https://tse2.mm.bing.net/th?id=OIP.WBMBQLHQRaslChbWJQCvSwHaEK&pid=Api&P=0&h=220" alt="">
                <img v-else :src="'http://54.169.162.174:3000/' + item.img" :alt="item.title">
            </div>
        </div>
        <div class="right">
            <p class="head">{{ blog.title }}</p>
            <div class="noidung">{{ blog.conslution }}</div>
            <!-- <img class="a" src="/src/assets/logo.png" alt=""> -->
            <div class="component" v-for="item in blog.components" :key="item.id">
                <div v-if="item.content" class="noidung a">{{ item.content }}</div>
                <div v-if="item.imageUrl" class="item a">
                    <img
                        src="https://tse2.mm.bing.net/th?id=OIP.WBMBQLHQRaslChbWJQCvSwHaEK&pid=Api&P=0&h=220" alt="">
                    <!-- <img v-else :src="'http://54.169.162.174:3000/' + item.img" :alt="item.title"> -->
                </div>
            </div>
            <hr>
            <div class="comment">
                <div class="sumcmt" style="font-size: 20px;">
                    Có {{ blog?.commentByUsers?.length ?? 0 }} bình luận của bài viết
                </div>
                <div class="detailcmt" v-for="item in blog.commentByUsers" :key="item.id">
                    <div class="avt"><img src="/src/assets/logo.png" alt=""></div>
                    <div class="cmt">
                        <div class="one">Minh Hiếu</div>
                        <div class="two">19/02/2025</div>
                        <div class="three">{{ item.content }}</div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import BlogService from '../../../service/api/BlogService';
import BlogVM from '../../../models/VM/BlogVM'
export default {

    data() {
        return {
            cards: [
                {
                    img: 'src/assets/logo.png',
                    title: "Xin chào bạn nha bạn ơi"
                }
            ],
            blog: new BlogVM(),
        }
    },
    methods: {
        async GetAllBlogs(id) {
            const response = await BlogService.getBlogById(id);
            console.log("Response in detail: ", response);
            this.blog = response.data;
        },
        formatDate(dateString) {
            if (!dateString) return 'N/A';
            try {
                const date = new Date(dateString);
                return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
            } catch (e) { return 'Invalid Date'; }
        },
        async getUserCommentId(id) {
            const response = await BlogService.getUserCommentId(id);
            console.log("Response in detail: ", response);
            this.blog = response.data;
        }
    },
    created() {
        this.GetAllBlogs(this.$route.params.id);
    },
    props: ["width"],
    computed: {
        isMobile() {
            return this.width <= 768;
        },
        isTablet() {
            return this.width > 768 && this.width <= 1024;
        }
    }

}
</script>


<style>
.titleLeft {
    margin-top: 20px;
}
</style>