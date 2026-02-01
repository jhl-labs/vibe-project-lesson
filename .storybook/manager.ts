import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

const claudeTheme = create({
  base: 'light',
  brandTitle: 'Vibe Coding & Claude Code 교육',
  brandUrl: '/',

  // Colors
  colorPrimary: '#da7756',
  colorSecondary: '#c4613e',

  // UI
  appBg: '#f0ece5',
  appContentBg: '#faf9f7',
  appPreviewBg: '#faf9f7',
  appBorderColor: '#d4cdc4',
  appBorderRadius: 8,

  // Text colors
  textColor: '#2d2a26',
  textInverseColor: '#faf9f7',
  textMutedColor: '#8c857c',

  // Toolbar
  barTextColor: '#5c564e',
  barSelectedColor: '#da7756',
  barHoverColor: '#c4613e',
  barBg: '#f0ece5',

  // Form
  inputBg: '#faf9f7',
  inputBorder: '#d4cdc4',
  inputTextColor: '#2d2a26',
  inputBorderRadius: 6,

  // Font
  fontBase: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
  fontCode: '"JetBrains Mono", "Fira Code", Menlo, Monaco, Consolas, monospace',
});

addons.setConfig({
  theme: claudeTheme,
  sidebar: {
    showRoots: true,
  },
  enableShortcuts: true,
  initialActive: 'sidebar',
  sidebarOnboardingChecklist: false,
});
