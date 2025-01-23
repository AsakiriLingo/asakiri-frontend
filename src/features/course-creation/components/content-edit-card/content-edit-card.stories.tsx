import { Meta, StoryObj } from '@storybook/react';

import { ContentEditCard } from './content-edit-card.tsx';

const meta: Meta<typeof ContentEditCard> = {
  component: ContentEditCard,
};

export default meta;

type Story = StoryObj<typeof ContentEditCard>;

export const Default: Story = {
  args: {},
};
