<template>
    <div>
        <v-row>
            <v-dialog :model-value="isOpen" activator="" persistent>
                <!-- <template #activator="{ on, attrs }">
                    <v-btn color="primary" dark v-bind="attrs" v-on="on"> Open Dialog </v-btn>
                </template> -->
                <v-card>
                    <v-card-title>
                        <span class="text-h5">신청정보 수정</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="4">
                                    <v-text-field
                                        v-model="form.localCompanyName"
                                        label="상호명*"
                                        required
                                        clearable
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field
                                        v-model="form.localCompanyCEO"
                                        label="대표자*"
                                        appen
                                        required
                                        clearable
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field
                                        v-model="form.localCompanyCode"
                                        label="사업자등록번호*"
                                        required
                                        clearable
                                    ></v-text-field>
                                </v-col>
                                <!-- wrap up -->
                                <v-col cols="4">
                                    <v-file-input
                                        v-model="form.localCompanyFile"
                                        label="사업자등록증*"
                                        clearable
                                        chips
                                        accept="image/*, .pdf, .zip"
                                    >
                                    </v-file-input>
                                    <ol style="display: flex; flex-direction: row">
                                        <!-- db 파일 미리보기 -->
                                        <li
                                            v-for="(file, index) in appliedCompanyDtl.companyFile"
                                            :key="index"
                                        >
                                            <div>
                                                <v-btn class="ma-2" color="red" @click="deleteFile(index)">
                                                    삭제
                                                </v-btn>
                                                <img
                                                    :src="`http://safeean.club/${file}`"
                                                    alt=""
                                                    style="
                                                        width: 300px;
                                                        margin-right: 10px;
                                                        border-radius: 2px;
                                                    "
                                                />
                                            </div>
                                        </li>
                                        <!-- 새로 등록한 파일 미리보기 -->
                                        <li v-for="(file, index) in form.localCompanyFile" :key="index">
                                            <div>
                                                <v-btn class="ma-2" color="red" @click="deleteFile(index)">
                                                    삭제
                                                </v-btn>
                                                <img
                                                    :src="previewImg(file)"
                                                    alt=""
                                                    style="
                                                        width: 300px;
                                                        margin-right: 10px;
                                                        border-radius: 2px;
                                                    "
                                                />
                                            </div>
                                        </li>
                                    </ol>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field
                                        v-model="form.localCompanyTEL"
                                        label="연락처*"
                                        required
                                        clearable
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field
                                        v-model="form.localCompanyEmail"
                                        label="이메일*"
                                        required
                                        clearable
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea
                                        v-model="form.localContent"
                                        label="특이사항*"
                                        clearable
                                    ></v-textarea>
                                </v-col>
                                <v-col cols="6">
                                    <v-select
                                        v-model="form.localStatus"
                                        :items="['신청', '진행중', '완료', '취소']"
                                        label="진행상태*"
                                        required
                                        clearable
                                    ></v-select>
                                </v-col>
                                <v-col cols="6">
                                    <v-autocomplete
                                        v-model="form.localServiceType"
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
                        <!-- <small>*indicates required field</small> -->
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue-darken-1" variant="text" @click="childCloseDialog"> Close </v-btn>
                        <v-btn color="blue-darken-1" variant="text" @click="childUpdateCompanyDtl">
                            Save
                        </v-btn>
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
                localCompanyName: '',
                localCompanyCEO: '',
                localCompanyCode: '',
                localCompanyFile: [],
                localCompanyTEL: '',
                localCompanyEmail: '',
                localContent: '',
                localStatus: '',
                localServiceType: '',
            },
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
                this.form.localCompanyName = newVal.companyName
                this.form.localCompanyCEO = newVal.companyCEO
                this.form.localCompanyCode = newVal.companyCode

                // this.form.localCompanyFile = []
                console.log('호출됨')

                this.form.localCompanyTEL = newVal.companyTEL
                this.form.localCompanyEmail = newVal.localCompanyEmail
                this.form.localContent = newVal.content
                this.form.localStatus = newVal.status
                this.form.localServiceType = newVal.serviceType
            },
            immediate: true,
        },
    },
    methods: {
        childCloseDialog() {
            this.$emit('closeDialog')
        },
        // uploadImages(event) {
        //     this.form.localCompanyFile.push(this.uploadedFile[0].name)
        //     console.log('새로운 파일 확인', this.form.localCompanyFile)
        // },
        deleteFile(index) {
            this.form.localCompanyFile.splice(index)
        },
        childUpdateCompanyDtl() {
            this.$emit('closeDialog')
            this.$emit('updateCompanyDtl', this.form)
        },
        previewImg(file) {
            new Promise((resolve, reject) => {
                const reader = new FileReader()

                reader.onload = () => {
                    const dataURL = reader.result
                    resolve(dataURL)
                }

                reader.onerror = (error) => {
                    reject(error)
                }

                return reader.readAsDataURL(file)
            })
        },
    },
}
</script>
<style scoped>
.v-card {
    width: 1074px;
}
</style>
