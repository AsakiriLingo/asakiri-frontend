import { Meta, StoryObj } from '@storybook/react';

import { PartnersCard } from './partners-card';

const meta: Meta<typeof PartnersCard> = {
  component: PartnersCard,
};

export default meta;

type Story = StoryObj<typeof PartnersCard>;

export const Default: Story = {
  args: {},
};
