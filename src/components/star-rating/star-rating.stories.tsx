import { Meta, StoryObj } from '@storybook/react';

import { StarRating } from './star-rating';

const meta: Meta<typeof StarRating> = {
  component: StarRating,
};

export default meta;

type Story = StoryObj<typeof StarRating>;

export const Default: Story = {
  args: {},
};
