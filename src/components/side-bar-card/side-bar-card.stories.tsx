import { Meta, StoryObj } from '@storybook/react';

import { SideBarCard } from './side-bar-card';

const meta: Meta<typeof SideBarCard> = {
  component: SideBarCard,
};

export default meta;

type Story = StoryObj<typeof SideBarCard>;

export const Default: Story = {
  args: {},
};
