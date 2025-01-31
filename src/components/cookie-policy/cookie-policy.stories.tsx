import { Meta, StoryObj } from '@storybook/react';

import { CookiePolicy } from './cookie-policy.tsx';

const meta: Meta<typeof CookiePolicy> = {
  component: CookiePolicy,
};

export default meta;

type Story = StoryObj<typeof CookiePolicy>;

export const Default: Story = {
  args: {},
};
