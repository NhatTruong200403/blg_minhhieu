<template>
    <div class="container">
        <div v-for="item in blogs" :key="item.id" class="card">
            <router-link v-if="item.id" :to="{ name: 'Detail', params: { id: item.id } }">
                <img v-if="!item.img" src="https://tse2.mm.bing.net/th?id=OIP.WBMBQLHQRaslChbWJQCvSwHaEK&pid=Api&P=0&h=220" alt="">
                <img v-else :src="'http://54.169.162.174:3000/' + item.img" :alt="item.title">
                <p>{{ item.title }}</p>
            </router-link>
        </div>
    </div>
</template>

<script>
import BlogVM from '../../models/VM/BlogVM';
import BlogService from '../../service/api/BlogService';
export default {

    data() {
        return {
            blogs: [new BlogVM()],
            cards: [
                {
                    img: 'https://tse2.mm.bing.net/th?id=OIP.WBMBQLHQRaslChbWJQCvSwHaEK&pid=Api&P=0&h=220',
                    title: "Xin chào bạn nha bạn ơi"
                },
                {
                    img: 'https://tse2.mm.bing.net/th?id=OIP.WBMBQLHQRaslChbWJQCvSwHaEK&pid=Api&P=0&h=220',
                    title: "Xin chào bạn nha bạn ơi"
                },
                {
                    img: 'https://tse2.mm.bing.net/th?id=OIP.WBMBQLHQRaslChbWJQCvSwHaEK&pid=Api&P=0&h=220',
                    title: "Xin chào bạn nha bạn ơi"
                },
                {
                    img: 'https://tse2.mm.bing.net/th?id=OIP.WBMBQLHQRaslChbWJQCvSwHaEK&pid=Api&P=0&h=220',
                    title: "Xin chào bạn nha bạn ơi"
                },
                {
                    img: 'https://tse2.mm.bing.net/th?id=OIP.WBMBQLHQRaslChbWJQCvSwHaEK&pid=Api&P=0&h=220',
                    title: "Xin chào bạn nha bạn ơi"
                },
                {
                    img: 'https://tse2.mm.bing.net/th?id=OIP.WBMBQLHQRaslChbWJQCvSwHaEK&pid=Api&P=0&h=220',
                    title: "Xin chào bạn nha bạn ơi"
                },
                {
                    img: 'https://tse2.mm.bing.net/th?id=OIP.WBMBQLHQRaslChbWJQCvSwHaEK&pid=Api&P=0&h=220',
                    title: "Xin chào bạn nha bạn ơi"
                },
                {
                    img: 'https://tse2.mm.bing.net/th?id=OIP.WBMBQLHQRaslChbWJQCvSwHaEK&pid=Api&P=0&h=220',
                    title: "Xin chào bạn nha bạn ơi"
                },
                {
                    img: 'https://tse2.mm.bing.net/th?id=OIP.WBMBQLHQRaslChbWJQCvSwHaEK&pid=Api&P=0&h=220',
                    title: "Xin chào bạn nha bạn ơi"
                },
                {
                    img: 'https://tse2.mm.bing.net/th?id=OIP.WBMBQLHQRaslChbWJQCvSwHaEK&pid=Api&P=0&h=220',
                    title: "Xin chào bạn nha bạn ơi"
                },
                {
                    img: 'https://tse2.mm.bing.net/th?id=OIP.WBMBQLHQRaslChbWJQCvSwHaEK&pid=Api&P=0&h=220',
                    title: "Xin chào bạn nha bạn ơi"
                },
                {
                    img: 'https://tse2.mm.bing.net/th?id=OIP.WBMBQLHQRaslChbWJQCvSwHaEK&pid=Api&P=0&h=220',
                    title: "Xin chào bạn nha bạn ơi"
                },
                {
                    img: 'https://tse2.mm.bing.net/th?id=OIP.WBMBQLHQRaslChbWJQCvSwHaEK&pid=Api&P=0&h=220',
                    title: "Xin chào bạn nha bạn ơi"
                },
                {
                    img: 'https://tse2.mm.bing.net/th?id=OIP.WBMBQLHQRaslChbWJQCvSwHaEK&pid=Api&P=0&h=220',
                    title: "Xin chào bạn nha bạn ơi"
                },
                {
                    img: 'https://tse2.mm.bing.net/th?id=OIP.WBMBQLHQRaslChbWJQCvSwHaEK&pid=Api&P=0&h=220',
                    title: "Xin chào bạn nha bạn ơi"
                },
                {
                    img: 'https://tse2.mm.bing.net/th?id=OIP.WBMBQLHQRaslChbWJQCvSwHaEK&pid=Api&P=0&h=220',
                    title: "Xin chào bạn nha bạn ơi"
                },
                {
                    img: 'https://tse2.mm.bing.net/th?id=OIP.WBMBQLHQRaslChbWJQCvSwHaEK&pid=Api&P=0&h=220',
                    title: "Xin chào bạn nha bạn ơi"
                },
                {
                    img: 'https://tse2.mm.bing.net/th?id=OIP.WBMBQLHQRaslChbWJQCvSwHaEK&pid=Api&P=0&h=220',
                    title: "Xin chào bạn nha bạn ơi"
                },
                {
                    img: 'https://tse2.mm.bing.net/th?id=OIP.WBMBQLHQRaslChbWJQCvSwHaEK&pid=Api&P=0&h=220',
                    title: "Xin chào bạn nha bạn ơi"
                },
                {
                    img: 'https://tse2.mm.bing.net/th?id=OIP.WBMBQLHQRaslChbWJQCvSwHaEK&pid=Api&P=0&h=220',
                    title: "Xin chào bạn nha bạn ơi"
                },
                {
                    img: 'https://tse2.mm.bing.net/th?id=OIP.WBMBQLHQRaslChbWJQCvSwHaEK&pid=Api&P=0&h=220',
                    title: "Xin chào bạn nha bạn ơi"
                },

            ]
        }
    },
    async created() {
        await this.GetAllBlogs();
    },
    methods: {
        async GetAllBlogs() {
            const response = await BlogService.getAllBlogs();
            console.log("Response: ", response);
            this.blogs = response;
        }
    },

}
</script>


<style></style>