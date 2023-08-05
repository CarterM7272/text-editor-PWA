const butInstall = document.getElementById('buttonInstall');

window.addEventListener('beforeinstallprompt', (event) => {
    window.defferedPrompt = event;
    butInstall.removeAttribute('hidden', false);
});

butInstall.addEventListener('click', async () => {
    const promptEvent = window.defferedPrompt;
    if (!promptEvent) return;

    promptEvent.prompt();

    window.defferedPrompt = null;

    butInstall.setAttribute('hidden', true);
});

window.addEventListener('appinstalled', (event) => {
    console.log('Jate was installed.', event);
});