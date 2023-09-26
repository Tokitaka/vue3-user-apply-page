<template>
    <div id="apply-complete-page">
        <div>
            <v-icon class="v-icon" size="130" color="white" style=""> mdi-phone </v-icon>
        </div>
        <div class="guide-content">
            기재한 연락처로 3 영업일 이내에 <br />
            안내 연락이 있을 예정입니다.
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
    height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
#apply-complete-page .v-icon {
    border: 3px solid;
    border-radius: 50%;
    padding: 10px;
    margin-bottom: 30px;
}
#apply-complete-page .guide-content {
    font-size: larger;
    margin-bottom: 30px;
}
/* .guide-button {
    border-radius: 20%;
    background-color: white;
    width: 50px;
} */
</style>
