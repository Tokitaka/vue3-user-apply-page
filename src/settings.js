const _severBaseURL = process.env.VUE_APP_BASE_API

const _URL = {
    base: _severBaseURL,
    checkCompanyCode: _severBaseURL + `/check/company-code`,
    uploadImage: _severBaseURL + `/common/upload/file`,
    submitForm: _severBaseURL + `/apply/service`,
}
export const _xurl = _URL
