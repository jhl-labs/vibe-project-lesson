import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

const darkTheme = create({
  base: 'dark',
  brandTitle: 'Vibe Coding & Claude Code 교육',
  brandUrl: '/',

  // Colors
  colorPrimary: '#818cf8',
  colorSecondary: '#6366f1',

  // UI
  appBg: '#0f172a',
  appContentBg: '#1e293b',
  appPreviewBg: '#1e293b',
  appBorderColor: '#334155',
  appBorderRadius: 8,

  // Text colors
  textColor: '#e2e8f0',
  textInverseColor: '#0f172a',
  textMutedColor: '#94a3b8',

  // Toolbar
  barTextColor: '#94a3b8',
  barSelectedColor: '#818cf8',
  barHoverColor: '#a5b4fc',
  barBg: '#1e293b',

  // Form
  inputBg: '#0f172a',
  inputBorder: '#334155',
  inputTextColor: '#e2e8f0',
  inputBorderRadius: 6,

  // Font
  fontBase: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
  fontCode: '"JetBrains Mono", "Fira Code", Menlo, Monaco, Consolas, monospace',
});

addons.setConfig({
  theme: darkTheme,
  sidebar: {
    showRoots: true,
  },
});
