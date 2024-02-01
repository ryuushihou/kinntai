export default function () {
    // shadow css
    const getCssVarName = (type: string) => {
        return `--el-box-shadow${type ? '-' : ''}${type}`
    }

    return {
        getCssVarName
    }
}
