// ==UserScript==
// @name         Bilibili Auto Pause
// @namespace    https://github.com/tunecc
// @version      0.7.0
// @description  当 B 站在前台播放新视频时，自动暂停其他后台标签页视频，适用于同一窗口和不同窗口的多标签页
// @match        https://*.bilibili.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let video = null;
    let channel = null;
    const CHANNEL_NAME = 'bilibili-video-control';
    const TAB_ID = Date.now() + Math.random();

    // 初始化广播通道和事件监听
    function init() {
        video = document.querySelector('video');
        if (!video) {
            return;
        }

        // 创建广播通道
        channel = new BroadcastChannel(CHANNEL_NAME);
        video.addEventListener('play', onPlay);
        channel.addEventListener('message', onMessage);
    }

    // 视频播放事件处理
    function onPlay() {
        // 检查当前标签页是否可见且具有焦点 - 保留0.6.1版本的完整检查
        if (document.visibilityState !== 'visible' || !document.hasFocus()) {
            // 如果标签页不可见或失去焦点，暂停视频
            video.pause();
            return;
        }

        if (channel) {
            // 发送消息通知其他标签页暂停视频
            channel.postMessage({ action: 'pauseOthers', sender: TAB_ID });
        }
    }

    // 接收到消息时的处理
    function onMessage(event) {
        const data = event.data;
        if (!data || !data.action) return;

        if (data.action === 'pauseOthers' && data.sender !== TAB_ID) {
            // 如果视频存在且正在播放，则暂停
            if (video && !video.paused) {
                video.pause();
            }
        }
    }

    // 观察器回调函数，检测视频元素的添加
    function mutationCallback(mutationsList) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const newVideo = document.querySelector('video');
                if (newVideo && newVideo !== video) {
                    if (video) {
                        video.removeEventListener('play', onPlay);
                    }
                    video = newVideo;
                    video.addEventListener('play', onPlay);
                }
            }
        }
    }

    const observer = new MutationObserver(mutationCallback);
    observer.observe(document.body, { childList: true, subtree: true });

    init();

    // 清理资源
    window.addEventListener('beforeunload', () => {
        if (channel) {
            channel.close();
        }
        if (video) {
            video.removeEventListener('play', onPlay);
        }
        observer.disconnect();
    });
})();