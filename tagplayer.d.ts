export type Lang = 'en' | 'zh-cn' | 'zh-tw';
export type Preload = 'none' | 'metadata' | 'auto';
export type VideoType = 'auto' | 'hls' | 'flv' | 'dash' | 'webtorrent' | 'normal';
export type SubTitleType = 'webvtt' | 'ass';
export type DirectionType = 'top' | 'right' | 'bottom';
export type FullScreenType = 'web' | 'browser';

export enum TagPlayerEvents {
    abort = 'abort',
    canplay = 'canplay',
    canplaythrough = 'canplaythrough',
    durationchange = 'durationchange',
    emptied = 'emptied',
    ended = 'ended',
    error = 'error',
    loadeddata = 'loadeddata',
    loadedmetadata = 'loadedmetadata',
    loadstart = 'loadstart',
    mozaudioavailable = 'mozaudioavailable',
    pause = 'pause',
    play = 'play',
    playing = 'playing',
    progress = 'progress',
    ratechange = 'ratechange',
    seeked = 'seeked',
    seeking = 'seeking',
    stalled = 'stalled',
    suspend = 'suspend',
    timeupdate = 'timeupdate',
    volumechange = 'volumechange',
    waiting = 'waiting',
    screenshot = 'screenshot',
    thumbnails_show = 'thumbnails_show',
    thumbnails_hide = 'thumbnails_hide',
    notice_show = 'notice_show',
    notice_hide = 'notice_hide',
    quality_start = 'quality_start',
    quality_end = 'quality_end',
    destroy = 'destroy',
    resize = 'resize',
    fullscreen = 'fullscreen',
    fullscreen_cancel = 'fullscreen_cancel',
    subtitle_show = 'subtitle_show',
    subtitle_hide = 'subtitle_hide',
    subtitle_change = 'subtitle_change',
}

export interface TagPlayerOptions {
    [key: string]: any;

    container: HTMLElement | null;
    live?: boolean;
    autoplay?: boolean;
    theme?: string;
    loop?: boolean;
    lang?: Lang | string;
    screenshot?: boolean;
    hotkey?: boolean;
    preload?: Preload;
    logo?: string;
    volume?: number;
    mutex?: boolean;
    video?: TagPlayerVideo;
    subtitle?: TagPlayerSubTitle;
    highlight?: TagPlayerHighLightItem[];
}

export interface TagPlayerHighLightItem {
    text: string;
    time: number;
}

export interface TagPlayerVideoQuality {
    name: string;
    url: string;
    type?: string;
}

export interface TagPlayerVideo {
    url: string;
    pic?: string;
    thumbnails?: string;
    type?: VideoType | string;
    customType?: any;
    quality?: TagPlayerVideoQuality[];
    defaultQuality?: number;
}

export interface TagPlayerSubTitle {
    url: string;
    type?: SubTitleType;
    fontSize?: string;
    bottom?: string;
    color?: string;
}

export interface FullScreen {
    request(type: FullScreenType): void;

    cancel(type: FullScreenType): void;
}

export default class TagPlayer {
    events: any;
    video: HTMLVideoElement;
    fullScreen: FullScreen;

    constructor(options: TagPlayerOptions);

    play(): void;

    pause(): void;

    seek(time: number): void;

    toggle(): void;

    on(event: TagPlayerEvents, handler: () => void): void;

    switchVideo(video: TagPlayerVideo): void;

    notice(text: string, time: number, opacity: number): void;

    switchQuality(index: number): void;

    destroy(): void;

    speed(rate: number): void;

    volume(percentage: number, nostorage: boolean, nonotice: boolean): void;

    setHighlight(highlight: TagPlayerHighLightItem[]);
}
