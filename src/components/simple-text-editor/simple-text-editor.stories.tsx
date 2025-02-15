import { Meta, StoryObj } from '@storybook/react';

import { SimpleTextEditor } from './simple-text-editor';

const meta: Meta<typeof SimpleTextEditor> = {
  component: SimpleTextEditor,
};

export default meta;

type Story = StoryObj<typeof SimpleTextEditor>;

export const Default: Story = {
  args: {},
};
