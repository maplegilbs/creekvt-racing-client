export async function pause(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms)
    })
}