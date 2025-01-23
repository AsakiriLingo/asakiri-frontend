import { Meta, StoryObj } from '@storybook/react';

import { UserVerificationCard } from './user-verification-card';

const meta: Meta<typeof UserVerificationCard> = {
  component: UserVerificationCard,
};

export default meta;

type Story = StoryObj<typeof UserVerificationCard>;

export const Default: Story = {
  args: {},
};
