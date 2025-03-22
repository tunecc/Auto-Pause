# 脚本的由来

Enhancer for YouTube™ 插件的 `当前台标签页中的视频开始播放时，暂停后台标签页中正在播放的视频` 功能很好用，好像没有插件在哔哩哔哩实现这个功能，就叫大模型写了一个

![image](https://raw.githubusercontent.com/tunecc/Auto-Pause/refs/heads/main/photo/1.jpg)

# 已实现的功能

1. 同一窗口

   更换标签页播放视频时，之前的网页会自动暂停

   后台标签页刷新加载视频时会自动暂停，不会抢断前台标签页的视频播放

2. 不同窗口

   切换焦点窗口的时候，焦点窗口播放视频，非焦点窗口会自动暂停

   非焦点窗口刷新加载视频时会自动暂停，不会抢断前台的视频播放

# Ending

在GitHub Copilot只有 o1 时不同窗口总是会处理不好，后面用 Claude 3.7 Sonnet Thinking 一次对话就达到效果了，但是现在对不同视频网站的处理还是不够好，以后慢慢弄吧

# 使用
复制代码到油猴脚本或者[点我安装](https://raw.githubusercontent.com/tunecc/Auto-Pause/refs/heads/main/BAP.js)