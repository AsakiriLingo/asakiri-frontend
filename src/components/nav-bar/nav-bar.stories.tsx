import { Meta, StoryObj } from '@storybook/react';

import { NavBar } from './nav-bar';

const meta: Meta<typeof NavBar> = {
  component: NavBar,
};

export default meta;

type Story = StoryObj<typeof NavBar>;

export const Default: Story = {
  args: {},
};
