import { Meta, StoryObj } from '@storybook/react';

import { CourseCreator } from './course-creator.tsx';

const meta: Meta<typeof CourseCreator> = {
  component: CourseCreator,
};

export default meta;

type Story = StoryObj<typeof CourseCreator>;

export const Default: Story = {
  args: {},
};
