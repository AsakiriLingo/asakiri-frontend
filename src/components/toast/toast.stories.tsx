import { Meta, StoryObj } from '@storybook/react';

import { Toaster } from './toast';

const meta: Meta<typeof Toaster> = {
  component: Toaster,
};

export default meta;

type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
  args: {},
};
