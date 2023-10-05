<template>
    <div>
        <v-row>
            <v-dialog :v-model="openModal" persistent width="1024">
                <!-- <template #activator="{ props }">
                    <v-btn color="primary" v-bind="props"> Open Dialog </v-btn>
                </template> -->
                <v-card>
                    <v-card-title>
                        <span class="text-h5">신청정보 수정</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="4">
                                    <v-text-field label="상호명*" required>
                                        {{ appliedCompanyDtl.companyName }}
                                    </v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field label="대표자*" appen required></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field label="사업자등록번호*" required></v-text-field>
                                </v-col>
                                <!-- wrap up -->
                                <v-col cols="4">
                                    <v-input-field label="사업자등록증*" required></v-input-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field label="연락처*" required></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field label="이메일*" type="password" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea label="특이사항*"></v-textarea>
                                </v-col>
                                <v-col cols="6">
                                    <v-select :items="[status]" label="진행상태*" required></v-select>
                                </v-col>
                                <v-col cols="6">
                                    <v-autocomplete
                                        :items="[serviceType]"
                                        label="신청서비스*"
                                        multiple
                                        required
                                    ></v-autocomplete>
                                </v-col>
                            </v-row>
                        </v-container>
                        <!-- <small>*indicates required field</small> -->
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue-darken-1" variant="text" @click="innerDialog = false">
                            Close
                        </v-btn>
                        <v-btn color="blue-darken-1" variant="text" @click="innerDialog = false">
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
        appliedCompanyDtl: Array,
        openModal: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {}
    },
    watch: {},
    mounted() {},
}
</script>
<style></style>
