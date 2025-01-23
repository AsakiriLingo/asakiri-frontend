import { Meta, StoryObj } from '@storybook/react';

import { AboutHero } from './about-hero';

const meta: Meta<typeof AboutHero> = {
  component: AboutHero,
};

export default meta;

type Story = StoryObj<typeof AboutHero>;

export const Default: Story = {
  args: {},
};
