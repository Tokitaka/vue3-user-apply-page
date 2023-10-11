<template>
    <div>
        <v-row>
            <v-dialog :model-value="isOpen" activator="" persistent>
                <v-card>
                    <v-card-title style="display: flex; justify-content: space-between">
                        <span class="text-h5">신청정보 수정</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="4">
                                    <v-text-field
                                        v-model="form.companyName"
                                        label="상호명*"
                                        required
                                        clearable
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field
                                        v-model="form.companyCEO"
                                        label="대표자*"
                                        appen
                                        required
                                        clearable
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field
                                        v-model="form.companyCode"
                                        label="사업자등록번호*"
                                        required
                                        clearable
                                    ></v-text-field>
                                </v-col>
                                <!-- wrap up -->

                                <v-col cols="4">
                                    <v-text-field
                                        v-model="form.companyTEL"
                                        label="연락처*"
                                        required
                                        clearable
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field
                                        v-model="form.companyEmail"
                                        label="이메일*"
                                        required
                                        clearable
                                    ></v-text-field>
                                </v-col>
                                <v-row>
                                    <v-col cols="4">
                                        <div class="ml-2" style="width: 891px">
                                            <div v-show="isLinkOpen">
                                                <div style="font-weight: 600">사업자등록증 다운로드 :</div>
                                                <div
                                                    v-for="(file, index) in appliedCompanyDtl.companyFile"
                                                    :key="index"
                                                >
                                                    <a
                                                        :href="`http://safeean.club${file}`"
                                                        download
                                                        target="_blank"
                                                    >
                                                        http://safeean.club{{ file }}
                                                    </a>
                                                </div>
                                            </div>
                                            <div>
                                                <v-btn
                                                    class="ma-2"
                                                    color="blue"
                                                    @click="isInputOpen = !isInputOpen"
                                                >
                                                    수정
                                                </v-btn>
                                                <span v-show="isUploadedOpen">
                                                    {{ form.companyFile[0].name }}
                                                </span>
                                                <v-btn
                                                    v-show="isInputOpen"
                                                    class="ma-2"
                                                    color="red"
                                                    @click="updateFile"
                                                >
                                                    완료
                                                </v-btn>
                                            </div>
                                            <v-col>
                                                <v-file-input
                                                    v-show="isInputOpen"
                                                    ref="fileInput"
                                                    v-model="uploadedFile"
                                                    label="사업자등록증*"
                                                    clearable
                                                    chips
                                                    accept="image/*, .pdf, .zip"
                                                >
                                                </v-file-input>
                                            </v-col>
                                        </div>
                                    </v-col>
                                </v-row>
                                <v-col cols="12">
                                    <v-textarea
                                        v-model="form.content"
                                        label="특이사항*"
                                        clearable
                                    ></v-textarea>
                                </v-col>
                                <v-col cols="6">
                                    <v-select
                                        v-model="form.status"
                                        :items="['신청', '진행중', '완료', '취소']"
                                        label="진행상태*"
                                        required
                                        clearable
                                    ></v-select>
                                </v-col>
                                <v-col cols="6">
                                    <v-autocomplete
                                        v-model="form.serviceType"
                                        :items="filteredServiceTypes"
                                        label="신청서비스*"
                                        multiple
                                        required
                                        clearable
                                        item-title="name"
                                        item-value="name"
                                    ></v-autocomplete>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue-darken-1" variant="text" @click="childUpdateCompanyDtl">
                            Save
                        </v-btn>
                        <v-btn color="blue-darken-1" variant="text" @click="childCloseDialog"> Close </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>
<script>
export default {
    props: {
        appliedCompanyDtl: Object,
        isOpen: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            form: {
                idx: 0,
                companyName: '',
                companyCEO: '',
                companyCode: '',
                companyFile: [],
                companyTEL: '',
                companyEmail: '',
                content: '',
                status: '',
                serviceType: [],
            },
            uploadedFile: [],
            isInputOpen: false,
            isLinkOpen: true,
            isUploadedOpen: false,
            serviceTypes: [
                { name: '세이피안', disabled: false },
                { name: '세이피안다이닝', disabled: false },
                { name: '세이피안스쿨', disabled: true },
                { name: '세이피안밀즈', disabled: true },
            ],
        }
    },
    computed: {
        filteredServiceTypes() {
            return this.serviceTypes.filter((item) => !item.disabled)
        },
    },
    watch: {
        appliedCompanyDtl: {
            handler(newVal, oldVal) {
                this.form.idx = newVal.idx
                this.form.companyName = newVal.companyName
                this.form.companyCEO = newVal.companyCEO
                this.form.companyCode = newVal.companyCode
                this.form.companyFile = newVal.companyFile
                console.log(this.form.companyFile)
                console.log('호출됨')
                this.form.companyTEL = newVal.companyTEL
                this.form.companyEmail = newVal.companyEmail
                this.form.content = newVal.content
                this.form.status = newVal.status
                this.form.serviceType = newVal.serviceType
            },
            immediate: true,
        },
    },
    methods: {
        childCloseDialog() {
            this.$emit('closeDialog')
        },
        childUpdateCompanyDtl() {
            this.$emit('closeDialog')
            this.$emit('updateCompanyDtl', this.form)
        },
        updateFile() {
            this.form.companyFile = []

            this.form.companyFile.push(...this.uploadedFile)

            this.isInputOpen = false
            this.isLinkOpen = false
            this.isUploadedOpen = true
        },
    },
}
</script>
<style scoped>
.v-card {
    width: 1074px;
}
</style>
