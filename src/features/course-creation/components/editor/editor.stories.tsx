import { Meta, StoryObj } from '@storybook/react';

import { Editor } from './editor';

const meta: Meta<typeof Editor> = {
  component: Editor,
};

export default meta;

type Story = StoryObj<typeof Editor>;

export const Default: Story = {
  args: {},
};
