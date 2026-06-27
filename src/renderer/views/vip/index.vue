<template>
  <div style="height: 100%; overflow-y: auto; padding: 6px 24px 18px; min-height: 0">
    <div
      style="
        border-radius: var(--rc);
        overflow: hidden;
        position: relative;
        background: linear-gradient(120deg, #4f96cc 0%, #2f6788 55%, #1c4458 100%);
        box-shadow: var(--shadow);
        padding: 30px 34px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      "
    >
      <div
        style="
          position: absolute;
          top: -40px;
          right: 90px;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.12);
        "
      ></div>
      <div style="position: relative; z-index: 2">
        <div
          style="
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 3px;
            color: rgba(255, 255, 255, 0.8);
          "
        >
          BLACK VINYL
        </div>
        <div style="font-size: 30px; font-weight: 800; color: #fff; margin-top: 8px">
          开通黑胶 VIP
        </div>
        <div style="font-size: 13.5px; color: rgba(255, 255, 255, 0.85); margin-top: 8px">
          享受无损音质、免广告畅听与更多专属特权
        </div>
        <button
          class="vph0"
          style="
            margin-top: 20px;
            padding: 12px 30px;
            border: none;
            cursor: pointer;
            border-radius: 999px;
            background: #fff;
            color: #2a5672;
            font-size: 15px;
            font-weight: 800;
            font-family: inherit;
            box-shadow: 0 10px 24px -8px rgba(0, 0, 0, 0.35);
            transition: transform 0.15s ease;
          "
        >
          立即开通 ¥15/月
        </button>
      </div>
      <div
        style="
          position: relative;
          z-index: 2;
          width: 96px;
          height: 96px;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.16);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.3);
        "
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="#fff">
          <path d="m12 3 2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L4.2 8.7l5.4-.8z" />
        </svg>
      </div>
    </div>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 18px">
      <div
        class="vph1"
        style="
          border-radius: var(--rc);
          padding: 20px;
          background: var(--panel);
          border: 1px solid var(--line);
          cursor: pointer;
          transition: all 0.18s ease;
        "
      >
        <div style="font-size: 14px; color: var(--text2); font-weight: 600">连续包月</div>
        <div style="font-size: 28px; font-weight: 800; color: var(--text); margin-top: 8px">
          ¥15<span style="font-size: 13px; font-weight: 500; color: var(--text3)">/月</span>
        </div>
        <div style="font-size: 12px; color: var(--text3); margin-top: 6px">可随时取消</div>
      </div>
      <div
        style="
          border-radius: var(--rc);
          padding: 20px;
          background: var(--accentSoft);
          border: 1.5px solid var(--accent);
          cursor: pointer;
          position: relative;
        "
      >
        <span
          style="
            position: absolute;
            top: -11px;
            left: 20px;
            padding: 3px 11px;
            border-radius: 999px;
            background: var(--accent);
            color: var(--accentText);
            font-size: 11px;
            font-weight: 700;
          "
          >推荐</span
        >
        <div style="font-size: 14px; color: var(--accent); font-weight: 700">季卡</div>
        <div style="font-size: 28px; font-weight: 800; color: var(--text); margin-top: 8px">
          ¥45<span style="font-size: 13px; font-weight: 500; color: var(--text3)">/季</span>
        </div>
        <div style="font-size: 12px; color: var(--accent); margin-top: 6px">立省 ¥9</div>
      </div>
      <div
        class="vph1"
        style="
          border-radius: var(--rc);
          padding: 20px;
          background: var(--panel);
          border: 1px solid var(--line);
          cursor: pointer;
          transition: all 0.18s ease;
        "
      >
        <div style="font-size: 14px; color: var(--text2); font-weight: 600">年卡</div>
        <div style="font-size: 28px; font-weight: 800; color: var(--text); margin-top: 8px">
          ¥168<span style="font-size: 13px; font-weight: 500; color: var(--text3)">/年</span>
        </div>
        <div style="font-size: 12px; color: var(--text3); margin-top: 6px">立省 ¥12</div>
      </div>
    </div>
    <div style="font-size: 17px; font-weight: 800; color: var(--text); margin: 26px 0 16px">
      会员特权
    </div>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px">
      <div
        style="
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px;
          border-radius: var(--rc);
          background: var(--panel);
          border: 1px solid var(--line);
        "
      >
        <div
          style="
            width: 42px;
            height: 42px;
            border-radius: 13px;
            flex: none;
            background: var(--accentSoft);
            color: var(--accent);
            display: flex;
            align-items: center;
            justify-content: center;
          "
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M9 18V6l9-2v12" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="15" cy="16" r="3" />
          </svg>
        </div>
        <div>
          <div style="font-size: 14px; font-weight: 700; color: var(--text)">无损音质</div>
          <div style="font-size: 12px; color: var(--text3); margin-top: 2px">Hi-Res 高解析</div>
        </div>
      </div>
      <div
        style="
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px;
          border-radius: var(--rc);
          background: var(--panel);
          border: 1px solid var(--line);
        "
      >
        <div
          style="
            width: 42px;
            height: 42px;
            border-radius: 13px;
            flex: none;
            background: var(--accentSoft);
            color: var(--accent);
            display: flex;
            align-items: center;
            justify-content: center;
          "
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="m8 8 8 8M16 8l-8 8" />
          </svg>
        </div>
        <div>
          <div style="font-size: 14px; font-weight: 700; color: var(--text)">免广告畅听</div>
          <div style="font-size: 12px; color: var(--text3); margin-top: 2px">纯净无打扰</div>
        </div>
      </div>
      <div
        style="
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px;
          border-radius: var(--rc);
          background: var(--panel);
          border: 1px solid var(--line);
        "
      >
        <div
          style="
            width: 42px;
            height: 42px;
            border-radius: 13px;
            flex: none;
            background: var(--accentSoft);
            color: var(--accent);
            display: flex;
            align-items: center;
            justify-content: center;
          "
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M4 7a8 4 0 0 0 16 0M4 7a8 4 0 0 1 16 0v10a8 4 0 0 1-16 0zM4 12a8 4 0 0 0 16 0"
            />
          </svg>
        </div>
        <div>
          <div style="font-size: 14px; font-weight: 700; color: var(--text)">云盘扩容</div>
          <div style="font-size: 12px; color: var(--text3); margin-top: 2px">额外 50G 空间</div>
        </div>
      </div>
      <div
        style="
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px;
          border-radius: var(--rc);
          background: var(--panel);
          border: 1px solid var(--line);
        "
      >
        <div
          style="
            width: 42px;
            height: 42px;
            border-radius: 13px;
            flex: none;
            background: var(--accentSoft);
            color: var(--accent);
            display: flex;
            align-items: center;
            justify-content: center;
          "
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m12 3 2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L4.2 8.7l5.4-.8z" />
          </svg>
        </div>
        <div>
          <div style="font-size: 14px; font-weight: 700; color: var(--text)">会员专享</div>
          <div style="font-size: 12px; color: var(--text3); margin-top: 2px">独家歌曲资源</div>
        </div>
      </div>
      <div
        style="
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px;
          border-radius: var(--rc);
          background: var(--panel);
          border: 1px solid var(--line);
        "
      >
        <div
          style="
            width: 42px;
            height: 42px;
            border-radius: 13px;
            flex: none;
            background: var(--accentSoft);
            color: var(--accent);
            display: flex;
            align-items: center;
            justify-content: center;
          "
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m9 11 2 2 4-4" />
            <path d="M12 3 4 6v6c0 5 3.5 7.5 8 9 4.5-1.5 8-4 8-9V6z" />
          </svg>
        </div>
        <div>
          <div style="font-size: 14px; font-weight: 700; color: var(--text)">尊贵标识</div>
          <div style="font-size: 12px; color: var(--text3); margin-top: 2px">专属身份铭牌</div>
        </div>
      </div>
      <div
        style="
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px;
          border-radius: var(--rc);
          background: var(--panel);
          border: 1px solid var(--line);
        "
      >
        <div
          style="
            width: 42px;
            height: 42px;
            border-radius: 13px;
            flex: none;
            background: var(--accentSoft);
            color: var(--accent);
            display: flex;
            align-items: center;
            justify-content: center;
          "
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="3" y="5" width="18" height="14" rx="3" />
            <path d="M3 10h18" />
          </svg>
        </div>
        <div>
          <div style="font-size: 14px; font-weight: 700; color: var(--text)">付费音乐包</div>
          <div style="font-size: 12px; color: var(--text3); margin-top: 2px">每月赠送额度</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 设计稿 hover 态 */
.vph0:hover {
  transform: scale(1.04);
}
.vph1:hover {
  border-color: var(--accentLine);
}
</style>
