import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        iconfont: 'mdi', // 아이콘 폰트를 'mdi'로 설정
    },
    theme: {
        themes: {
            light: {
                dark: false,
                colors: {
                    primary: '#083D07',
                },
            },
        },
    },
})
export default vuetify
