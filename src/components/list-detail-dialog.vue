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
                                        v-model="temporal.companyName"
                                        label="상호명*"
                                        required
                                        clearable
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field
                                        v-model="temporal.companyCEO"
                                        label="대표자*"
                                        appen
                                        required
                                        clearable
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field
                                        v-model="temporal.companyCode"
                                        label="사업자등록번호*"
                                    ></v-text-field>
                                </v-col>
                                <!-- wrap up -->

                                <v-col cols="4">
                                    <v-text-field
                                        v-model="temporal.companyTEL"
                                        label="연락처*"
                                        required
                                        clearable
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field
                                        v-model="temporal.companyEmail"
                                        label="이메일*"
                                        required
                                        clearable
                                    ></v-text-field>
                                </v-col>
                                <v-row>
                                    <v-col cols="4">
                                        <div class="ml-2" style="width: 891px">
                                            <div v-show="!isInputOpen">
                                                <div style="font-weight: 600">사업자등록증 다운로드 :</div>
                                                <div
                                                    v-for="(file, index) in appliedCompanyDtl.companyFile"
                                                    :key="index"
                                                >
                                                    <a :href="`${imageUrl}${file}`" download target="_blank">
                                                        {{ imageUrl + file }}
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
                                                <span v-show="isInputOpen">
                                                    {{ uploadedFile.length > 0 ? uploadedFile[0].name : '' }}
                                                </span>
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
                                        v-model="temporal.content"
                                        label="특이사항*"
                                        clearable
                                    ></v-textarea>
                                </v-col>
                                <v-col cols="6">
                                    <v-select
                                        v-model="temporal.status"
                                        :items="['신청', '진행중', '완료', '취소']"
                                        label="진행상태*"
                                        required
                                        clearable
                                    ></v-select>
                                </v-col>
                                <v-col cols="6">
                                    <v-autocomplete
                                        v-model="temporal.serviceType"
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
                serviceType: '',
            },
            temporal: {
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
                this.temporal.idx = newVal.idx
                this.temporal.companyName = newVal.companyName
                this.temporal.companyCEO = newVal.companyCEO
                this.temporal.companyCode = newVal.companyCode
                this.temporal.companyFile = newVal.companyFile
                this.temporal.companyTEL = newVal.companyTEL
                this.temporal.companyEmail = newVal.companyEmail
                this.temporal.status = newVal.status
                this.temporal.serviceType = newVal.serviceType
            },
            immediate: true,
        },
        'temporal.companyName': {
            handler(newVal, oldVal) {
                this.form.companyName = this.temporal.companyName
            },
        },
        'temporal.companyCEO': {
            handler(newVal, oldVal) {
                this.form.companyCEO = this.temporal.companyCEO
            },
        },
        'temporal.companyCode': {
            handler(newVal, oldVal) {
                this.form.companyCode = this.temporal.companyCode
            },
        },
        'temporal.companyTEL': {
            handler(newVal, oldVal) {
                this.form.companyTEL = this.temporal.companyTEL
            },
        },
        'temporal.companyEmail': {
            handler(newVal, oldVal) {
                this.form.companyEmail = this.temporal.companyEmail
            },
        },
        'temporal.content': {
            handler(newVal, oldVal) {
                this.form.content = this.temporal.content
            },
        },
        'temporal.status': {
            handler(newVal, oldVal) {
                this.form.status = this.temporal.status
            },
        },
        'temporal.serviceType': {
            handler(newVal, oldVal) {
                this.form.serviceType = this.temporal.serviceType
            },
        },
    },
    methods: {
        childCloseDialog() {
            this.clearForm()
            this.$emit('closeDialog')
        },
        childUpdateCompanyDtl() {
            const { idx, companyFile, ...rest } = this.form
            const selectedAttributes = {
                idx: this.temporal.idx,
            }

            if (this.uploadedFile.length > 0) {
                console.log('inside', this.uploadedFile.slice())
                selectedAttributes.companyFile = this.uploadedFile.slice()
            }
            console.log('outside')
            console.log('real update selectedFile', selectedAttributes.companyFile)
            for (const key in rest) {
                if (rest[key] !== undefined && rest[key] !== null && rest[key] !== '') {
                    selectedAttributes[key] = rest[key]
                }
            }
            console.log('selectedAttributes 확인', selectedAttributes)
            this.$emit('closeDialog')
            this.$emit('updateCompanyDtl', selectedAttributes)
        },
        clearForm() {
            this.isInputOpen = false
            this.uploadedFile = []
            this.form = {
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
            }
            this.temporal = {
                idx: 0,
                companyName: '',
                companyCEO: '',
                companyCode: '',
                companyFile: [],
                companyTEL: '',
                content: '',
                companyEmail: '',
                status: '',
                serviceType: [],
            }
        },
    },
}
</script>
<style scoped>
.v-card {
    width: 1074px;
}
</style>
