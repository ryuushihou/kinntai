import { ref } from "vue"
import { useDark, useToggle } from '@vueuse/core'

export default function () {
    // shadow css
    const getCssVarName = (type: string) => {
        return `--el-box-shadow${type ? '-' : ''}${type}`
    }

    // ダックモード・ライトモードの切り替え
    const theme = ref<boolean>(true)
    const isDark = useDark({
        storageKey: 'useDarkKey',
        valueDark: 'dark',
        valueLight: 'light'
    })
    const toggle = useToggle(isDark)
    return {
        getCssVarName, theme, isDark, toggle
    }
}
