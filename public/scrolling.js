'use strict';

function shouldScroll() {
    return messages.scrollTop + messages.clientHeight === messages.scrollHeight
}
// scroll chat to bottom
function scrollToBottom() {
    messages.scrollTop = messages.scrollHeight
}

export { shouldScroll, scrollToBottom }