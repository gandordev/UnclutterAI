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

    /* Gemini */
    'div.right-section' // try Google AI Plus
];
const EVENTS = ["change", "cuechange"]


// Add observer
const observer = new MutationObserver(hideElements);
observer.observe(document.body, {
    childList: true,
    subtree: true,
});

// Add listener to changing events
EVENTS.forEach(event => {
    document.addEventListener(event, () => { hideElements(); });
});


function hideElements() {
    try {
        ELEMENTS_TO_HIDE.forEach(selector => {
            const tag = document.querySelector(selector);
            if (tag) tag.remove();
        });
    }
    catch (e) {
        console.error(`Error al ocultar elemento: ${e}`);
    }

    // Enable scrolling (when using chatgpt without signing in)
    if (document.URL.includes("chatgpt")) {
        unlockScrollBody();
    }
}

function unlockScrollBody() {
    const body = document.querySelector('body');
    const scrollLocked = body?.hasAttribute('data-scroll-locked');
    if (scrollLocked) {
        // body.removeAttribute('data-scroll-locked');
        // body.style.removeProperty('pointer-events');

        // document.documentElement.style.overflow = '';
        // document.body.style.overflow = '';

        document.querySelector('a.text-token-text-secondary.mt-5.cursor-pointer.text-sm.font-semibold.underline')
        .click();
    }
}
