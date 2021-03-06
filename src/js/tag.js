class Tag {
    constructor(player, sendTag) {
        this.player = player;

        this.player.template.mask.addEventListener('click', () => {
            this.hide();
        });
        this.player.template.tagButton.addEventListener('click', () => {
            this.show();
        });
        // this.player.template.commentSettingButton.addEventListener('click', () => {
        //     this.toggleSetting();
        // });

        // this.player.template.commentColorSettingBox.addEventListener('click', () => {
        //     const sele = this.player.template.commentColorSettingBox.querySelector('input:checked+span');
        //     if (sele) {
        //         const color = this.player.template.commentColorSettingBox.querySelector('input:checked').value;
        //         this.player.template.commentSettingFill.style.fill = color;
        //         this.player.template.commentInput.style.color = color;
        //         this.player.template.commentSendFill.style.fill = color;
        //     }
        // });

        // this.player.template.commentInput.addEventListener('click', () => {
        //     this.hideSetting();
        // });
        this.player.template.commentInput.addEventListener('keydown', (e) => {
            const event = e || window.event;
            if (event.keyCode === 13) {
                this.send();
            }
        });

        this.player.template.commentSendButton.addEventListener('click', () => {
            this.send();
        });

        this.sendTag = sendTag;
    }

    show() {
        this.player.controller.disableAutoHide = true;
        this.player.template.controller.classList.add('dplayer-controller-comment');
        this.player.template.mask.classList.add('dplayer-mask-show');
        this.player.container.classList.add('dplayer-show-controller');
        this.player.template.commentInput.focus();
    }

    hide() {
        this.player.template.controller.classList.remove('dplayer-controller-comment');
        this.player.template.mask.classList.remove('dplayer-mask-show');
        this.player.container.classList.remove('dplayer-show-controller');
        this.player.controller.disableAutoHide = false;
        // this.hideSetting();
    }

    // showSetting() {
    //     this.player.template.commentSettingBox.classList.add('dplayer-comment-setting-open');
    // }

    // hideSetting() {
    //     this.player.template.commentSettingBox.classList.remove('dplayer-comment-setting-open');
    // }

    // toggleSetting() {
    //     if (this.player.template.commentSettingBox.classList.contains('dplayer-comment-setting-open')) {
    //         this.hideSetting();
    //     } else {
    //         this.showSetting();
    //     }
    // }

    send() {
        this.player.template.commentInput.blur();

        // text can't be empty
        if (!this.player.template.commentInput.value.replace(/^\s+|\s+$/g, '')) {
            this.player.notice(this.player.tran('Please input tag content!'));
            return;
        }

        // this.player.danmaku.send(
        //     {
        //         text: this.player.template.commentInput.value,
        //         color: utils.color2Number(this.player.container.querySelector('.dplayer-comment-setting-color input:checked').value),
        //         type: parseInt(this.player.container.querySelector('.dplayer-comment-setting-type input:checked').value),
        //     },
        //     () => {
        //         this.player.template.commentInput.value = '';
        //         this.hide();
        //     }
        // );
        const tagInfo = { time: this.player.video.currentTime, value: this.player.template.commentInput.value };
        const sendPromise = this.sendTag(tagInfo);
        sendPromise.then(() => {
            this.player.events.trigger('add_tags', tagInfo);
            this.player.template.commentInput.value = '';
            this.hide();
        });
    }
}

export default Tag;
