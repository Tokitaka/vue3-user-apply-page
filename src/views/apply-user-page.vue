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
                <v-form ref="form" v-model="valid">
                    <v-card elevation="8" rounded="lg" variant="flat">
                        <div class="apply-card">
                            <v-row justify="center" align="center">
                                <!-- "체인이름-지점이름" -->
                                <v-col align="center" justify="center" style="">
                                    <div class="input-title">상호명</div>
                                    <v-text-field
                                        v-model="form.companyName"
                                        variant="outlined"
                                        density="compact"
                                        placeholder="'상호명-지점'으로 입력해주세요. ex) 세이피안-서면점 "
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
                                        v-model="form.companyCEO"
                                        density="compact"
                                        variant="outlined"
                                        placeholder="대표자 *"
                                        hide-details="none"
                                        :rules="[rules.required]"
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>

                            <v-row justify="center" align="center">
                                <v-col align="center" justify="center">
                                    <div class="input-title">사업자등록번호</div>
                                    <v-text-field
                                        v-model="form.companyCode"
                                        density="compact"
                                        variant="outlined"
                                        placeholder="사업자등록번호 *"
                                        maxlength="10"
                                        hide-details="none"
                                        :rules="[rules.required]"
                                        @input="validateCompanyNum"
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <!-- 파일 사이즈, 파일 개수 체크 해야됨  -->
                            <v-row justify="center" align="center">
                                <v-col align="center" justify="center">
                                    <div class="input-title">사업자등록증</div>
                                    <v-file-input
                                        v-model="companyFileOrig"
                                        multiple
                                        label="여기를 클릭해주세요"
                                        density="compact"
                                        variant="underlined"
                                        clearable
                                        accept="image/*, .pdf, .zip"
                                        hide-details="none"
                                        max-files="3"
                                        :rules="[rules.required]"
                                        @input="maxFileCount"
                                    >
                                    </v-file-input>
                                </v-col>
                            </v-row>

                            <v-row justify="center" align="center">
                                <v-col align="center" justify="center">
                                    <div class="input-title">주소</div>
                                    <v-text-field
                                        v-model="form.companyAddr"
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
                                        v-model="form.companyTEL"
                                        density="compact"
                                        variant="outlined"
                                        placeholder="'-'를 제외한 연락처를 입력해주세요"
                                        prepend-inner-icon=""
                                        hide-details="none"
                                        maxlength="14"
                                        :rules="[rules.required]"
                                        @input="addHyphenToPhone"
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>

                            <v-row justify="center" align="center">
                                <v-col align="center" justify="center">
                                    <div class="input-title">이메일</div>
                                    <v-text-field
                                        v-model="form.companyEmail"
                                        type="email"
                                        density="compact"
                                        variant="outlined"
                                        placeholder="이메일 *"
                                        prepend-inner-icon=""
                                        hide-details="none"
                                        :rules="[rules.required, rules.email]"
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>

                            <v-row justify="center" align="center">
                                <v-col cols="2" align="center" justify="center">
                                    <span>신청 서비스</span>
                                </v-col>
                                <v-col cols="8" style="display: flex">
                                    <v-checkbox v-model="form.serviceType.food" label="세이피안">
                                    </v-checkbox>
                                    <v-checkbox v-model="form.serviceType.dining" label="세이피안 다이닝">
                                    </v-checkbox>
                                </v-col>
                            </v-row>
                        </div>
                    </v-card>
                </v-form>
                <v-btn color="primary" size="large" @click="submitForm"> 세이피안 서비스 신청하기 </v-btn>
            </v-col>
        </v-row>
        <!-- <informModal ref="inform" :content="informContent" time="3" /> -->
    </div>
</template>
<script>
import * as utils from '@/utils/functions.js'
import { _xurl } from '@/settings.js'

export default {
    data() {
        return {
            rules: {
                required: (value) => !!value || '필수 항목입니다',
                onlyChar: (value) => {
                    const regex = /^[a-zA-Z]+$/
                    return regex.test(value) ? true : false
                },
                email: (value) => {
                    value?.trim()
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    return emailRegex.test(value) ? true : '올바른 이메일 주소를 입력하세요.'
                },
            },
            // informContent: '',
            valid: false,
            companyFileOrig: [],
            form: {
                companyName: '테스트이름',
                companyCEO: '테스트이름',
                companyFile: [],
                companyCode: '123456789',
                companyTEL: '테스트이름',
                companyAddr: '테스트이름',
                companyEmail: '테스트이름@gmail.com',
                serviceType: {
                    food: false,
                    dining: false,
                },
                //serviceType
            },
        }
    },
    methods: {
        async submitForm() {
            this.$refs.form.validate()
            let areValid = this.valid

            if (areValid) {
                // check companyCode
                let data = { companyCode: this.form.companyCode }
                if (this.form.companyCode) {
                    let result = await utils.ajaxFetchJson(_xurl.checkCompanyCode, 'POST', data, null)
                    console.log('checkCompanyCode', result)
                    let resultData = await result.json()

                    if (!result.ok || !resultData.isValid === 'false') {
                        // this.informContent = '이미 존재하는 사업자등록번호 입니다'
                        // this.$refs.inform.inform().then((res) => {})
                        return
                    }
                }

                // image upload
                if (this.companyFileOrig) {
                    console.log('파일원본 확인', this.companyFileOrig)
                    let Imagedata = {
                        images: this.companyFileOrig,
                        options: {
                            path: this.form.companyCode,
                        },
                    }
                    let result = await utils.uploadImages(Imagedata)
                    console.log('image upload', result)
                    let resultData = await result.json()

                    if (!result.ok && !resultData.success) {
                        // this.informContent = '이미지 업로드에 실패하였습니다'
                        // this.$refs.inform.inform().then((res) => {})
                        return
                    }
                    console.log('upload된 파일 보기', resultData)
                    console.log('path 추가')
                    // path 추가
                    if (resultData?.data) {
                        for (const item of resultData.data) {
                            let imagePath = item.path
                            console.log('image path 확인', imagePath)
                            this.form.companyFile.push(imagePath)
                        }
                    }
                }

                let formData = {
                    companyName: this.form.companyName,
                    companyCEO: this.form.companyCEO,
                    // path 만 저장
                    companyFile: this.form.companyFile,
                    companyCode: this.form.companyCode,
                    companyTEL: this.form.companyTEL,
                    companyAddr: this.form.companyAddr,
                    companyEmail: this.form.companyEmail,
                    serviceType: Object.keys(this.form.serviceType).filter(
                        (key) => this.form.serviceType[key]
                    ),
                }
                // submitForm
                let result = await utils.ajaxFetchJson(_xurl.submitForm, 'POST', formData, null, false)
                console.log('submitForm', result)
                if (!result.ok) {
                    // this.informContent = '신청 중 오류가 발생하였습니다'
                    // this.$refs.inform.inform().then((res) => {})
                    return
                }
                let submitFormData = await result.json()
                console.log('submitForm데이터 보기', submitFormData)
                // 신청 완료 페이지 이동
            } else {
                console.log('유효성 검사 실패')
                // this.informContent = '입력한 내용을 다시 확인해주세요'
                // this.$refs.inform.inform().then((res) => {})
            }
        },
    },
    validateCompanyNum() {
        this.form.companyCode = this.form.companyCode.replace(/[^0-9]/g, '')
        if (this.form.companyCode.length > 10) {
            this.form.companyCode = this.form.companyCode.substring(0, 9)
        }
    },
    maxFileCount() {
        const maxCount = 3
        return this.form.companyFile.length <= maxCount || '파일은 3개까지만 업로드 가능합니다.'
    },
    addHyphenToPhone() {
        // this.form.phone = this.form.phone.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
        this.form.companyTEL = this.form.companyTEL.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1')

        let _companyTEL = this.form.companyTEL
        this.form.companyTEL = this.form.companyTEL.trim()

        if (_companyTEL.length < 4) {
            this.form.companyTEL = _companyTEL
        } else if (_companyTEL.length < 7) {
            this.form.companyTEL = _companyTEL.slice(0, 3) + '-' + _companyTEL.slice(3)
        } else if (_companyTEL.length <= 10) {
            this.companyTEL =
                _companyTEL.slice(0, 3) + '-' + _companyTEL.slice(3, 6) + '-' + _companyTEL.slice(6)
        } else if (_companyTEL.length < 12) {
            this.companyTEL =
                _companyTEL.slice(0, 3) + '-' + _companyTEL.slice(3, 7) + '-' + _companyTEL.slice(7)
        } else if (_companyTEL.length < 14) {
            this.companyTEL =
                _companyTEL.slice(0, 4) + '-' + _companyTEL.slice(4, 8) + '-' + _companyTEL.slice(8, 12)
        }
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
