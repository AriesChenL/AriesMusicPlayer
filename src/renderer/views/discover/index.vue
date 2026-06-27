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
        >全部</span
      >
      <span
        class="dvh0"
        style="
          padding: 7px 15px;
          border-radius: 999px;
          font-size: 12.5px;
          background: var(--chip);
          color: var(--chipText);
          cursor: pointer;
          transition: all 0.18s ease;
        "
        >华语</span
      >
      <span
        class="dvh0"
        style="
          padding: 7px 15px;
          border-radius: 999px;
          font-size: 12.5px;
          background: var(--chip);
          color: var(--chipText);
          cursor: pointer;
          transition: all 0.18s ease;
        "
        >流行</span
      >
      <span
        class="dvh0"
        style="
          padding: 7px 15px;
          border-radius: 999px;
          font-size: 12.5px;
          background: var(--chip);
          color: var(--chipText);
          cursor: pointer;
          transition: all 0.18s ease;
        "
        >民谣</span
      >
      <span
        class="dvh0"
        style="
          padding: 7px 15px;
          border-radius: 999px;
          font-size: 12.5px;
          background: var(--chip);
          color: var(--chipText);
          cursor: pointer;
          transition: all 0.18s ease;
        "
        >电子</span
      >
      <span
        class="dvh0"
        style="
          padding: 7px 15px;
          border-radius: 999px;
          font-size: 12.5px;
          background: var(--chip);
          color: var(--chipText);
          cursor: pointer;
          transition: all 0.18s ease;
        "
        >摇滚</span
      >
      <span
        class="dvh0"
        style="
          padding: 7px 15px;
          border-radius: 999px;
          font-size: 12.5px;
          background: var(--chip);
          color: var(--chipText);
          cursor: pointer;
          transition: all 0.18s ease;
        "
        >古风</span
      >
      <span
        class="dvh0"
        style="
          padding: 7px 15px;
          border-radius: 999px;
          font-size: 12.5px;
          background: var(--chip);
          color: var(--chipText);
          cursor: pointer;
          transition: all 0.18s ease;
        "
        >R&amp;B</span
      >
    </div>
    <div style="font-size: 17px; font-weight: 800; color: var(--text); margin-bottom: 16px">
      推荐歌单
    </div>
    <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 18px">
      <div class="dvh1" style="cursor: pointer; transition: transform 0.2s ease">
        <div
          style="
            aspect-ratio: 1;
            border-radius: var(--rb);
            position: relative;
            overflow: hidden;
            background: linear-gradient(150deg, #3f8dc5, #2a4a6a);
            box-shadow: var(--shadow);
          "
        >
          <div
            style="
              position: absolute;
              top: 8px;
              right: 8px;
              display: flex;
              align-items: center;
              gap: 3px;
              padding: 3px 8px;
              border-radius: 999px;
              background: rgba(0, 0, 0, 0.42);
              backdrop-filter: blur(6px);
              font-size: 10px;
              color: #fff;
            "
          >
            <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.5v13l11-6.5z" /></svg
            >1.2万
          </div>
          <div
            style="
              position: absolute;
              bottom: 8px;
              right: 8px;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background: var(--accent);
              display: flex;
              align-items: center;
              justify-content: center;
              color: var(--accentText);
              box-shadow: 0 4px 10px -2px var(--accentLine);
            "
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          </div>
        </div>
        <div
          style="
            font-size: 13px;
            font-weight: 600;
            color: var(--text);
            margin-top: 9px;
            line-height: 1.35;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          "
        >
          私人雷达 · 每日推荐
        </div>
      </div>
      <div class="dvh1" style="cursor: pointer; transition: transform 0.2s ease">
        <div
          style="
            aspect-ratio: 1;
            border-radius: var(--rb);
            position: relative;
            overflow: hidden;
            background: linear-gradient(150deg, #4a88aa, #5a3a6a);
            box-shadow: var(--shadow);
          "
        >
          <div
            style="
              position: absolute;
              top: 8px;
              right: 8px;
              display: flex;
              align-items: center;
              gap: 3px;
              padding: 3px 8px;
              border-radius: 999px;
              background: rgba(0, 0, 0, 0.42);
              backdrop-filter: blur(6px);
              font-size: 10px;
              color: #fff;
            "
          >
            <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.5v13l11-6.5z" /></svg
            >8.6万
          </div>
          <div
            style="
              position: absolute;
              bottom: 8px;
              right: 8px;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background: var(--accent);
              display: flex;
              align-items: center;
              justify-content: center;
              color: var(--accentText);
              box-shadow: 0 4px 10px -2px var(--accentLine);
            "
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          </div>
        </div>
        <div
          style="
            font-size: 13px;
            font-weight: 600;
            color: var(--text);
            margin-top: 9px;
            line-height: 1.35;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          "
        >
          华语流行精选集
        </div>
      </div>
      <div class="dvh1" style="cursor: pointer; transition: transform 0.2s ease">
        <div
          style="
            aspect-ratio: 1;
            border-radius: var(--rb);
            position: relative;
            overflow: hidden;
            background: linear-gradient(150deg, #357fb6, #1c4258);
            box-shadow: var(--shadow);
          "
        >
          <div
            style="
              position: absolute;
              top: 8px;
              right: 8px;
              display: flex;
              align-items: center;
              gap: 3px;
              padding: 3px 8px;
              border-radius: 999px;
              background: rgba(0, 0, 0, 0.42);
              backdrop-filter: blur(6px);
              font-size: 10px;
              color: #fff;
            "
          >
            <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.5v13l11-6.5z" /></svg
            >3.4万
          </div>
          <div
            style="
              position: absolute;
              bottom: 8px;
              right: 8px;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background: var(--accent);
              display: flex;
              align-items: center;
              justify-content: center;
              color: var(--accentText);
              box-shadow: 0 4px 10px -2px var(--accentLine);
            "
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          </div>
        </div>
        <div
          style="
            font-size: 13px;
            font-weight: 600;
            color: var(--text);
            margin-top: 9px;
            line-height: 1.35;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          "
        >
          民谣的温度
        </div>
      </div>
      <div class="dvh1" style="cursor: pointer; transition: transform 0.2s ease">
        <div
          style="
            aspect-ratio: 1;
            border-radius: var(--rb);
            position: relative;
            overflow: hidden;
            background: linear-gradient(150deg, #5ca9e3, #5a6cb2);
            box-shadow: var(--shadow);
          "
        >
          <div
            style="
              position: absolute;
              top: 8px;
              right: 8px;
              display: flex;
              align-items: center;
              gap: 3px;
              padding: 3px 8px;
              border-radius: 999px;
              background: rgba(0, 0, 0, 0.42);
              backdrop-filter: blur(6px);
              font-size: 10px;
              color: #fff;
            "
          >
            <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.5v13l11-6.5z" /></svg
            >5.1万
          </div>
          <div
            style="
              position: absolute;
              bottom: 8px;
              right: 8px;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background: var(--accent);
              display: flex;
              align-items: center;
              justify-content: center;
              color: var(--accentText);
              box-shadow: 0 4px 10px -2px var(--accentLine);
            "
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          </div>
        </div>
        <div
          style="
            font-size: 13px;
            font-weight: 600;
            color: var(--text);
            margin-top: 9px;
            line-height: 1.35;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          "
        >
          深夜电台 · 治愈系
        </div>
      </div>
      <div class="dvh1" style="cursor: pointer; transition: transform 0.2s ease">
        <div
          style="
            aspect-ratio: 1;
            border-radius: var(--rb);
            position: relative;
            overflow: hidden;
            background: linear-gradient(150deg, #5ca0d0, #24465e);
            box-shadow: var(--shadow);
          "
        >
          <div
            style="
              position: absolute;
              top: 8px;
              right: 8px;
              display: flex;
              align-items: center;
              gap: 3px;
              padding: 3px 8px;
              border-radius: 999px;
              background: rgba(0, 0, 0, 0.42);
              backdrop-filter: blur(6px);
              font-size: 10px;
              color: #fff;
            "
          >
            <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.5v13l11-6.5z" /></svg
            >24万
          </div>
          <div
            style="
              position: absolute;
              bottom: 8px;
              right: 8px;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background: var(--accent);
              display: flex;
              align-items: center;
              justify-content: center;
              color: var(--accentText);
              box-shadow: 0 4px 10px -2px var(--accentLine);
            "
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          </div>
        </div>
        <div
          style="
            font-size: 13px;
            font-weight: 600;
            color: var(--text);
            margin-top: 9px;
            line-height: 1.35;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          "
        >
          经典怀旧金曲
        </div>
      </div>
      <div class="dvh1" style="cursor: pointer; transition: transform 0.2s ease">
        <div
          style="
            aspect-ratio: 1;
            border-radius: var(--rb);
            position: relative;
            overflow: hidden;
            background: linear-gradient(150deg, #6a8aaa, #2a3a4a);
            box-shadow: var(--shadow);
          "
        >
          <div
            style="
              position: absolute;
              top: 8px;
              right: 8px;
              display: flex;
              align-items: center;
              gap: 3px;
              padding: 3px 8px;
              border-radius: 999px;
              background: rgba(0, 0, 0, 0.42);
              backdrop-filter: blur(6px);
              font-size: 10px;
              color: #fff;
            "
          >
            <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.5v13l11-6.5z" /></svg
            >1.8万
          </div>
          <div
            style="
              position: absolute;
              bottom: 8px;
              right: 8px;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background: var(--accent);
              display: flex;
              align-items: center;
              justify-content: center;
              color: var(--accentText);
              box-shadow: 0 4px 10px -2px var(--accentLine);
            "
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          </div>
        </div>
        <div
          style="
            font-size: 13px;
            font-weight: 600;
            color: var(--text);
            margin-top: 9px;
            line-height: 1.35;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          "
        >
          通勤路上的轻音乐
        </div>
      </div>
      <div class="dvh1" style="cursor: pointer; transition: transform 0.2s ease">
        <div
          style="
            aspect-ratio: 1;
            border-radius: var(--rb);
            position: relative;
            overflow: hidden;
            background: linear-gradient(150deg, #3a688a, #20284a);
            box-shadow: var(--shadow);
          "
        >
          <div
            style="
              position: absolute;
              top: 8px;
              right: 8px;
              display: flex;
              align-items: center;
              gap: 3px;
              padding: 3px 8px;
              border-radius: 999px;
              background: rgba(0, 0, 0, 0.42);
              backdrop-filter: blur(6px);
              font-size: 10px;
              color: #fff;
            "
          >
            <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.5v13l11-6.5z" /></svg
            >9.9万
          </div>
          <div
            style="
              position: absolute;
              bottom: 8px;
              right: 8px;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background: var(--accent);
              display: flex;
              align-items: center;
              justify-content: center;
              color: var(--accentText);
              box-shadow: 0 4px 10px -2px var(--accentLine);
            "
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          </div>
        </div>
        <div
          style="
            font-size: 13px;
            font-weight: 600;
            color: var(--text);
            margin-top: 9px;
            line-height: 1.35;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          "
        >
          浪漫情歌对唱
        </div>
      </div>
      <div class="dvh1" style="cursor: pointer; transition: transform 0.2s ease">
        <div
          style="
            aspect-ratio: 1;
            border-radius: var(--rb);
            position: relative;
            overflow: hidden;
            background: linear-gradient(150deg, #4a86bf, #2a4a3a);
            box-shadow: var(--shadow);
          "
        >
          <div
            style="
              position: absolute;
              top: 8px;
              right: 8px;
              display: flex;
              align-items: center;
              gap: 3px;
              padding: 3px 8px;
              border-radius: 999px;
              background: rgba(0, 0, 0, 0.42);
              backdrop-filter: blur(6px);
              font-size: 10px;
              color: #fff;
            "
          >
            <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.5v13l11-6.5z" /></svg
            >4.2万
          </div>
          <div
            style="
              position: absolute;
              bottom: 8px;
              right: 8px;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background: var(--accent);
              display: flex;
              align-items: center;
              justify-content: center;
              color: var(--accentText);
              box-shadow: 0 4px 10px -2px var(--accentLine);
            "
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          </div>
        </div>
        <div
          style="
            font-size: 13px;
            font-weight: 600;
            color: var(--text);
            margin-top: 9px;
            line-height: 1.35;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          "
        >
          摇滚现场 Live 合辑
        </div>
      </div>
      <div class="dvh1" style="cursor: pointer; transition: transform 0.2s ease">
        <div
          style="
            aspect-ratio: 1;
            border-radius: var(--rb);
            position: relative;
            overflow: hidden;
            background: linear-gradient(150deg, #8a7aaa, #3a2a4a);
            box-shadow: var(--shadow);
          "
        >
          <div
            style="
              position: absolute;
              top: 8px;
              right: 8px;
              display: flex;
              align-items: center;
              gap: 3px;
              padding: 3px 8px;
              border-radius: 999px;
              background: rgba(0, 0, 0, 0.42);
              backdrop-filter: blur(6px);
              font-size: 10px;
              color: #fff;
            "
          >
            <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.5v13l11-6.5z" /></svg
            >6.7万
          </div>
          <div
            style="
              position: absolute;
              bottom: 8px;
              right: 8px;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background: var(--accent);
              display: flex;
              align-items: center;
              justify-content: center;
              color: var(--accentText);
              box-shadow: 0 4px 10px -2px var(--accentLine);
            "
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          </div>
        </div>
        <div
          style="
            font-size: 13px;
            font-weight: 600;
            color: var(--text);
            margin-top: 9px;
            line-height: 1.35;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          "
        >
          古风雅集
        </div>
      </div>
      <div class="dvh1" style="cursor: pointer; transition: transform 0.2s ease">
        <div
          style="
            aspect-ratio: 1;
            border-radius: var(--rb);
            position: relative;
            overflow: hidden;
            background: linear-gradient(150deg, #4f96cc, #284a6c);
            box-shadow: var(--shadow);
          "
        >
          <div
            style="
              position: absolute;
              top: 8px;
              right: 8px;
              display: flex;
              align-items: center;
              gap: 3px;
              padding: 3px 8px;
              border-radius: 999px;
              background: rgba(0, 0, 0, 0.42);
              backdrop-filter: blur(6px);
              font-size: 10px;
              color: #fff;
            "
          >
            <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.5v13l11-6.5z" /></svg
            >18万
          </div>
          <div
            style="
              position: absolute;
              bottom: 8px;
              right: 8px;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background: var(--accent);
              display: flex;
              align-items: center;
              justify-content: center;
              color: var(--accentText);
              box-shadow: 0 4px 10px -2px var(--accentLine);
            "
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          </div>
        </div>
        <div
          style="
            font-size: 13px;
            font-weight: 600;
            color: var(--text);
            margin-top: 9px;
            line-height: 1.35;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          "
        >
          欧美热单榜
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 设计稿 hover 态 */
.dvh0:hover {
  background: var(--accentSoft);
  color: var(--accent);
}
.dvh1:hover {
  transform: translateY(-4px);
}
</style>
