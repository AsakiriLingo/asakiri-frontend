import { Meta, StoryObj } from '@storybook/react';

import { ProfileSettings } from './profile-settings';

const meta: Meta<typeof ProfileSettings> = {
  component: ProfileSettings,
};

export default meta;

type Story = StoryObj<typeof ProfileSettings>;

export const Default: Story = {
  args: {},
};
