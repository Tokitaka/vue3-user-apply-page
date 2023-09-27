<template>
    <div id="apply-complete-page">
        <div class="logo-image">
            <v-img src="@\assets\safeean_kr_logo.svg" width="170px"></v-img>
        </div>
        <div>
            <v-icon class="v-icon" size="170" icon="mdi-phone"> </v-icon>
        </div>
        <div class="guide-content">
            <b>신청이 완료되었습니다.</b> <br />
            <br />
            기재한 연락처로 3 영업일 이내에 <br />
            안내 연락이 있을 예정입니다. <br />
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
#apply-complete-page {
    height: 80vh;
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
    margin-bottom: 80px;
}
/* .guide-button {
    border-radius: 20%;
    background-color: white;
    width: 50px;
} */
</style>
