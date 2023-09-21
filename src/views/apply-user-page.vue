<template>
    <div class="apply-user-page">
        <v-row>
            <v-col>
                <div class="safeean-img">
                    <v-img src="@\assets\ms-icon-70x70.png" max-width="73px"></v-img>
                </div>
                <div class="intro-card" style="">
                    <div class="title">세이피안 서비스 신청</div>
                    <div class="subtitle">
                        QR스캔 한번으로 안전한 식품정보를 제공받아보세요.
                        <br />작성 중 어려움이 있으시면 고객만족센터(000-0000)로 연락주세요.
                    </div>
                </div>
            </v-col>
        </v-row>

        <v-row>
            <v-col align="center">
                <v-form ref="form">
                    <v-card elevation="8" rounded="lg" variant="flat">
                        <div class="apply-card">
                            <v-row justify="center" align="center">
                                <!-- "체인이름-지점이름" -->
                                <v-col align="center" justify="center" style="">
                                    <div class="input-title">상호명</div>
                                    <v-text-field
                                        v-model="companyName"
                                        variant="outlined"
                                        density="compact"
                                        placeholder="상호명 *"
                                        prepend-inner-icon=""
                                        hide-details="none"
                                        :rules="[rules.required]"
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row justify="center" align="center">
                                <v-col align="center" justify="center">
                                    <div class="input-title">대표자</div>
                                    <v-text-field
                                        v-model="companyCEO"
                                        density="compact"
                                        variant="outlined"
                                        placeholder="대표자 *"
                                        hide-details="none"
                                        prepend-inner-icon=""
                                        :rules="[rules.required]"
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>

                            <v-row justify="center" align="center">
                                <v-col align="center" justify="center">
                                    <div class="input-title">사업자등록번호</div>
                                    <v-text-field
                                        v-model="companyCode"
                                        density="compact"
                                        variant="outlined"
                                        placeholder="사업자등록번호 *"
                                        prepend-inner-icon=""
                                        hide-details="none"
                                        :rules="[rules.required]"
                                        @input="validateBizNum"
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>

                            <v-row justify="center" align="center">
                                <v-col align="center" justify="center">
                                    <div class="input-title">사업자등록증</div>
                                    <v-file-input
                                        v-model="companyFile"
                                        multiple
                                        label="여기를 클릭해주세요"
                                        density="compact"
                                        variant="underlined"
                                        hide-details="none"
                                        prepend-inner-icon=""
                                        :rules="[rules.required]"
                                    >
                                    </v-file-input>
                                </v-col>
                            </v-row>

                            <v-row justify="center" align="center">
                                <v-col align="center" justify="center">
                                    <div class="input-title">주소</div>
                                    <v-text-field
                                        v-model="companyAddr"
                                        density="compact"
                                        variant="outlined"
                                        placeholder="주소 *"
                                        hide-details="none"
                                        prepend-inner-icon=""
                                        :rules="[rules.required]"
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>

                            <v-row justify="center" align="center">
                                <v-col align="center" justify="center">
                                    <div class="input-title">연락처</div>
                                    <v-text-field
                                        v-model="companyTEL"
                                        density="compact"
                                        variant="outlined"
                                        placeholder="'-'를 제외한 연락처를 입력해주세요"
                                        prepend-inner-icon=""
                                        hide-details="none"
                                        :rules="[rules.required]"
                                        @input="validatePhoneNum"
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>

                            <v-row justify="center" align="center">
                                <v-col align="center" justify="center">
                                    <div class="input-title">이메일</div>
                                    <v-text-field
                                        v-model="companyEmail"
                                        type="email"
                                        density="compact"
                                        variant="outlined"
                                        placeholder="이메일 *"
                                        prepend-inner-icon=""
                                        hide-details="none"
                                        :rules="[rules.required, rules.email]"
                                        @input="validateEmail"
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>

                            <v-row justify="center" align="center">
                                <v-col cols="2" align="center" justify="center">
                                    <span>신청 서비스</span>
                                </v-col>
                                <v-col cols="8" style="display: flex">
                                    <v-checkbox v-model="food" label="세이피안"> </v-checkbox>
                                    <v-checkbox v-model="dining" label="세이피안 다이닝"> </v-checkbox>
                                </v-col>
                            </v-row>
                            <v-btn color="primary" size="large"> 세이피안 서비스 신청하기 </v-btn>
                        </div>
                    </v-card>
                </v-form>
            </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            rules: {
                required: (value) => !!value || '',
                email: (value) => {
                    if (value) {
                        // .c 까지 입력하면 block 안됨
                        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
                        if (!emailRegex.test(value)) return '올바른 이메일 주소 형식이 아닙니다'
                        return true
                    }
                },
            },
            companyName: '',
            companyCEO: '',
            companyFile: '',
            companyCode: '',
            companyTEL: '',
            companyAddr: '',
            companyEmail: '',
            //serviceType
            food: false,
            dining: false,
        }
    },
    methods: {
        validateBizNum() {
            this.bizNum = this.bizNum.replace(/[^0-9]/g, '')
            if (this.bizNum.length > 10) {
                this.bizNum = this.bizNum.substring(0, 9)
            }
        },
        validatePhoneNum() {
            this.bizNum = this.bizNum.replace(/[^0-9]/g, '')
        },
    },
}
</script>
<style>
/* 모바일 */
.apply-user-page {
    width: 95%;
    margin: 0 auto;
}
.intro-content {
    font-size: 20px;
}
.input-title {
    text-align: start;
    margin-bottom: 5px;
}
.safeean-img {
}
.intro-card {
    margin-top: 9px;
}
.intro-card .title {
    text-align: start;
    font-weight: 800;
    font-size: 26px;
    margin-bottom: 6px;
}
.intro-card .subtitle {
    font-size: 15px;
    text-align: start;
}
.intro-card .text {
    font-size: 16px;
    text-align: start;
}
::placeholder {
    font-size: 15px;
}
/* iphone 14 PRO MAX : width - 428px, iPad Mini : width - 768px  */
/* 웹버전 */
@media (min-width: 700px) {
    .apply-user-page {
        min-width: 400px;
        width: 45%;
        margin: 0 auto;
    }
    .intro-content {
        font-size: 20px;
    }
}
</style>
