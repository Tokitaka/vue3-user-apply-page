<template>
    <div id="apply-admin-page">
        <v-row class="mb-0">
            <v-col>
                <h2>세이피안 신청 관리</h2>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-pagination v-model="currentPage" :length="totalPage" :total-visible="7"></v-pagination>
            </v-col>
        </v-row>

        <v-spacer></v-spacer>
        <v-row>
            <v-col>
                <v-btn @click="filterByStatus('not_started')"> 신 청 </v-btn>
                <v-btn @click="filterByStatus('in_progress')"> 진 행 중 </v-btn>
                <v-btn @click="filterByStatus('completed')"> 완 료 </v-btn>
                <v-btn @click="filterByStatus('cancelled')"> 취 소 </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-table theme="dark" fixed-header density="compact" height="">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>상호명</th>
                            <th>진행상태</th>
                            <th>신청일</th>
                            <th>상태 갱신일</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(item, index) in appliedCompanyList"
                            :key="item.idx"
                            class="text-left"
                            @click="fetchCompanyDetail(item.idx)"
                        >
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.companyName }}</td>
                            <td :class="getStatusClass(item.status)">
                                {{ item.status }}
                            </td>
                            <td>{{ item.create_at }}</td>
                            <td>{{ item.update_at }}</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </v-table>
            </v-col>
        </v-row>
        <detail-dialog
            :is-open="dialog"
            :applied-company-dtl="appliedCompanyDtl"
            @close-dialog="closeDialog"
            @update-company-dtl="updateCompanyDtl"
        ></detail-dialog>
    </div>
</template>
<script>
import * as utils from '@/utils/functions.js'
import { _xurl } from '@/settings.js'
import detailDialog from '@/components/list-detail-dialog.vue'
import informModal from '@/components/inform-modal.vue'
import Loader from '@/components/Loader.vue'

// const ADMIN_CODE = process.env.ADMIN_CODE
const ADMIN_CODE = process.env.VUE_APP_ADMIN_CODE

export default {
    components: {
        detailDialog,
    },
    data() {
        return {
            appliedCompanyList: [],
            appliedCompanyDtl: {},
            isFetchingAll: false,
            serviceType: '',
            status: '',
            currentPage: 1,
            itemsPerPage: 10,
            totalPage: 0,
            dialog: false,
        }
    },
    watch: {
        currentPage(newValue, oldValue) {
            this.fetchAppliedCompanys()
        },
        appliedCompanyDtl(newValue, oldValue) {
            console.log('newValue', newValue, 'oldValue', oldValue)
        },
    },
    created() {
        this.fetchAppliedCompanys()
    },
    methods: {
        convertStatus(status) {
            switch (status) {
                case 'not_started':
                    return '신청'
                case 'in_progress':
                    return '진행중'
                case 'completed':
                    return '완료'
                case 'cancelled':
                    return '취소'
            }
        },
        convertServiceType(serviceTypes) {
            return serviceTypes.map((type) => {
                switch (type) {
                    case 'food':
                        return '세이피안'
                    case 'dining':
                        return '세이피안다이닝'
                    case 'school':
                        return '세이피안스쿨'
                    case 'meals':
                        return '세이피안밀즈'
                }
            })
        },
        async fetchAppliedCompanys() {
            // 중복 API 호출 block
            if (this.isFetchingAll) return
            this.isFetchingAll = true
            this.appliedCompanyList = []

            let param = {
                serviceType: '',
                status: this.status,
                page: this.currentPage,
                pageSize: this.itemsPerPage,
                order: '',
            }

            let paramValue = `?serviceType=${param.serviceType}&status=${param.status}&page=${param.page}&pageSize=${param.pageSize}&order=${param.order}`

            try {
                let result = await this.$store.dispatch('fetchList', paramValue)

                let JSONdata = await result.json()

                this.totalPage = JSONdata.totalPage

                let cvAppliedCompanyList = JSONdata.data.map((item) => ({
                    ...item,
                    status: this.convertStatus(item.status),
                }))
                this.appliedCompanyList.push(...cvAppliedCompanyList)
                return (this.isFetchingAll = false)
            } catch (error) {}
        },
        async fetchCompanyDetail(_idx) {
            let param = {
                idx: _idx,
            }
            let paramValue = `?idx=${param.idx}`

            try {
                let result = await this.$store.dispatch('fetchDetail', paramValue)

                let JSONdata = await result.json()

                this.appliedCompanyDtl = JSONdata.data

                if (this.appliedCompanyDtl.companyFile === null) {
                    this.appliedCompanyDtl.companyFile = ''
                }
                this.appliedCompanyDtl.status = this.convertStatus(this.appliedCompanyDtl.status)

                this.appliedCompanyDtl.serviceType = this.convertServiceType(
                    this.appliedCompanyDtl.serviceType
                )
                // await this.$store.dispatch('fetchImage')
                console.log('localCompanyFile 확인', this.appliedCompanyDtl.companyFile)
                console.log('회사디테일', this.appliedCompanyDtl)

                return (this.dialog = true)
            } catch (error) {
                console.log('error', error)
            }
        },
        async filterByStatus(buttonValue) {
            this.currentPage = 1
            this.status = buttonValue
            this.fetchAppliedCompanys()
        },
        getStatusClass(status) {
            switch (status) {
                case '신청':
                    return 'awaiting-class'
                case '진행중':
                    return 'in-progress-class'
                case '완료':
                    return 'completed-class'
                case '취소':
                    return 'cancelled-class'
            }
        },
        closeDialog() {
            this.dialog = false
        },
        async updateCompanyDtl(formData) {
            console.log('formData 확인', formData)
            // body 값 formData ?
            let result = await this.$store.dispatch('editDetail', formData)

            let JSONdata = await result.json()

            this.totalPage = JSONdata.totalPage
        },
    },
}
</script>
<style>
#apply-admin-page {
    min-width: 990px;
    margin-top: 0px;
}
.awaiting-class {
    text-align: center;
    background-color: #a52a2a;
}
.in-progress-class {
    text-align: center;
    background-color: #0000ff;
}
.completed-class {
    text-align: center;
    background-color: #008000;
}
.cancelled-class {
    text-align: center;
    background-color: #808080;
}
</style>
<style scoped>
tbody tr:hover {
    cursor: pointer;
}
button {
    width: calc(40vw / 4);
    font-size: 17px;
    margin-left: 5px;
    /* border-radius: 0px; */
    border: 1px solid darkgrey;
}
</style>
