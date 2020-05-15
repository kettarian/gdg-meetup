const shareButton = document.getElementById('share-btn');

shareButton && shareButton.addEventListener(
    'click',
    share
);

async function share() {
    const isAnyShareApiAvailable = navigator.canShare || navigator.share;

    if (isAnyShareApiAvailable) {
        const shareData = {
            title: 'Share in beauty',
            text: 'Этот текст был пошарен по красоте',
            url: 'https://developers.google.com/community/gdg',
        };
        const doge = await fetch('../doge.jpg')
            .then(r => r.blob())
            .then(blob => new File(
                [ blob ],
                "doge.jpg",
                { type: "image/jpeg" })
            );

        try {
            if (navigator.canShare && navigator.canShare({ files: [ doge ]})) {
                shareData.files = [ doge ];
                await navigator.share(shareData);
                console.log('Web Share API Level 2 is used successfully');
            } else {
                await navigator.share(shareData);
                console.log('Web Share API Level 1 is used successfully');
            }
        } catch (error) {
            console.error(error);
            alert(error);
        }
    } else {
        console.error('Can\'t use Web Share API');
    }
}
