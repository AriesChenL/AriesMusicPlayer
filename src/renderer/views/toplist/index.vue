<template>
  <div class="toplist-page h-full w-full transition-colors duration-500">
    <n-scrollbar class="h-full">
      <div class="toplist-content w-full pb-32 pt-6 page-padding">
        <!-- Hero Section -->
        <div class="mb-8">
          <h1 class="toplist-title">{{ t('comp.toplist') }}</h1>
          <p class="toplist-desc">{{ t('comp.pages.toplist.desc') }}</p>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="official-grid">
          <div v-for="i in 6" :key="i" class="rank-card">
            <div class="rank-card-head skeleton-shimmer" style="background: var(--elev)"></div>
            <div class="rank-card-body">
              <div
                v-for="j in 3"
                :key="j"
                class="h-4 w-full skeleton-shimmer rounded-md my-2"
              ></div>
            </div>
          </div>
        </div>

        <template v-else>
          <!-- 官方榜：暖色头部 + Top3 预览 -->
          <div v-if="officialRanks.length" class="section-head">
            {{ t('comp.pages.toplist.official') }}
          </div>
          <div class="official-grid">
            <div
              v-for="(item, index) in officialRanks"
              :key="item.id"
              class="rank-card animate-item"
              :style="{ animationDelay: calculateAnimationDelay(index, 0.05) }"
              @click="openToplist(item)"
            >
              <div class="rank-card-head" :style="{ background: gradientFor(index) }">
                <div class="rank-card-name">{{ item.name }}</div>
                <div class="rank-card-freq">
                  {{ item.updateFrequency || t('comp.pages.toplist.more') }}
                </div>
                <div class="rank-card-play">
                  <i class="ri-play-fill"></i>
                </div>
              </div>
              <div class="rank-card-body">
                <div
                  v-for="(track, ti) in (item.tracks || []).slice(0, 3)"
                  :key="ti"
                  class="rank-track"
                >
                  <span class="rank-track-no">{{ ti + 1 }}</span>
                  <span class="rank-track-name">{{ track.first }}</span>
                  <span class="rank-track-artist">{{ track.second }}</span>
                </div>
                <div v-if="!(item.tracks && item.tracks.length)" class="rank-track-empty">
                  <img
                    :src="getImgUrl(item.coverImgUrl, '120y120')"
                    class="rank-cover"
                    :alt="item.name"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- 更多榜单：胶囊 -->
          <template v-if="moreRanks.length">
            <div class="section-head section-head--more">{{ t('comp.pages.toplist.more') }}</div>
            <div class="more-chips">
              <span
                v-for="item in moreRanks"
                :key="item.id"
                class="more-chip"
                @click="openToplist(item)"
              >
                {{ item.name }}
              </span>
            </div>
          </template>
        </template>
      </div>
    </n-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { getListDetail, getToplist } from '@/api/list';
import { navigateToMusicList } from '@/components/common/MusicListNavigator';
import { calculateAnimationDelay, getImgUrl } from '@/utils';

defineOptions({
  name: 'Toplist'
});

// 官方榜卡片数量（贴设计稿：3 张 Top3 预览卡，其余进「更多榜单」）
const OFFICIAL_COUNT = 3;

const { t } = useI18n();
const router = useRouter();
const topList = ref<any[]>([]);
const loading = ref(false);

// 蓝色单色渐变调色板（与主题协调，循环使用，深浅交替增加层次）
const GRADIENTS = [
  'linear-gradient(135deg,#3f8dc5,#005b90)',
  'linear-gradient(135deg,#5ca9e3,#307fb6)',
  'linear-gradient(135deg,#307fb6,#00396b)',
  'linear-gradient(135deg,#79c6ff,#3f8dc5)',
  'linear-gradient(135deg,#005b90,#001848)',
  'linear-gradient(135deg,#96e4ff,#5ca9e3)'
];
const gradientFor = (i: number) => GRADIENTS[i % GRADIENTS.length];

// 前 N 个为「官方榜」（Top3 预览卡），其余进「更多榜单」
const officialRanks = computed(() => topList.value.slice(0, OFFICIAL_COUNT));
const moreRanks = computed(() => topList.value.slice(OFFICIAL_COUNT));

// 为官方榜拉取前 3 首歌（接口的 /toplist 不带 tracks，需逐个取歌单详情）
const loadOfficialTracks = async () => {
  await Promise.all(
    officialRanks.value.map(async (rank) => {
      if (rank.tracks && rank.tracks.length) return;
      try {
        const { data } = await getListDetail(rank.id);
        const songs = (data?.playlist?.tracks || []).slice(0, 3).map((s: any) => ({
          first: s.name,
          second: (s.ar || s.artists || []).map((a: any) => a.name).join(' / ')
        }));
        rank.tracks = songs;
      } catch (e) {
        console.warn('获取榜单 Top3 失败:', rank.name, e);
      }
    })
  );
  // 触发响应式更新
  topList.value = [...topList.value];
};

const openToplist = (item: any) => {
  try {
    navigateToMusicList(router, {
      id: item.id,
      type: 'playlist',
      name: item.name,
      listInfo: item,
      canRemove: false
    });
  } catch (error) {
    console.error('获取榜单详情失败:', error);
  }
};

const loadToplist = async () => {
  loading.value = true;
  try {
    const { data } = await getToplist();
    topList.value = data.list || [];
    // 异步填充官方榜 Top3（不阻塞卡片头部渲染）
    loadOfficialTracks();
  } catch (error) {
    console.error('加载排行榜列表失败:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadToplist();
});
</script>

<style lang="scss" scoped>
.toplist-page {
  position: relative;
  background: var(--win);
}

.toplist-title {
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--text);
  margin-bottom: 6px;
}
.toplist-desc {
  font-size: 14px;
  color: var(--text2);
}

.section-head {
  font-size: 17px;
  font-weight: 800;
  color: var(--text);
  margin-bottom: 16px;
  &--more {
    margin-top: 28px;
    margin-bottom: 14px;
  }
}

/* 官方榜网格 */
.official-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}
@media (max-width: 1100px) {
  .official-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.rank-card {
  border-radius: var(--rc);
  overflow: hidden;
  background: var(--panel);
  border: 1px solid var(--line);
  box-shadow: var(--shadow);
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    .rank-card-play {
      opacity: 1;
      transform: scale(1);
    }
  }
}

.rank-card-head {
  position: relative;
  height: 96px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.rank-card-name {
  font-size: 19px;
  font-weight: 800;
  color: #fff;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}
.rank-card-freq {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.85);
}
.rank-card-play {
  position: absolute;
  right: 14px;
  bottom: 14px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  color: #2c1c12;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

.rank-card-body {
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 11px;
  min-height: 120px;
}
.rank-track {
  display: flex;
  align-items: center;
  gap: 11px;
  min-width: 0;
}
.rank-track-no {
  font-size: 15px;
  font-weight: 800;
  color: var(--accent);
  width: 16px;
  flex: none;
  text-align: center;
}
.rank-track-name {
  flex: 1;
  min-width: 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.rank-track-artist {
  font-size: 11px;
  color: var(--text3);
  flex: none;
  max-width: 38%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.rank-track-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}
.rank-cover {
  width: 84px;
  height: 84px;
  border-radius: var(--rs);
  object-fit: cover;
}

/* 更多榜单胶囊 */
.more-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.more-chip {
  padding: 9px 18px;
  border-radius: 999px;
  font-size: 13px;
  background: var(--chip);
  color: var(--chipText);
  cursor: pointer;
  transition: all 0.18s ease;

  &:hover {
    background: var(--accentSoft);
    color: var(--accent);
  }
}

.animate-item {
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) backwards;
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
