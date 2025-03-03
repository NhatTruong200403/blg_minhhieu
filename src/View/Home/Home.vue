<template>
        <!-- Trang các post -->
        <div class="container">
            <div class="card" @click="this.$router.push('/detail')" v-for="item in cards" :key="item">
                <img :src="item.img" alt="">
                <p>{{ item.title }}</p>
            </div>
        </div>
</template>

<script>
export default {
    data() {
        return {
            cards: [
                {
                    img: 'src/assets/logo.png',
                    title: "Xin chào bạn nha bạn ơi"
                },
                {
                    img: 'src/assets/logo.png',
                    title: "Xin chào bạn nha bạn ơi"
                },
                {
                    img: 'src/assets/logo.png',
                    title: "Xin chào bạn nha bạn ơi"
                },
                {
                    img: 'src/assets/logo.png',
                    title: "Xin chào bạn nha bạn ơi"
                },
                {
                    img: 'src/assets/logo.png',
                    title: "Xin chào bạn nha bạn ơi"
                },
                {
                    img: 'src/assets/logo.png',
                    title: "Xin chào bạn nha bạn ơi"
                },
                {
                    img: 'src/assets/logo.png',
                    title: "Xin chào bạn nha bạn ơi"
                },
                {
                    img: 'src/assets/logo.png',
                    title: "Xin chào bạn nha bạn ơi"
                },
                {
                    img: 'src/assets/logo.png',
                    title: "Xin chào bạn nha bạn ơi"
                },
            ]
        }
    },

}
</script>


<style></style>