<template>
  <div class="border-b border-gray-100 dark:border-gray-800 z-10" style="background: var(--win)">
    <!-- 折叠展开模式（换行平铺，不滚动） -->
    <div v-if="collapsible" class="flex items-start gap-3 py-4 page-padding">
      <div
        ref="wrapRef"
        class="cat-wrap flex flex-1 flex-wrap gap-x-3 gap-y-2.5 overflow-hidden transition-[max-height] duration-300 ease-out"
        :style="{ maxHeight: expanded ? `${wrapScrollHeight}px` : '2.5rem' }"
      >
        <span
          v-for="(category, index) in categories"
          :key="getItemKey(category, index)"
          class="cat-chip py-1.5 px-4 inline-block rounded-full cursor-pointer transition-all duration-300 text-sm font-medium"
          :class="[isActive(category) ? 'is-active' : '']"
          @click="handleClickCategory(category)"
        >
          {{ getItemLabel(category) }}
        </span>
      </div>
      <button
        class="toggle-btn flex flex-shrink-0 items-center gap-1 py-1.5 px-3 rounded-full text-sm font-medium cursor-pointer transition-all duration-300"
        @click="toggleExpand"
      >
        <span>{{ expanded ? t('common.collapse') : t('common.expand') }}</span>
        <i :class="expanded ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'" class="text-base" />
      </button>
    </div>

    <!-- 滚动模式（默认） -->
    <n-scrollbar v-else ref="scrollbarRef" x-scrollable>
      <div
        class="flex items-center py-4 page-padding"
        style="white-space: nowrap"
        @wheel.prevent="handleWheel"
      >
        <span
          v-for="(category, index) in categories"
          :key="getItemKey(category, index)"
          class="cat-chip py-1.5 px-4 mr-3 inline-block rounded-full cursor-pointer transition-all duration-300 text-sm font-medium"
          :class="[
            animationClass,
            index === 0 ? 'ml-0.5' : '',
            isActive(category) ? 'is-active' : ''
          ]"
          :style="getAnimationDelay(index)"
          @click="handleClickCategory(category)"
        >
          {{ getItemLabel(category) }}
        </span>
      </div>
    </n-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { NScrollbar } from 'naive-ui';
import { computed, nextTick, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { setAnimationDelay } from '@/utils';

type Category = string | number | { [key: string]: any };

type CategorySelectorProps = {
  categories: Category[];
  modelValue: any;
  labelKey?: string;
  valueKey?: string;
  animationClass?: string;
  /** 折叠展开模式：换行平铺，默认收起为单行，可展开。为 false 时使用横向滚动 */
  collapsible?: boolean;
  /** 紧凑态（如吸顶滚动时）：自动收起为单行，让出内容可视区 */
  compact?: boolean;
};

const props = withDefaults(defineProps<CategorySelectorProps>(), {
  labelKey: 'label',
  valueKey: 'value',
  animationClass: 'animate__bounceIn',
  collapsible: false,
  compact: false
});

const emit = defineEmits<{
  'update:modelValue': [value: any];
  change: [value: any];
}>();

const { t } = useI18n();
const scrollbarRef = ref();

// ==================== 折叠展开 ====================
const wrapRef = ref<HTMLElement>();
const expanded = ref(false);
const wrapScrollHeight = ref(0);

const toggleExpand = async () => {
  if (!expanded.value) {
    // 展开前测量内容完整高度，用于 max-height 过渡动画
    wrapScrollHeight.value = wrapRef.value?.scrollHeight ?? 1000;
    await nextTick();
  }
  expanded.value = !expanded.value;
};

// 吸顶/紧凑态时自动收起，避免展开的大块标签占满可视区
watch(
  () => props.compact,
  (isCompact) => {
    if (isCompact && expanded.value) expanded.value = false;
  }
);

const getItemKey = (item: Category, index: number): string | number => {
  if (typeof item === 'object' && item !== null) {
    return item[props.valueKey] ?? item[props.labelKey] ?? index;
  }
  return item;
};

const getItemLabel = (item: Category): string => {
  if (typeof item === 'object' && item !== null) {
    return item[props.labelKey] ?? String(item);
  }
  return String(item);
};

const getItemValue = (item: Category): any => {
  if (typeof item === 'object' && item !== null) {
    return item[props.valueKey] ?? item;
  }
  return item;
};

const isActive = (item: Category): boolean => {
  const itemValue = getItemValue(item);
  return itemValue === props.modelValue;
};

const getAnimationDelay = computed(() => {
  return (index: number) => setAnimationDelay(index, 30);
});

const handleClickCategory = (item: Category) => {
  const value = getItemValue(item);
  if (value === props.modelValue) return;
  emit('change', value);
};

const handleWheel = (e: WheelEvent) => {
  const scrollbar = scrollbarRef.value;
  if (scrollbar) {
    const delta = e.deltaY || e.detail;
    scrollbar.scrollBy({ left: delta });
  }
};

defineExpose({
  scrollbarRef
});
</script>

<style scoped>
/* 标签配色与「发现」页保持一致 */
.cat-chip {
  background: var(--chip);
  color: var(--chipText);
}
.cat-chip:hover {
  background: var(--accentSoft);
  color: var(--accent);
}
.cat-chip.is-active {
  background: var(--accent);
  color: var(--accentText);
  box-shadow: 0 6px 14px -5px var(--accentLine);
}

/* 折叠展开模式：单行高度约 2.25rem，与 chip 行高对齐 */
.cat-wrap {
  align-content: flex-start;
  /* 留出内边距，避免选中态阴影被 overflow:hidden 裁切 */
  padding: 2px 2px 2px 0;
}

.toggle-btn {
  background: var(--chip);
  color: var(--chipText);
}
.toggle-btn:hover {
  background: var(--accentSoft);
  color: var(--accent);
}
</style>
