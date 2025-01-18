import { Meta, StoryObj } from '@storybook/react';

import { AboutValuesCard } from './about-values-card';

const meta: Meta<typeof AboutValuesCard> = {
  component: AboutValuesCard,
};

export default meta;

type Story = StoryObj<typeof AboutValuesCard>;

export const Default: Story = {
  args: {},
};
