import { importFilesInFolder } from '@/utils/functions.js'

const ext = 'js'
const files = require.context('./', true, /\.(js|jsx|ts|tsx|vue)$/)
const modules = importFilesInFolder(ext, files)

export default modules
