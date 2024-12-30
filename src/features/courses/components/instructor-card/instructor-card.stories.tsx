import { Meta, StoryObj } from '@storybook/react';

import { InstructorCard } from './instructor-card';

const meta: Meta<typeof InstructorCard> = {
  component: InstructorCard,
};

export default meta;

type Story = StoryObj<typeof InstructorCard>;

export const Default: Story = {
  args: {},
};
