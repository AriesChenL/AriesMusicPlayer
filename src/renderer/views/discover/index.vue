<template>
  <div
    ref="scrollRef"
    style="height: 100%; overflow-y: auto; padding: 6px 24px 18px; min-height: 0"
    @scroll="onScroll"
  >
    <!-- 分类标签 -->
    <div style="display: flex; flex-wrap: wrap; gap: 9px; margin-bottom: 20px">
      <span
        v-for="cat in categories"
        :key="cat.label"
        :class="{ dvh0: activeCat !== cat.value }"
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

    <div style="font-size: 17px; font-weight: 800; color: var(--text); margin-bottom: 16px">
      推荐歌单
    </div>

    <!-- 加载占位 -->
    <div v-if="loading" style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 18px">
      <div v-for="i in 10" :key="i">
        <div
          :style="{
            aspectRatio: '1',
            borderRadius: 'var(--rb)',
            background: gradients[i % gradients.length],
            opacity: 0.5,
            boxShadow: 'var(--shadow)'
          }"
        />
      </div>
    </div>

    <!-- 推荐歌单 -->
    <div v-else style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 18px">
      <div
        v-for="(item, index) in playlists"
        :key="item.id"
        class="dvh1"
        style="cursor: pointer; transition: transform 0.2s ease"
        @click="openPlaylist(item)"
      >
        <div
          :style="{
            aspectRatio: '1',
            borderRadius: 'var(--rb)',
            position: 'relative',
            overflow: 'hidden',
            background: gradients[index % gradients.length],
            boxShadow: 'var(--shadow)'
          }"
        >
          <img
            :src="getImgUrl(item.picUrl || item.coverImgUrl, '400y400')"
            :alt="item.name"
            loading="lazy"
            style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover"
          />
          <!-- 播放量标签 -->
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
            >{{ formatNumber(item.playCount) }}
          </div>
          <!-- 播放按钮 -->
          <div
            class="dvh-play"
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
          {{ item.name }}
        </div>
      </div>
    </div>

    <!-- 加载更多 / 到底提示 -->
    <div
      v-if="!loading && isLoadingMore"
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
      v-else-if="!loading && !hasMore && playlists.length"
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
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { getListByCat } from '@/api/list';
import { navigateToMusicList } from '@/components/common/MusicListNavigator';
import { formatNumber, getImgUrl } from '@/utils';

defineOptions({
  name: 'Discover'
});

const router = useRouter();

// 分类标签：value 为空字符串表示「全部」，其余直接作为网易云歌单分类 cat 参数
const categories = [
  { label: '全部', value: '' },
  { label: '华语', value: '华语' },
  { label: '流行', value: '流行' },
  { label: '民谣', value: '民谣' },
  { label: '电子', value: '电子' },
  { label: '摇滚', value: '摇滚' },
  { label: '古风', value: '古风' },
  { label: 'R&B', value: 'R&B' }
];

// 设计稿渐变色，作为封面加载前/失败时的占位背景
const gradients = [
  'linear-gradient(150deg, #3f8dc5, #2a4a6a)',
  'linear-gradient(150deg, #4a88aa, #5a3a6a)',
  'linear-gradient(150deg, #357fb6, #1c4258)',
  'linear-gradient(150deg, #5ca9e3, #5a6cb2)',
  'linear-gradient(150deg, #5ca0d0, #24465e)',
  'linear-gradient(150deg, #6a8aaa, #2a3a4a)',
  'linear-gradient(150deg, #3a688a, #20284a)',
  'linear-gradient(150deg, #4a86bf, #2a4a3a)',
  'linear-gradient(150deg, #8a7aaa, #3a2a4a)',
  'linear-gradient(150deg, #4f96cc, #284a6c)'
];

const PAGE_SIZE = 30;

const scrollRef = ref<HTMLElement | null>(null);
const activeCat = ref('');
const playlists = ref<any[]>([]);
const loading = ref(false);
const isLoadingMore = ref(false);
const hasMore = ref(true);
const page = ref(0);

const loadPlaylists = async (cat: string, isLoadMore = false) => {
  if (isLoadMore) {
    if (!hasMore.value || isLoadingMore.value) return;
    isLoadingMore.value = true;
  } else {
    loading.value = true;
    page.value = 0;
    hasMore.value = true;
  }

  try {
    const { data } = await getListByCat({
      cat,
      limit: PAGE_SIZE,
      offset: page.value * PAGE_SIZE
    });
    const list = data?.playlists ?? [];
    if (isLoadMore) {
      playlists.value.push(...list);
    } else {
      playlists.value = list;
    }
    hasMore.value = Boolean(data?.more);
    page.value += 1;
  } catch (error) {
    console.error('加载推荐歌单失败:', error);
    if (!isLoadMore) playlists.value = [];
  } finally {
    loading.value = false;
    isLoadingMore.value = false;
  }
};

const selectCat = (cat: string) => {
  if (activeCat.value === cat) return;
  activeCat.value = cat;
  scrollRef.value?.scrollTo({ top: 0 });
  loadPlaylists(cat);
};

const onScroll = () => {
  const el = scrollRef.value;
  if (!el) return;
  if (el.scrollTop + el.clientHeight >= el.scrollHeight - 240) {
    loadPlaylists(activeCat.value, true);
  }
};

const openPlaylist = (item: any) => {
  navigateToMusicList(router, {
    id: item.id,
    type: 'playlist',
    name: item.name,
    listInfo: item,
    canRemove: false
  });
};

onMounted(() => {
  loadPlaylists(activeCat.value);
});
</script>

<style scoped>
/* 设计稿 hover 态 */
.dvh0:hover {
  background: var(--accentSoft) !important;
  color: var(--accent) !important;
}
.dvh1:hover {
  transform: translateY(-4px);
}
.dvh-play {
  transition: transform 0.2s ease;
}
.dvh1:hover .dvh-play {
  transform: scale(1.08);
}
</style>
