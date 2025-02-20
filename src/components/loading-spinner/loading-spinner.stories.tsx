import { Meta, StoryObj } from '@storybook/react';

import LoadingSpinner from '@/components/loading-spinner/loading-spinner.tsx';

const meta: Meta<typeof LoadingSpinner> = {
  component: LoadingSpinner,
};

export default meta;

type Story = StoryObj<typeof LoadingSpinner>;

export const Default: Story = {
  args: {},
};
