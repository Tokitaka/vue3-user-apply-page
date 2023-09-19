<template>
    <div>
        <v-row>
            <v-col align="center">
                <v-img max-width="228" src="@\assets\header_logo_kor.png"></v-img>
            </v-col>
        </v-row>
        <v-row>
            <v-col align="center">
                <v-form ref="form">
                    <v-card class="px-5" elevation="8" width="70%" rounded="lg" variant="outlined">
                        <div style="padding: 35px">
                            <v-row justify="center" align="center" width="70%">
                                <v-col cols="2" align="center" justify="center">
                                    <span>상호명</span>
                                </v-col>
                                <v-col cols="8" align="center" justify="center">
                                    <v-text-field
                                        v-model="bizName"
                                        density="compact"
                                        variant="outlined"
                                        placeholder="'체인이름-지점이름' 으로 입력해주세요"
                                        prepend-inner-icon=""
                                        :rules="[rules.required]"
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>

                            <v-row justify="center" align="center">
                                <v-col cols="2" align="center" justify="center">
                                    <span>대표자</span>
                                </v-col>
                                <v-col cols="8" align="center" justify="center">
                                    <v-text-field
                                        v-model="owner"
                                        density="compact"
                                        variant="outlined"
                                        placeholder="대표자를 입력해주세요"
                                        prepend-inner-icon=""
                                        :rules="[rules.required]"
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row justify="center" align="center">
                                <v-col cols="2" align="center" justify="center">
                                    <span>사업자등록번호</span>
                                </v-col>
                                <v-col cols="8" align="center" justify="center">
                                    <v-text-field
                                        v-model="bizNum"
                                        density="compact"
                                        variant="outlined"
                                        placeholder="'-'를 제외한 사업자등록번호를 입력해주세요"
                                        prepend-inner-icon=""
                                        :rules="[rules.required]"
                                        @input="validateBizNum"
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row justify="center" align="center">
                                <v-col cols="2" align="center" justify="center">
                                    <span>사업자등록증</span>
                                </v-col>
                                <v-col cols="8" align="center" justify="center">
                                    <v-file-input
                                        v-model="bizRegistration"
                                        multiple
                                        label="여기를 클릭해주세요"
                                        density="compact"
                                        variant="underlined"
                                        prepend-inner-icon=""
                                        :rules="[rules.required]"
                                    >
                                    </v-file-input>
                                </v-col>
                            </v-row>

                            <v-row justify="center" align="center">
                                <v-col cols="2" align="center" justify="center">
                                    <span>주소</span>
                                </v-col>
                                <v-col cols="8" align="center" justify="center">
                                    <v-text-field
                                        v-model="address"
                                        density="compact"
                                        variant="outlined"
                                        placeholder="주소를 입력해주세요"
                                        prepend-inner-icon=""
                                        :rules="[rules.required]"
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row justify="center" align="center">
                                <v-col cols="2" align="center" justify="center">
                                    <span>연락처</span>
                                </v-col>
                                <v-col cols="8" align="center" justify="center">
                                    <v-text-field
                                        v-model="phoneNum"
                                        density="compact"
                                        variant="outlined"
                                        placeholder="'-'를 제외한 연락처를 입력해주세요"
                                        prepend-inner-icon=""
                                        :rules="[rules.required]"
                                        @input="validatePhoneNum"
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row justify="center" align="center">
                                <v-col cols="2" align="center" justify="center">
                                    <span>이메일</span>
                                </v-col>
                                <v-col cols="8" align="center" justify="center">
                                    <v-text-field
                                        v-model="email"
                                        type="email"
                                        density="compact"
                                        variant="outlined"
                                        placeholder="이메일을 입력해주세요"
                                        prepend-inner-icon=""
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
                                    <v-checkbox v-model="isCheckedNormal" label="세이피안"> </v-checkbox>
                                    <v-checkbox v-model="isCheckedDining" label="세이피안 다이닝">
                                    </v-checkbox>
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
                required: (value) => !!value || '필수 입력 란입니다',
                email: (value) => {
                    if (value) {
                        // .c 까지 입력하면 block 안됨
                        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
                        if (!emailRegex.test(value)) return '올바른 이메일 주소 형식이 아닙니다'
                        return true
                    }
                },
            },
            bizName: '',
            owner: '',
            bizRegistration: '',
            bizNum: '',
            phoneNum: '',
            address: '',
            email: '',
            isCheckedNormal: false,
            isCheckedDining: false,
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
span {
    font-size: 13px;
}
</style>
