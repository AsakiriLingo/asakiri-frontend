import { Meta, StoryObj } from '@storybook/react';

import { ContentView } from './content-view';

const meta: Meta<typeof ContentView> = {
  component: ContentView,
};

export default meta;

type Story = StoryObj<typeof ContentView>;

export const Default: Story = {
  args: {},
};
