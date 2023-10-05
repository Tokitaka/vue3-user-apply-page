<template>
    <div id="apply-admin-page">
        <v-row>
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
                <v-btn @click="filterByStatus('not_started')">Not Started</v-btn>
                <v-btn @click="filterByStatus('in_progress')">In Progress</v-btn>
                <v-btn @click="filterByStatus('completed')">Completed</v-btn>
                <v-btn @click="filterByStatus('cancelled')">Cancelled</v-btn>
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
                        <tr v-for="(item, index) in appliedCompanyList" :key="item.idx" class="text-left">
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
    </div>
</template>
<script>
import * as utils from '@/utils/functions.js'
import { _xurl } from '@/settings.js'
import informModal from '@/components/inform-modal.vue'
import Loader from '@/components/Loader.vue'

// const ADMIN_CODE = process.env.ADMIN_CODE
const ADMIN_CODE = process.env.VUE_APP_ADMIN_CODE

export default {
    data() {
        return {
            appliedCompanyList: [],
            isFetching: false,
            serviceType: '',
            status: '',
            currentPage: 1,
            itemsPerPage: 12,
            totalPage: 0,
        }
    },
    watch: {
        currentPage(newValue, oldValue) {
            this.fetchApplication()
        },
    },
    created() {
        this.fetchApplication()
    },
    methods: {
        async fetchApplication() {
            // 중복 API 호출 block
            if (this.isFetching) return
            this.isFetching = true
            this.appliedCompanyList = []

            let param = {
                serviceType: '',
                status: this.status,
                page: this.currentPage,
                pageSize: this.itemsPerPage,
                order: '',
            }
            console.log('status in function' + this.status)
            let param_ = `?serviceType=${param.serviceType}&status=${param.status}&page=${param.page}&pageSize=${param.pageSize}&order=${param.order}`

            let _headers = {
                'admin-code': ADMIN_CODE,
            }
            try {
                let result = await utils.ajaxFetchJson(
                    _xurl.getAppliedCompany + param_,
                    'GET',
                    null,
                    _headers
                )

                console.log('신청회사리스트', result)
                let JSONdata = await result.json()
                // console.log(JSONdata) // data 배열
                this.totalPage = JSONdata.totalPage
                this.appliedCompanyList.push(...JSONdata.data)
                // console.log('마이데이터보기', this.appliedCompanyList)
                return (this.isFetching = false)
            } catch (error) {}
        },
        getStatusClass(status) {
            switch (status) {
                case 'not_started':
                    return 'awaiting-class'
                case 'in_progress':
                    return 'in-progress-class'
                case 'completed':
                    return 'completed-class'
                case 'cancelled':
                    return 'cancelled-class'
            }
        },
        async filterByStatus(buttonValue) {
            this.currentPage = 1
            this.status = buttonValue
            this.fetchApplication()
        },
    },
}
</script>
<style>
.awaiting-class {
    background-color: brown;
}
.in-progress-class {
    background-color: blue;
}
.completed-class {
    background-color: green;
}
.cancelled-class {
    background-color: grey;
}
</style>
