<template>
    <div id="login-page" class="mobile-container">
        <v-card class="v-card-login" elevation="1" min-width="500">
            <v-card-title class="py-5 font-weight-black"> 유저 code 입력 </v-card-title>
            <v-card-text>
                <v-text-field
                    v-model="adminCode"
                    label="user code"
                    variant="outlined"
                    type="password"
                    hide-details
                ></v-text-field>
                <div v-if="errorText" class="mt-2 ml-2 error-message">{{ errorText }}</div>
                <v-checkbox v-model="rememberCode" label="코드 기억하기"></v-checkbox>
                <v-btn
                    :disabled="loading"
                    :loading="loading"
                    block
                    color="primary"
                    size="x-large"
                    variant="flat"
                    @click="loginForm"
                >
                    다음으로
                </v-btn>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            adminCode: '',
            loading: false,
            rememberCode: false,
            errorText: '',
        }
    },
    created() {
        const savedCode = localStorage.getItem('adminCode')
        if (savedCode) {
            this.adminCode = savedCode
        }
    },
    methods: {
        loginForm() {
            this.loading = true
            if (this.adminCode === process.env.VUE_APP_ADMIN_CODE) {
                if (this.rememberCode) {
                    localStorage.setItem('adminCode', this.adminCode)
                }
                this.$router.push('/admin/mobile/main')
                console.log('success')
                return (this.loading = false)
            } else {
                console.log('failed')
                this.errorText = '코드를 다시 확인해주세요'
                return (this.loading = false)
            }
        },
    },
}
</script>
<style>
.mobile-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.v-card-login {
    width: 60%;
}

@media (min-width: 600px) {
    .v-card-login {
        width: 35%;
    }
}
</style>
<style scoped>
h2 {
    margin-bottom: 25px;
    font-weight: 900;
    color: #3a7337;
    font-size: 8px;
}
.error-message {
    color: #3a7337;
    text-align: left;
}
</style>
