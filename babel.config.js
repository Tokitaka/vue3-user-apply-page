const removeConsolePlugin = [];

// 배포시 console 로그 제거
if (process.env.NODE_ENV === 'production') {
    removeConsolePlugin.push(['transform-remove-console', { exclude: ['error'] }]);
}

module.exports = {
    presets: ['@vue/cli-plugin-babel/preset'],
    plugins: removeConsolePlugin,
};
