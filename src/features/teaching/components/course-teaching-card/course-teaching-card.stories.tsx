import { Meta, StoryObj } from '@storybook/react';

import { CourseTeachingCard } from './course-teaching-card';

const meta: Meta<typeof CourseTeachingCard> = {
  component: CourseTeachingCard,
};

export default meta;

type Story = StoryObj<typeof CourseTeachingCard>;

export const Default: Story = {
  args: {},
};
