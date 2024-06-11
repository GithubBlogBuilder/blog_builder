function getRedirectPURI({ type, avatar }) {
    // get redirect to the path
    // user.type / boss.type
    let url = type === 'boss' ? '/boss' : '/genius';
    if (!avatar) {
        url += 'info';
    }
    return url;
}
