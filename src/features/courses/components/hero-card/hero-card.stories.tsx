import { Meta, StoryObj } from '@storybook/react';

import { HeroCard } from './hero-card';

const meta: Meta<typeof HeroCard> = {
  component: HeroCard,
};

export default meta;

type Story = StoryObj<typeof HeroCard>;

export const Default: Story = {
  args: {},
};
