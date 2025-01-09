import { Meta, StoryObj } from '@storybook/react';

import { BottomNavBar } from './bottom-nav-bar';

const meta: Meta<typeof BottomNavBar> = {
  component: BottomNavBar,
};

export default meta;

type Story = StoryObj<typeof BottomNavBar>;

export const Default: Story = {
  args: {},
};
