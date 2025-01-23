import { Meta, StoryObj } from '@storybook/react';

import { ToolTip } from './tool-tip';

const meta: Meta<typeof ToolTip> = {
  component: ToolTip,
};

export default meta;

type Story = StoryObj<typeof ToolTip>;

export const Default: Story = {
  args: {},
};
