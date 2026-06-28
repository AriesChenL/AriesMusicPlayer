<template>
  <div
    ref="scrollRef"
    style="height: 100%; overflow-y: auto; padding: 6px 24px 18px; min-height: 0"
    @scroll="onScroll"
  >
    <!-- 地区分类 -->
    <div style="display: flex; flex-wrap: wrap; gap: 9px; margin-bottom: 20px">
      <span
        v-for="cat in categories"
        :key="cat.value"
        :class="{ vdh0: activeCat !== cat.value }"
        :style="{
          padding: '7px 15px',
          borderRadius: '999px',
          fontSize: '14px',
          fontWeight: 500,
          background: activeCat === cat.value ? 'var(--accentSoft)' : 'var(--chip)',
          color: activeCat === cat.value ? 'var(--accent)' : 'var(--chipText)',
          cursor: 'pointer',
          transition: 'all 0.18s ease'
        }"
        @click="selectCat(cat.value)"
        >{{ cat.label }}</span
      >
    </div>

    <!-- 加载占位 -->
    <div v-if="loading" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px">
      <div v-for="i in 6" :key="i">
        <div
          :style="{
            aspectRatio: '16/9',
            borderRadius: 'var(--rb)',
            background: gradients[i % gradients.length],
            opacity: 0.5,
            boxShadow: 'var(--shadow)'
          }"
        />
      </div>
    </div>

    <!-- 视频网格 -->
    <div v-else style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px">
      <div
        v-for="(item, index) in mvList"
        :key="item.id"
        style="cursor: pointer; min-width: 0"
        @click="handleShowMv(item, index)"
      >
        <div
          class="vdh1"
          :style="{
            aspectRatio: '16/9',
            borderRadius: 'var(--rb)',
            position: 'relative',
            overflow: 'hidden',
            background: gradients[index % gradients.length],
            boxShadow: 'var(--shadow)',
            transition: 'transform 0.2s ease'
          }"
        >
          <img
            :src="getImgUrl(item.cover, '464y260')"
            :alt="item.name"
            loading="lazy"
            style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover"
          />
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
              class="vdh-play"
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
            >{{ formatDuration(item.duration) }}</span
          >
        </div>
        <div
          style="
            font-size: 14px;
            font-weight: 600;
            color: var(--text);
            margin-top: 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          "
        >
          {{ item.name }}
        </div>
        <div
          style="
            font-size: 12px;
            color: var(--text3);
            margin-top: 3px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          "
        >
          {{ item.artistName }} · {{ formatNumber(item.playCount) }}次播放
        </div>
      </div>
    </div>

    <!-- 加载更多 / 到底提示 -->
    <div
      v-if="!loading && loadingMore"
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 22px 0;
        color: var(--chipText);
        font-size: 12.5px;
      "
    >
      正在加载…
    </div>
    <div
      v-else-if="!loading && !hasMore && mvList.length"
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 22px 0;
        color: var(--chipText);
        font-size: 12.5px;
      "
    >
      没有更多了
    </div>

    <!-- MV 播放器 -->
    <mv-player
      v-model:show="showMv"
      :current-mv="playMvItem"
      :is-prev-disabled="isPrevDisabled"
      @next="playNextMv"
      @prev="playPrevMv"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';

import { getAllMv, getTopMv } from '@/api/mv';
import MvPlayer from '@/components/MvPlayer.vue';
import { audioService } from '@/services/audioService';
import { usePlayerStore } from '@/store/modules/player';
import type { IMvItem } from '@/types/mv';
import { formatNumber, getImgUrl, secondToMinute } from '@/utils';

defineOptions({
  name: 'Video'
});

const playerStore = usePlayerStore();

// 地区分类（与 MV 接口一致）
const categories = [
  { label: '全部', value: '全部' },
  { label: '内地', value: '内地' },
  { label: '港台', value: '港台' },
  { label: '欧美', value: '欧美' },
  { label: '日本', value: '日本' },
  { label: '韩国', value: '韩国' }
];

// 设计稿渐变色，作为封面加载前/失败时的占位背景
const gradients = [
  'linear-gradient(135deg, #cdeae0, #7a9a8a)',
  'linear-gradient(135deg, #8a9aae, #3a4a5e)',
  'linear-gradient(135deg, #8aace2, #343a66)',
  'linear-gradient(135deg, #96e4ff, #3a7092)',
  'linear-gradient(135deg, #9aaec9, #4a5a7a)',
  'linear-gradient(135deg, #baa0c9, #5a4a7a)'
];

const LIMIT = 30;

const scrollRef = ref<HTMLElement | null>(null);
const activeCat = ref('全部');
const mvList = ref<IMvItem[]>([]);
const loading = ref(false);
const loadingMore = ref(false);
const hasMore = ref(true);
const offset = ref(0);

// 播放器相关
const showMv = ref(false);
const playMvItem = ref<IMvItem>();
const currentIndex = ref(0);
const isPrevDisabled = computed(() => currentIndex.value === 0);

const formatDuration = (ms: number) => secondToMinute(Math.floor((ms || 0) / 1000));

const loadMvList = async (isLoadMore = false) => {
  if (isLoadMore) {
    if (!hasMore.value || loadingMore.value) return;
    loadingMore.value = true;
  } else {
    loading.value = true;
    offset.value = 0;
    hasMore.value = true;
  }

  try {
    const params = {
      limit: LIMIT,
      offset: offset.value,
      area: activeCat.value === '全部' ? '' : activeCat.value
    };
    const res = activeCat.value === '全部' ? await getTopMv(params) : await getAllMv(params);
    const list: IMvItem[] = res.data?.data ?? [];
    if (isLoadMore) {
      mvList.value.push(...list);
    } else {
      mvList.value = list;
    }
    hasMore.value = list.length === LIMIT;
    offset.value += LIMIT;
  } catch (error) {
    console.error('加载视频列表失败:', error);
    if (!isLoadMore) mvList.value = [];
  } finally {
    loading.value = false;
    loadingMore.value = false;
  }
};

const selectCat = (cat: string) => {
  if (activeCat.value === cat) return;
  activeCat.value = cat;
  scrollRef.value?.scrollTo({ top: 0 });
  loadMvList();
};

const onScroll = () => {
  const el = scrollRef.value;
  if (!el) return;
  if (el.scrollTop + el.clientHeight >= el.scrollHeight - 240) {
    loadMvList(true);
  }
};

const handleShowMv = (item: IMvItem, index: number) => {
  playerStore.setIsPlay(false);
  audioService.pause();
  showMv.value = true;
  currentIndex.value = index;
  playMvItem.value = item;
};

const playPrevMv = async (setLoading: (value: boolean) => void) => {
  try {
    if (currentIndex.value > 0) {
      handleShowMv(mvList.value[currentIndex.value - 1], currentIndex.value - 1);
    }
  } finally {
    setLoading(false);
  }
};

const playNextMv = async (setLoading: (value: boolean) => void) => {
  try {
    if (currentIndex.value < mvList.value.length - 1) {
      handleShowMv(mvList.value[currentIndex.value + 1], currentIndex.value + 1);
    } else if (hasMore.value) {
      await loadMvList(true);
      if (mvList.value.length > currentIndex.value + 1) {
        handleShowMv(mvList.value[currentIndex.value + 1], currentIndex.value + 1);
      } else {
        showMv.value = false;
      }
    } else {
      showMv.value = false;
    }
  } catch (error) {
    console.error('加载更多视频失败:', error);
    showMv.value = false;
  } finally {
    setLoading(false);
  }
};

onMounted(() => {
  loadMvList();
});
</script>

<style scoped>
/* 设计稿 hover 态 */
.vdh0:hover {
  background: var(--accentSoft) !important;
  color: var(--accent) !important;
}
.vdh1:hover {
  transform: translateY(-3px);
}
.vdh-play {
  transition: transform 0.2s ease;
}
.vdh1:hover .vdh-play {
  transform: scale(1.08);
}
</style>
