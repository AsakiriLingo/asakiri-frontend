import { Meta, StoryObj } from '@storybook/react';

import { SearchField } from './search-field';

const meta: Meta<typeof SearchField> = {
  component: SearchField,
};

export default meta;

type Story = StoryObj<typeof SearchField>;

export const Default: Story = {
  args: {}
};