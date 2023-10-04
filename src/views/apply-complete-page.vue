<template>
    <div id="apply-complete-page">
        <div>
            <transition name="bounce" appear>
                <v-icon class="v-icon" size="170" icon="mdi-phone"> </v-icon>
            </transition>
        </div>
        <div class="guide-content">
            <span> <b>성공적으로</b> <br /><b>접수되었습니다.</b></span> <br />
            <br />
            <span style="font-size: 18px">
                기재한 연락처로 3 영업일 이내에 <br />
                안내 연락이 있을 예정입니다. <br />
            </span>
        </div>
        <div class="logo-image">
            <v-img src="@\assets\safeean_kr_logo.svg" width="170px"></v-img>
        </div>
        <!-- <div style="justify-self: flex-end">
            <v-img src="@\assets\safeean_kr_logo.svg" width="190px"></v-img>
        </div> -->
    </div>
</template>
<script>
export default {}
</script>
<style scoped>
.bounce-enter-active {
    animation: bounce-in 0.9s;
}
@keyframes bounce-in {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.25);
    }
    100% {
        transform: scale(1);
    }
}
#apply-complete-page {
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
#apply-complete-page .v-icon {
    border: 5px solid;
    border-radius: 40%;
    padding: 10px;
    margin-bottom: 30px;
}
#apply-complete-page .guide-content {
    font-size: 20px;
    margin-bottom: 30px;
}
.logo-image {
    margin-top: 80px;
}
/* .guide-button {
    border-radius: 20%;
    background-color: white;
    width: 50px;
} */
</style>
