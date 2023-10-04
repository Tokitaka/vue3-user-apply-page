const _severBaseURL = process.env.VUE_APP_BASE_API

const _URL = {
    base: _severBaseURL,
    checkCompanyCode: _severBaseURL + `/check/company-code`,
    uploadImage: _severBaseURL + `/common/upload/file`,
    submitForm: _severBaseURL + `/apply/service`,
    getAppliedCompany: _severBaseURL + `/apply/company/list`,
    getAppliedDetail: _severBaseURL + `/apply/company/detail`,
    editApplication: _severBaseURL + `/apply/company/edit`,
}
export const _xurl = _URL
