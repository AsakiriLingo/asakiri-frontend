import { Meta, StoryObj } from '@storybook/react';

import { ThemeSwitcher } from './theme-switcher.tsx';

const meta: Meta<typeof ThemeSwitcher> = {
  component: ThemeSwitcher,
};

export default meta;

type Story = StoryObj<typeof ThemeSwitcher>;

export const Default: Story = {
  args: {},
};
