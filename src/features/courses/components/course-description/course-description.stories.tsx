import { Meta, StoryObj } from '@storybook/react';

import { CourseDescription } from './course-description';

const meta: Meta<typeof CourseDescription> = {
  component: CourseDescription,
};

export default meta;

type Story = StoryObj<typeof CourseDescription>;

export const Default: Story = {
  args: {},
};
