import {
  app,
  BrowserWindow,
  Menu,
  MenuItem,
  MenuItemConstructorOptions,
  nativeImage,
  Tray
} from 'electron';
import { join } from 'path';

import i18n from '../../i18n/main';
import { getLanguageOptions } from '../../i18n/utils';
import { getStore } from './config';

// 歌曲信息接口定义
interface SongInfo {
  name: string;
  song: {
    artists: Array<{ name: string; [key: string]: any }>;
    [key: string]: any;
  };
  [key: string]: any;
}

let tray: Tray | null = null;
// 为macOS状态栏添加控制图标
let playPauseTray: Tray | null = null;
let prevTray: Tray | null = null;
let nextTray: Tray | null = null;
let songTitleTray: Tray | null = null;

let isPlaying = false;
let currentSong: SongInfo | null = null;
// 当前菜单栏歌词行（macOS）。为空时回退显示歌名
let currentLyric: string | null = null;

// 菜单栏歌词最大显示长度，过长截断防止挤占其它菜单栏图标
const STATUS_BAR_LYRIC_MAX_LENGTH = 28;

// 使用自动导入的语言选项
const LANGUAGES = getLanguageOptions();

// 更新播放状态
export function updatePlayState(playing: boolean) {
  isPlaying = playing;
  if (tray) {
    updateTrayMenu(BrowserWindow.getAllWindows()[0]);
  }
  // 更新播放/暂停图标
  updateStatusBarTray();
}

// 获取艺术家名称字符串
function getArtistString(song: SongInfo | null): string {
  if (!song || !song.song || !song.song.artists) return '';
  return song.song.artists.map((item) => item.name).join(' / ');
}

// 获取歌曲完整标题（歌曲名 - 艺术家）
function getSongTitle(song: SongInfo | null): string {
  if (!song) return '未播放';
  const artistStr = getArtistString(song);
  return artistStr ? `${song.name} - ${artistStr}` : song.name;
}

// 截断歌曲标题，防止菜单中显示过长
function getTruncatedSongTitle(song: SongInfo | null, maxLength: number = 14): string {
  const fullTitle = getSongTitle(song);
  if (fullTitle.length <= maxLength) return fullTitle;
  return fullTitle.slice(0, maxLength) + '...';
}

// 更新当前播放的音乐信息
export function updateCurrentSong(song: SongInfo | null) {
  const isSameSong = currentSong?.song?.id === song?.song?.id;
  currentSong = song;
  // 切歌时清空上一首残留的歌词行，避免菜单栏短暂显示错位歌词
  if (!isSameSong) {
    currentLyric = null;
  }
  if (tray) {
    updateTrayMenu(BrowserWindow.getAllWindows()[0]);
  }
  // 更新状态栏歌曲信息
  updateStatusBarTray();
}

// 更新菜单栏歌词行（macOS），由渲染进程随播放进度推送
export function updateTrayLyric(content: string | null) {
  if (process.platform !== 'darwin') return;
  const text = (content || '').trim();
  currentLyric = text || null;
  updateStatusBarTray();
}

// 计算菜单栏标题文本：优先显示当前歌词行，无歌词时回退显示歌名
function getStatusBarText(): string {
  if (currentLyric) {
    return currentLyric.length > STATUS_BAR_LYRIC_MAX_LENGTH
      ? `${currentLyric.slice(0, STATUS_BAR_LYRIC_MAX_LENGTH)}…`
      : currentLyric;
  }

  if (!currentSong) return '未播放';

  const songName = currentSong.name.slice(0, 10);
  const artistStr = getArtistString(currentSong);
  if (artistStr) {
    return `${songName} - ${artistStr.slice(0, 6)}${artistStr.length > 6 ? '..' : ''}`;
  }
  return songName;
}

// 确保 macOS 状态栏图标能正确显示
function getProperIconSize() {
  // macOS 状态栏通常高度为22像素
  const height = 18;
  const width = 18;
  return { width, height };
}

// 更新macOS状态栏图标
function updateStatusBarTray() {
  if (process.platform !== 'darwin') return;

  const iconSize = getProperIconSize();

  // 更新菜单栏文本：优先当前歌词行，无歌词时回退歌名
  if (songTitleTray) {
    const title = getStatusBarText();
    songTitleTray.setTitle(title, {
      fontType: 'monospacedDigit' // 使用等宽字体以确保更好的可读性
    });
    // tooltip 始终展示完整歌曲信息，便于识别正在播放的曲目
    const fullTitle = currentSong ? getSongTitle(currentSong) : '未播放';
    songTitleTray.setToolTip(fullTitle);
  }

  // 更新播放/暂停图标
  if (playPauseTray) {
    // 使用PNG图标替代文本
    const iconPath = join(
      app.getAppPath(),
      'resources/icons',
      isPlaying ? 'pause.png' : 'play.png'
    );
    const icon = nativeImage.createFromPath(iconPath).resize(iconSize);
    icon.setTemplateImage(true); // 设置为模板图片，适合macOS深色/浅色模式
    playPauseTray.setImage(icon);
    playPauseTray.setToolTip(
      isPlaying ? i18n.global.t('common.tray.pause') : i18n.global.t('common.tray.play')
    );
  }
}

// 导出更新菜单的函数
export function updateTrayMenu(mainWindow: BrowserWindow) {
  if (!tray) return;

  // 如果是macOS，设置TouchBar
  if (process.platform === 'darwin') {
    // macOS 上使用直接的控制按钮
    const menu = new Menu();

    // 当前播放的音乐信息
    if (currentSong) {
      menu.append(
        new MenuItem({
          label: getTruncatedSongTitle(currentSong),
          enabled: false,
          type: 'normal'
        })
      );
      menu.append(new MenuItem({ type: 'separator' }));
    }

    // 上一首、播放/暂停、下一首的菜单项
    // 在macOS上临时使用文本菜单项替代图标，确保基本功能正常
    menu.append(
      new MenuItem({
        label: i18n.global.t('common.tray.prev'),
        type: 'normal',
        click: () => {
          mainWindow.webContents.send('global-shortcut', 'prevPlay');
        }
      })
    );

    menu.append(
      new MenuItem({
        label: i18n.global.t(isPlaying ? 'common.tray.pause' : 'common.tray.play'),
        type: 'normal',
        click: () => {
          mainWindow.webContents.send('global-shortcut', 'togglePlay');
        }
      })
    );

    // 收藏
    menu.append(
      new MenuItem({
        label: i18n.global.t('common.tray.favorite'),
        type: 'normal',
        click: () => {
          console.log('[Tray] 发送收藏命令 - macOS菜单');
          mainWindow.webContents.send('global-shortcut', 'toggleFavorite');
        }
      })
    );

    menu.append(
      new MenuItem({
        label: i18n.global.t('common.tray.next'),
        type: 'normal',
        click: () => {
          mainWindow.webContents.send('global-shortcut', 'nextPlay');
        }
      })
    );

    // 分隔符
    menu.append(new MenuItem({ type: 'separator' }));

    // 显示主窗口
    menu.append(
      new MenuItem({
        label: i18n.global.t('common.tray.show'),
        type: 'normal',
        click: () => {
          mainWindow.show();
        }
      })
    );

    // 语言切换子菜单
    const languageSubmenu = Menu.buildFromTemplate(
      LANGUAGES.map(({ label, value }) => ({
        label,
        type: 'radio',
        checked: i18n.global.locale === value,
        click: () => {
          i18n.global.locale = value;
          updateTrayMenu(mainWindow);
          mainWindow.webContents.send('language-changed', value);
        }
      }))
    );

    menu.append(
      new MenuItem({
        label: i18n.global.t('common.language'),
        type: 'submenu',
        submenu: languageSubmenu
      })
    );

    // 退出按钮
    menu.append(
      new MenuItem({
        label: i18n.global.t('common.tray.quit'),
        type: 'normal',
        click: () => {
          app.quit();
        }
      })
    );

    tray.setContextMenu(menu);
  } else {
    // Windows 和 Linux 使用原来的菜单样式
    const menuTemplate: MenuItemConstructorOptions[] = [
      // 当前播放的音乐信息
      ...((currentSong
        ? [
            {
              label: getTruncatedSongTitle(currentSong),
              enabled: false,
              type: 'normal'
            },
            { type: 'separator' }
          ]
        : []) as MenuItemConstructorOptions[]),
      {
        label: i18n.global.t('common.tray.show'),
        type: 'normal',
        click: () => {
          mainWindow.show();
        }
      },
      {
        label: i18n.global.t('common.tray.favorite'),
        type: 'normal',
        click: () => {
          console.log('[Tray] 发送收藏命令 - Windows/Linux菜单');
          mainWindow.webContents.send('global-shortcut', 'toggleFavorite');
        }
      },
      { type: 'separator' },
      {
        label: i18n.global.t('common.tray.prev'),
        type: 'normal',
        click: () => {
          mainWindow.webContents.send('global-shortcut', 'prevPlay');
        }
      },
      {
        label: i18n.global.t(isPlaying ? 'common.tray.pause' : 'common.tray.play'),
        type: 'normal',
        click: () => {
          mainWindow.webContents.send('global-shortcut', 'togglePlay');
        }
      },
      {
        label: i18n.global.t('common.tray.next'),
        type: 'normal',
        click: () => {
          mainWindow.webContents.send('global-shortcut', 'nextPlay');
        }
      },
      { type: 'separator' },
      {
        label: i18n.global.t('common.language'),
        type: 'submenu',
        submenu: LANGUAGES.map(({ label, value }) => ({
          label,
          type: 'radio',
          checked: i18n.global.locale === value,
          click: () => {
            i18n.global.locale = value;
            updateTrayMenu(mainWindow);
            mainWindow.webContents.send('language-changed', value);
          }
        }))
      },
      { type: 'separator' },
      {
        label: i18n.global.t('common.tray.quit'),
        type: 'normal',
        click: () => {
          app.quit();
        }
      }
    ];

    const contextMenu = Menu.buildFromTemplate(menuTemplate);
    tray.setContextMenu(contextMenu);
  }
}

// 初始化状态栏Tray
function initializeStatusBarTray(mainWindow: BrowserWindow) {
  const store = getStore();
  if (process.platform !== 'darwin' || !store.get('set.showTopAction')) return;

  const iconSize = getProperIconSize();

  // 创建下一首按钮（调整顺序，先创建下一首按钮）
  const nextIcon = nativeImage
    .createFromPath(join(app.getAppPath(), 'resources/icons', 'next.png'))
    .resize(iconSize);
  nextIcon.setTemplateImage(true); // 设置为模板图片，适合macOS深色/浅色模式
  nextTray = new Tray(nextIcon);
  nextTray.setToolTip(i18n.global.t('common.tray.next'));
  nextTray.on('click', () => {
    mainWindow.webContents.send('global-shortcut', 'nextPlay');
  });

  // 创建播放/暂停按钮
  const playPauseIcon = nativeImage
    .createFromPath(join(app.getAppPath(), 'resources/icons', isPlaying ? 'pause.png' : 'play.png'))
    .resize(iconSize);
  playPauseIcon.setTemplateImage(true); // 设置为模板图片，适合macOS深色/浅色模式
  playPauseTray = new Tray(playPauseIcon);
  playPauseTray.setToolTip(
    isPlaying ? i18n.global.t('common.tray.pause') : i18n.global.t('common.tray.play')
  );
  playPauseTray.on('click', () => {
    mainWindow.webContents.send('global-shortcut', 'togglePlay');
  });

  // 创建上一首按钮（调整顺序，最后创建上一首按钮）
  const prevIcon = nativeImage
    .createFromPath(join(app.getAppPath(), 'resources/icons', 'prev.png'))
    .resize(iconSize);
  prevIcon.setTemplateImage(true); // 设置为模板图片，适合macOS深色/浅色模式
  prevTray = new Tray(prevIcon);
  prevTray.setToolTip(i18n.global.t('common.tray.prev'));
  prevTray.on('click', () => {
    mainWindow.webContents.send('global-shortcut', 'prevPlay');
  });

  // 歌词/歌名显示项：纯文本，不带图标（音符图标由主托盘承载，避免重复）
  songTitleTray = new Tray(nativeImage.createEmpty());

  // 初始化显示文本
  const initialText = getStatusBarText();

  // 在macOS上，特别设置title来显示文本，确保它能正确显示
  songTitleTray.setTitle(initialText, {
    fontType: 'monospacedDigit' // 使用等宽字体以确保更好的可读性
  });

  songTitleTray.setToolTip(initialText);
  songTitleTray.on('click', () => {
    mainWindow.show();
  });

  // 强制更新一次所有图标
  updateStatusBarTray();

  // 打印调试信息
  console.log('状态栏初始化完成，歌曲显示标题:', initialText);
}

/**
 * 初始化系统托盘
 */
export function initializeTray(iconPath: string, mainWindow: BrowserWindow) {
  const isMac = process.platform === 'darwin';
  const iconSize = isMac ? 18 : 16;

  let trayIcon: Electron.NativeImage;
  if (isMac) {
    // macOS 菜单栏使用单色音符模板图标，与播放控制图标保持同一视觉风格
    trayIcon = nativeImage
      .createFromPath(join(app.getAppPath(), 'resources/icons', 'note.png'))
      .resize({ width: iconSize, height: iconSize });
    trayIcon.setTemplateImage(true);
  } else {
    // Windows / Linux 使用彩色应用图标
    trayIcon = nativeImage
      .createFromPath(join(iconPath, 'icon_16x16.png'))
      .resize({ width: iconSize, height: iconSize });
  }

  tray = new Tray(trayIcon);

  // 设置托盘图标的提示文字
  tray.setToolTip('Alger Music Player');

  // 初始化菜单
  updateTrayMenu(mainWindow);

  // 初始化状态栏控制按钮 (macOS)
  initializeStatusBarTray(mainWindow);

  // 在 macOS 上，点击图标时显示菜单
  if (process.platform === 'darwin') {
    tray.on('click', () => {
      if (tray) {
        tray.popUpContextMenu();
      }
    });
  } else {
    // 在其他平台上，点击图标时切换窗口显示状态
    tray.on('click', () => {
      if (mainWindow.isVisible()) {
        mainWindow.hide();
      } else {
        mainWindow.show();
      }
    });
  }

  return tray;
}
