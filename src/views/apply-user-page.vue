<template>
    <div class="apply-user-page">
        <v-row>
            <v-col style="padding-left: 25px">
                <div class="safeean-img">
                    <v-img src="@\assets\safeean_kr_logo.svg" width="190px"></v-img>
                </div>
                <div class="intro-card" style="">
                    <div class="title">세이피안 서비스 신청</div>
                    <div class="subtitle">
                        안전식품정보서비스에 필요한 기본 정보를 입력해 주세요
                        <br />세이피안 담당자가 확인하고 가입을 도와드릴게요
                        <br />
                        <br />
                        작성 중 어려움이 있으시면 고객센터(051-791-1224)로 연락주세요
                    </div>
                </div>
            </v-col>
        </v-row>

        <v-row>
            <v-col align="center">
                <v-form ref="form" v-model="valid">
                    <v-container elevation="8" rounded="lg" variant="flat">
                        <!-- <v-card elevation="8" rounded="lg" variant="flat"> -->
                        <div class="apply-card">
                            <v-row justify="center" align="center">
                                <!-- "체인이름-지점이름" -->
                                <v-col align="center" justify="center" style="">
                                    <div class="input-title">상호명</div>
                                    <v-text-field
                                        v-model="form.companyName"
                                        variant="outlined"
                                        density="compact"
                                        style="font-size: 15px !important"
                                        placeholder="'상호명-지점'으로 입력해주세요. ex) 세이피안-서면점 "
                                        :hide-details="hideDetails"
                                        :rules="[rules.required]"
                                    >
                                        <template #append>
                                            <v-expand-x-transition>
                                                <v-icon v-show="form.companyName" color="success">
                                                    mdi-check
                                                </v-icon>
                                            </v-expand-x-transition>
                                        </template>
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
                                        :hide-details="hideDetails"
                                        :rules="[rules.required]"
                                    >
                                        <template #append>
                                            <v-expand-x-transition>
                                                <v-icon v-show="form.companyCEO" color="success">
                                                    mdi-check
                                                </v-icon>
                                            </v-expand-x-transition>
                                        </template>
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
                                        :hide-details="hideDetails"
                                        :rules="[rules.required]"
                                        @input="validateCompanyCode"
                                    >
                                        <template #append>
                                            <v-expand-x-transition>
                                                <v-icon v-show="validateCompanyCode()" color="success">
                                                    mdi-check
                                                </v-icon>
                                            </v-expand-x-transition>
                                        </template>
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <!-- 파일 사이즈, 파일 개수 체크 해야됨  -->
                            <v-row justify="center" align="center">
                                <v-col align="center" justify="center">
                                    <div class="input-title">사업자등록증</div>
                                    <v-file-input
                                        v-model="companyFileOrig"
                                        label="여기를 클릭해주세요"
                                        density="compact"
                                        variant="underlined"
                                        clearable
                                        chips
                                        show-size
                                        accept="image/*, .pdf, .zip"
                                        :hide-details="hideDetails"
                                    >
                                        <template #append>
                                            <v-expand-x-transition>
                                                <v-icon v-show="companyFileOrig.length" color="success">
                                                    mdi-check
                                                </v-icon>
                                            </v-expand-x-transition>
                                        </template>
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
                                        placeholder="주소 찾기 *"
                                        :hide-details="hideDetails"
                                        :rules="[rules.required]"
                                        @click="searchAddress"
                                    >
                                        <template #append>
                                            <v-expand-x-transition>
                                                <v-icon v-show="form.companyAddr" color="success">
                                                    mdi-check
                                                </v-icon>
                                            </v-expand-x-transition>
                                        </template>
                                    </v-text-field>
                                    <v-spacer style="height: 5px"></v-spacer>
                                    <v-text-field
                                        v-model="form.detailedAddr"
                                        density="compact"
                                        variant="outlined"
                                        placeholder="상세주소 입력 *"
                                        :hide-details="hideDetails"
                                        :rules="[rules.required]"
                                    >
                                        <template #append>
                                            <v-expand-x-transition>
                                                <v-icon v-show="form.detailedAddr" color="success">
                                                    mdi-check
                                                </v-icon>
                                            </v-expand-x-transition>
                                        </template>
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <!-- @click="searchAddress" -->
                            <v-row justify="center" align="center">
                                <v-col align="center" justify="center">
                                    <div class="input-title">연락처</div>
                                    <v-text-field
                                        v-model="form.companyTEL"
                                        density="compact"
                                        variant="outlined"
                                        placeholder="'-'를 제외한 연락처를 입력해주세요"
                                        prepend-inner-icon=""
                                        maxlength="14"
                                        :hide-details="hideDetails"
                                        :rules="[rules.required]"
                                        @input="addHyphenToPhone"
                                    >
                                        <template #append>
                                            <v-expand-x-transition>
                                                <v-icon v-show="form.companyTEL" color="success">
                                                    mdi-check
                                                </v-icon>
                                            </v-expand-x-transition>
                                        </template>
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
                                        :hide-details="hideDetails"
                                        :rules="[rules.required, rules.email]"
                                        style=""
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <!-- 필수로 변경 -->
                            <v-row justify="center" align="center">
                                <v-col
                                    align="start"
                                    justify="start"
                                    style="display: flex; flex-direction: column"
                                >
                                    <div class="input-title">신청 서비스</div>
                                    <div class="input-title-items">
                                        <v-checkbox
                                            v-model="form.serviceType.food"
                                            label="세이피안푸드"
                                            style="color: black"
                                            hide-details
                                        >
                                        </v-checkbox>

                                        <v-checkbox
                                            v-model="form.serviceType.dining"
                                            label="세이피안다이닝"
                                            style="color: black"
                                            hide-details
                                        >
                                        </v-checkbox>

                                        <v-checkbox
                                            v-model="form.serviceType.school"
                                            label="세이피안스쿨"
                                            :disabled="isDisabled"
                                            indeterminate
                                            hide-details
                                        >
                                        </v-checkbox>
                                        <v-checkbox
                                            v-model="form.serviceType.meals"
                                            label="세이피안밀즈"
                                            :disabled="isDisabled"
                                            indeterminate
                                            hide-details
                                        >
                                        </v-checkbox>
                                    </div>
                                </v-col>
                            </v-row>
                        </div>
                    </v-container>
                </v-form>
                <v-btn color="primary" size="large" @click="submitForm"> 세이피안 서비스 신청하기 </v-btn>
            </v-col>
        </v-row>
        <Loader :onLoading="onLoading"></Loader>
        <informModal ref="inform" :content="informContent" time="5" />
    </div>
</template>
<script>
import * as utils from '@/utils/functions.js'
import { _xurl } from '@/settings.js'
import informModal from '@/components/inform-modal.vue'
import Loader from '@/components/Loader.vue'

export default {
    components: {
        informModal,
        Loader,
    },
    data() {
        return {
            rules: {
                required: (value) => !!value || '필수 항목입니다',
                // companyFile: (value) => {
                //     const maxCount = 1
                //     if (value.length >= maxCount) {
                //         this.companyFileOrig = value.slice(0, maxCount)
                //         // '파일은 3개까지만 업로드 가능합니다.'
                //     }
                // },
                onlyChar: (value) => {
                    const regex = /^[a-zA-Z]+$/
                    return regex.test(value) ? true : false
                },
                email: (value) => {
                    value?.trim()
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    return emailRegex.test(value) ? true : false
                },
                //'올바른 이메일 주소를 입력하세요.'
            },
            valid: false,
            informContent: '',
            hideDetails: 'none',
            onLoading: false,
            companyFileOrig: [],
            form: {
                companyName: '',
                companyCEO: '',
                companyFile: [],
                companyCode: '',
                companyTEL: '',
                companyAddr: '',
                detailedAddr: '',
                companyEmail: '',
                serviceType: {
                    food: false,
                    dining: false,
                    school: false,
                    meals: false,
                },
                //serviceType
            },
            isDisabled: true,
        }
    },
    methods: {
        searchAddress() {
            const self = this
            new window.daum.Postcode({
                oncomplete: function (data) {
                    self.form.companyAddr = data.address
                },
            }).open()
        },
        async submitForm() {
            this.$refs.form.validate()
            let areValid = this.valid
            console.log('valid' + this.valid)
            if (areValid) {
                this.onLoading = true
                // 1. check companyCode
                let data = { companyCode: this.form.companyCode }
                if (this.form.companyCode) {
                    let result = await utils.ajaxFetchJson(_xurl.checkCompanyCode, 'POST', data, null)
                    console.log('checkCompanyCode', result)
                    let resultData = await result.json()

                    if (!result.ok || !resultData.isValid) {
                        this.informContent = '사업자번호를 확인해주세요'
                        this.$refs.inform.inform().then((res) => {})
                        this.onLoading = false
                        return
                    }
                }
                // TODO-Review : 체크박스 유효성 체크
                let isValidCheckbox = this.form.serviceType.food || this.form.serviceType.dining
                if (!isValidCheckbox) {
                    this.informContent = '신청할 서비스를 선택해주세요.'
                    this.$refs.inform.inform().then((res) => {})
                    this.onLoading = false
                    return
                }
                // image upload
                if (this.companyFileOrig && Object.keys(this.companyFileOrig).length > 0) {
                    let Imagedata = {
                        images: this.companyFileOrig,
                        options: {
                            path: this.form.companyCode,
                        },
                    }
                    let result = await utils.uploadImages(Imagedata)
                    console.log('image upload', result)
                    let resultData = await result.json()

                    if (!result?.ok && !resultData?.success) {
                        console.log('이미지 업로드 실패')
                        this.informContent = '잠시후에 다시 시도해주세요'
                        this.$refs.inform.inform().then((res) => {})
                        this.onLoading = false
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
                } else {
                    this.informContent = '파일을 선택해주세요.'
                    this.$refs.inform.inform().then((res) => {})
                    this.onLoading = false
                    return
                }
                let formData = {
                    companyName: this.form.companyName,
                    companyCEO: this.form.companyCEO,
                    // path 만 저장
                    companyFile: this.form.companyFile,
                    companyCode: this.form.companyCode,
                    companyTEL: this.form.companyTEL,
                    companyAddr: this.form.companyAddr + ' ' + this.form.detailedAddr,
                    companyEmail: this.form.companyEmail,
                    serviceType: Object.keys(this.form.serviceType).filter(
                        (key) => this.form.serviceType[key]
                    ),
                }

                // submitForm
                let result = await utils.ajaxFetchJson(_xurl.submitForm, 'POST', formData, null, false)
                console.log('submitForm', result)
                this.onLoading = false

                if (!result.ok) {
                    console.log('폼 제출 실패')
                    this.informContent = '잠시후에 다시 시도해주세요'
                    this.$refs.inform.inform().then((res) => {})
                    this.onLoading = false
                    return
                }
                let submitFormData = await result.json()
                console.log('submitForm데이터 보기', submitFormData)

                // 신청 완료 페이지 이동
                this.$router.push('/apply/complete')
            } else {
                console.log('유효성 검사 실패')
                this.hideDetails = 'auto'
            }
        },
        validateCompanyCode() {
            this.form.companyCode = this.form.companyCode.replace(/[^0-9]/g, '')
            // 10자리 미만일 때
            if (this.form.companyCode.length < 10) {
                return false
            }
            // 10자리 제한
            if (this.form.companyCode.length > 10) {
                this.form.companyCode = this.form.companyCode.substring(0, 9)
            }
            return true
        },
        addHyphenToPhone() {
            this.form.companyTEL = this.form.companyTEL.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1')
            let _companyTEL = this.form.companyTEL.trim()
            if (_companyTEL.length < 4) {
                this.form.companyTEL = _companyTEL
            } else if (_companyTEL.length < 7) {
                this.form.companyTEL = _companyTEL.slice(0, 3) + '-' + _companyTEL.slice(3)
            } else if (_companyTEL.length <= 10) {
                this.form.companyTEL =
                    _companyTEL.slice(0, 3) + '-' + _companyTEL.slice(3, 6) + '-' + _companyTEL.slice(6)
            } else if (_companyTEL.length < 12) {
                this.form.companyTEL =
                    _companyTEL.slice(0, 3) + '-' + _companyTEL.slice(3, 7) + '-' + _companyTEL.slice(7)
            } else if (_companyTEL.length < 14) {
                this.form.companyTEL =
                    _companyTEL.slice(0, 4) + '-' + _companyTEL.slice(4, 8) + '-' + _companyTEL.slice(8, 12)
            }
        },
    },
}
</script>
<style>
/* 모바일 */
.apply-user-page {
    width: 93%;
    margin: 0 auto;
}
.apply-user-page .v-messages {
    text-align: left;
}
.intro-card {
    margin-top: 15px;
}
.intro-card .title {
    text-align: start;
    font-weight: 800;
    font-size: 25px;
    margin-bottom: 15px;
}
.intro-card .subtitle {
    font-size: 14px;
    text-align: start;
}
.intro-card .text {
    font-size: 16px;
    text-align: start;
}
.intro-content {
    font-size: 20px;
}
.input-title {
    font-weight: 600;
    text-align: start;
    margin-bottom: 5px;
}
.input-title-items {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

::placeholder {
    font-size: 15px;
}
/* iphone 14 PRO MAX : width - 428px, iPad Mini : width - 768px  */
/* 웹버전 */
@media (min-width: 700px) {
    .apply-user-page {
        min-width: 560px;
        width: 45%;
        margin: 0 auto;
    }
    .intro-content {
        font-size: 20px;
    }
}
</style>
