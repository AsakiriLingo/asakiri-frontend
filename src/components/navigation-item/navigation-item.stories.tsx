import { Meta, StoryObj } from '@storybook/react';

import { NavigationItem } from './navigation-item';

const meta: Meta<typeof NavigationItem> = {
  component: NavigationItem,
};

export default meta;

type Story = StoryObj<typeof NavigationItem>;

export const Default: Story = {
  args: {},
};
