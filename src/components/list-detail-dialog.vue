<template>
    <div>
        <v-row>
            <v-dialog :model-value="isOpen" activator="" persistent width="1024">
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
                                    <v-input-field
                                        v-model="form.localCompanyFile"
                                        label="사업자등록증*"
                                        required
                                        clearable
                                    ></v-input-field>
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
                                        :items="[
                                            '세이피안',
                                            '세이피안다이닝',
                                            '세이피안스쿨',
                                            '세이피안밀즈',
                                        ]"
                                        label="신청서비스*"
                                        multiple
                                        required
                                        clearable
                                    ></v-autocomplete>
                                </v-col>
                            </v-row>
                        </v-container>
                        <!-- <small>*indicates required field</small> -->
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue-darken-1" variant="text" @click="childCloseDialog"> Close </v-btn>
                        <v-btn color="blue-darken-1" variant="text" @click="updateDialog"> Save </v-btn>
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
                localCompanyFile: '',
                localCompanyTEL: '',
                localCompanyEmail: '',
                localContent: '',
                localStatus: '',
                localServiceType: '',
            },
        }
    },
    watch: {
        appliedCompanyDtl: {
            handler(newVal, oldVal) {
                // appliedCompanyDtl이 변경될 때마다 form을 업데이트
                this.form.localCompanyName = newVal.companyName
                this.form.localCompanyCEO = newVal.companyCEO
                this.form.localCompanyCode = newVal.companyCode
                this.form.localCompanyFile = newVal.companyFile
                this.form.localCompanyTEL = newVal.companyTEL
                this.form.localCompanyEmail = newVal.companyEmail
                this.form.localContent = newVal.content
                this.form.localStatus = newVal.status
                this.form.localServiceType = newVal.serviceType
            },
            immediate: true, // 컴포넌트가 생성될 때도 즉시 적용
        },
    },
    methods: {
        childCloseDialog() {
            this.$emit('closeDialog')
        },
        updateDialog() {},
    },
}
</script>
<style></style>
