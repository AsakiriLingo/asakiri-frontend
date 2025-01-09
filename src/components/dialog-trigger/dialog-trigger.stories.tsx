import { Meta, StoryObj } from '@storybook/react';

import { DialogTrigger } from './dialog-trigger';

const meta: Meta<typeof DialogTrigger> = {
  component: DialogTrigger,
};

export default meta;

type Story = StoryObj<typeof DialogTrigger>;

export const Default: Story = {
  args: {},
};
