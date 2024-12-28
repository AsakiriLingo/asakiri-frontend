import { Meta, StoryObj } from '@storybook/react';

import { TextField } from './text-field';

const meta: Meta<typeof TextField> = {
  component: TextField,
};

export default meta;

type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {},
};
