import { Meta, StoryObj } from '@storybook/react';

import { FileUpload } from './file-upload';

const meta: Meta<typeof FileUpload> = {
  component: FileUpload,
};

export default meta;

type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  args: {},
};
