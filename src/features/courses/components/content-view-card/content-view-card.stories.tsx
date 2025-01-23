import { Meta, StoryObj } from '@storybook/react';

import { ContentViewCard } from './content-view-card.tsx';

const meta: Meta<typeof ContentViewCard> = {
  component: ContentViewCard,
};

export default meta;

type Story = StoryObj<typeof ContentViewCard>;

export const Default: Story = {
  args: {},
};
