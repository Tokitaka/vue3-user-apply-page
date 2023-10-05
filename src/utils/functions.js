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
export function kebabToCamel(kebabCase) {
    let words = kebabCase

    try {
        let wordArr = kebabCase.split('-') // 하이픈을 기준으로 단어를 분리합니다
        let camelCase =
            wordArr[0] +
            wordArr
                .slice(1)
                .map(function (v) {
                    return v.charAt(0).toUpperCase() + v.slice(1)
                })
                .join('')

        words = camelCase
    } catch (error) {}

    return words
}

export function importFilesInFolder(ext, files) {
    // 폴더 내 파일을 가져오기 위해 require.context를 사용
    // require.context : 정적 사용이라서 정규식에서는 변수 패턴 사용이 안됨.
    // const files = require.context('./', true, /\.(js|jsx|ts|tsx|vue)$/)

    let modules = {}

    files.keys().forEach((key) => {
        if (key.includes('index.js')) return

        let pattern = new RegExp(`\\.${ext}$`)

        if (pattern.test(key)) {
            pattern = new RegExp(`(\\.\\/|\\.${ext})`, 'g')

            // 파일 이름에서 './'과 '.vue'를 제거하여 모듈 이름을 추출합니다.
            let moduleName = key.replace(pattern, '')
            moduleName = kebabToCamel(moduleName)

            // 파일을 해당 모듈 이름으로 가져옵니다.
            modules[moduleName] = files(key).default
        }
    })

    return modules
}
