<template>
    <!-- About me -->
    <div class="about">
        <div v-if="isMobile" class="a">
            <!-- <span>Về tôi dv</span> -->
            <img src="/src/assets/logo.png" alt="">
        </div>
        <div v-else class="a">
            <span>Về tôi</span>
            <img src="/src/assets/logo.png" alt="">
        </div>
        <p>Chào mọi người, mình là Đoàn Minh Hiếu đang là một lập trình viên ở Sài Gòn. Mình “thít” nhiếp ảnh, nói
            chuyện phiến, guitar và có tò mò về thế giới rộng lớn.</p>
        <p>Trước đây, mình học và lớn lên ở Bình Dương, từng tham gia nghiên cứu khoa học ở cấp tỉnh (nhưng bị rớt) sau
            đó theo học (2021-2025) tại đại học Công Nghệ Hồ Chí Minh (Hutech) . Hiện tại mình đang sinh sống và làm
            việc tại Sài Gòn và đang làm lập trình viên “fresher” tại một công ty trong nước (*3*).</p>
        <ul>Trang blog này tập trung vào những nội dung:
            <li>Lập trình.</li>
            <li>Tự sự.</li>
            <li>Loanh quanh Sài Gòn. </li>
            <li>Nhiếp ảnh.</li>
        </ul>
        <ul>Các bạn có thể xem thêm hình ảnh của mình tại đây nha.
            <li>instagram.</li>
            <li>facebook.</li>
        </ul>
        <p>Chỉ có như zị. Cảm ơn bạn đã ghé trang của mình nha ^^</p>
    </div>
</template>

<script>
import { inject, computed } from "vue";

export default {
    props: ["width"],
    computed: {
        isMobile() {
            return this.width <= 430;
        },
        isTablet() {
            return this.width > 768 && this.width <= 1024;
        }
    }
}
</script>

<style></style>