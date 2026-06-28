<template>
  <div
    class="music-play-bar"
    :class="[
      setAnimationClass('animate__bounceInUp'),
      musicFullVisible ? 'play-bar-opcity' : '',
      musicFullVisible && MusicFullRef?.musicFullRef?.config?.hidePlayBar
        ? 'animate__animated animate__slideOutDown'
        : ''
    ]"
    :style="{
      color: musicFullVisible
        ? textColors.theme === 'dark'
          ? '#000000'
          : '#ffffff'
        : settingsStore.theme === 'dark'
          ? '#ffffff'
          : '#000000'
    }"
  >
    <!-- 背景电平动效：实时频谱驱动，无分析器时回退 CSS 动效；位于内容之下 -->
    <div
      ref="eqBgRef"
      class="eq-bg"
      :class="{ 'is-playing': play && !useRealSpectrum }"
      aria-hidden="true"
    >
      <span v-for="i in eqBars" :key="i" class="eq-bar" :style="eqBarStyle(i)" />
    </div>
    <div class="music-time custom-slider">
      <n-slider
        v-model:value="timeSlider"
        :step="1"
        :max="allTime"
        :min="0"
        :format-tooltip="formatTooltip"
        :show-tooltip="showSliderTooltip"
        @mouseenter="showSliderTooltip = true"
        @mouseleave="showSliderTooltip = false"
        @dragstart="handleSliderDragStart"
        @dragend="handleSliderDragEnd"
      ></n-slider>
    </div>
    <div class="play-bar-img-wrapper" @click="setMusicFull">
      <n-image
        :src="getImgUrl(playMusic?.picUrl, '100y100')"
        class="play-bar-img"
        lazy
        preview-disabled
      />
      <div v-if="playMusic?.playLoading" class="loading-overlay">
        <i class="ri-loader-4-line loading-icon"></i>
      </div>
      <div class="hover-arrow">
        <div class="hover-content">
          <!-- <i class="ri-arrow-up-s-line text-3xl" :class="{ 'ri-arrow-down-s-line': musicFullVisible }"></i> -->
          <i
            class="text-3xl"
            :class="musicFullVisible ? 'ri-arrow-down-s-line' : 'ri-arrow-up-s-line'"
          ></i>
          <span class="hover-text">{{
            musicFullVisible ? t('player.playBar.collapse') : t('player.playBar.expand')
          }}</span>
        </div>
      </div>
    </div>
    <div class="music-content">
      <div class="music-content-title flex items-center">
        <n-ellipsis class="text-ellipsis" line-clamp="1">
          <p v-html="playMusic?.name || ''"></p>
        </n-ellipsis>
        <span v-if="playbackRate !== 1.0" class="playback-rate-badge"> {{ playbackRate }}x </span>
      </div>
      <div class="music-content-name">
        <n-ellipsis
          class="text-ellipsis"
          line-clamp="1"
          :tooltip="{
            contentStyle: { maxWidth: '600px' },
            zIndex: 99999
          }"
        >
          <span
            v-for="(artists, artistsindex) in artistList"
            :key="artistsindex"
            class="cursor-pointer hover:text-primary"
            @click="handleArtistClick(artists.id)"
          >
            {{ artists.name }}{{ artistsindex < artistList.length - 1 ? ' / ' : '' }}
          </span>
        </n-ellipsis>
      </div>
    </div>
    <div class="music-buttons">
      <div class="music-buttons-prev" @click="handlePrev">
        <i class="iconfont icon-prev"></i>
      </div>
      <div class="music-buttons-play" @click="playMusicEvent">
        <i class="iconfont icon" :class="play ? 'icon-stop' : 'icon-play'"></i>
      </div>
      <div class="music-buttons-next" @click="handleNext">
        <i class="iconfont icon-next"></i>
      </div>
    </div>
    <div class="audio-button">
      <div class="audio-volume custom-slider" @wheel.prevent="handleVolumeWheel">
        <div class="volume-icon" @click="mute">
          <i class="iconfont" :class="getVolumeIcon"></i>
        </div>
        <div class="volume-slider">
          <div class="volume-percentage" :class="{ 'volume-percentage-disabled': isMuted }">
            {{ Math.round(volumeSlider) }}%
          </div>
          <n-slider
            v-model:value="volumeSlider"
            :step="0.01"
            :tooltip="false"
            :disabled="isMuted"
            vertical
          ></n-slider>
        </div>
      </div>
      <n-tooltip v-if="!isMobile" trigger="hover" :z-index="9999999">
        <template #trigger>
          <i
            class="iconfont"
            :class="[playModeIcon, { 'intelligence-active': playMode === 3 }]"
            @click="togglePlayMode"
          ></i>
        </template>
        {{ playModeText }}
      </n-tooltip>
      <n-tooltip v-if="!isMobile" trigger="hover" :z-index="9999999">
        <template #trigger>
          <i
            class="iconfont"
            :class="{
              'like-active': isFavorite,
              'ri-heart-3-fill': isFavorite,
              'ri-heart-3-line': !isFavorite
            }"
            @click="toggleFavorite"
          ></i>
        </template>
        {{ t('player.playBar.like') }}
      </n-tooltip>
      <!-- 设计稿「设置齿轮」：整合 歌词、换源重解析、EQ、定时关闭、播放速度 -->
      <advanced-controls-popover />

      <n-tooltip trigger="hover" :z-index="9999999">
        <template #trigger>
          <i
            class="iconfont icon-list text-2xl hover:text-primary transition-colors cursor-pointer"
            @click="openPlayListDrawer"
          ></i>
        </template>
        {{ t('player.playBar.playList') }}
      </n-tooltip>
    </div>
    <!-- 全屏播放器 -->
    <music-full-wrapper ref="MusicFullRef" v-model="musicFullVisible" :background="background" />
  </div>
</template>

<script lang="ts" setup>
import { useThrottleFn } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { computed, onUnmounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import MusicFullWrapper from '@/components/lyric/MusicFullWrapper.vue';
import AdvancedControlsPopover from '@/components/player/AdvancedControlsPopover.vue';
import { allTime, artistList, nowTime, playMusic, textColors } from '@/hooks/MusicHook';
import { useArtist } from '@/hooks/useArtist';
import { useFavorite } from '@/hooks/useFavorite';
import { usePlaybackControl } from '@/hooks/usePlaybackControl';
import { usePlayMode } from '@/hooks/usePlayMode';
import { useVolumeControl } from '@/hooks/useVolumeControl';
import { audioService } from '@/services/audioService';
import { usePlayerStore } from '@/store/modules/player';
import { useSettingsStore } from '@/store/modules/settings';
import { getImgUrl, isMobile, secondToMinute, setAnimationClass } from '@/utils';

const playerStore = usePlayerStore();
const settingsStore = useSettingsStore();
const { t } = useI18n();

// 播放控制
const { isPlaying: play, playMusicEvent, handleNext, handlePrev } = usePlaybackControl();

// 背景电平动效：一排竖条
const EQ_BAR_COUNT = 56;
const eqBars = Array.from({ length: EQ_BAR_COUNT }, (_, i) => i);
// CSS 回退动效的“伪随机”节奏（无实时频谱时使用）
const eqBarStyle = (i: number) => {
  const seed = Math.sin(i * 12.9898) * 43758.5453;
  const rnd = seed - Math.floor(seed); // 0..1
  const duration = 0.6 + rnd * 0.7; // 0.6 - 1.3s
  const delay = -(rnd * 1.2); // 负延迟，使各条错峰起伏
  return {
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`
  };
};

// 实时频谱驱动（镜像对称 + 对数频率分布：低频居中、高频向两侧递减）
const eqBgRef = ref<HTMLElement>();
const useRealSpectrum = ref(false);
const EQ_HALF = EQ_BAR_COUNT / 2; // 每侧条数
let eqRafId = 0;
let eqPeak = 0.2; // 自适应峰值（带衰减），用于动态归一化，放大整体起伏
// 每个“频率档位”对应的 bin 区间（对数分布），按数据长度懒构建
let eqBinRanges: Array<[number, number]> | null = null;
// 每根条的平滑显示值，用于非对称缓动（冲顶快、回落慢，模拟专业频谱的质感）
let eqSmooth: Float32Array | null = null;
// 缓动/加权参数从设置读取，此处为兜底默认值
const EQ_ATTACK_DEFAULT = 0.55; // 上升跟随系数：越大越快冲顶，体现鼓点冲击
const EQ_RELEASE_DEFAULT = 0.12; // 下降跟随系数：越小回落越慢越稳，避免抖动
const EQ_BASS_TILT_DEFAULT = 0.3; // 低频加权强度：0=不加权，越大底鼓/贝斯越突出

const buildBinRanges = (bins: number): Array<[number, number]> => {
  const minBin = 1;
  const maxBin = Math.max(minBin + 1, Math.floor(bins * 0.85)); // 跳过几乎为零的最高频
  const ranges: Array<[number, number]> = [];
  for (let l = 0; l < EQ_HALF; l++) {
    const b0 = Math.floor(minBin * Math.pow(maxBin / minBin, l / EQ_HALF));
    const b1 = Math.max(b0 + 1, Math.floor(minBin * Math.pow(maxBin / minBin, (l + 1) / EQ_HALF)));
    ranges.push([b0, Math.min(b1, bins)]);
  }
  return ranges;
};

const renderSpectrum = () => {
  const data = audioService.getFrequencyData();
  if (!data) {
    // 无分析器（Web 环境）→ 回退 CSS 动效
    useRealSpectrum.value = false;
    eqRafId = 0;
    return;
  }
  useRealSpectrum.value = true;

  // 实时读取用户设置（带兜底默认值），改动即时生效
  const sd = settingsStore.setData || {};
  const attack = sd.spectrumAttack ?? EQ_ATTACK_DEFAULT;
  const release = sd.spectrumRelease ?? EQ_RELEASE_DEFAULT;
  const bassTilt = sd.spectrumBassTilt ?? EQ_BASS_TILT_DEFAULT;

  const els = eqBgRef.value?.children;
  if (els && els.length) {
    if (!eqBinRanges) eqBinRanges = buildBinRanges(data.length);

    // 先算出每个档位的原始电平（档位 0 = 低频，EQ_HALF-1 = 高频）
    const levels = new Array<number>(EQ_HALF);
    let frameMax = 0;
    for (let l = 0; l < EQ_HALF; l++) {
      const [s, e] = eqBinRanges[l];
      let sum = 0;
      for (let k = s; k < e; k++) sum += data[k];
      let v = sum / (e - s) / 255; // 0..1
      // 低频加权（bass tilt）：l=0 为低频。低频 ×(1+tilt) → 高频 ×(1-tilt)，突出底鼓/贝斯的节拍感
      const t = EQ_HALF > 1 ? l / (EQ_HALF - 1) : 0; // 0=低频, 1=高频
      v *= 1 + bassTilt * (1 - 2 * t);
      levels[l] = v;
      if (v > frameMax) frameMax = v;
    }

    // 自适应峰值：跟随当前最响，安静时缓慢衰减 → 整体始终满幅起伏
    eqPeak = Math.max(frameMax, eqPeak * 0.92);
    if (eqPeak < 0.08) eqPeak = 0.08; // 静音时设下限，避免放大噪声
    const inv = 1 / eqPeak;

    if (!eqSmooth || eqSmooth.length !== els.length) eqSmooth = new Float32Array(els.length);

    // 镜像映射到 56 根条：中间为低频，两侧为高频
    for (let b = 0; b < els.length; b++) {
      const level = b < EQ_HALF ? EQ_HALF - 1 - b : b - EQ_HALF;
      let target = (levels[level] ?? 0) * inv; // 归一化到 0..1
      target = Math.pow(Math.min(1, target), 0.6); // 抬升中低段，整体更饱满

      // 非对称缓动：目标更高时快速冲顶，更低时缓慢回落 → 鼓点有冲击、回落更稳
      const prev = eqSmooth[b];
      const k = target > prev ? attack : release;
      const cur = prev + (target - prev) * k;
      eqSmooth[b] = cur;

      const scale = 0.06 + cur * 0.94;
      (els[b] as HTMLElement).style.transform = `scaleY(${scale.toFixed(3)})`;
    }
  }
  eqRafId = requestAnimationFrame(renderSpectrum);
};

const startSpectrum = () => {
  if (eqRafId) return;
  // 用户关闭了频谱动效 → 回退 CSS 动效（一排竖条按伪随机节奏起伏）
  if (settingsStore.setData?.spectrumEnabled === false) {
    useRealSpectrum.value = false;
    return;
  }
  eqRafId = requestAnimationFrame(renderSpectrum);
};

const stopSpectrum = () => {
  if (eqRafId) {
    cancelAnimationFrame(eqRafId);
    eqRafId = 0;
  }
  // 暂停时各条平滑落回低位（.eq-bar 有 transform 过渡）
  const els = eqBgRef.value?.children;
  if (els) {
    for (let b = 0; b < els.length; b++) {
      (els[b] as HTMLElement).style.transform = 'scaleY(0.1)';
    }
  }
  eqSmooth = null; // 重置缓动状态，下次播放从静止重新起跳
};

watch(
  [play, () => settingsStore.setData?.spectrumEnabled],
  ([isPlaying]) => {
    // 先停后启，确保开关切换时立即在「实时频谱 / CSS 回退」之间正确切换
    stopSpectrum();
    if (isPlaying) startSpectrum();
  },
  { immediate: true }
);

onUnmounted(stopSpectrum);

// 音量控制
const {
  isMuted,
  volumeSlider,
  volumeIcon: getVolumeIcon,
  mute,
  handleVolumeWheel
} = useVolumeControl();

// 收藏
const { isFavorite, toggleFavorite } = useFavorite();

// 播放模式
const { playMode, playModeIcon, playModeText, togglePlayMode } = usePlayMode();

// 播放速度控制
const { playbackRate } = storeToRefs(playerStore);

// 背景颜色
const background = ref('#000');

watch(
  () => playerStore.playMusic,
  async () => {
    if (playMusic && playMusic.value && playMusic.value.backgroundColor) {
      background.value = playMusic.value.backgroundColor as string;
    }
  },
  { immediate: true, deep: true }
);

// 节流版本的 seek 函数
const throttledSeek = useThrottleFn((value: number) => {
  audioService.seek(value);
  nowTime.value = value;
}, 50);

// 拖动时的临时值
const dragValue = ref(0);
const isDragging = ref(false);

const timeSlider = computed({
  get: () => (isDragging.value ? dragValue.value : nowTime.value),
  set: (value) => {
    if (isDragging.value) {
      dragValue.value = value;
      return;
    }
    throttledSeek(value);
  }
});

const handleSliderDragStart = () => {
  isDragging.value = true;
  dragValue.value = nowTime.value;
};

const handleSliderDragEnd = () => {
  isDragging.value = false;
  audioService.seek(dragValue.value);
  nowTime.value = dragValue.value;
};

const formatTooltip = (value: number) => {
  return `${secondToMinute(value)} / ${secondToMinute(allTime.value)}`;
};

const MusicFullRef = ref<any>(null);
const showSliderTooltip = ref(false);

const musicFullVisible = computed({
  get: () => playerStore.musicFull,
  set: (value) => {
    playerStore.setMusicFull(value);
  }
});

const setMusicFull = () => {
  musicFullVisible.value = !musicFullVisible.value;
  playerStore.setMusicFull(musicFullVisible.value);
  if (musicFullVisible.value) {
    settingsStore.showArtistDrawer = false;
  }
};

const { navigateToArtist } = useArtist();

const handleArtistClick = (id: number) => {
  musicFullVisible.value = false;
  navigateToArtist(id);
};

const openPlayListDrawer = () => {
  playerStore.setPlayListDrawerVisible(true);
};
</script>

<style lang="scss" scoped>
.text-ellipsis {
  width: 100%;
}

.music-play-bar {
  @apply h-[78px] w-full absolute bottom-0 left-0 flex items-center box-border py-2;
  padding-left: 22px;
  padding-right: 22px;
  gap: 16px;
  background: var(--panel);
  border-top: 1px solid var(--line);
  box-shadow: 0 -8px 30px -18px rgba(0, 0, 0, 0.5);
  z-index: 9999;
  animation-duration: 0.5s !important;

  &.play-bar-opcity {
    @apply bg-transparent !important;
    box-shadow: 0 0 20px 5px #0000001d;
  }

  &.animate__slideOutDown {
    animation-duration: 0.3s !important;
    pointer-events: none;
  }

  /* 背景电平动效 */
  .eq-bg {
    position: absolute;
    inset: 0;
    z-index: -1;
    display: flex;
    align-items: flex-end;
    gap: 3px;
    padding: 0 14px;
    overflow: hidden;
    pointer-events: none;
    opacity: 0.4;
    -webkit-mask-image: linear-gradient(to top, #000 0%, rgba(0, 0, 0, 0) 90%);
    mask-image: linear-gradient(to top, #000 0%, rgba(0, 0, 0, 0) 90%);

    .eq-bar {
      flex: 1 1 0;
      height: 100%;
      border-radius: 3px 3px 0 0;
      background: linear-gradient(to top, var(--accent), var(--accent2));
      transform-origin: bottom;
      transform: scaleY(0.16);
      /* JS 已做非对称缓动，这里仅做帧间微补间，避免双重平滑导致拖糊 */
      transition: transform 0.045s linear;
    }

    &.is-playing .eq-bar {
      animation-name: eqLevel;
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;
      animation-direction: alternate;
    }
  }

  .music-content {
    width: 150px;
    @apply ml-0;

    &-title {
      @apply text-sm font-bold;
      color: var(--text);
    }

    &-name {
      @apply text-xs mt-1;
      color: var(--text3);
    }
  }
}

.play-bar-img {
  @apply w-[52px] h-[52px];
  border-radius: 13px;
}

.music-buttons {
  @apply flex-1 flex justify-center items-center;
  gap: 18px;

  /* 上一首 / 下一首：38px 圆形，悬停 elev 底（贴设计稿） */
  .music-buttons-prev,
  .music-buttons-next {
    @apply flex justify-center items-center cursor-pointer transition;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    color: var(--text2);

    .iconfont {
      @apply text-2xl;
    }

    &:hover {
      background: var(--elev);
      color: var(--text);
    }
  }

  /* 主播放键：50px 琥珀渐变圆 */
  &-play {
    @apply flex justify-center items-center cursor-pointer transition;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(140deg, var(--accent2), var(--accent));
    color: var(--accentText);
    box-shadow:
      0 10px 22px -7px var(--accentLine),
      inset 0 1px 0 rgba(255, 255, 255, 0.35);

    .icon {
      @apply text-2xl;
      color: var(--accentText) !important;
    }

    &:hover {
      transform: scale(1.06);
    }

    &:active {
      transform: scale(0.95);
    }
  }
}

.audio-volume {
  @apply flex items-center relative;
  &:hover {
    .volume-slider {
      @apply opacity-100 visible;
    }
  }
  .volume-icon {
    @apply cursor-pointer;
  }

  .iconfont {
    @apply text-2xl transition;
    @apply hover:text-primary;
  }

  .volume-slider {
    @apply absolute opacity-0 invisible transition-all duration-300 bottom-[30px] left-1/2 -translate-x-1/2 h-[180px] px-2 py-4 rounded-xl;
    @apply bg-light dark:bg-dark-200;
    @apply border border-gray-200 dark:border-gray-700;

    .volume-percentage {
      @apply absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium bg-light dark:bg-dark-200 px-2 py-1 rounded-md;
      @apply border border-gray-200 dark:border-gray-700;
      @apply text-gray-800 dark:text-white;
      white-space: nowrap;

      &.volume-percentage-disabled {
        @apply text-gray-400 dark:text-gray-500;
      }
    }
  }
}

.audio-button {
  @apply flex items-center;
  gap: 4px;

  /* 右侧按钮组：36px 圆形，悬停 elev 底（贴设计稿） */
  .iconfont {
    @apply transition cursor-pointer;
    width: 36px;
    height: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 1.25rem;
    color: var(--text3);

    &:hover {
      background: var(--elev);
      color: var(--text);
    }
  }
}

.music-play {
  &-list {
    height: 50vh;
    width: 300px;
    @apply relative rounded-3xl overflow-hidden py-2;
    &-back {
      backdrop-filter: blur(20px);
      @apply absolute top-0 left-0 w-full h-full;
      @apply bg-light dark:bg-dark bg-opacity-75;
    }
    &-content {
      @apply mx-2;
    }
  }
}

.mobile {
  .music-play-bar {
    @apply px-4 bottom-[56px] transition-all duration-300;
  }
  .music-time {
    display: none;
  }
  .ri-netease-cloud-music-line {
    display: none;
  }
  .audio-volume {
    display: none;
  }
  .audio-button {
    @apply mx-0;
  }
  .music-buttons {
    @apply m-0;
    &-prev,
    &-next {
      display: none;
    }
    &-play {
      @apply m-0;
    }
  }
  .music-content {
    flex: 1;
  }
}

// 自定义滑块样式
.custom-slider {
  :deep(.n-slider) {
    --n-rail-height: 4px;
    --n-rail-color: theme('colors.gray.200');
    --n-rail-color-dark: theme('colors.gray.700');
    --n-fill-color: theme('colors.primary.DEFAULT');
    --n-handle-size: 12px;
    --n-handle-color: theme('colors.primary.DEFAULT');

    &.n-slider--vertical {
      height: 100%;

      .n-slider-rail {
        width: 4px;
      }

      &:hover {
        .n-slider-rail {
          width: 6px;
        }

        .n-slider-handle {
          width: 14px;
          height: 14px;
        }
      }
    }

    .n-slider-rail {
      @apply overflow-hidden transition-all duration-200;
      @apply bg-gray-500 dark:bg-dark-300 bg-opacity-10 !important;
    }

    .n-slider-handle {
      @apply transition-all duration-200;
      opacity: 0;
    }

    &:hover {
      .n-slider-handle {
        opacity: 1;
      }
    }

    // 确保悬停时提示样式正确
    .n-slider-tooltip {
      @apply bg-dark-200 text-white text-xs py-1 px-2 rounded;
      z-index: 999999;
    }
  }
}

.play-bar-img-wrapper {
  @apply relative cursor-pointer;
  width: 52px;
  height: 52px;
  flex: none;

  .hover-arrow {
    @apply absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300;
    border-radius: 13px;
    background: rgba(0, 0, 0, 0.5);

    .hover-content {
      @apply flex flex-col items-center justify-center;

      i {
        @apply text-white mb-0.5;
      }

      .hover-text {
        @apply text-white text-xs scale-90;
      }
    }
  }

  &:hover {
    .hover-arrow {
      @apply opacity-100;
    }
  }
}

.tooltip-content {
  @apply text-sm py-1 px-2;
}

.play-bar-img {
  @apply w-14 h-14 rounded-2xl;
}

.like-active {
  @apply text-red-500 hover:text-red-600 !important;
}

.intelligence-active {
  @apply text-primary hover:text-primary-pressed !important;
}

.disabled-icon {
  @apply opacity-50 cursor-not-allowed !important;
  &:hover {
    @apply text-inherit !important;
  }
}

.icon-loop,
.icon-single-loop {
  font-size: 1.5rem;
}

.music-time .n-slider {
  position: absolute;
  top: 0;
  left: 0;
  padding: 0;
  border-radius: 0;
}

.music-eq {
  @apply p-4 rounded-3xl;
  backdrop-filter: blur(20px);
  @apply bg-light dark:bg-dark bg-opacity-75;
}

.music-play-list-content {
  @apply mx-2;

  .delete-btn {
    @apply p-2 rounded-full transition-colors duration-200 cursor-pointer;
    @apply hover:bg-red-50 dark:hover:bg-red-900/20;

    .iconfont {
      @apply text-lg;
    }
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 背景电平起伏 */
@keyframes eqLevel {
  0% {
    transform: scaleY(0.12);
  }
  100% {
    transform: scaleY(0.85);
  }
}

.loading-overlay {
  @apply absolute inset-0 flex items-center justify-center rounded-2xl;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
}

.loading-icon {
  font-size: 24px;
  color: white;
  animation: spin 1s linear infinite;
}

.play-speed {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0 8px;
}

.speed-button {
  font-size: 14px;
  color: var(--text-color);
  padding: 4px 8px;
  border-radius: 4px;
  background: var(--hover-color);
}

.speed-button:hover {
  background: var(--hover-color-dark);
}

.playback-rate-badge {
  @apply ml-2 px-1.5 h-4 flex items-center text-xs rounded bg-primary bg-opacity-15 text-primary dark:text-primary;
  font-weight: 500;
  vertical-align: 1px;
}
</style>
