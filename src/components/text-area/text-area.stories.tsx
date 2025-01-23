import { Meta, StoryObj } from '@storybook/react';

import { TextArea } from './text-area';

const meta: Meta<typeof TextArea> = {
  component: TextArea,
};

export default meta;

type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {},
};
