const ELEMENTS_TO_HIDE = [
    /* ChatGPT */
    '[data-ignore-for-page-load="true"].absolute.inset-0', // login
    'div.absolute.start-0.end-0.bottom-full.z-20', // terms and conditions
    'div.pointer-events-none.absolute.start-0.flex.flex-col.items-center.gap-2', // upgrade btn (top)
    '[data-testid="accounts-profile-button"] div.trailing.text-token-text-tertiary', // upgrade btn (left)

    /* Perplexity */
    'div[style="opacity: 1;"] div.bg-base div.relative.border-subtlest.ring-subtlest.divide-subtlest.bg-subtler', // subscription btn (bottom)
    '[data-testid="sidebar-upgrade-button"]', // subscription btn (left)
    '[class*="gap-xs flex flex-col items-center"]', // install browser btn (left)
    'div.gap-sm.flex.col-start-1.row-start-2.-ml-two', // prompt input btns
    'div.bottom-md.rounded-lg.border.ease-out.bg-base', // download app btn

    /* Gemini */
    'div.right-section' // try Google AI Plus
];
const EVENTS = ["change", "cuechange"]


/**
 * Watch for changes being made to the DOM tree.
 * @param {MutationCallback} deleteElements Defines what shoud happen
 * @returns {void}
 */
const observer = new MutationObserver(deleteElements);
observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributeOldValue: true,
});

// Add listener to changing events
window.addEventListener('onload', () => {
    EVENTS.forEach(event => {
        document.addEventListener(event, () => { deleteElements(); });
    });
});


/**
 * Delete DOM elements.
 * @returns {void}
 */
function deleteElements() {
    // Enable scrolling (when using chatgpt without signing in)
    let loggedOutOption = document.querySelector('a.text-token-text-secondary.mt-5.cursor-pointer.text-sm.font-semibold.underline')
    if (document.URL.includes("chatgpt") && loggedOutOption) {
        unlockScrollBody(loggedOutOption);
        return; // Avoid to delete a non-existent element
    }

    try {
        ELEMENTS_TO_HIDE.forEach(selector => {
            const tag = document.querySelector(selector);
            if (tag) tag.remove();
        });
    }
    catch (e) {
        console.error(`Error al ocultar elemento: ${e}`);
    }
}

/**
 * Checks if we are using ChatGPT without logging in and if so
 * auto clicks on "Stay logged out" button to unlock scrolling.
 * @param {Element} loggedOutOption
 * @returns {void}
 */
function unlockScrollBody(loggedOutOption) {
    const body = document.querySelector('body');
    const scrollLocked = body?.hasAttribute('data-scroll-locked');
    if (scrollLocked) {
        document.querySelector('a.text-token-text-secondary.mt-5.cursor-pointer.text-sm.font-semibold.underline')
        .click();
    }
}
