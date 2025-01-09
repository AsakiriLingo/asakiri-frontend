import { Meta, StoryObj } from '@storybook/react';

import { CourseSettings } from './course-settings';

const meta: Meta<typeof CourseSettings> = {
  component: CourseSettings,
};

export default meta;

type Story = StoryObj<typeof CourseSettings>;

export const Default: Story = {
  args: {},
};
