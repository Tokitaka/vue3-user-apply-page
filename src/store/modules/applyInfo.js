import * as utils from '@/utils/functions.js'
import { _xurl } from '@/settings.js'

const actions = {
    async fetchDetail(context, param) {
        let headers = {
            'admin-code': process.env.VUE_APP_ADMIN_CODE,
        }
        return await utils.ajaxFetchJson(_xurl.getAppliedDetail + param, 'GET', null, headers)
    },
}

export default { actions }