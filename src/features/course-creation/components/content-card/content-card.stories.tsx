import { Meta, StoryObj } from '@storybook/react';

import { ContentCard } from './content-card.tsx';

const meta: Meta<typeof ContentCard> = {
  component: ContentCard,
};

export default meta;

type Story = StoryObj<typeof ContentCard>;

export const Default: Story = {
  args: {},
};
