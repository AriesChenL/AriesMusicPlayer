<template>
  <div style="height: 100%; overflow-y: auto; padding: 6px 24px 18px; min-height: 0">
    <div style="display: flex; flex-wrap: wrap; gap: 9px; margin-bottom: 20px">
      <span
        style="
          padding: 7px 15px;
          border-radius: 999px;
          font-size: 12.5px;
          background: var(--accentSoft);
          color: var(--accent);
          font-weight: 600;
          cursor: pointer;
        "
        >推荐</span
      >
      <span
        class="vdh0"
        style="
          padding: 7px 15px;
          border-radius: 999px;
          font-size: 12.5px;
          background: var(--chip);
          color: var(--chipText);
          cursor: pointer;
          transition: all 0.18s ease;
        "
        >现场</span
      >
      <span
        class="vdh0"
        style="
          padding: 7px 15px;
          border-radius: 999px;
          font-size: 12.5px;
          background: var(--chip);
          color: var(--chipText);
          cursor: pointer;
          transition: all 0.18s ease;
        "
        >MV</span
      >
      <span
        class="vdh0"
        style="
          padding: 7px 15px;
          border-radius: 999px;
          font-size: 12.5px;
          background: var(--chip);
          color: var(--chipText);
          cursor: pointer;
          transition: all 0.18s ease;
        "
        >翻唱</span
      >
      <span
        class="vdh0"
        style="
          padding: 7px 15px;
          border-radius: 999px;
          font-size: 12.5px;
          background: var(--chip);
          color: var(--chipText);
          cursor: pointer;
          transition: all 0.18s ease;
        "
        >舞蹈</span
      >
    </div>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px">
      <div style="cursor: pointer">
        <div
          class="vdh1"
          style="
            aspect-ratio: 16/9;
            border-radius: var(--rb);
            position: relative;
            overflow: hidden;
            background: linear-gradient(135deg, #cdeae0, #7a9a8a);
            box-shadow: var(--shadow);
            transition: transform 0.2s ease;
          "
        >
          <div
            style="
              position: absolute;
              inset: 0;
              display: flex;
              align-items: center;
              justify-content: center;
            "
          >
            <span
              style="
                width: 46px;
                height: 46px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.92);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #0c2036;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
              "
              ><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.5v13l11-6.5z" /></svg
            ></span>
          </div>
          <span
            style="
              position: absolute;
              bottom: 8px;
              right: 8px;
              padding: 2px 7px;
              border-radius: 6px;
              background: rgba(0, 0, 0, 0.55);
              font-size: 11px;
              color: #fff;
              font-variant-numeric: tabular-nums;
            "
            >04:32</span
          >
        </div>
        <div style="font-size: 14px; font-weight: 600; color: var(--text); margin-top: 10px">
          任性 Official MV
        </div>
        <div style="font-size: 12px; color: var(--text3); margin-top: 3px">
          五月天 · 1203万次播放
        </div>
      </div>
      <div style="cursor: pointer">
        <div
          class="vdh1"
          style="
            aspect-ratio: 16/9;
            border-radius: var(--rb);
            position: relative;
            overflow: hidden;
            background: linear-gradient(135deg, #8a9aae, #3a4a5e);
            box-shadow: var(--shadow);
            transition: transform 0.2s ease;
          "
        >
          <div
            style="
              position: absolute;
              inset: 0;
              display: flex;
              align-items: center;
              justify-content: center;
            "
          >
            <span
              style="
                width: 46px;
                height: 46px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.92);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #0c2036;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
              "
              ><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.5v13l11-6.5z" /></svg
            ></span>
          </div>
          <span
            style="
              position: absolute;
              bottom: 8px;
              right: 8px;
              padding: 2px 7px;
              border-radius: 6px;
              background: rgba(0, 0, 0, 0.55);
              font-size: 11px;
              color: #fff;
              font-variant-numeric: tabular-nums;
            "
            >05:18</span
          >
        </div>
        <div style="font-size: 14px; font-weight: 600; color: var(--text); margin-top: 10px">
          富士山下 现场版
        </div>
        <div style="font-size: 12px; color: var(--text3); margin-top: 3px">
          陈奕迅 · 856万次播放
        </div>
      </div>
      <div style="cursor: pointer">
        <div
          class="vdh1"
          style="
            aspect-ratio: 16/9;
            border-radius: var(--rb);
            position: relative;
            overflow: hidden;
            background: linear-gradient(135deg, #8aace2, #343a66);
            box-shadow: var(--shadow);
            transition: transform 0.2s ease;
          "
        >
          <div
            style="
              position: absolute;
              inset: 0;
              display: flex;
              align-items: center;
              justify-content: center;
            "
          >
            <span
              style="
                width: 46px;
                height: 46px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.92);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #0c2036;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
              "
              ><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.5v13l11-6.5z" /></svg
            ></span>
          </div>
          <span
            style="
              position: absolute;
              bottom: 8px;
              right: 8px;
              padding: 2px 7px;
              border-radius: 6px;
              background: rgba(0, 0, 0, 0.55);
              font-size: 11px;
              color: #fff;
              font-variant-numeric: tabular-nums;
            "
            >03:47</span
          >
        </div>
        <div style="font-size: 14px; font-weight: 600; color: var(--text); margin-top: 10px">
          珠玉 舞台版
        </div>
        <div style="font-size: 12px; color: var(--text3); margin-top: 3px">
          单依纯 · 432万次播放
        </div>
      </div>
      <div style="cursor: pointer">
        <div
          class="vdh1"
          style="
            aspect-ratio: 16/9;
            border-radius: var(--rb);
            position: relative;
            overflow: hidden;
            background: linear-gradient(135deg, #96e4ff, #3a7092);
            box-shadow: var(--shadow);
            transition: transform 0.2s ease;
          "
        >
          <div
            style="
              position: absolute;
              inset: 0;
              display: flex;
              align-items: center;
              justify-content: center;
            "
          >
            <span
              style="
                width: 46px;
                height: 46px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.92);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #0c2036;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
              "
              ><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.5v13l11-6.5z" /></svg
            ></span>
          </div>
          <span
            style="
              position: absolute;
              bottom: 8px;
              right: 8px;
              padding: 2px 7px;
              border-radius: 6px;
              background: rgba(0, 0, 0, 0.55);
              font-size: 11px;
              color: #fff;
              font-variant-numeric: tabular-nums;
            "
            >04:05</span
          >
        </div>
        <div style="font-size: 14px; font-weight: 600; color: var(--text); margin-top: 10px">
          九万字 Live
        </div>
        <div style="font-size: 12px; color: var(--text3); margin-top: 3px">
          张靓颖 · 678万次播放
        </div>
      </div>
      <div style="cursor: pointer">
        <div
          class="vdh1"
          style="
            aspect-ratio: 16/9;
            border-radius: var(--rb);
            position: relative;
            overflow: hidden;
            background: linear-gradient(135deg, #9aaec9, #4a5a7a);
            box-shadow: var(--shadow);
            transition: transform 0.2s ease;
          "
        >
          <div
            style="
              position: absolute;
              inset: 0;
              display: flex;
              align-items: center;
              justify-content: center;
            "
          >
            <span
              style="
                width: 46px;
                height: 46px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.92);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #0c2036;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
              "
              ><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.5v13l11-6.5z" /></svg
            ></span>
          </div>
          <span
            style="
              position: absolute;
              bottom: 8px;
              right: 8px;
              padding: 2px 7px;
              border-radius: 6px;
              background: rgba(0, 0, 0, 0.55);
              font-size: 11px;
              color: #fff;
              font-variant-numeric: tabular-nums;
            "
            >03:56</span
          >
        </div>
        <div style="font-size: 14px; font-weight: 600; color: var(--text); margin-top: 10px">
          一天 MV
        </div>
        <div style="font-size: 12px; color: var(--text3); margin-top: 3px">鹿晗 · 1567万次播放</div>
      </div>
      <div style="cursor: pointer">
        <div
          class="vdh1"
          style="
            aspect-ratio: 16/9;
            border-radius: var(--rb);
            position: relative;
            overflow: hidden;
            background: linear-gradient(135deg, #baa0c9, #5a4a7a);
            box-shadow: var(--shadow);
            transition: transform 0.2s ease;
          "
        >
          <div
            style="
              position: absolute;
              inset: 0;
              display: flex;
              align-items: center;
              justify-content: center;
            "
          >
            <span
              style="
                width: 46px;
                height: 46px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.92);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #0c2036;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
              "
              ><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.5v13l11-6.5z" /></svg
            ></span>
          </div>
          <span
            style="
              position: absolute;
              bottom: 8px;
              right: 8px;
              padding: 2px 7px;
              border-radius: 6px;
              background: rgba(0, 0, 0, 0.55);
              font-size: 11px;
              color: #fff;
              font-variant-numeric: tabular-nums;
            "
            >04:21</span
          >
        </div>
        <div style="font-size: 14px; font-weight: 600; color: var(--text); margin-top: 10px">
          关于那场雨
        </div>
        <div style="font-size: 12px; color: var(--text3); margin-top: 3px">
          JinDullan · 234万次播放
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 设计稿 hover 态 */
.vdh0:hover {
  background: var(--accentSoft);
  color: var(--accent);
}
.vdh1:hover {
  transform: translateY(-3px);
}
</style>
