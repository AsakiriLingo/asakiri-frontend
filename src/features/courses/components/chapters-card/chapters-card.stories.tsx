import { Meta, StoryObj } from '@storybook/react';

import { ChaptersCard } from './chapters-card';

const meta: Meta<typeof ChaptersCard> = {
  component: ChaptersCard,
};

export default meta;

type Story = StoryObj<typeof ChaptersCard>;

export const Default: Story = {
  args: {},
};
