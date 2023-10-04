import { _xurl } from '@/settings.js'

export function uploadImages(data) {
    const { images, options } = data

    let _formData = new FormData()

    if (!Array.isArray(images)) {
        _formData.append('images', images)
    } else {
        for (let item of images) {
            if (item) _formData.append('files', item)
        }
    }
    // 추가 데이터 추가
    for (let key in options) {
        _formData.append(key, options[key])
    }

    return ajaxFetchForm(_xurl.uploadImage, 'POST', _formData, null, false)
}

export function ajaxFetchJson(url, method, data, _headers, withCredentials = false) {
    const __withCredentials = withCredentials ? { credentials: 'include' } : {}

    return fetch(url, {
        method: method,
        // credentials: 'include',
        ...__withCredentials,
        headers: {
            'Content-Type': 'application/json',
            ..._headers,
        },
        body: data ? JSON.stringify(data) : null,
    })
}

export function ajaxFetchForm(url, method, formData, _headers, withCredentials = false) {
    const __withCredentials = withCredentials ? { credentials: 'include' } : {}

    return fetch(url, {
        method: method,
        ...__withCredentials,
        headers: {
            // 'Content-Type': 'application/json',
            // 'Content-Type': 'multipart/form-data; boundary=' + boundary,
            ..._headers,
        },
        body: formData,
    })
}
