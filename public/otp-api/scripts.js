// const button = document.querySelector('button');
// button.addEventListener('click', async function() {
//     if ('OTPCredential' in window) {
//         const abortController = new AbortController();
//         setTimeout(() => { // abort after 2 minutes
//             abortController.abort();
//         }, 2 * 60 * 1000);
//         try {
//             const content = await navigator.credentials.get({
//                 otp: { transport:['sms'] },
//                 signal: abortController.signal,
//             });
//             document.querySelector('input').value = content.code;
//         } catch (error) {
//             alert(error);
//         }
//     }
// })

if ('customElements' in window && 'OTPCredential' in window) {
    customElements.define('one-time-code',
        class extends HTMLInputElement {
            connectedCallback() {
                this.abortController = new AbortController();
                this.receive();
            }
            disconnectedCallback() {
                this.abort();
            }
            abort() {
                this.abortController.abort();
            }
            async receive() {
                try {
                    const content = await navigator.credentials.get({
                        otp: {
                            transport: [ 'sms' ]
                        },
                        signal: this.abortController.signal
                    });
                    this.value = content.code;
                    this.dispatchEvent(new Event('autocomplete'));
                } catch (e) {
                    console.error(e);
                }
            }
        }, {
            extends: 'input'
    });
}
