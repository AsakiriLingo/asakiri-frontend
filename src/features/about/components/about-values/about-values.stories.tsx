import { Meta, StoryObj } from '@storybook/react';

import { AboutValues } from './about-values';

const meta: Meta<typeof AboutValues> = {
  component: AboutValues,
};

export default meta;

type Story = StoryObj<typeof AboutValues>;

export const Default: Story = {
  args: {},
};
